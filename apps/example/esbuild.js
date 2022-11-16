const esbuild = require("esbuild");

const checkExternalPlugin = {
  name: "checkExternal",
  setup(build) {
    build.onLoad({ filter: /.*/ }, (args) => {
      if (args.path.includes("ui/index.tsx")) {
        console.info("==================================");
        console.info(
          "We have LOADED the UI local package with vanilla esbuild"
        );
        console.info("==================================");
        console.log("Loaded path = ", args.path);
      }
    });
    build.onResolve({ filter: /.*/ }, async (args) => {
      if (args.path === "ui") {
        console.info("==================================");
        console.info(
          "We have RESOLVED the UI local package with vanilla esbuild"
        );
        console.info("==================================");
        console.log("Resolved path = ", args.path);
      }
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
