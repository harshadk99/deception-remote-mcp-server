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
			"Good to see you. What can I help you with today?",
			"🛠️ Hello Admin. Are you ready to explore different tools?",
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


// 🧠 Interactive Q&A about Harshad
this.server.tool(
	"ask_about_me",
	{
	  question: z.string().describe("Ask a question to learn about Harshad Kadam’s background, skills, roles, or projects."),
	},
	async ({ question }) => {
	  const q = question.toLowerCase();
  
	  let answer = "🤔 Sorry, I couldn't find an answer to that. Try asking about projects, experience, skills, or education.";
  
	  if (q.includes("tell me about") || q.includes("who is") || q.includes("introduce") || q.includes("about harshad")) {
		answer = `👋 Hi, I’m Harshad Kadam — a Senior Infrastructure Security Engineer based in Austin, TX with 9+ years of experience in network security, cloud infrastructure, and zero trust. I’ve led global teams, built scalable architectures in AWS, and currently drive innovation in deception engineering using Cloudflare MCP.`;
	  } else if (q.includes("current project") || q.includes("working on")) {
		answer = `🚀 I'm working on a deception honeypot detection system using Cloudflare MCP, combining fake admin tools, Canarytokens, and Zero Trust enforcement.`;
	  } else if (q.includes("company") || q.includes("work") || q.includes("employer")) {
		answer = `🏢 I work at Indeed Inc. as a Senior Infrastructure Security Engineer based in Austin, TX.`;
	  } else if (q.includes("experience")) {
		answer = `📈 I have 9+ years of experience in network security, cloud infrastructure, and production datacenter operations — progressing from Network Engineer to Security Tech Lead.`;
	  } else if (q.includes("okta")) {
		answer = `🔐 I’ve worked on Okta SSO, SCIM provisioning, AWS Workspaces integration, and Cloudflare Access controls.`;
	  } else if (q.includes("cloudflare")) {
		answer = `🌐 I’ve led Zero Trust and RBI rollouts using Cloudflare Access, including MCP deception engineering and policy enforcement.`;
	  } else if (q.includes("aws")) {
		answer = `☁️ I've designed multi-region AWS production networks, implemented AWS Network Firewall, and built secure onboarding for third-party contractors.`;
	  } else if (q.includes("skills") || q.includes("tools") || q.includes("technologies")) {
		answer = `🛠️ Tools/Skills: AWS, Okta, Cloudflare, Terraform, Python, CrowdStrike, Splunk, Datadog, Palo Alto, Aviatrix.`;
	  } else if (q.includes("certification") || q.includes("certified")) {
		answer = `📜 Certified in CISM, AWS Solutions Architect Associate, Terraform, Aviatrix, CCNA, and CCNP.`;
	  } else if (q.includes("education") || q.includes("degree")) {
		answer = `🎓 I have an MS in Networking Security & System Admin from Rochester Institute of Technology (GPA: 3.96).`;
	  } else if (q.includes("leadership") || q.includes("manager") || q.includes("team")) {
		answer = `👥 I’ve led cloud and security engineering teams, managed global projects, and driven mentorship and OKRs for strategic security programs.`;
	  } else if (q.includes("community") || q.includes("mentorship") || q.includes("asian") || q.includes("inclusion")) {
		answer = `🌏 I lead the AI-Champions Guild (450+ members), support DEIB+ through Indeed’s iBRGs, and was a Brand Ambassador for internal culture-building.`;
	  } else if (q.includes("salary") || q.includes("compensation") || q.includes("how much") || q.includes("pay")) {
		answer = `💰 I prefer not to disclose salary details. Feel free to ask about skills, tools, or achievements instead.`;
	  }
  
	  return {
		content: [
		  {
			type: "text",
			text: answer,
		  },
		],
	  };
	},
	{
	  description: "Ask about Harshad’s skills, projects, background, education, leadership, or certifications.",
	}
  );
  
  

// 🪤 Okta admin password reset honepot
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