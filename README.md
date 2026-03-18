# ginialtech-mcp

MCP (Model Context Protocol) server for GINIALTECH projects. Enforces conventions, protects critical files and provides project context to AI agents.

## Tools

### `get_project_context`
Reads `AI_CONTEXT.md` from the current project and returns its contents. Searches in the project root first, then in `docs/`.

### `get_protected_files`
Returns the list of files that should never be modified without explicit confirmation from the developer.

### `validate_conventions`
Returns the mandatory conventions for all GINIALTECH projects:
- Package manager: `bun` exclusively
- Code and comments: English
- Plans, tasks and communication: Spanish (Argentina)
- Always plan before executing
- Never modify protected files without confirmation

## Requirements

- [Bun](https://bun.sh) >= 1.0

## Installation

```bash
git clone https://github.com/marcelaborgarello/ginialtech-mcp
cd ginialtech-mcp
bun install
```

## Usage with Antigravity (Google AI Studio)

Add this to your `mcp_config.json` inside the `mcpServers` object:

```json
"ginialtech-mcp": {
  "$typeName": "exa.cascade_plugins_pb.CascadePluginCommandTemplate",
  "command": "/absolute/path/to/bun",
  "args": [
    "run",
    "/absolute/path/to/ginialtech-mcp/src/index.ts"
  ],
  "env": {}
}
```

> On Windows, use double backslashes: `C:\\Users\\youruser\\...`

To find your bun path:
```bash
which bun   # macOS/Linux
where bun   # Windows
```

## Usage with Claude Code / Cursor

Add to your MCP config:

```json
"ginialtech-mcp": {
  "command": "bun",
  "args": ["run", "/absolute/path/to/ginialtech-mcp/src/index.ts"]
}
```

## Project structure

```
ginialtech-mcp/
  src/
    index.ts    ← MCP server and tools
  package.json
  tsconfig.json
  README.md
```

## License

MIT — [GINIALTECH](https://ginialtech.com)
