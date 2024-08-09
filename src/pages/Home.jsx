import Header from "../components/Header";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";

function Home() {
  return (
    <section>
      <div>
        <Header />
      </div>
      <div
        className="h-screen"
        style={{
          position: "relative",
          flexGrow: 1,
          backgroundImage: "url('/background_image.svg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "right top",
          zIndex: 0,
          marginTop: "0px",
        }}
      >
        <div className="block md:flex">
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center h-full ">
            <div
              style={{
                display: "flex",
                marginTop: "30%",

                justifyContent: "center",
                alignItems: "center", // Center content vertically
                fontSize: "40px",
                fontWeight: "bold",
                color: "black",
                textAlign: "center",
              }}
            >
              <Typewriter
                options={{
                  strings: [
                    "Organize, Prioritize, Achieve.",
                    "Stay Focus, Stay Productive.",
                    "From To-Do to Done.",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
            <div className="text-2xl font-light">
              Simplify life for both you and your team. <br />
              manager and to-do list app.
            </div>
            <div>
              <Link to="/login">
                <button
                  className=" flex rounded-full mt-5 bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white
px-4 p-2  pb-4 w-fit text-3xl md:text-3xl drop-shadow-xl"
                >
                  Getting Started
                </button>
              </Link>
            </div>
          </div>
          <div className="flex w-full md:w-1/2 justify-center items-center mt-auto p-10 rounded-md drop-shadow-2xl">
            <img src="/tuesday.png" className="rouned-lg " />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
