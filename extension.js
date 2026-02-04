// The module 'vscode' contains the VS Code extensibility API
const vscode = require('vscode');
const path = require('path');

/**
 * Get the relative path from the workspace folder to the file
 * @param {string} filePath - The absolute file path
 * @returns {string} - The relative path from workspace root
 */
function getRelativePath(filePath) {
	const workspaceFolders = vscode.workspace.workspaceFolders;

	if (!workspaceFolders || workspaceFolders.length === 0) {
		// No workspace, return just the filename
		return path.basename(filePath);
	}

	// Find which workspace folder contains this file
	for (const folder of workspaceFolders) {
		const folderPath = folder.uri.fsPath;
		if (filePath.startsWith(folderPath)) {
			// Get the relative path from this workspace folder
			let relativePath = path.relative(folderPath, filePath);
			// Normalize to forward slashes for consistency
			relativePath = relativePath.split(path.sep).join('/');
			return relativePath;
		}
	}

	// File is not in any workspace folder, return just the filename
	return path.basename(filePath);
}

/**
 * Get the line range string for the selection
 * @param {vscode.Selection} selection - The editor selection
 * @returns {string} - The line range in format "startLine-endLine"
 */
function getLineRange(selection) {
	// VS Code lines are 0-indexed, we want 1-indexed for display
	const startLine = selection.start.line + 1;
	const endLine = selection.end.line + 1;
	return `${startLine}-${endLine}`;
}

/**
 * Copy code with path and line numbers
 * @param {boolean} useAbsolutePath - Whether to use absolute path or relative path
 */
async function copyCodeWithPath(useAbsolutePath) {
	const editor = vscode.window.activeTextEditor;

	if (!editor) {
		vscode.window.showWarningMessage('No active editor');
		return;
	}

	const document = editor.document;
	const selection = editor.selection;
	const filePath = document.uri.fsPath;

	// Get the selected text
	const selectedText = document.getText(selection);

	if (!selectedText) {
		vscode.window.showWarningMessage('No text selected');
		return;
	}

	// Determine the path to use
	const displayPath = useAbsolutePath ? filePath : getRelativePath(filePath);

	// Get line range
	const lineRange = getLineRange(selection);

	// Format the output
	const formattedContent = `${displayPath}:${lineRange}\n\`\`\`\n${selectedText}\n\`\`\``;

	// Copy to clipboard
	await vscode.env.clipboard.writeText(formattedContent);

	// Show subtle status bar notification
	const pathType = useAbsolutePath ? 'absolute' : 'relative';
	const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1000);
	statusBarItem.text = `$(check) Copied with ${pathType} path`;
	statusBarItem.show();
	setTimeout(() => statusBarItem.dispose(), 2000);
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// Register relative path copy command
	const copyRelativeDisposable = vscode.commands.registerCommand(
		'copy-code-location.copyRelative',
		() => copyCodeWithPath(false)
	);

	// Register absolute path copy command
	const copyAbsoluteDisposable = vscode.commands.registerCommand(
		'copy-code-location.copyAbsolute',
		() => copyCodeWithPath(true)
	);

	context.subscriptions.push(copyRelativeDisposable);
	context.subscriptions.push(copyAbsoluteDisposable);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
};
