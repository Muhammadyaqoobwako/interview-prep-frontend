import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import axios from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useContext } from "react";
import { UserContext } from "../../Context/userContext";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  // Email validation helper
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setError("");

    // Login API call
    try {
      const response = await axios.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data;
      if (token) {
        localStorage.setItem("authToken", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Check credentials.",
      );
    }
  };

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="px-6 sm:px-8 pt-8 pb-6 bg-slate-50">
        <div className="inline-flex items-center gap-2 rounded-full bg-teal-700 px-4 py-2 text-xs font-semibold text-white">
          <span className="h-2 w-2 rounded-full bg-white" />
          Secure Login
        </div>

        <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-slate-900">
          Welcome back
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Continue your prep with tailored questions and insights.
        </p>
      </div>

      <form
        onSubmit={handleLogin}
        className="px-6 sm:px-8 pb-8 pt-6 flex flex-col gap-5"
      >
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email"
          placeholder="name@company.com"
          type="email"
        />

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Enter your password"
          type="password"
        />

        {error && (
          <div className="bg-rose-50 text-rose-700 text-sm p-4 rounded-xl border border-rose-200 flex items-start gap-2 shadow-sm">
            <span className="text-rose-500 text-lg flex-shrink-0">⚠</span>
            <p>{error}</p>
          </div>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-teal-700 text-white font-semibold py-3.5 transition-all hover:bg-teal-800"
        >
          Sign in
        </button>

        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-700">
          💡 <strong>Tip:</strong> Keep your profile updated to get better
          role-specific questions.
        </div>

        <p className="text-center text-sm text-slate-600">
          New here?{" "}
          <button
            type="button"
            className="font-semibold text-slate-900 hover:text-slate-700 cursor-pointer transition-colors"
            onClick={() => setCurrentPage("Signup")}
          >
            Create an account
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
