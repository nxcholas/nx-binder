import Button from "../components/Button";
import MainContent from "../components/MainContent";
import Navbar from "../components/Navbar";
import TextField from "@mui/material/TextField";
import toast from "react-hot-toast";
import { useState } from "react";
import api from "../lib/axios.mjs";

function RegisterUserForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // client side validation check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Invalid email. Please enter a valid email");
      return;
    }

    if (form.password !== confirmPassword) {
      toast.error("Invalid password. Please confirm password.");
      return;
    }

    // POST: register user
    try {
      await toast.promise(api.post("/register", form), {
        loading: "Registering...",
        success: "Registered!",
        error: "User already exists. Please sign in.",
      });

      console.log(form);
    } catch (error) {
      console.log("Error creating user.", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleChange = (e, prev) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="w-2/3 min-w-[500px] max-w-[640px] md:min-w-[9/10] h-full flex flex-col justify-center bg-gray-950/30 px-24 py-16 rounded-3xl">
      <form onSubmit={handleSubmit}>
        <div className="title w-full flex flex-col justify-center items-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Sign Up</h1>
          <p className="italic text-gray-400">Sign up up gain access!</p>
        </div>
        <div className="form-control">
          <TextField
            id="filled"
            label="Enter Name"
            variant="filled"
            type="text"
            sx={{ input: { color: "white" } }}
            margin="normal"
            fullWidth
            onChange={(e) => handleChange(e)}
            name="name"
            required
          />
        </div>
        <div className="form-control">
          <TextField
            id="filled"
            label="Enter Email"
            variant="filled"
            type="email"
            sx={{ input: { color: "white" } }}
            margin="normal"
            fullWidth
            onChange={(e) => handleChange(e)}
            name="email"
            required
          />
        </div>
        <div className="form-control">
          <TextField
            id="filled"
            label="Enter Password"
            variant="filled"
            type="password"
            sx={{ input: { color: "white" } }}
            margin="normal"
            fullWidth
            onChange={(e) => handleChange(e)}
            name="password"
            required
          />
        </div>
        <div className="form-control">
          <TextField
            id="filled"
            label="Confirm Password"
            variant="filled"
            type="password"
            sx={{ input: { color: "white" } }}
            margin="normal"
            fullWidth
            onChange={(e) => handleConfirmPassword(e)}
            required
          />
        </div>
        <div className="form-control mt-8">
          <Button text={"Register"} type={"submit"} loading={loading} />
        </div>
      </form>
    </div>
  );
}
export default RegisterUserForm;
