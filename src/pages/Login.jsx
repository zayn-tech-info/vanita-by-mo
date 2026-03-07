import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useAction, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useSessionId } from "../hooks/useSessionId";
import { Loader2 } from "lucide-react";
import { getConvexErrorMessage } from "../lib/convexError";
import { toast } from "react-toastify";

export function Login() {
  const sessionId = useSessionId();
  const mergeGuestCart = useMutation(api.cart.mergeGuestCartIntoUser);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const login = useAction(api.authActions.login);

  if (localStorage.getItem("userId")) {
    const role = localStorage.getItem("userRole");
    return <Navigate to={role === "admin" ? "/admin" : "/"} replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Logging in...");
    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("userId", result.userId);
      localStorage.setItem("userRole", result.role);
      try {
        await mergeGuestCart({ sessionId, userId: result.userId });
      } catch {
        // Non-blocking: cart merge best-effort
      }
      toast.update(toastId, {
        render: "Login successful!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      navigate(result.role === "admin" ? "/admin" : "/");
    } catch (err) {
      setLoading(false);
      toast.update(toastId, {
        render: getConvexErrorMessage(err, "Login failed. Try again."),
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    }
  };

  const isFieldActive = (fieldName) => {
    return focusedField === fieldName || formData[fieldName];
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-16">
        <div className="w-full max-w-md min-w-0">
          <div className="bg-white rounded-lg shadow-lg p-5 sm:p-6 md:p-8 relative">
            <h1 className="text-2xl sm:text-3xl font-light tracking-wide text-stone-800 text-center mb-6 sm:mb-8 italic">
              Log in
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <label
                  htmlFor="email"
                  className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                    isFieldActive("email")
                      ? "top-1 text-xs text-amber-600 tracking-wide"
                      : "top-1/2 -translate-y-1/2 text-sm text-stone-400"
                  }`}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-3 pt-5 pb-2 border border-stone-200 rounded focus:border-amber-600 focus:outline-none text-sm tracking-wide bg-transparent transition-colors duration-200"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                    isFieldActive("password")
                      ? "top-1 text-xs text-amber-600 tracking-wide"
                      : "top-1/2 -translate-y-1/2 text-sm text-stone-400"
                  }`}
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-3 pt-5 pb-2 border border-stone-200 rounded focus:border-amber-600 focus:outline-none text-sm tracking-wide bg-transparent transition-colors duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.64 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.64 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="cursor-pointer w-full space-x-4 flex justify-center items-center mx-auto py-3 bg-amber-600 text-white text-sm tracking-[0.15em] uppercase font-medium rounded hover:bg-amber-700 transition-colors duration-300"
              >
                <span>
                  {loading && (
                    <Loader2 className="inline-block mr-2 h-6 w-4 animate-spin" />
                  )}
                </span>
                <span>{loading ? "Logging in" : "Log In"}</span>
              </button>
            </form>
            <p className="text-center mt-6 text-sm text-stone-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-amber-700 hover:text-amber-800 font-medium transition-colors"
              >
                Sign Up
              </Link>
            </p>
            <div className="flex items-center mt-6">
              <div className="flex-1 border-t border-stone-200"></div>
              <span className="px-4 text-sm text-stone-400">or</span>
              <div className="flex-1 border-t border-stone-200"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
