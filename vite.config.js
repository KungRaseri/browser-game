/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import dotenv from "dotenv";

dotenv.config();

/** @type {import('vite').UserConfig} */
const config = defineConfig({
	build: {
		sourcemap: true
	},
	plugins: [
		sveltekit(),
		purgeCss()
	],
	server: {
		port: 3000
	},
	preview: {
		port: 4173
	},
	optimizeDeps: {
		include: [
			'@mdi/js',
			'@skeletonlabs/skeleton'
		]
	}
})

export default config;