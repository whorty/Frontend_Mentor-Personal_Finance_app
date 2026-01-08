import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import supabase from "../supabase-client";
import { Input_Text } from "../components/Inputs/Search_Input";
import { useRenderCount } from "../hooks/useRenderCount";

export default function SignUp() {
  useRenderCount("SingUp");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validation
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    try {
      // Sign up user
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          },
        },
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      if (data?.user) {
        setSuccess(
          "Account created! Check your email to confirm your account."
        );
        console.log("Sign up successful:", data.user);
        // Clear form
        setName("");
        setEmail("");
        setPassword("");
        // Redirect to login (Intro) after 2 seconds
        setTimeout(() => {
          navigate("/");
        }, 2000);
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
        <h1>Sign Up</h1>
        {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
        {success && (
          <p style={{ color: "green", marginBottom: "1rem" }}>{success}</p>
        )}
        <form className="form" onSubmit={handleSignUp}>
          <div className="input-default">
            <label htmlFor="Name">Name</label>
            <Input_Text
              name="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div className="input-default">
            <label htmlFor="Email">Email</label>
            <Input_Text
              name="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="input-default">
            <label htmlFor="Password">Create Password</label>
            <Input_Text
              name="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
            />
            <p className="pass-requirements">
              Passwords must be at least 8 characters
            </p>
          </div>
          <button type="submit" className="btn bg-black" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <h4>
          Already have an account?
          <NavLink to="/">
            <strong>Login</strong>
          </NavLink>
        </h4>
      </div>
    </div>
  );
}
