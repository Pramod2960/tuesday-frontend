import { ArrowRight } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import toast from "react-hot-toast";

function Signup() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      console.log("hii");
      console.log(
        `firstname- ${firstName}, lastname- ${lastName}, email-${email}, password- ${password}`
      );
      const res = await axios.post(
        "http://localhost:4000/auth/signup",
        {
          firstName,
          lastName,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (res) {
        toast.success("successfully sign-up. Please login");
      }
      navigate("/Login");
      console.log(res);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <Header />
      <section>
        <div className="mt-20 flex justify-center">
          <h2 className="text-4xl">Create your account</h2>
        </div>
        <div className="flex justify-center mt-7">
          <p>Enter your details below</p>
        </div>
        <form method="post">
          <div className=" flex flex-col justify-center border-gray-500">
            <div className="flex justify-center">
              <input
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                name="firstName"
                placeholder="Harshita"
                className="flex justify-center border border-gray-600 m-4 w-80 p-2 rounded-md"
              />
            </div>
            <div className="flex justify-center">
              <input
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                name="lastName"
                placeholder="Vishnoi"
                className="flex justify-center border border-gray-600 mt-1 m-4 w-80 p-2 rounded-md"
              />
            </div>
            <div className="flex justify-center">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                placeholder="Example@compnay.com"
                className="flex justify-center border border-gray-600 mt-1 m-4 w-80 p-2 rounded-md"
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
              <Link to="/Login">
                <button
                  onClick={handleSignup}
                  type="submit"
                  className="bg-sky-600 px-4 py-2 text-white hover:bg-sky-800 w-80 p-2 rounded-md"
                >
                  <div className="flex  justify-center items-center gap-1 hover:scale-110 ">
                    Signup <ArrowRight height={20} width={25} />
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </form>
        <div className="flex mt-2 justify-center items-center">
          <div className="w-1/4 mt-10">
            <hr className="relative flex border-gray-400 py-5 " />
          </div>
          <div className="w-1/6 p-0 m-0">
            <p className="flex justify-center text-center">
              Already have account
            </p>
          </div>
          <div className="w-1/4   mt-10">
            <hr className="relative flex border-gray-400 py-5 " />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex justify-center m-3">
            <Link to="/Login">
              <button
                type="submit"
                className="bg-sky-600 px-4 py-2 text-white hover:bg-sky-800 w-80 p-2 rounded-md"
              >
                <div className="flex  justify-center items-center gap-1 hover:scale-110 ">
                  Login <ArrowRight height={20} width={25} />
                </div>
              </button>
            </Link>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <p>Can't log in ?</p>
          <p>visit our help center</p>
        </div>
      </section>
    </>
  );
}

export default Signup;
