import React, { createContext, useEffect, useState } from "react";
import Board from "./Board";
import Cookies from "js-cookie";
import { redirect, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function UserPage() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const uid = Cookies.get("uid");

  useEffect(() => {
    axios
      .post(
        "http://localhost:4000/auth/check",
        { uid },
        { withCredentials: true }
      )
      .then((res) => {
        navigate("/board");
        // toast(`Hi ${res.data.firstName}, Welcome Back!`, {
        //   icon: "👋",
        //   style: {
        //     borderRadius: "10px",
        //     background: "#333",
        //     color: "#fff",
        //   },
        // });
      })
      .catch((err) => {
        toast.error("Please Login with email and password");
        navigate("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex w-full justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <Board />
    </div>
  );
}
