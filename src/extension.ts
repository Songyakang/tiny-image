// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

import * as vscode from 'vscode';
import tinify from 'tinify';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "tinyimage" is now active!',);

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand('tinyimage.helloWorld', async (url) => {
    
    
    if (context.globalState.get('tinykey')) {
      tinify.key = context.globalState.get('tinykey') || "";
    } 
    console.log(url);
    if (url?.path) {
      console.log(url);
      try {
        await tinify.fromFile(url.path).toFile(url.path);
        vscode.window.showInformationMessage('图片压缩完毕');
      } catch (err) {
        console.log(err);
      }

    }
  });

  const init = vscode.commands.registerCommand('tinyimage.tinysetkey', () => {
    vscode.window.showInputBox({
      prompt: '请输入tinykey',
      placeHolder: 'tinykey',
      value: context.globalState.get('tinykey')
    }).then(value => {
      if (value) {
        context.globalState.update('tinykey', value);
        vscode.window.showInformationMessage('tinykey 设置完毕: key为: ' + context.globalState.get('tinykey'));
      }
    });
  });

  
  context.subscriptions.push(disposable);
  context.subscriptions.push(init);
}

// This method is called when your extension is deactivated
export function deactivate() { }