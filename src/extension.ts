// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { pick_language } from "./pick_language";
import { WordleProvider } from "./wordle";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let wordleProvider = new WordleProvider();
  let wordle = vscode.window.registerWebviewViewProvider(
    "wordle-view",
    wordleProvider
  );

  let change = vscode.commands.registerCommand("wordle.change-language", () =>
    pick_language(wordleProvider)
  );
  let add = vscode.commands.registerCommand("wordle.height-add", () =>
    wordleProvider.changeHeight(10)
  );
  let remove = vscode.commands.registerCommand("wordle.height-min", () =>
    wordleProvider.changeHeight(-10)
  );

  context.subscriptions.push(wordle);
  context.subscriptions.push(change);
  context.subscriptions.push(add);
  context.subscriptions.push(remove);
}

// this method is called when your extension is deactivated
export function deactivate() {}
