import * as vscode from 'vscode';

export class WordleProvider implements vscode.WebviewViewProvider {

    public async resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	) {
		webviewView.webview.options = {
			// Allow scripts in the webview
			enableScripts: true,
		};

		webviewView.webview.html = this._getHtmlForWebview();
	}

    private _getHtmlForWebview(){
        return `<!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta http-equiv="Content-Security-Policy" content="default-src https:;">
            <title>Page Title</title>
        
        </head>
        <body>
            <iframe src="https://www.powerlanguage.co.uk/wordle/" height="600" width="100%" scrolling="no" frameborder="0" wmode="transparent"></iframe> 
        </body>
        </html>`;
    }

}