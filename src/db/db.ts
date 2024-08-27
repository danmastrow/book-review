import { PrismaClient } from '@prisma/client'
// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices#solution
const prismaClientSingleton = () => {
    return new PrismaClient(
        {
            log: ['info'],
        }
    )
}

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') { globalThis.prismaGlobal = prisma }