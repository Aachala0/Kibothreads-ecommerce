import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout/layout";
import Context from "../../context/data/context";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/cartSlice";
import { fireDB } from "../../firebase/FirebaseConfig";
import { addToWish } from "../../redux/wishSlice";

function ProductInfo() {
  const context = useContext(Context);
  const { loading, setLoading } = context;

  const [products, setProducts] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const params = useParams();

  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", params.id));
      setProducts(productTemp.data());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const wishItems = useSelector((state) => state.wish);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    localStorage.setItem("wish", JSON.stringify(wishItems));

    if (products) {
      const productInWishlist = wishItems.some(
        (item) => item.id === products.id
      );
      setIsInWishlist(productInWishlist);
    }
  }, [cartItems, wishItems, products]);

  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Added to cart");
  };

  const addWish = (product) => {
    if (!isInWishlist) {
      dispatch(addToWish(product));
      toast.success("Added to wishlist");
      setIsInWishlist(true);
    }
  };

  return (
    <Layout>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-10 mx-auto">
          {products && (
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="product"
                className="lg:w-1/3 w-full lg:h-auto object-cover object-center rounded"
                src={products.imageUrl}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  KIBOTHREADS
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {products.title}
                </h1>

                <p className="leading-relaxed border-b-2 mb-5 pb-5">
                  {products.description}
                </p>

                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    Rs. {products.price}
                  </span>
                  <button
                    onClick={() => addCart(products)}
                    className="flex ml-auto text-white bg-orange-400 border-0 py-2 px-6 focus:outline-none hover:bg-orange-500 rounded"
                  >
                    Add To Cart
                  </button>
                  <button
                    onClick={() => addWish(products)}
                    className={`rounded-full w-10 h-10 p-0 border-0 inline-flex items-center justify-center ml-4 ${
                      isInWishlist ? "text-red-500" : "text-gray-500"
                    }`}
                    disabled={isInWishlist}
                  >
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default ProductInfo;
