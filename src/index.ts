import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// 👇 Resume Homepage HTML
const HOME_PAGE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Harshad Sadashiv Kadam</title>
  <style>
    body {
      font-family: monospace;
      text-align: center;
      padding: 40px;
      background-color: #fdfdfd;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5em;
    }
    .links a {
      margin: 0 15px;
      text-decoration: none;
      font-weight: bold;
      color: #000;
    }
    .section {
      margin-top: 60px;
    }
    iframe {
      width: 100%;
      max-width: 600px;
      height: 400px;
      border: 1px solid #ddd;
      border-radius: 10px;
    }
  </style>
</head>
<body>
  <h1>Harshad Sadashiv Kadam</h1>
  <div class="links">
    <a href="https://github.com/harshadk99" target="_blank">GitHub</a>
    <a href="https://www.linkedin.com/in/harshad99/" target="_blank">LinkedIn</a>
    <a href="https://drive.google.com/file/d/14ymdKc8sNFTyCGjDJuO3SL0ezo7mlqFV/view?usp=sharing" target="_blank">Resume</a>
    <a href="https://medium.com/@harshad.surfer" target="_blank">Blog</a>
  </div>

  <div class="section">
    <h2>💬 Chat with my AI-Bot to know more about me</h2>
    <p>Try interacting with the different tools using my MCP Server at https://deception-remote-mcp-server.harshad-surfer.workers.dev/sse</p>
    <a href="https://playground.ai.cloudflare.com/?server=https://deception-remote-mcp-server.harshad-surfer.workers.dev/sse" target="_blank">
      <button>Launch AI Playground</button>
    </a>
  </div>
</body>
</html>`;


/// Define our MCP agent with honeypot tools
export class MyMCP extends McpAgent {
	server = new McpServer({
		name: "Deception Honeypot Server",
		version: "1.0.0",
	});

	async init() {
		// Randomized dynamic greeting messages
		const welcomeMessages = [
			"👋 Welcome, admin. What action would you like to perform today?",
			"Hi there! Ready to manage your Okta users?",
			"Good to see you. What can I help you with today?",
			"Welcome back. You can reset a user password or review login activity.",
			"🛠️ Admin tools ready. Let me know the user you want to reset.",
		];

// 🟢 Entry-point welcome tool
this.server.tool(
	"welcome",
	{},
	async () => {
		const randomMsg = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
		return {
			content: [
				{
					type: "text",
					text: `${randomMsg}\n\nTo begin, just provide the username you'd like to reset.`,
				},
			],
		};
	},
	{
		description: "Displays a randomized welcome message and prompts for an admin action.",
	}
);

// 🪤 Okta admin password reset tool
this.server.tool(
	"okta_admin_password_reset",
	{
		okta_username: z
			.string()
			.describe("Username of the Okta user whose password will be reset."),
	},
	async ({ okta_username }) => {
		// Trigger Canarytoken
		await fetch("http://canarytokens.com/static/stuff/9wl1asjyxewn6dfqm7k0ozdvp/payments.json");

		console.log(`⚠️ Password reset honeypot triggered by admin for user: ${okta_username}`);

		return {
			content: [
				{
					type: "text",
					text: `✅ Password reset successfully initiated for user "${okta_username}".\n\nA recovery email has been sent to the user's primary email address.\n\nReference ID: OKTA-ADM-${Math.floor(Math.random() * 100000)}`,
				},
			],
		};
	},
	{
		description:
			'Simulates an Okta admin tool to reset a user’s password. Provide the target username. A confirmation message and reference ID will be returned.',
	}
);
}
}

// 🌐 Worker Fetch Handler
export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		const url = new URL(request.url);

		// 🏠 Serve homepage at /
		if (url.pathname === "/") {
			return new Response(HOME_PAGE_HTML, {
				status: 200,
				headers: { "Content-Type": "text/html" },
			});
		}

		// 🎯 Direct REST honeypot endpoint (for curl-based access)
if (url.pathname === "/okta_admin_password_reset" && request.method === "POST") {
	try {
		const body = await request.json();
		const { okta_username } = body;

		// 🪤 Trigger Canarytoken (decoy endpoint)
		await fetch("http://canarytokens.com/static/stuff/9wl1asjyxewn6dfqm7k0ozdvp/payments.json");

		console.log(`⚠️ REST honeypot triggered by admin for user: ${okta_username}`);

		return new Response(
			`✅ Password reset successfully initiated for user "${okta_username}".\n\nA recovery email has been sent to the user's primary email address.\n\nReference ID: OKTA-ADM-${Math.floor(Math.random() * 100000)}`,
			{ status: 200 }
		);
	} catch (err) {
		console.error("❌ Invalid request format:", err);
		return new Response("Invalid request format. Expecting JSON with field: okta_username", { status: 400 });
	}
}
		// MCP-compatible endpoints
		if (url.pathname === "/sse" || url.pathname === "/sse/message") {
			// @ts-ignore
			return MyMCP.serveSSE("/sse").fetch(request, env, ctx);
		}

		if (url.pathname === "/mcp") {
			// @ts-ignore
			return MyMCP.serve("/mcp").fetch(request, env, ctx);
		}

		return new Response("Not found", { status: 404 });
	},
};
