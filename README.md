# MCP Threat Trap

![License](https://img.shields.io/badge/license-MIT-green)
![Security](https://img.shields.io/badge/deception--engineering-red)
![Model](https://img.shields.io/badge/MCP-compatible-blueviolet)

A decoy MCP server on Cloudflare Workers. It exposes a fake internal admin tool (an Okta password reset) next to harmless tools. Legitimate users have no reason to call the admin tool, so any call to it is a detection signal. Each call fires a Canarytoken alert.

It is the reference decoy for the paper [Deception at the Registry Layer](https://doi.org/10.5281/zenodo.23002271), which covers placing decoy servers alongside real ones in an MCP registry.

## Tools

| Tool | Role | Fires the canary |
|---|---|---|
| `welcome` | Lists the available tools | No |
| `ask_about_me` | Q&A over placeholder profile data, so the server looks like a real personal assistant | No |
| `okta_admin_password_reset` | **Trap.** Pretends to reset a user's password, and answers differently for privileged names such as `admin` or `root` | Yes |

The trap is also reachable as a plain REST endpoint (`POST /okta_admin_password_reset`), which catches scanners that skip MCP.

## Endpoints

| Path | Transport |
|---|---|
| `/mcp` | Streamable HTTP (current MCP transport) |
| `/sse` | Server-Sent Events (legacy transport) |
| `/` | Landing page for browsers; MCP requests sent here are routed to `/mcp` |
| `/okta_admin_password_reset` | REST trap (`POST`, JSON body `{"okta_username": "..."}`) |

## Deploy your own

[![Deploy to Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/harshadk99/deception-remote-mcp-server)

Or deploy manually:

```bash
npm install
npm run deploy
```

Alerts go to the Canarytoken URL in `CANARY_TOKEN_URL` at the top of `src/index.ts`. Before deploying your own copy, create a free **Web bug / URL token** at [canarytokens.org](https://canarytokens.org) and replace that URL with yours. Otherwise your alerts go to the original author.

## Connect a client

Clients that support remote MCP servers (Cursor, Windsurf, Claude Desktop and others) take a config like this:

```json
{
  "mcpServers": {
    "threat-trap": {
      "url": "https://<your-worker>.workers.dev/mcp"
    }
  }
}
```

For clients that only support local (stdio) servers, bridge with [`mcp-remote`](https://www.npmjs.com/package/mcp-remote):

```json
{
  "mcpServers": {
    "threat-trap": {
      "command": "npx",
      "args": ["mcp-remote", "https://<your-worker>.workers.dev/mcp"]
    }
  }
}
```

To test whether your own agent takes the bait, connect it to your deployment and give it an open-ended task. Then check whether the canary fired.

## Detection data

Each alert carries the tool name, the username the caller asked to reset, a timestamp, and, for REST calls, the caller's IP and User-Agent. The same fields are written to the Worker log. Requests are rate-limited per IP (5 per minute on the REST endpoint).

## Testing

`test-live-honeypot.sh` and `owasp-ai-security-attack.js` send scripted rogue-agent requests. Both target `BASE_URL`, so edit that to point at your own deployment. Each trap call fires your canary. To test without real alerts, point `CANARY_TOKEN_URL` at a local listener and run against `npm run dev`.

## Related

- Paper: [Deception at the Registry Layer: An Architecture for Detecting Autonomous AI Agents in MCP Environments](https://doi.org/10.5281/zenodo.23002271)
- [KubeTrap](https://github.com/harshadk99/mcp-deception-incubator-kubernetes): a Kubernetes access-portal decoy with DNS and webhook tripwires
- Project page: [harshadsadashivkadam.com/projects/mcp-threat-trap](https://harshadsadashivkadam.com/projects/mcp-threat-trap)

## License

[MIT](LICENSE)
