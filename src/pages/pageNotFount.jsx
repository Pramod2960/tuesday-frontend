import { Bird } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="h-screen flex flex-col w-full justify-center items-center">
      <Bird height={150} width={150} />
      <h1 className="text-2xl m-2">404 Page Not Found</h1>
      <Link to="/" className="text-blue-600 underline text-xl">
        Go to Home
      </Link>
    </div>
  );
}
