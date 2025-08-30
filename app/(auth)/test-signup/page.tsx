"use client";

import { useState } from "react";
import SignupForm from "@/components/SignupForm";

export default function TestSignupPage() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isRunningTest, setIsRunningTest] = useState(false);

  const addTestResult = (result: string) => {
    setTestResults((prev) => [
      ...prev,
      `${new Date().toLocaleTimeString()}: ${result}`,
    ]);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  // Test function that can be called programmatically
  const runAutomatedTest = async () => {
    setIsRunningTest(true);
    addTestResult("🚀 Starting automated signup test...");

    try {
      const testData = {
        name: "Test User " + Math.random().toString(36).substr(2, 5),
        email: `test${Date.now()}@example.com`,
        password: "password123",
      };

      addTestResult(`📝 Test data: ${JSON.stringify(testData)}`);

      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testData),
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        addTestResult(`✅ Success: ${result.message}`);
        addTestResult(`👤 User created: ${JSON.stringify(result.user)}`);
        addTestResult(`🍪 Response cookies: ${document.cookie}`);
      } else {
        addTestResult(`❌ Failed: ${result.message}`);
      }
    } catch (error: any) {
      addTestResult(`💥 Error: ${error.message}`);
    } finally {
      setIsRunningTest(false);
    }
  };

  const handleFormSuccess = (user: any) => {
    addTestResult(
      `🎉 Form signup successful for user: ${user?.name} (${user?.email})`,
    );
  };

  const handleFormError = (error: string) => {
    addTestResult(`🚨 Form signup failed: ${error}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              🎵 Spotify Clone - Signup API Test
            </h1>
            <p className="text-gray-600">
              Test the signup functionality using the form below or automated
              tests
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Signup Form */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                  Interactive Signup Form
                </h2>
                <SignupForm
                  onSuccess={handleFormSuccess}
                  onError={handleFormError}
                  className="shadow-none p-0 bg-transparent"
                />
              </div>

              {/* Manual Test Controls */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Automated Tests
                </h3>
                <div className="space-y-4">
                  <button
                    onClick={runAutomatedTest}
                    disabled={isRunningTest}
                    className={`w-full py-3 px-4 rounded-md font-medium transition duration-200 ${
                      isRunningTest
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    } text-white`}
                  >
                    {isRunningTest ? "Running Test..." : "Run Automated Test"}
                  </button>

                  <button
                    onClick={clearResults}
                    className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-200"
                  >
                    Clear Results
                  </button>
                </div>
              </div>
            </div>

            {/* Test Results */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Test Results
                </h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm max-h-96 overflow-y-auto">
                  {testResults.length === 0 ? (
                    <p className="text-gray-500">
                      No test results yet. Run a test to see results here.
                    </p>
                  ) : (
                    <div className="space-y-1">
                      {testResults.map((result, index) => (
                        <div key={index} className="leading-relaxed">
                          {result}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">
                  🔧 Testing Instructions
                </h3>
                <div className="text-blue-700 text-sm space-y-2">
                  <p>
                    <strong>Form Testing:</strong>
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Fill out the form on the left and click "Sign Up"</li>
                    <li>Check validation by leaving fields empty</li>
                    <li>Try duplicate emails to test error handling</li>
                  </ul>

                  <p className="pt-2">
                    <strong>Automated Testing:</strong>
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Click "Run Automated Test" for programmatic testing</li>
                    <li>Each test creates a unique user with timestamp</li>
                    <li>Results show in the console on the right</li>
                  </ul>

                  <p className="pt-2">
                    <strong>Browser Console:</strong>
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Open DevTools (F12) to see network requests</li>
                    <li>Check Network tab for API call details</li>
                    <li>
                      Use console functions like{" "}
                      <code className="bg-blue-100 px-1 rounded">
                        testQuickSignup()
                      </code>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Environment Check */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">
                  ⚠️ Prerequisites
                </h3>
                <div className="text-yellow-700 text-sm space-y-2">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                      Database connection configured
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                      JWT_SECRET environment variable set
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                      Prisma database migrated
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                      Development server running
                    </div>
                  </div>
                  <p className="text-xs pt-2">
                    If tests fail, check these prerequisites and console errors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Script for Console Testing */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Make test functions available globally
            window.testSignupAPI = async (name = 'Console Test User', email = 'console-test-' + Date.now() + '@example.com', password = 'password123') => {
              try {
                console.log('🧪 Testing signup from console...', { name, email, password });

                const response = await fetch('/api/signup', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ name, email, password }),
                  credentials: 'include'
                });

                const result = await response.json();

                if (response.ok) {
                  console.log('✅ Console test successful:', result);
                } else {
                  console.error('❌ Console test failed:', result);
                }

                return result;
              } catch (error) {
                console.error('💥 Console test error:', error);
                throw error;
              }
            };

            console.log('🎵 Signup test page loaded! Try: testSignupAPI()');
          `,
        }}
      />
    </div>
  );
}
