import React, { useContext } from "react";
import Context from "../../../context/data/context";

function AddProduct() {
  const context = useContext(Context);
  const { products, setProducts, addProduct } = context;
  return (
    <div>
      <div className=" flex justify-center bg-orange-400 items-center h-screen">
        <div className=" bg-white px-10 py-10 rounded-xl w-3/4 ">
          <div className="">
            <h1 className="text-center text-black text-xl mb-4 font-bold">
              Add Product
            </h1>
          </div>
          <div>
            <input
              onChange={(e) =>
                setProducts({ ...products, title: e.target.value })
              }
              value={products.title}
              type="text"
              name="title"
              className=" bg-white border border-secondary mb-4 px-2 py-2 w-full rounded-lg text-black placeholder:text-muted outline-none"
              placeholder="Product title"
            />
          </div>
          <div>
            <input
              onChange={(e) =>
                setProducts({ ...products, price: e.target.value })
              }
              value={products.price}
              type="text"
              name="price"
              className=" bg-white border border-secondary mb-4 px-2 py-2 w-full rounded-lg text-black placeholder:text-muted outline-none"
              placeholder="Product price"
            />
          </div>
          <div>
            <input
              onChange={(e) =>
                setProducts({ ...products, imageUrl: e.target.value })
              }
              value={products.imageUrl}
              type="text"
              name="imageurl"
              className=" bg-white border border-secondary mb-4 px-2 py-2 w-full rounded-lg text-black placeholder:text-muted outline-none"
              placeholder="Product imageUrl"
            />
          </div>
          <div>
            <input
              onChange={(e) =>
                setProducts({ ...products, category: e.target.value })
              }
              value={products.category}
              type="text"
              name="category"
              className=" bg-white border border-secondary mb-4 px-2 py-2 w-full rounded-lg text-black placeholder:text-muted outline-none"
              placeholder="Product category"
            />
          </div>
          <div>
            <textarea
              cols="30"
              rows="5"
              onChange={(e) =>
                setProducts({ ...products, description: e.target.value })
              }
              name="title"
              className=" bg-white border border-secondary mb-4 px-2 py-2 w-full rounded-lg text-black placeholder:text-muted outline-none"
              placeholder="Product description"
            ></textarea>
          </div>
          <div className=" flex justify-center mb-3">
            <button
              className=" bg-orange-400 w-full text-black font-bold  px-2 py-2 rounded-lg"
              onClick={addProduct}
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
