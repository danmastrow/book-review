import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, BookOpenIcon } from '@heroicons/react/24/outline'
import "./globals.css";
import { cn } from "@/util/cn";
import Image from "next/image";

const user = {
	name: 'Daniel Mastrowicz',
	email: 'dan@example.com',
}

const navigation = [
	{ name: 'Home', href: '#', current: true },
]
const userNavigation = [
	{ name: 'Your Profile', href: '#' },
	{ name: 'Settings', href: '#' },
	{ name: 'Sign out', href: '#' },
]

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Book Review",
	description: "A place to submit, review and discuss books!",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html className="h-full">
			<body className={`h-full ${inter.className}`}>
				<div className="min-h-full">
					<Disclosure as="nav" className="border-b border-gray-200 bg-white">
						<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
							<div className="flex h-16 justify-between">
								<div className="flex">
									<div className="flex shrink-0 items-center">
										<BookOpenIcon className="block h-8 w-auto text-indigo-600 lg:hidden" />
										<BookOpenIcon className="hidden h-8 w-auto text-indigo-600 lg:block" />

									</div>
									<div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
										{navigation.map((item) => (
											<a
												key={item.name}
												href={item.href}
												aria-current={item.current ? 'page' : undefined}
												className={cn(
													item.current
														? 'border-indigo-500 text-gray-900'
														: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
													'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium',
												)}
											>
												{item.name}
											</a>
										))}
									</div>
								</div>
								<div className="hidden sm:ml-6 sm:flex sm:items-center">
									<button
										type="button"
										className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
									>
										<span className="absolute -inset-1.5" />
										<span className="sr-only">View notifications</span>
										<BellIcon aria-hidden="true" className="size-6" />
									</button>

									{/* Profile dropdown */}
									<Menu as="div" className="relative ml-3">
										<div>
											<MenuButton className="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
												<span className="absolute -inset-1.5" />
												<span className="sr-only">Open user menu</span>
												<Image alt="" src="/dan.png" width={32} height={32} className="size-8 rounded-full" />
											</MenuButton>
										</div>
										<MenuItems
											transition
											className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black transition focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
										>
											{userNavigation.map((item) => (
												<MenuItem key={item.name}>
													<a href={item.href} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
														{item.name}
													</a>
												</MenuItem>
											))}
										</MenuItems>
									</Menu>
								</div>
								<div className="-mr-2 flex items-center sm:hidden">
									{/* Mobile menu button */}
									<DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
										<span className="absolute -inset-0.5" />
										<span className="sr-only">Open main menu</span>
										<Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
										<XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
									</DisclosureButton>
								</div>
							</div>
						</div>

						<DisclosurePanel className="sm:hidden">
							<div className="space-y-1 pb-3 pt-2">
								{navigation.map((item) => (
									<DisclosureButton
										key={item.name}
										as="a"
										href={item.href}
										aria-current={item.current ? 'page' : undefined}
										className={cn(
											item.current
												? 'border-indigo-500 bg-indigo-50 text-indigo-700'
												: 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800',
											'block border-l-4 py-2 pl-3 pr-4 text-base font-medium',
										)}
									>
										{item.name}
									</DisclosureButton>
								))}
							</div>
							<div className="border-t border-gray-200 pb-3 pt-4">
								<div className="flex items-center px-4">
									<div className="shrink-0">
										<Image alt="" src="/dan.png" width={40} height={40} className="size-10 rounded-full" />
									</div>
									<div className="ml-3">
										<div className="text-base font-medium text-gray-800">{user.name}</div>
										<div className="text-sm font-medium text-gray-500">{user.email}</div>
									</div>
									<button
										type="button"
										className="relative ml-auto shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
									>
										<span className="absolute -inset-1.5" />
										<span className="sr-only">View notifications</span>
										<BellIcon aria-hidden="true" className="size-6" />
									</button>
								</div>
								<div className="mt-3 space-y-1">
									{userNavigation.map((item) => (
										<DisclosureButton
											key={item.name}
											as="a"
											href={item.href}
											className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
										>
											{item.name}
										</DisclosureButton>
									))}
								</div>
							</div>
						</DisclosurePanel>
					</Disclosure>

					<div className="py-4">
						<main>
							<div className="mx-auto max-w-7xl px-4">{children}</div>
						</main>
					</div>
				</div>
			</body>
		</html>
	);
}
