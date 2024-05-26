import { Link } from "react-router-dom";
import Context from "../../context/data/context";
import { useContext, useState } from "react";
import { auth } from "../../firebase/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Loader from "../../components/Loader/loader";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const context = useContext(Context);
  const { loading, setLoading } = context;

  const login = async () => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("user", JSON.stringify(result));
      toast.success("Login Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      window.location.href = "/";
      setLoading(false);
    } catch (error) {
      toast.error("Login Failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
    }
  };
  return (
    <div className=" flex justify-center bg-orange-400 items-center h-screen">
      {loading && <Loader />}
      <div className=" bg-white px-10 py-10 rounded-xl ">
        <div className="">
          <h1 className="text-center text-black text-xl mb-4 font-bold">
            Login
          </h1>
        </div>
        <div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            className=" bg-white mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black border border-dark placeholder:text-muted outline-none"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className=" bg-white mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black border border-dark placeholder:text-muted outline-none"
            placeholder="Password"
          />
        </div>
        <div className=" flex justify-center mb-3">
          <button
            className=" bg-orange-400 w-full text-black font-bold  px-2 py-2 rounded-lg"
            onClick={login}
          >
            Login
          </button>
        </div>
        <div>
          <h2 className="text-black">
            Don't have an account{" "}
            <Link className=" text-orange-400 font-bold" to={"/signup"}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Login;
