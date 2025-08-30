import fetcher from "./fetcher";
import { AuthMode, User } from "./types";

export const auth = (mode: AuthMode, details: User) => {
  return fetcher({ url: `/auth/${mode}`, body: details });
};
