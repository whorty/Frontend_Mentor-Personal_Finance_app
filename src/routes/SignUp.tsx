import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import supabase from "../supabase-client";
import { Input_Text } from "../components/Inputs/Search_Input";

export default function SignUp() {
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
    const cleanName = name?.trim();
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const fail = (msg: string) => {
      setError(msg);
      setLoading(false);
      return;
    };

    if (!cleanName || cleanName.length < 3)
      return fail("Name must be at least 3 characters");
    if (!/^[\p{L}\s'-]+$/u.test(cleanName))
      return fail("Name must contain only letters and spaces");
    if (!emailRegex.test(email))
      return fail("Please enter a valid email address");
    if (!passwordRegex.test(password))
      return fail(
        "Password must be at least 8 characters and include a letter, a number, and a special character"
      );

    try {
      // Sign up user
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: name,
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
        console.log("Sign up successful");
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
        {error && <p className="error">{error}</p>}
        {success && <p style={{ color: "var(--Green)" }}>{success}</p>}
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
