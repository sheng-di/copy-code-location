// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const disposable = vscode.commands.registerCommand('copy-code-location.copycode', () => {

		// Get the full file path using fsPath (as we discussed earlier)
		const filePath = vscode.window.activeTextEditor.document.uri.fsPath;

		// Extract the filename with extension using 'path.basename'
		const fileNameWithExtension = require('path').basename(filePath);

		// Regular copy, then edit clipboard
		vscode.commands.executeCommand('editor.action.clipboardCopyAction').then(async () => {
			const clipboardContent = await vscode.env.clipboard.readText();

			vscode.env.clipboard.writeText(`\`\`\`${fileNameWithExtension}\n${clipboardContent}\n\`\`\``);
		});
	});

	context.subscriptions.push(disposable);
}

//exports.activate = activate;

function deactivate() { }

module.exports = {
	activate,
	deactivate
};
