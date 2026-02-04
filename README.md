# Copy Code Location

Copy selected code with file path and line numbers — optimized for sharing with LLMs.

## Features

Copy code with **relative path** or **absolute path**, including line number range:

**Relative path output:**
```
packages/client/src/client/streamableHttp.ts:221-224
```
// Try to open an initial SSE stream with GET to listen for server messages
// This is optional according to the spec - server may not support it
const headers = await this._commonHeaders();
headers.set('Accept', 'text/event-stream');
```
```

**Absolute path output:**
```
/Users/username/project/packages/client/src/client/streamableHttp.ts:221-224
```
// Try to open an initial SSE stream with GET to listen for server messages
// This is optional according to the spec - server may not support it
const headers = await this._commonHeaders();
headers.set('Accept', 'text/event-stream');
```
```

**Single line selection:**
```
packages/client/src/client/streamableHttp.ts:221-221
```
// Try to open an initial SSE stream with GET to listen for server messages
```
```

## Keyboard Shortcuts

| Command | Windows/Linux | Mac |
|---------|--------------|-----|
| Copy with Relative Path | `Ctrl+Alt+L` | `Ctrl+Alt+L` |
| Copy with Absolute Path | `Ctrl+Alt+Shift+L` | `Ctrl+Alt+Shift+L` |

## How It Works

- **Relative Path**: Calculates path from workspace root. Works correctly with multi-folder workspaces.
- **Absolute Path**: Uses the full file system path.
- **Line Numbers**: Automatically includes the line range of your selection.

## Use Cases

- Share code snippets with LLMs (ChatGPT, Claude, etc.)
- Create precise code references in documentation
- Quick code location sharing in team communication

**Enjoy!**