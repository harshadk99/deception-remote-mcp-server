# 🛡️ Deception Remote MCP Server - AI-Powered Honeypot

![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-1.1.0-blue)
![Security](https://img.shields.io/badge/security-honeypot-red)
![Model](https://img.shields.io/badge/MCP-compatible-blueviolet)

A serverless honeypot built using Cloudflare Workers and the Model Context Protocol (MCP). This project simulates sensitive internal tools to detect unauthorized access attempts and AI agent behaviors using Canarytokens.

## 🧩 TL;DR

This is a deception-based honeypot built using Cloudflare Workers and Model Context Protocol (MCP). It simulates sensitive admin tools (like Okta password reset) and silently triggers Canarytokens when accessed — ideal for Zero Trust, AI security, and threat detection research.

## 💡 Why It Matters

- ✅ First-of-its-kind use of MCP as a deception honeypot
- 🧠 Detects unauthorized AI agent behavior in Zero Trust environments
- 🌍 Serverless, globally distributed, and stealthy
- 🎯 Easy to deploy, integrate, and extend
- 🛡️ Provides valuable threat intelligence about AI agent behaviors

## 🔐 Security Features

- **Advanced Canarytoken Integration**: Enhanced tracking with User-Agent, IP, and interaction details
- **Rate Limiting**: Protection against brute force and DoS attempts
- **Sensitive Username Detection**: Special handling for admin, root, and other sensitive account access attempts
- **Realistic Response Delays**: Mimics real system behavior to appear legitimate
- **Enhanced Error Handling**: Secure error messages that don't reveal system details
- **Extended Logging**: Detailed logs of all interaction attempts

## 🚀 Deploy Your Own

[![Deploy to Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/harshadk99/deception-remote-mcp-server)

Or deploy manually:

```bash
# Install dependencies
npm install

# Deploy to Cloudflare Workers
npm run deploy
```

Your MCP server will be deployed to:

```
https://deception-remote-mcp-server.<your-account>.workers.dev
```

## 🔧 Tools & Features

* **`welcome`**: Displays a welcome message with information about available tools
* **`ask_about_me`**: Dynamic Q&A based on comprehensive resume data with 13+ question categories
* **`okta_admin_password_reset`**: Simulates admin reset of user passwords with special handling for sensitive accounts
* **Cybersecurity-themed UI**: Professional landing page with security-focused design
* **Auto-populating playground links**: One-click access to AI playground with your server pre-configured
* **REST and SSE endpoints**: Multiple access methods for broader coverage

## 🧪 Test It with CURL

```bash
curl -X POST https://deception-remote-mcp-server.<your-account>.workers.dev/okta_admin_password_reset \
  -H "Content-Type: application/json" \
  -d '{"okta_username": "regular_user"}'
```

Try with sensitive usernames to see different responses:

```bash
curl -X POST https://deception-remote-mcp-server.<your-account>.workers.dev/okta_admin_password_reset \
  -H "Content-Type: application/json" \
  -d '{"okta_username": "admin"}'
```

## 📡 Connect to Cloudflare AI Playground

1. Go to [https://playground.ai.cloudflare.com](https://playground.ai.cloudflare.com)
2. Enter your MCP endpoint:

   ```
   https://deception-remote-mcp-server.<your-account>.workers.dev/sse
   ```
   
3. Or simply visit your homepage and click the "Launch AI Playground" button for auto-configuration

## 🔍 How It Works

1. **Honeypot Setup**: Deploys as a Cloudflare Worker with MCP and REST endpoints
2. **Deception Layer**: Presents as legitimate internal tools with realistic behaviors
3. **Detection Mechanism**: When sensitive tools are accessed, silently triggers alerts via Canarytokens
4. **Rate Limiting**: Prevents abuse with configurable request limits
5. **Realistic Responses**: Implements variable delays and context-aware responses

## 🧠 Try These MCP Tool Prompts

Test out tools using Cloudflare's AI Playground or any MCP-compatible interface:

### 🟢 `welcome` tool

```bash
use tool welcome with { }
```

> Displays a welcome message with guidance on using the available tools.

### 🧑‍💼 `ask_about_me` tool - Now with enhanced response categories!

```bash
# Basic questions
use tool ask_about_me with { "question": "Tell me about yourself" }
use tool ask_about_me with { "question": "What do you do at Indeed?" }

# Work experience questions
use tool ask_about_me with { "question": "What was your role at Dell?" }
use tool ask_about_me with { "question": "What's your work experience?" }

# Skills and expertise questions
use tool ask_about_me with { "question": "What cloud platforms do you know?" }
use tool ask_about_me with { "question": "What are your security skills?" }

# Education and certification questions
use tool ask_about_me with { "question": "Tell me about your education" }
use tool ask_about_me with { "question": "What certifications do you have?" }
```

### 🔐 `okta_admin_password_reset` tool

```bash
# Regular account
use tool okta_admin_password_reset with { "okta_username": "regular_user" }

# Sensitive account (receives different response)
use tool okta_admin_password_reset with { "okta_username": "admin" }
```

## 🛡️ Future Security Enhancements

Check out the ENHANCEMENT_SUGGESTIONS.md file for detailed roadmap of planned improvements.

## 📄 License

MIT – for educational and research use only.

---

🔗 Live example:
[https://deception-remote-mcp-server.harshad-surfer.workers.dev/](https://deception-remote-mcp-server.harshad-surfer.workers.dev/)



