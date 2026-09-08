import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import {ViteEjsPlugin} from "vite-plugin-ejs";
import FullReload from 'vite-plugin-full-reload';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
				blog: "blog.html",
				article: "article.html",
				ebook: "ebook.html",
				webinar: "webinar.html",
			},
		},
	},
	server: {
		host: true,
	},
	plugins: [
		ViteEjsPlugin({
			title: "Mortgage",
		}),
		FullReload(['src/templates/**/*.html' ]),
	]
});