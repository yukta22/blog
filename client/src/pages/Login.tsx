import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_API_URL;

const Login = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Save real token
      localStorage.setItem("token", data.token);

      navigate("/");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="container mt-5 col-md-4">
      <form onSubmit={submit}>
        <input className="form-control mb-3" placeholder="Username"
          onChange={e => setForm({ ...form, username: e.target.value })} />
        <input type="password" className="form-control mb-3" placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })} />
        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
};

export default Login;