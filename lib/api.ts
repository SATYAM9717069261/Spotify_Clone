import fetcher from "./fetcher";
import { AuthMode, User } from "./types";

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  message: string;
  user?: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface SigninData {
  email: string;
  password: string;
}

export interface SigninResponse {
  message: string;
  user?: {
    email: string;
    name: string;
  };
}

export interface ApiError {
  message: string;
  error?: string;
}

export const auth = async (mode: AuthMode, details: User) => {
  return await fetcher({ url: `/${mode}`, body: details });
};

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

export async function signinUser(
  userData: SigninData,
): Promise<SigninResponse> {
  const response = await fetch("/api/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
    credentials: "include", // Include cookies for authentication
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Signin failed");
  }

  return data;
}

export async function authenticate(
  mode: AuthMode,
  details: SignupData | SigninData,
) {
  if (mode === "signin") {
    return signinUser(details as SigninData);
  } else if (mode === "signup") {
    return signupUser(details as SignupData);
  } else {
    throw new Error(`Unknown auth mode: ${mode}`);
  }
}
