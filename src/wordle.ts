import * as vscode from 'vscode';

export class WordleProvider implements vscode.WebviewViewProvider {

    private _view?: vscode.WebviewView;

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

    private _getHtmlForWebview(wordleLink = "https://www.powerlanguage.co.uk/wordle/") {
        return `<!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta http-equiv="Content-Security-Policy" content="default-src https:;">
            <title>Page Title</title>
        
        </head>
        <body>
            <iframe src="${wordleLink}" height="600" width="100%" scrolling="no" frameborder="0" wmode="transparent"></iframe> 
        </body>
        </html>`;
    }

    public changeLanguage(link: string){
        if (this._view) {
            this._view.webview.html = this._getHtmlForWebview(link);
        }
    }

}