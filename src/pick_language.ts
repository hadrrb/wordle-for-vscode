/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import { WordleProvider } from './wordle';

type wordleType = {
    [key: string]: string
};

export const wordles: wordleType = {
    "English": "https://mikhad.github.io/wordle/#daily",
    "English 4 words": "https://www.quordle.com/#/",
    "German": "https://wordle.at",
    "French": "https://wordle.louan.me",
    "Polish": "https://www.kurnik.pl/slowoku/",
    "Spanish": "https://wordle.danielfrg.com",
    "Italian": "https://sebastianomorando.github.io/wordle-it/",
    "Portuguese": "https://term.ooo",
    "Swedish": "https://ordlig.se",
    "Danish": "https://www.wørdle.dk",
    "Arabic": "https://arwordle.netlify.app",
    "Russian": "https://wordle.belousov.one",
    "Mathematics": "https://nerdlegame.com"
};

export async function pick_language(wordleProvider: WordleProvider) {
    
    const lang = await vscode.window.showQuickPick(Object.keys(wordles),{
        placeHolder: "Pick a language",
        title: "Wordle Language"
    });
    if(lang){
        vscode.workspace.getConfiguration("wordle").update("defaultLang", lang, true);
        wordleProvider.reload();
    }
    
}