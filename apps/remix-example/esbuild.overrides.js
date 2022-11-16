/* eslint-disable */
const esbuild = require(`esbuild`);
const Module = require(`module`);
const originalRequire = Module.prototype.require;
const originalBuild = esbuild.build;

const checkExternalPlugin = {
  name: "checkExternal",
  setup(build) {
    build.onResolve({ filter: /.*/ }, async (args) => {
      console.log(args.path);

      return {};
    });
  },
};
const build = (options) => {
  return originalBuild({
    ...options,
    // add in your overrides here, making sure to preserve original nested options., e.g.
    plugins: [...options.plugins, checkExternalPlugin],
  });
};

Module.prototype.require = function (id) {
  // when remix requires esbuild, it will get our modified build function from above
  if (id === `esbuild`) {
    return { ...esbuild, build };
  }
  return originalRequire.apply(this, arguments);
};
