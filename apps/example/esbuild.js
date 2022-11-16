const esbuild = require("esbuild");

const checkExternalPlugin = {
  name: "checkExternal",
  setup(build) {
    build.onResolve({ filter: /.*/ }, async (args) => {
      console.log(args.path);
      return {};
    });
  },
};
esbuild.build({
  bundle: true,
  plugins: [checkExternalPlugin],
  entryPoints: ["index.ts"],
  outdir: "build",
});
