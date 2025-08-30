import { FC } from "react";
import { Mode } from "./type";

interface AuthFormProps {
  mode: Mode;
}

const AuthForm: FC<AuthFormProps> = ({ mode }) => {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="flex self-center">
        <div className="bg-[var(--color-bg)] rounded-lg shadow-md p-10 transition-transform w-96 text-center">
          <h3 className="text-lg text-[var(--color-text-dark)]">
            Enter your login credentials
          </h3>

          <form action="">
            <label
              htmlFor="username"
              className="block mt-4 mb-2 text-left text-[var(--color-text-dark)] font-bold"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your Username"
              className="block w-full mb-6 px-4 py-2 border border-[var(--color-border)] rounded-md
                         focus:outline-none focus:border-[var(--color-primary-hover)]"
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
              required
            />

            <div className="flex justify-center items-center">
              <button type="submit" className="btn-primary cursor-pointer">
                Submit
              </button>
            </div>
          </form>

          <p className="mt-4 text-[var(--color-text-dark)]">
            Not registered?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
