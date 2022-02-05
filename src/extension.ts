// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { pick_language } from './pick_language';
import { WordleProvider } from './wordle';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	let wordleProvider = new WordleProvider();
	let wordle = vscode.window.registerWebviewViewProvider("wordle-view", wordleProvider);

	vscode.commands.registerCommand("wordle.change-language", () => pick_language(wordleProvider));

	context.subscriptions.push(wordle);
}

// this method is called when your extension is deactivated
export function deactivate() {}
