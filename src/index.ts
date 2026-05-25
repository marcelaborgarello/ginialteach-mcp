import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const server = new McpServer({
  name: "ginialtech-mcp",
  version: "1.0.0",
});

// Tool: get project context
server.tool(
  "get_project_context",
  "Reads AI_CONTEXT.md from the current project and returns its contents",
  { project_path: z.string().describe("Absolute path to the project root") },
  async ({ project_path }) => {
    const paths = [
      join(project_path, "AI_CONTEXT.md"),
      join(project_path, "docs", "AI_CONTEXT.md")
    ];

    for (const contextPath of paths) {
      if (existsSync(contextPath)) {
        const content = readFileSync(contextPath, "utf-8");
        return { content: [{ type: "text", text: content }] };
      }
    }

    return { content: [{ type: "text", text: "AI_CONTEXT.md not found in this project." }] };
  }
);

// Tool: get protected files
server.tool(
  "get_protected_files",
  "Returns the list of files that should never be modified without explicit confirmation",
  {},
  async () => {
    const protected_files = [
      "next.config.ts",
      "tailwind.config.ts",
      "tsconfig.json",
      "prisma/schema.prisma",
      ".env",
      ".env.local",
      ".env.production",
      "package.json",
    ];
    return {
      content: [{
        type: "text",
        text: `Protected files — confirm with user before modifying:\n${protected_files.map(f => `- ${f}`).join("\n")}`
      }]
    };
  }
);

// Tool: validate conventions
server.tool(
  "validate_conventions",
  "Returns the mandatory conventions for all GINIALTECH projects",
  {},
  async () => {
    return {
      content: [{
        type: "text",
        text: `GINIALTECH conventions:
- Package manager: bun ONLY. Never use npm, npx, yarn or pnpm.
- Terminal: Always use Git Bash exclusively for executing commands. Never use PowerShell or CMD.
- All code and comments must be in English.
- All plans, tasks and communication with Marcela must be in Spanish.
- Always plan before executing.
- Never modify protected files without explicit confirmation.`
      }]
    };
  }
);

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);
