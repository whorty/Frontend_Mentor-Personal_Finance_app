import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import supabase from "../supabase-client";
import { Input_Text } from "../components/Inputs/Search_Input";
import { useRenderCount } from "../hooks/useRenderCount";

export default function Login() {
  useRenderCount("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword(
        {
          email,
          password,
        }
      );

      if (authError) {
        setError(authError.message);
        return;
      }

      if (data?.user) {
        console.log("Login successful:", data.user);
        // Navigate to app after successful login
        navigate("/app");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Login_Credentials">
      <div className="cardinfo bg-white">
        <h1>Login</h1>
        {error && <p className="error">{error}</p>}
        <form className="form" id="login-form" onSubmit={handleLogin}>
          <div className="input-default">
            <label htmlFor="email">Email</label>
            <Input_Text
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="input-default">
            <label htmlFor="password">Password</label>
            <Input_Text
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
        </form>
        <button
          type="submit"
          form="login-form"
          className="btn bg-black"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <h4>
          Need to create an account?
          <NavLink to="/signup">
            <strong>Sign Up</strong>
          </NavLink>
        </h4>
      </div>
    </div>
  );
}
