## Reproduction:

```
npm i
npm run dev
```

## Error:

![error screenshot](https://github.com/jantimon/reproduction-webpack-import-module-bug/assets/4113649/9b92e39b-d4a4-445a-bfd4-de3a4e2652e8)

## Reason:

`./loader.cjs` uses the Webpack loader API `this.importModule` which invokes `vm.runInThisContext` to execute the module code.

However, as soon as the `package.json` file includes `"type": "module"` `vm.runInThisContext` does not have access to `require` and `module` anymore.


## Possible fix:

the proposed fix from https://github.com/webpack/webpack/issues/18023
