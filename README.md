
````markdown
# 🛡️ Deception Remote MCP Server

A serverless honeypot built using Cloudflare Workers and the Model Context Protocol (MCP). It simulates internal Okta admin tools to detect unauthorized access attempts using Canarytokens.

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
* Randomized assistant-style welcome messages
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
3. Test tools like `welcome` and `okta_admin_password_reset`

---

## 📄 License

MIT – for educational and research use only.

```
