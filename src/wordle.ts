import * as vscode from 'vscode';
import { pick_language, wordles } from './pick_language';

export class WordleProvider implements vscode.WebviewViewProvider {

    private _view?: vscode.WebviewView;

    constructor(){
        let lang = vscode.workspace.getConfiguration("wordle").get<string>("defaultLang");
        this.setLang(lang);
    }

    public setLang(lang: string | undefined){
        if(lang){
            return wordles[lang];
        } else {
            return wordles["English"];
        }
    }

    public async resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	) {
        this._view = webviewView;        
		webviewView.webview.options = {
			enableScripts: true,
		};

		webviewView.webview.html = this._getHtmlForWebview();
	}

    private _getHtmlForWebview() {
        let link = this.setLang(vscode.workspace.getConfiguration("wordle").get<string>("defaultLang"));
        let height = vscode.workspace.getConfiguration("wordle").get<string>("height");
        let width = vscode.workspace.getConfiguration("wordle").get<string>("width");
        return `<!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta http-equiv="Content-Security-Policy" content="default-src http:;">
            <title>Wordle</title>
        
        </head>
        <body>
            <iframe src="${link}" height="${height}" width="${width}" scrolling="no" frameborder="0" wmode="transparent"></iframe> 
        </body>
        </html>`;
    }

    public reload(){
        if (this._view) {
            this._view.webview.html = this._getHtmlForWebview();
        }
    }

    public changeHeight(change: number){
        let height = vscode.workspace.getConfiguration("wordle").get<number>("height");
        if(height){
            height = height + change;
            vscode.workspace.getConfiguration("wordle").update("height", height, true);
            this.reload();
        }
    }

}