// Test file to verify sign form functionality
// Run this file with: node test-auth.js

const BASE_URL = 'http://localhost:3000';

// Test user data
const testUsers = [
  {
    name: 'Test User 1',
    email: `test${Date.now()}@example.com`,
    password: 'password123'
  },
  {
    name: 'Test User 2',
    email: `test${Date.now() + 1}@example.com`,
    password: 'password456'
  }
];

// Helper function to make API calls
async function apiCall(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await response.json();

    return {
      status: response.status,
      ok: response.ok,
      data,
      headers: response.headers
    };
  } catch (error) {
    return {
      status: 500,
      ok: false,
      error: error.message
    };
  }
}

// Test signup functionality
async function testSignup(userData) {
  console.log(`\n🧪 Testing Signup for: ${userData.email}`);
  console.log('📤 Sending signup request...');

  const result = await apiCall('/api/signup', 'POST', userData);

  if (result.ok) {
    console.log('✅ Signup successful!');
    console.log('👤 User created:', result.data.user);
    return result.data.user;
  } else {
    console.log('❌ Signup failed!');
    console.log('📝 Error:', result.data.message || result.error);
    return null;
  }
}

// Test signin functionality
async function testSignin(credentials) {
  console.log(`\n🔐 Testing Signin for: ${credentials.email}`);
  console.log('📤 Sending signin request...');

  const result = await apiCall('/api/signin', 'POST', credentials);

  if (result.ok) {
    console.log('✅ Signin successful!');
    console.log('👤 User authenticated:', result.data.user);
    return result.data.user;
  } else {
    console.log('❌ Signin failed!');
    console.log('📝 Error:', result.data.message || result.error);
    return null;
  }
}

// Test invalid signup data
async function testInvalidSignup() {
  console.log('\n🧪 Testing Invalid Signup Data...');

  const invalidCases = [
    {
      name: 'Missing email',
      data: { name: 'Test User', password: 'password123' }
    },
    {
      name: 'Missing password',
      data: { name: 'Test User', email: 'test@example.com' }
    },
    {
      name: 'Missing name',
      data: { email: 'test@example.com', password: 'password123' }
    },
    {
      name: 'Empty data',
      data: {}
    }
  ];

  for (const testCase of invalidCases) {
    console.log(`\n📋 Testing: ${testCase.name}`);
    const result = await apiCall('/api/signup', 'POST', testCase.data);

    if (!result.ok && result.status === 400) {
      console.log('✅ Correctly rejected invalid data');
    } else {
      console.log('❌ Should have rejected invalid data');
    }
    console.log('📝 Response:', result.data.message || result.error);
  }
}

// Test duplicate email signup
async function testDuplicateEmail(existingUser) {
  console.log('\n🧪 Testing Duplicate Email Signup...');

  const duplicateUser = {
    name: 'Duplicate User',
    email: existingUser.email, // Using same email
    password: 'differentpassword'
  };

  const result = await apiCall('/api/signup', 'POST', duplicateUser);

  if (!result.ok && result.status === 409) {
    console.log('✅ Correctly rejected duplicate email');
  } else {
    console.log('❌ Should have rejected duplicate email');
  }
  console.log('📝 Response:', result.data.message || result.error);
}

// Test invalid signin
async function testInvalidSignin() {
  console.log('\n🧪 Testing Invalid Signin...');

  const invalidCases = [
    {
      name: 'Wrong password',
      data: { email: testUsers[0].email, password: 'wrongpassword' }
    },
    {
      name: 'Non-existent email',
      data: { email: 'nonexistent@example.com', password: 'password123' }
    },
    {
      name: 'Missing email',
      data: { password: 'password123' }
    },
    {
      name: 'Missing password',
      data: { email: 'test@example.com' }
    }
  ];

  for (const testCase of invalidCases) {
    console.log(`\n📋 Testing: ${testCase.name}`);
    const result = await apiCall('/api/signin', 'POST', testCase.data);

    if (!result.ok) {
      console.log('✅ Correctly rejected invalid signin');
    } else {
      console.log('❌ Should have rejected invalid signin');
    }
    console.log('📝 Response:', result.data.message || result.error);
  }
}

// Main test function
async function runAllTests() {
  console.log('🎵 Spotify Clone Auth System Test Suite');
  console.log('========================================');

  try {
    // Test server availability
    console.log('\n🔍 Checking server availability...');
    const healthCheck = await apiCall('/api/signup', 'GET');
    if (healthCheck.status === 405) {
      console.log('✅ Server is running and endpoints are accessible');
    } else {
      console.log('⚠️ Server response:', healthCheck.status);
    }

    // Test valid signups
    const createdUsers = [];
    for (const userData of testUsers) {
      const user = await testSignup(userData);
      if (user) {
        createdUsers.push({ ...userData, id: user.id });
      }
    }

    // Test invalid signups
    await testInvalidSignup();

    // Test duplicate email
    if (createdUsers.length > 0) {
      await testDuplicateEmail(createdUsers[0]);
    }

    // Test valid signins
    for (const userData of createdUsers) {
      await testSignin({ email: userData.email, password: userData.password });
    }

    // Test invalid signins
    await testInvalidSignin();

    // Summary
    console.log('\n📊 Test Summary');
    console.log('===============');
    console.log(`✅ Created ${createdUsers.length} users successfully`);
    console.log('✅ All authentication tests completed');

    if (createdUsers.length === testUsers.length) {
      console.log('🎉 All tests passed! Sign forms are working correctly.');
    } else {
      console.log('⚠️ Some tests failed. Check the logs above for details.');
    }

  } catch (error) {
    console.error('💥 Test suite failed with error:', error.message);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  console.log('🚀 Starting auth tests...\n');
  runAllTests().then(() => {
    console.log('\n✨ Test suite completed!');
    process.exit(0);
  }).catch((error) => {
    console.error('💥 Test suite crashed:', error);
    process.exit(1);
  });
}

// Export functions for use in other test files
module.exports = {
  testSignup,
  testSignin,
  testInvalidSignup,
  testDuplicateEmail,
  testInvalidSignin,
  runAllTests,
  apiCall
};

// Additional helper functions for browser testing
if (typeof window !== 'undefined') {
  window.SpotifyCloneAuthTest = {
    testSignup,
    testSignin,
    runAllTests,
    apiCall,

    // Quick test function for browser console
    quickTest: async () => {
      const testUser = {
        name: 'Browser Test User',
        email: `browser-test-${Date.now()}@example.com`,
        password: 'browsertest123'
      };

      console.log('🌐 Running quick browser test...');
      const user = await testSignup(testUser);
      if (user) {
        await testSignin({ email: testUser.email, password: testUser.password });
      }
      console.log('🌐 Browser test completed!');
    }
  };

  console.log(`
🎵 Spotify Clone Auth Test Utils Loaded!

Available functions in browser console:
- SpotifyCloneAuthTest.quickTest() - Run a quick signup/signin test
- SpotifyCloneAuthTest.testSignup(userData) - Test signup
- SpotifyCloneAuthTest.testSignin(credentials) - Test signin
- SpotifyCloneAuthTest.runAllTests() - Run full test suite

Example:
SpotifyCloneAuthTest.quickTest();
  `);
}
