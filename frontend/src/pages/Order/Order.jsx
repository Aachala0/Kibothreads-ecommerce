import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import Context from "../../context/data/context";
import Layout from "../../components/Layout/layout";
import Loader from "../../components/Loader/loader";
import { fireDB } from "../../firebase/FirebaseConfig";

function Order() {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const context = useContext(Context);
  const { mode } = context;

  useEffect(() => {
    const currentUserString = localStorage.getItem("user"); // Make sure the key matches what is set during login
    console.log("currentUserString from localStorage:", currentUserString);

    if (!currentUserString) {
      console.error("No current user found in localStorage");
      navigate("/login"); // Redirect to login page using useNavigate
      return;
    }

    let currentUser;
    try {
      currentUser = JSON.parse(currentUserString);
    } catch (error) {
      console.error("Error parsing currentUser from localStorage:", error);
      navigate("/login");
      return;
    }

    if (!currentUser || !currentUser.user || !currentUser.user.uid) {
      console.error("Invalid currentUser structure:", currentUser);
      navigate("/login");
      return;
    }

    getOrderData(currentUser.user.uid);
  }, [navigate]);

  const getOrderData = async (userid) => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push({ ...doc.data(), id: doc.id });
      });
      setOrder(ordersArray);
      console.log("Fetched orders:", ordersArray);
    } catch (error) {
      console.log("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {loading && <Loader />}
      {!loading && order.length > 0 ? (
        <div className="h-full pt-10">
          {order
            .filter(
              (obj) =>
                obj.userid === JSON.parse(localStorage.getItem("user")).user.uid
            )
            .map((order) => (
              <div
                key={order.id}
                className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0"
              >
                {order.cartItems.map((item, index) => (
                  <div key={index} className="rounded-lg md:w-2/3">
                    <div
                      className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                      style={{
                        backgroundColor: mode === "dark" ? "#282c34" : "",
                        color: mode === "dark" ? "white" : "",
                      }}
                    >
                      <img
                        src={item.imageUrl}
                        alt="product-image"
                        className="w-full rounded-lg sm:w-40"
                      />
                      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                        <div className="mt-5 sm:mt-0">
                          <h2
                            className="text-lg font-bold text-gray-900"
                            style={{
                              color: mode === "dark" ? "white" : "",
                            }}
                          >
                            {item.title}
                          </h2>
                          <p
                            className="mt-1 text-xs text-gray-700"
                            style={{
                              color: mode === "dark" ? "white" : "",
                            }}
                          >
                            {item.description}
                          </p>
                          <p
                            className="mt-1 text-xs text-gray-700"
                            style={{
                              color: mode === "dark" ? "white" : "",
                            }}
                          >
                            {item.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      ) : (
        !loading && (
          <h2
            className="text-center text-2xl"
            style={{ color: mode === "dark" ? "white" : "black" }}
          >
            No Orders
          </h2>
        )
      )}
    </Layout>
  );
}

export default Order;
