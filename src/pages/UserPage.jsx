import React, { createContext, useEffect, useState } from "react";
import Board from "./Board";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function UserPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const uid = Cookies.get("uid-client");

    if (!uid) {
      navigate("/login");
      toast.error("unauthorized access. Please Login");
    }
  }, [navigate]);

  return (
    <div>
      <Board />
    </div>
  );
}
