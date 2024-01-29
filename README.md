## Reproduction:

```
npm i
node server.mjs
```

## Error:

![error screenshot](https://github.com/jantimon/reproduction-webpack-import-module-bug/assets/4113649/17735e8e-5b63-4619-ba17-cb378ee73be8)


## Reason:

`./loader.cjs` uses the Webpack loader API `this.importModule` which invokes `vm.runInThisContext` to execute the module code.

However, as soon as the `package.json` file includes `"type": "module"` `vm.runInThisContext` does not have access to `require` and `module` anymore.


## Possible fix:

Add `require` and `module` to compilation.hooks.executeModule.tap(PLUGIN_NAME, (options, context) => { ... }):

```diff
diff --git a/node_modules/webpack/lib/javascript/JavascriptModulesPlugin.js b/node_modules/webpack/lib/javascript/JavascriptModulesPlugin.js
index 4249a2f..31cd251 100644
--- a/node_modules/webpack/lib/javascript/JavascriptModulesPlugin.js
+++ b/node_modules/webpack/lib/javascript/JavascriptModulesPlugin.js
@@ -441,8 +441,11 @@ class JavascriptModulesPlugin {
 					const { module, moduleObject } = options;
 					const code = source.source();
 
+					const {createRequire} = require("module");
+					const universalRequire = typeof createRequire === "function" ? createRequire(module.resource) : require;
+
 					const fn = vm.runInThisContext(
-						`(function(${module.moduleArgument}, ${module.exportsArgument}, ${RuntimeGlobals.require}) {\n${code}\n/**/})`,
+						`(function(${module.moduleArgument}, ${module.exportsArgument}, ${RuntimeGlobals.require}, require, module) {\n${code}\n/**/})`,
 						{
 							filename: module.identifier(),
 							lineOffset: -1
@@ -453,7 +456,9 @@ class JavascriptModulesPlugin {
 							moduleObject.exports,
 							moduleObject,
 							moduleObject.exports,
-							context.__webpack_require__
+							context.__webpack_require__,
+							universalRequire,
+							moduleObject
 						);
 					} catch (e) {
 						e.stack += printGeneratedCodeForStack(
```