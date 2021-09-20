const { build } = require("esbuild")
const chokidar = require("chokidar")
const liveServer = require("live-server")
const aliasPlugin = require('esbuild-plugin-path-alias');
const path = require('path');
const 

;(async () => {
	const builder = await build({
		bundle: true,
		format: "iife",
		define: { "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development") },
		entryPoints: ["src/corsac-engine.js"],
		incremental: true,
		minify: false,
		sourcemap: true,
		target: ['chrome93'],
		plugins: [aliasPlugin({
			'@': path.resolve(__dirname, "../src"),
			'#': path.resolve(__dirname, "../src/core")
		})],
		outfile: "public/script.js",
	})
	liveServer.start({
		open: true,
		port: +process.env.PORT || 8080,
		root: "public",
	})
	chokidar
		.watch("src", {
			interval: 0,
		})
		.on("all", () => {
			builder.rebuild()
		})
})()