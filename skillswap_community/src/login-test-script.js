/**
 * Simple login test script
 * Tests login functionality from AppContext by making direct API calls
 */

// Import fetch for Node.js environment
const fetch = require('node-fetch');

// API URL (matching our running backend)
const API_URL = 'http://localhost:5001/api/auth/login';

// Test cases
const testCases = [
  {
    name: 'Case 1: Login with correct username and password',
    payload: { username: 'johndoe', password: 'password123' },
    expectToken: true,
    expectStatus: 200
  },
  {
    name: 'Case 2: Login with correct email and password',
    payload: { username: 'john@example.com', password: 'password123' },
    expectToken: true,
    expectStatus: 200
  },
  {
    name: 'Case 3: Login with correct username but incorrect password',
    payload: { username: 'johndoe', password: 'wrongpassword' },
    expectToken: false,
    expectStatus: 401
  },
  {
    name: 'Case 4: Login with correct email but blank password',
    payload: { username: 'john@example.com', password: '' },
    expectToken: false,
    expectStatus: 400
  },
  {
    name: 'Case 5: Login with non-existent user',
    payload: { username: 'nonexistentuser', password: 'password123' },
    expectToken: false,
    expectStatus: 401
  }
];

// Main test function
async function runTests() {
  console.log('=== LOGIN FUNCTIONALITY TEST SCRIPT ===');
  console.log('Testing API endpoint:', API_URL);
  console.log('-----------------------------------');
  
  let passed = 0;
  let failed = 0;
  const startTime = Date.now();
  
  for (const testCase of testCases) {
    console.log(`\nRunning: ${testCase.name}`);
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testCase.payload)
      });
      
      const data = await response.json();
      console.log(`Status: ${response.status}`);
      
      // Check status code
      const statusMatch = response.status === testCase.expectStatus;
      
      // Check token presence
      const tokenMatch = testCase.expectToken ? !!data.token : !data.token;
      
      if (statusMatch && tokenMatch) {
        console.log('✅ PASSED');
        
        if (testCase.expectToken) {
          console.log(`   JWT token received: ${!!data.token}`);
          console.log(`   User data received: ${!!data.user}`);
        } else {
          console.log(`   Error message: ${data.message}`);
        }
        
        passed++;
      } else {
        console.log('❌ FAILED');
        console.log(`   Expected status: ${testCase.expectStatus}, Got: ${response.status}`);
        console.log(`   Expected token: ${testCase.expectToken ? 'Yes' : 'No'}, Got: ${!!data.token ? 'Yes' : 'No'}`);
        console.log(`   Response: ${JSON.stringify(data)}`);
        failed++;
      }
    } catch (error) {
      console.log('❌ ERROR - Test could not be completed');
      console.log(`   ${error.message}`);
      failed++;
    }
  }
  
  const duration = Date.now() - startTime;
  
  // Print summary
  console.log('\n=== TEST SUMMARY ===');
  console.log(`Total tests: ${testCases.length}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Time: ${duration / 1000} seconds`);
  
  return { passed, failed, total: testCases.length, duration };
}

// Run the tests
runTests()
  .then(results => {
    console.log('\nTest execution completed.');
    process.exit(results.failed ? 1 : 0);
  })
  .catch(error => {
    console.error('Test script error:', error);
    process.exit(1);
  });