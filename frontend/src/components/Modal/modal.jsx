import { Dialog, Transition } from "@headlessui/react";
import { useEffect } from "react";
import { Fragment, useState, useContext } from "react";
import { fireDB } from "../../firebase/FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import Context from "../../context/data/context";
import { toast } from "react-toastify";
import { ESEWA_TEST_PID, ESEWA_URL, ESEWA_SCD } from "../Esewa/esewa";

let form = null;

export default function Modal({ cart }) {
  let [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const context = useContext(Context);
  const { loading, setLoading } = context;

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  // Function to handle placing the order
  const handleOrderNow = async () => {
    setLoading(true);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userid =
      currentUser && currentUser.user ? currentUser.user.uid : null;
    const order = {
      name,
      address,
      pincode,
      mobileNumber,
      orderDate: new Date(),
      status: "Pending",
      cartItems: cart, // Ensure that cart prop is used here
      userid: userid,
    };

    try {
      // Add the order to the orders collection
      const orderRef = await addDoc(collection(fireDB, "orders"), order);
      toast.success("Order placed successfully");

      // Clear the form fields and close the modal
      setName("");
      setAddress("");
      setPincode("");
      setMobileNumber("");
      closeModal();

      // Log the order ID for reference
      console.log("Order placed with ID: ", orderRef.id);
    } catch (error) {
      console.error("Error adding order: ", error);
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  const [params, setParams] = useState({
    amt: 100,
    psc: 0,
    pdc: 0,
    txAmt: 0,
    tAmt: 100,
    pid: ESEWA_TEST_PID,
    scd: ESEWA_SCD,
    su: "https://d2evy.csb.app/success",
    fu: "https://d2evy.csb.app/failed",
  });

  useEffect(() => {
    post();
  });

  const post = () => {
    form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", ESEWA_URL);

    for (var key in params) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    // form.submit();
  };
  const handleSubmit = () => {
    form.submit();
  };

  return (
    <>
      <div className="  text-center rounded-lg text-white font-bold">
        <button
          type="button"
          onClick={openModal}
          className="w-full  bg-orange-400 py-2 text-center rounded-lg text-white font-bold bg-orange-400"
        >
          Buy Now
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md m-20 transform overflow-hidden rounded-2xl p-2  text-left align-middle shadow-xl transition-all bg-gray-50">
                  <section className="">
                    <div className="flex flex-col items-center justify-center py-8 mx-auto  lg:py-0">
                      <div className="w-full  rounded-lg md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                          <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                              <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900"
                              >
                                Enter Full Name
                              </label>
                              <input
                                type="name"
                                name="name"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                                required
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900"
                              >
                                Enter Full Address
                              </label>
                              <input
                                type="text"
                                name="address"
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                                required
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="pincode"
                                className="block mb-2 text-sm font-medium text-gray-900"
                              >
                                Enter Pincode
                              </label>
                              <input
                                type="text"
                                name="pincode"
                                id="pincode"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                                required
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="mobileNumber"
                                className="block mb-2 text-sm font-medium text-gray-900"
                              >
                                Enter Mobile Number
                              </label>
                              <input
                                type="text"
                                name="mobileNumber"
                                id="mobileNumber"
                                value={mobileNumber}
                                onChange={(e) =>
                                  setMobileNumber(e.target.value)
                                }
                                className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                                required
                              />
                            </div>
                          </form>
                          <button
                            onClick={(closeModal, handleOrderNow)}
                            type="button"
                            className="focus:outline-none w-full text-white bg-orange-400 bg-orange-400 hover:bg-orange-500  outline-0 font-medium rounded-lg text-sm px-5 py-2.5 "
                          >
                            Order Now
                          </button>

                          <button
                            onClick={handleSubmit}
                            type="button"
                            className="focus:outline-none w-full text-white bg-lime-600 hover:bg-lime-700  outline-0 font-medium rounded-lg text-sm px-5 py-2.5 "
                          >
                            Pay Via Esewa
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
