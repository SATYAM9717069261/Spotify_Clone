export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  message: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

export interface ApiError {
  message: string;
  error?: string;
}

/**
 * @param userData - User registration data
 * @returns Promise with signup response or throws error
 */
export async function signupUser(
  userData: SignupData,
): Promise<SignupResponse> {
  const response = await fetch("/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
    credentials: "include", // Include cookies for authentication
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Signup failed");
  }

  return data;
}

/**
 * Test signup with console logging
 * @param userData - User registration data
 */
export async function testSignup(userData: SignupData): Promise<void> {
  try {
    console.log("🚀 Testing signup with data:", userData);
    console.time("Signup Request");

    const result = await signupUser(userData);

    console.timeEnd("Signup Request");
    console.log("✅ Signup successful:", result);

    // Log cookie information
    const cookies = document.cookie;
    console.log("🍪 Cookies after signup:", cookies);
  } catch (error) {
    console.error("❌ Signup failed:", error);
    throw error;
  }
}

/**
 * Quick test function for browser console
 * Usage: testQuickSignup() or testQuickSignup('custom@email.com')
 */
export async function testQuickSignup(
  email: string = `test${Date.now()}@example.com`,
  name: string = "Test User",
  password: string = "password123",
): Promise<void> {
  await testSignup({ name, email, password });
}

/**
 * Batch test multiple signups
 * @param count - Number of test users to create
 */
export async function testBatchSignup(count: number = 3): Promise<void> {
  console.log(`🔄 Testing ${count} signups...`);

  const promises = Array.from({ length: count }, (_, i) =>
    testSignup({
      name: `Test User ${i + 1}`,
      email: `test${Date.now()}-${i}@example.com`,
      password: `password123${i}`,
    }).catch((error) => ({ error, index: i })),
  );

  const results = await Promise.allSettled(promises);

  const successful = results.filter((r) => r.status === "fulfilled").length;
  const failed = results.filter((r) => r.status === "rejected").length;

  console.log(
    `📊 Batch signup results: ${successful} successful, ${failed} failed`,
  );

  results.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error(`❌ Signup ${index + 1} failed:`, result.reason);
    }
  });
}

// Make functions available globally in browser for easy testing
if (typeof window !== "undefined") {
  (window as any).testSignup = testSignup;
  (window as any).testQuickSignup = testQuickSignup;
  (window as any).testBatchSignup = testBatchSignup;
  (window as any).signupUser = signupUser;

  console.log(`
🎵 Spotify Clone API Utils Loaded!

Available functions in browser console:
- signupUser({ name, email, password }) - Main signup function
- testSignup({ name, email, password }) - Test with logging
- testQuickSignup(email?, name?, password?) - Quick test with defaults
- testBatchSignup(count?) - Test multiple signups

Examples:
testQuickSignup();
testQuickSignup('myemail@test.com');
testSignup({ name: 'John Doe', email: 'john@test.com', password: 'mypass123' });
testBatchSignup(5);
  `);
}
