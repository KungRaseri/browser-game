import type { ServerLoad } from "@sveltejs/kit";

const mainMenuLinks = [
	{
		name: 'Home',
		href: '/',
	},
	{
		name: 'Wiki',
		href: '/wiki'
	},
	{
		name: 'Forums',
		href: '/forums',
	},
	{
		name: 'Game',
		href: '/game',
	},
	{
		name: 'Admin',
		href: '/admin',
		requiredRole: "ADMINISTRATOR"
	}
];

const userMenuLinks = [
	{
		name: 'Account',
		href: '/account',
	},
	{
		name: 'Admin',
		href: '/admin',
		requiredRole: "ADMINISTRATOR"
	}
];

export const load: ServerLoad = async function ({ locals }) {
	return {
		account: locals.account,
		mainMenuLinks: mainMenuLinks,
		userMenuLinks: userMenuLinks
	}
}