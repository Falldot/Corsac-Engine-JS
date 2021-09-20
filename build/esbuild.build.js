require("esbuild").buildSync({
	bundle: true,
	format: "iife",
	define: { "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development") },
	entryPoints: ["src/corsac-engine.js"],
	minify: true,
	sourcemap: true,
	target: ['chrome93'],
	plugins: [aliasPlugin({
		'@': path.resolve(__dirname, "../src"),
		'#': path.resolve(__dirname, "../src/core")
	})],
	outfile: "dist/corsac-engine.js",
})