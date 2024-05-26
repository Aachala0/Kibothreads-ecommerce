import React, { useContext } from "react";
import Context from "../../context/data/context";
import Layout from "../../components/Layout/layout";
import Loader from "../../components/Loader/loader";

function Order() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userid = currentUser?.user?.uid;
  const context = useContext(Context);
  const { mode, loading, order } = context;

  // Ensure the component handles missing or undefined currentUser gracefully
  if (!currentUser) {
    return (
      <Layout>
        <div className="text-center text-2xl text-red-500">
          Please log in to view your orders.
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {loading && <Loader />}
      {order.length > 0 ? (
        <div className="h-full pt-10">
          {order
            .filter((obj) => obj.userid === userid)
            .map((order) => (
              <div
                key={order.id}
                className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0"
              >
                {order.cartItems.map((item) => (
                  <div key={item.id} className="rounded-lg md:w-2/3">
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
        <h2 className="text-center text-2xl text-white">No Orders</h2>
      )}
    </Layout>
  );
}

export default Order;
