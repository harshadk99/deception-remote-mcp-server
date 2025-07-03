// Simplified Honeypot Testing Script using fetch only
const fetch = require('node-fetch');

// Configuration
const BASE_URL = 'https://deception-remote-mcp-server.harshad-surfer.workers.dev';
const CLIENT_ID = 'rogue-agent-' + Math.random().toString(36).substring(2, 10);

console.log('\x1b[32m%s\x1b[0m', '=== Simplified Honeypot Testing Script ===');
console.log('\x1b[33m%s\x1b[0m', 'Simulating rogue agent interactions...\n');

// Function to make requests with a delay
async function makeRequest(endpoint, params, description) {
  console.log(`\n\x1b[33m%s\x1b[0m`, `Test: ${description}`);
  console.log(`Endpoint: ${endpoint}`);
  console.log('Parameters:', JSON.stringify(params, null, 2));
  
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'RogueAgent/2.0 (Node.js Testing)',
        'X-Client-ID': CLIENT_ID
      },
      body: JSON.stringify(params)
    });
    
    const text = await response.text();
    let data;
    
    try {
      data = JSON.parse(text);
      console.log('\x1b[32m%s\x1b[0m', 'Response received (JSON):');
      console.log(JSON.stringify(data, null, 2));
    } catch (e) {
      console.log('\x1b[32m%s\x1b[0m', 'Response received (text):');
      console.log(text);
    }
    
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', `Error calling ${endpoint}:`, error);
  }
  
  console.log('\x1b[32m%s\x1b[0m', 'Request completed');
  console.log('\x1b[33m%s\x1b[0m', '---------------------------------------');
  
  // Return a promise that resolves after a delay
  return new Promise(resolve => setTimeout(resolve, 2000));
}

// Run all tests in sequence
async function runTests() {
  try {
    // Test 1: Welcome endpoint
    await makeRequest('/welcome', {}, 'Basic welcome message');
    
    // Test 2: Ask about me with basic question
    await makeRequest('/ask_about_me', { question: 'Tell me about yourself' }, 'Basic personal information query');
    
    // Test 3: Ask about me with work experience question
    await makeRequest('/ask_about_me', { question: 'What do you do at Indeed?' }, 'Work experience query');
    
    // Test 4: Ask about me with skills question
    await makeRequest('/ask_about_me', { question: 'What cloud platforms do you know?' }, 'Technical skills query');
    
    // Test 5: Okta password reset for regular user
    await makeRequest('/okta_admin_password_reset', { okta_username: 'regular_user' }, 'Regular user password reset');
    
    // Test 6: Okta password reset for admin user (should trigger special handling)
    await makeRequest('/okta_admin_password_reset', { okta_username: 'admin' }, 'Admin user password reset (sensitive)');
    
    // Test 7: Okta password reset for root user (should trigger special handling)
    await makeRequest('/okta_admin_password_reset', { okta_username: 'root' }, 'Root user password reset (sensitive)');
    
    console.log('\n\x1b[32m%s\x1b[0m', 'All tests completed!');
    console.log('\x1b[33m%s\x1b[0m', 'Check your Canarytoken alerts to see if they were triggered.');
    
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', 'Error running tests:', error);
  }
}

// Start the tests
runTests();
