## 🧩 TL;DR

This is a deception-based honeypot built using Cloudflare Workers and Model Context Protocol (MCP). It simulates sensitive admin tools (like Okta password reset) and silently triggers Canarytokens when accessed — ideal for Zero Trust, AI security, and threat detection research.

## 💡 Why It Matters

- ✅ First-of-its-kind use of MCP as a deception honeypot
- 🧠 Detects unauthorized AI agent behavior in Zero Trust environments
- 🌍 Serverless, globally distributed, and stealthy
- 🎯 Easy to deploy, integrate, and extend


````markdown
# 🛡️ Deception Remote MCP Server - AI-Powered Honeypot on Cloudflare Workers

[![Deploy to Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/harshadk99/deception-remote-mcp-server)
![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/github/v/tag/harshadk99/deception-remote-mcp-server)
![Deception](https://img.shields.io/badge/canary-triggered-yellow)

A serverless honeypot built using Cloudflare Workers and the Model Context Protocol (MCP). It simulates internal Okta admin tools to detect unauthorized access attempts using Canarytokens.

---

## 🚀 Deploy Your Own

[![Deploy to Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/harshadk99/deception-remote-mcp-server)

Or deploy manually:

```bash
npm install -g wrangler
wrangler login
wrangler publish
````

Your MCP server will be deployed to:

```
https://deception-remote-mcp-server.<your-account>.workers.dev
```

---

## 🔧 Features

* `okta_admin_password_reset`: simulates admin reset of any user's password
* `ask_about_me`: conversational Q\&A based on Harshad’s resume
* `welcome`: randomized assistant-style greeting
* Canarytoken integration for silent tripwire detection
* REST and SSE endpoints supported

---

## 🧪 Test It with CURL

```bash
curl -X POST https://deception-remote-mcp-server.<your-account>.workers.dev/okta_admin_password_reset \
  -H "Content-Type: application/json" \
  -d '{"okta_username": "admin"}'
```

Expected response:

```
✅ Password reset successfully initiated for user "admin".
A recovery email has been sent...
Reference ID: OKTA-ADM-xxxxx
```

---

## 📡 Connect to Cloudflare AI Playground

1. Go to [https://playground.ai.cloudflare.com](https://playground.ai.cloudflare.com)
2. Enter your MCP endpoint:

   ```
   https://deception-remote-mcp-server.<your-account>.workers.dev/sse
   ```
3. Test tools like `welcome`, `ask_about_me`, and `okta_admin_password_reset`

---

## 🧑‍💼 Interactive Resume Mode

The MCP server doubles as a resume-powered AI honeypot. When users visit the homepage:

* They see an HTML page styled like a portfolio landing site
* It links to your GitHub, LinkedIn, blog, and public resume
* It includes a button to chat with the AI bot via MCP
* Use this as your AI-powered resume page to showcase engineering and security expertise while embedding deception engineering as a live demo.


🔗 Live example:
[https://deception-remote-mcp-server.harshad-surfer.workers.dev/](https://deception-remote-mcp-server.harshad-surfer.workers.dev/)

---

## 🧠 Try These MCP Tool Prompts

Test out tools using Cloudflare’s AI Playground or any MCP-compatible interface:

### 🟢 `welcome` tool

```bash
use tool welcome with { }
```

> Displays a randomized assistant-style welcome message to mimic an internal tool dashboard.

---

### 🧑‍💼 `ask_about_me` tool

```bash
use tool ask_about_me with { "question": "What are you working on?" }
use tool ask_about_me with { "question": "Are you AWS certified?" }
use tool ask_about_me with { "question": "Tell me about Harshad Kadam" }
```

> Ask questions based on Harshad’s resume, background, certifications, skills, or leadership.

---

### 🔐 `okta_admin_password_reset` tool

```bash
use tool okta_admin_password_reset with { "okta_username": "admin_user" }
```

> Simulates an internal password reset function and silently triggers a Canarytoken to detect misuse.

---

These prompts simulate what an internal admin or AI assistant might attempt — and let you observe how your fake tools handle the interaction.

---

## 📄 License

MIT – for educational and research use only.



