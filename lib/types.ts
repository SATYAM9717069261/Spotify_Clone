export type User = {
  email: string;
  id: number;
  [key: string]: any;
};

export type Fetcher = {
  url: string;
  body?: object;
};

export type AuthMode = "signin" | "signup";
