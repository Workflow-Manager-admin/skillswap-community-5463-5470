/**
 * Test script for login API endpoint
 * Tests various login scenarios with different credentials
 */

const fetch = require('node-fetch');

const API_URL = 'http://localhost:5001/api/auth/login';

// Test cases
const testCases = [
  {
    name: 'Case 1: Login with correct username and password',
    payload: { username: 'johndoe', password: 'password123' },
    expectedStatus: 200
  },
  {
    name: 'Case 2: Login with correct email and password',
    payload: { username: 'john@example.com', password: 'password123' },
    expectedStatus: 200
  },
  {
    name: 'Case 3: Login with correct username but incorrect password',
    payload: { username: 'johndoe', password: 'wrongpassword' },
    expectedStatus: 401
  },
  {
    name: 'Case 4: Login with correct email but blank password',
    payload: { username: 'john@example.com', password: '' },
    expectedStatus: 400
  },
  {
    name: 'Case 5: Login with non-existent user',
    payload: { username: 'nonexistentuser', password: 'password123' },
    expectedStatus: 401
  }
];

// Run test cases
async function runTests() {
  console.log('Starting login API tests...\n');
  
  let passedTests = 0;
  let failedTests = 0;
  
  for (const testCase of testCases) {
    try {
      console.log(`Running: ${testCase.name}`);
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testCase.payload)
      });
      
      const data = await response.json();
      
      // Check status
      const statusMatch = response.status === testCase.expectedStatus;
      
      // Check JWT token is present for successful logins
      const hasToken = 
        testCase.expectedStatus === 200 ? 
        !!data.token && typeof data.token === 'string' && data.token.length > 0 : 
        true; // We only check token for successful cases
      
      if (statusMatch && hasToken) {
        console.log(`✅ PASSED: ${testCase.name}`);
        console.log(`   Status: ${response.status}, Expected: ${testCase.expectedStatus}`);
        if (response.status === 200) {
          console.log(`   JWT Token received: ${data.token ? 'Yes' : 'No'}`);
          console.log(`   User data received: ${data.user ? 'Yes' : 'No'}`);
        } else {
          console.log(`   Error message: ${data.message}`);
        }
        passedTests++;
      } else {
        console.log(`❌ FAILED: ${testCase.name}`);
        console.log(`   Status: ${response.status}, Expected: ${testCase.expectedStatus}`);
        console.log(`   Response data:`, JSON.stringify(data, null, 2));
        failedTests++;
      }
    } catch (error) {
      console.log(`❌ ERROR: ${testCase.name}`);
      console.log(`   ${error.message}`);
      failedTests++;
    }
    
    console.log(''); // Empty line for readability
  }
  
  // Print summary
  console.log('=== TEST SUMMARY ===');
  console.log(`Total tests: ${testCases.length}`);
  console.log(`Passed: ${passedTests}`);
  console.log(`Failed: ${failedTests}`);
  
  return { passedTests, failedTests, total: testCases.length };
}

// Execute tests
runTests().catch(error => {
  console.error('Test execution failed:', error);
});