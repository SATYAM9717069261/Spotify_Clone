"use client";

import { FC, useState } from "react";
import { Mode } from "./type";
import { authenticate, signinUser } from "@libs/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AuthFormProps {
  mode: Mode;
}

const AuthForm: FC<AuthFormProps> = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (mode === "signin") {
        await signinUser({ email, password });
      } else {
        await authenticate(mode, { email, password, firstName, lastName });
      }
      router.push("/");
    } catch (err: any) {
      console.log(" details => ", err.message);
      setError(err.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="flex self-center">
        <div className="bg-[var(--color-bg)] rounded-lg shadow-md p-10 transition-transform w-96 text-center">
          <h3 className="text-lg text-[var(--color-text-dark)]">
            {mode === "signin" ? "Sign In" : "Sign Up"}
          </h3>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {mode === "signup" && (
              <>
                <label
                  htmlFor="firstName"
                  className="block mt-4 mb-2 text-left text-[var(--color-text-dark)] font-bold"
                >
                  First Name:
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  className="block w-full mb-6 px-4 py-2 border border-[var(--color-border)] rounded-md
                             focus:outline-none focus:border-[var(--color-primary-hover)]"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />

                <label
                  htmlFor="LastName"
                  className="block mt-4 mb-2 text-left text-[var(--color-text-dark)] font-bold"
                >
                  Last Name:
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  className="block w-full mb-6 px-4 py-2 border border-[var(--color-border)] rounded-md
                                             focus:outline-none focus:border-[var(--color-primary-hover)]"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </>
            )}
            <label
              htmlFor="email"
              className="block mt-4 mb-2 text-left text-[var(--color-text-dark)] font-bold"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="block w-full mb-6 px-4 py-2 border border-[var(--color-border)] rounded-md
                         focus:outline-none focus:border-[var(--color-primary-hover)]"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label
              htmlFor="password"
              className="block mb-2 text-left text-[var(--color-text-dark)] font-bold"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your Password"
              className="block w-full mb-6 px-4 py-2 border border-[var(--color-border)] rounded-md
                         focus:outline-none focus:border-[var(--color-primary-hover)]"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="btn-primary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading
                  ? "Loading..."
                  : mode === "signin"
                    ? "Sign In"
                    : "Sign Up"}
              </button>
              <Link
                href="/signup"
                className="ml-4 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
              >
                {mode === "signin"
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
