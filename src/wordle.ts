import * as vscode from 'vscode';
import { pick_language, wordles } from './pick_language';

export class WordleProvider implements vscode.WebviewViewProvider {

    private _view?: vscode.WebviewView;
    private height: number = 600;
    private wordleLink!: string;

    constructor(){
        let lang = vscode.workspace.getConfiguration("wordle").get<string>("defaultLang");
        this.setLang(lang);
    }

    public setLang(lang: string | undefined){
        if(lang){
            this.wordleLink = wordles[lang];
        } else {
            this.wordleLink = wordles["English"];
        }
        if (this._view) {
            this._view.webview.html = this._getHtmlForWebview();
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
        let width = vscode.workspace.getConfiguration("wordle").get<string>("width");
        return `<!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta http-equiv="Content-Security-Policy" content="default-src https:;">
            <title>Wordle</title>
        
        </head>
        <body>
            <iframe src="${this.wordleLink}" height="${this.height}" width="${width}" scrolling="no" frameborder="0" wmode="transparent"></iframe> 
        </body>
        </html>`;
    }

    public changeLanguage(link: string){
        this.wordleLink = link;
        if (this._view) {
            this._view.webview.html = this._getHtmlForWebview();
        }
    }

    public changeHeight(value: number){
        this.height = this.height + value;
        if (this._view) {
            this._view.webview.html = this._getHtmlForWebview();
        }
    }

}