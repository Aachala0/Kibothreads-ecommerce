import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Context from "../../context/data/context";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import Loader from "../../components/Loader/loader";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const context = useContext(Context);
  const { loading, setLoading } = context;

  const signup = async () => {
    setLoading(true);
    if (name === "" || email === "" || password === "") {
      setLoading(false); // Stop loading if fields are empty
      return toast.error("All fields are required");
    }

    try {
      const users = await createUserWithEmailAndPassword(auth, email, password);

      const user = {
        name: name,
        uid: users.user.uid,
        email: users.user.email,
        time: Timestamp.now(),
      };
      const userRef = collection(fireDB, "users");
      await addDoc(userRef, user);

      toast.success("Signup Successfully"); // Show success message
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
      toast.error("Signup Failed"); // Show error message
    } finally {
      setLoading(false); // Ensure loading is stopped
    }
  };

  return (
    <div className="flex justify-center bg-orange-400 items-center h-screen">
      {loading && <Loader />}
      <div className="bg-white px-10 py-10 rounded-xl w-3/4 lg:w-1/2">
        <div className="">
          <h1 className="text-center text-black text-xl mb-4 font-bold">
            Sign Up
          </h1>
        </div>
        <div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="name"
            name="name"
            className="bg-white mb-4 px-2 py-2 w-full rounded-lg text-black border border-dark placeholder:text-muted outline-none"
            placeholder="Username"
          />
        </div>
        <div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            className="bg-white mb-4 px-2 py-2 w-full rounded-lg text-black border border-dark placeholder:text-muted outline-none"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="bg-white mb-4 px-2 py-2 w-full rounded-lg text-black border border-dark placeholder:text-muted outline-none"
            placeholder="Password"
          />
        </div>
        <div className="flex justify-center mb-3">
          <button
            className="bg-orange-400 w-full text-black font-bold px-2 py-2 rounded-lg"
            onClick={signup}
          >
            Signup
          </button>
        </div>
        <div>
          <h2 className="text-black">
            Already have an account{" "}
            <Link className="text-orange-400 font-bold" to={"/login"}>
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Signup;
