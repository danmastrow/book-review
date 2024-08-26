import { sql } from "@vercel/postgres";

export default async function Cart({
	params,
}: {
	params: { user: string };
}): Promise<JSX.Element> {
	const { rows } = await sql`SELECT TOP 10 * from BOOKS`;

	return (
		<main>
			{rows.map((row) => (
				<div key={row.id}>
					{row.id} - {row.quantity}
				</div>
			))}
		</main>
	);
}
