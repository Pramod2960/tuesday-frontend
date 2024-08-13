import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Username and password is required");
    }
    axios
      .post(
        "http://localhost:4000/auth/login/",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        navigate("/board");
      })
      .catch((err) => {
        toast.error("wrong password or username");
      });
  };

  return (
    <>
      <Header />
      <section className="">
        <div className="mt-20 flex justify-center">
          <h2 className="text-4xl">Log in to your account</h2>
        </div>
        <div className="flex justify-center mt-7">
          <p>Enter your work email address</p>
        </div>
        <form method="post">
          <div className=" flex flex-col justify-center border-gray-500">
            <div className="flex justify-center">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                placeholder="Example@compnay.com"
                className="flex justify-center border border-gray-600 m-4 w-80 p-2 rounded-md"
              />
            </div>
            <div className="flex justify-center">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                placeholder="password"
                className="flex justify-center border border-gray-600 mt-1 m-4 w-80 p-2 rounded-md"
              />
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleLogin}
                type="submit"
                className="bg-sky-600 px-4 py-2 text-white hover:bg-sky-800 w-80 p-2 rounded-md"
              >
                <div className="flex  justify-center items-center gap-1 hover:scale-110 ">
                  Next <ArrowRight height={20} width={25} />
                </div>
              </button>
            </div>
          </div>
        </form>
        <div className="flex mt-2 justify-center items-center">
          <div className="w-1/4 mt-10">
            <hr className="relative flex border-gray-400 py-5 " />
          </div>
          <div className="w-1/6 p-0 m-0">
            <p className="flex justify-center text-center">Or Sign in with</p>
          </div>
          <div className="w-1/4   mt-10">
            <hr className="relative flex border-gray-400 py-5 " />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <p>Don't have and account yet?</p>
          <a href="/Signup">signup</a>
        </div>
        <div className="flex justify-center items-center">
          <p>Can't log in ?</p>
          <p>
            visit our help center
            {/* <a href="#">Visit our help center</a> */}
          </p>
        </div>
      </section>
    </>
  );
}

export default Login;
