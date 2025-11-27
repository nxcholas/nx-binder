import Button from "../components/Button";
import MainContent from "../components/MainContent";
import Navbar from "../components/Navbar";
import TextField from "@mui/material/TextField";
import toast from "react-hot-toast";
import { useState } from "react";
import api from "../lib/axios.mjs";
import RegisterUserForm from "../components/RegisterUserForm";

function Register() {

  return (
    <div>
      <Navbar />
      <MainContent>
        {/* render content here */}
      <RegisterUserForm />
      </MainContent>
    </div>
  );
}
export default Register;
