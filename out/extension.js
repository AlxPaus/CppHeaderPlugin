"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);
var vscode = __toESM(require("vscode"));
var fs = __toESM(require("fs"));
var path = __toESM(require("path"));
function activate(context) {
  const disposable = vscode.commands.registerCommand("extension.CreateHeaderFile", async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage("\u041D\u0435\u0442 \u043E\u0442\u043A\u0440\u044B\u0442\u043E\u0433\u043E \u0444\u0430\u0439\u043B\u0430 \u0434\u043B\u044F \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u0447\u043D\u043E\u0433\u043E \u0444\u0430\u0439\u043B\u0430.");
      return;
    }
    const filePath = editor.document.fileName;
    if (path.extname(filePath) !== ".cpp") {
      vscode.window.showErrorMessage("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 .cpp \u0444\u0430\u0439\u043B.");
      return;
    }
    const fileContent = editor.document.getText();
    const includeRegex = /#include\s+<[^>]+>/g;
    const includes = fileContent.match(includeRegex) || [];
    const functionRegex = /([a-zA-Z_][a-zA-Z0-9_:\s*&]+)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)\s*\{/g;
    const declarations = [];
    let match;
    while ((match = functionRegex.exec(fileContent)) !== null) {
      const returnType = match[1].trim();
      const functionName = match[2].trim();
      const parameters = match[3].trim();
      const declaration = `${returnType} ${functionName}(${parameters});`;
      declarations.push(declaration);
    }
    if (declarations.length === 0) {
      vscode.window.showWarningMessage("\u041D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u0444\u0443\u043D\u043A\u0446\u0438\u0439 \u0434\u043B\u044F \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u044F.");
      return;
    }
    const headerFilePath = filePath.replace(/\.cpp$/, ".h");
    const headerFileContent = [
      ...includes,
      "",
      ...declarations,
      ""
    ].join("\n");
    fs.writeFile(headerFilePath, headerFileContent, (err) => {
      if (err) {
        vscode.window.showErrorMessage("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0438 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u0447\u043D\u043E\u0433\u043E \u0444\u0430\u0439\u043B\u0430.");
        return;
      }
      vscode.window.showInformationMessage(`\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u0447\u043D\u044B\u0439 \u0444\u0430\u0439\u043B \u0441\u043E\u0437\u0434\u0430\u043D: ${headerFilePath}`);
    });
  });
  context.subscriptions.push(disposable);
}
function deactivate() {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
//# sourceMappingURL=extension.js.map
