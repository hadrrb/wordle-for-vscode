/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import { WordleProvider } from './wordle';

export async function pick_language(wordlePrivider: WordleProvider){
    type wordleType = {
        [key: string]: string
    };

    const wordles: wordleType = {
        "English": "https://www.powerlanguage.co.uk/wordle/",
        "German": "https://wordle.uber.space",
        "German (Austria)": "https://wordle.at",
        "French": "https://wordle.louan.me",
        "Polish (literalnie)": "https://literalnie.fun",
        "Polish (słowoku)": "https://www.kurnik.pl/slowoku/",
        "Spanish": "https://wordle.danielfrg.com",
        "Italian": "https://sebastianomorando.github.io/wordle-it/",
        "Portuguese": "https://term.ooo",
        "Swedish": "https://ordlig.se",
        "Arabic": "https://arwordle.netlify.app",
        "Russian": "https://wordle.belousov.one",
        "Mathematics": "https://nerdlegame.com"
    };
    
    const lang = await vscode.window.showQuickPick(Object.keys(wordles),{
        placeHolder: "Pick a language",
        title: "Wordle Language"
    });
    if(lang){
        let link = wordles[lang];
        if (link){
            wordlePrivider.changeLanguage(link);
        }
        
    }
    
}