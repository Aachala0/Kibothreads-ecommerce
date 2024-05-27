import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import Context from "../../context/data/context";
import Layout from "../../components/Layout/layout";
import Loader from "../../components/Loader/loader";
import { fireDB } from "../../firebase/FirebaseConfig"; // Make sure to import your Firestore configuration

function Order() {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userid = currentUser && currentUser.user ? currentUser.user.uid : null;
  const context = useContext(Context);
  const { mode } = context;

  useEffect(() => {
    if (!currentUser) {
      console.error("No current user found in localStorage");
      navigate("/login"); // Redirect to login page using useNavigate
    } else {
      getOrderData();
    }
  }, []);

  const getOrderData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push({ ...doc.data(), id: doc.id });
      });
      setOrder(ordersArray);
      console.log(ordersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Fetched orders:", order); // Log fetched orders
  }, [order]);

  return (
    <Layout>
      {loading && <Loader />}
      {!loading && order && order.length > 0 ? (
        <div className="h-full pt-10">
          {order
            .filter((obj) => obj.userid === userid)
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
          <h2 className="text-center text-2xl text-white">No Orders</h2>
        )
      )}
    </Layout>
  );
}

export default Order;
