import React, { useContext, useEffect, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { BsCartCheckFill } from "react-icons/bs";
import myContext from "../../../context/data/context";
import Layout from "../../../components/Layout/layout";
import DashboardTab from "./DashboardTab";
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../../../firebase/FirebaseConfig";

function Dashboard() {
  const context = useContext(myContext);
  const { mode } = context;

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersSnapshot = await getDocs(collection(fireDB, "users"));
        const ordersSnapshot = await getDocs(collection(fireDB, "orders"));
        const productsSnapshot = await getDocs(collection(fireDB, "products"));

        setTotalUsers(usersSnapshot.size);
        setTotalOrders(ordersSnapshot.size);
        setTotalProducts(productsSnapshot.size);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <section className="text-gray-600 body-font mt-10 mb-10">
        <div className="container px-5 mx-auto mb-10">
          <div className="flex flex-wrap -m-4 text-center">
            <div className="p-4 ml-40 md:w-1/4 sm:w-1/2 w-full">
              <div
                className="border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300 px-4 py-3 rounded-xl"
                style={{
                  backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <div className="text-purple-500 w-12 h-12 mb-3 inline-block">
                  <AiFillProduct size={50} />
                </div>
                <h2
                  className="title-font font-medium text-3xl text-black fonts1"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  {totalProducts}
                </h2>
                <p
                  className="text-purple-500 font-bold"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Total Products
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div
                className="border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300 px-4 py-3 rounded-xl"
                style={{
                  backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <div className="text-purple-500 w-12 h-12 mb-3 inline-block">
                  <BsCartCheckFill size={50} />
                </div>
                <h2
                  className="title-font font-medium text-3xl text-black fonts1"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  {totalOrders}
                </h2>
                <p
                  className="text-purple-500 font-bold"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Total Orders
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div
                className="border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300 px-4 py-3 rounded-xl"
                style={{
                  backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <div className="text-purple-500 w-12 h-12 mb-3 inline-block">
                  <FaUserTie size={50} />
                </div>
                <h2
                  className="title-font font-medium text-3xl text-black fonts1"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  {totalUsers}
                </h2>
                <p
                  className="text-purple-500 font-bold"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Total Users
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <DashboardTab />
    </Layout>
  );
}

export default Dashboard;
