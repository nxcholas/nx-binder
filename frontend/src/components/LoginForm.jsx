import Button from "../components/Button";
import TextField from "@mui/material/TextField";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../lib/axios.mjs";

function LoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await toast.promise(api.post("/login", form), {
        loading: "Logging you in...",
        success: "Successfully logged in!",
        error: "There was some problem logging you in. Please try again.",
      });
      // grab token from res
      const token = res.data.token;
      const userData = res.data;

      // set token in localstorage using auth context
      // sets userdata in auth context
      login(token, userData);

    } catch (error) {
      toast.error("There was some problem logging you in. Please try again.");
    } finally {
      navigate('/');
    }
  };

  return (
    <div className="w-2/3 min-w-[500px] max-w-[640px] md:min-w-[9/10] h-full flex flex-col justify-center bg-gray-950/30 px-24 py-16 rounded-3xl">
      <form onSubmit={handleSubmit}>
        <div className="title w-full flex flex-col justify-center items-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Log In</h1>
          <p className="italic text-gray-400">
            Ready to jump back in? Let’s get started.
          </p>
        </div>
        <div className="form-control">
          <TextField
            id="filled"
            label="Email"
            variant="filled"
            type="text"
            sx={{ input: { color: "white" } }}
            margin="normal"
            fullWidth
            onChange={handleChange}
            name="email"
            required
          />
        </div>
        <div className="form-control">
          <TextField
            id="filled"
            label="Password"
            variant="filled"
            type="password"
            sx={{ input: { color: "white" } }}
            margin="normal"
            fullWidth
            onChange={handleChange}
            name="password"
            required
          />
        </div>
        <div className="form-control mt-8">
          <Button text={"Login"} type={"submit"} />
        </div>
      </form>
    </div>
  );
}
export default LoginForm;
