import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // ✅ ADD
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Login failed");
        return;
      }

      // ✅ store user
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("userName", data.name);

      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar searchQuery="" onSearchChange={() => {}} />

      <div className="flex-1 flex items-center justify-center">
        <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md shadow">
          <h1 className="text-2xl font-bold mb-4">Sign in</h1>

          {/* EMAIL */}
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-border rounded px-3 py-2 mt-1 mb-3 focus:outline-none"
          />

          {/* PASSWORD 🔥 */}
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-border rounded px-3 py-2 mt-1 mb-4 focus:outline-none"
          />

          {/* BUTTON */}
          <button
            onClick={handleLogin}
            className="btn-amazon w-full py-2"
          >
            Sign In
          </button>

          <p className="text-sm mt-4 text-muted-foreground">
            New to Amazon?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Create your account
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage;