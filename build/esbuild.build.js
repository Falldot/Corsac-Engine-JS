const path = require('path');
const { build } = require("esbuild")
const aliasPlugin = require('esbuild-plugin-path-alias');

// ECS
build({
	bundle: true,
	platform: "node",
	define: { "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development") },
	entryPoints: ["src/ECS/index.js"],
	minify: true,
	target: ['node16.9'],
	plugins: [aliasPlugin({
		'@': path.resolve(__dirname, "../src"),
		'#': path.resolve(__dirname, "../src/core")
	})],
	outfile: "private/modules/ecs.js",
})