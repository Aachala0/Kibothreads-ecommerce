import React, { useContext } from "react";
import Context from "../../context/data/context";

function Filter() {
  const context = useContext(Context);
  const {
    mode,
    searchkey,
    setSearchkey,
    filterCategory,
    setFilterCategory,
    filterPrice,
    setFilterPrice,
    product: initialProduct, // Store initial product data for reset
  } = context;

  // Function to reset filters
  const resetFilters = () => {
    setSearchkey(""); // Reset search key
    setFilterCategory(""); // Reset filter category
    setFilterPrice(""); // Reset filter price
  };

  return (
    <div>
      <div className=" container mx-auto px-4 mt-5 ">
        <div
          className="p-5 rounded-lg bg-gray-100 drop-shadow-xl border border-gray-200"
          style={{
            backgroundColor: mode === "dark" ? "#282c34" : "",
            color: mode === "dark" ? "white" : "",
          }}
        >
          <div className="relative">
            {/* Search input */}
            <div className="absolute flex items-center ml-2 h-full">
              {/* Search icon */}
              <svg
                className="w-4 h-4 fill-current text-primary-gray-dark"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* SVG path for search icon */}
              </svg>
            </div>
            <input
              type="text"
              name="searchkey"
              value={searchkey}
              onChange={(e) => setSearchkey(e.target.value)}
              id="searchkey"
              placeholder="Search here"
              className="px-8 py-3 w-full rounded-md bg-violet-0 border-transparent outline-0 text-sm"
              style={{
                backgroundColor: mode === "dark" ? "rgb(64 66 70)" : "",
                color: mode === "dark" ? "white" : "",
              }}
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <p className="font-medium">Filters</p>
            {/* Reset Filter button */}
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-gray-50hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              Reset Filter
            </button>
          </div>
          <div>
            {/* Filter options */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
              {/* Filter by category */}
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-3 w-full rounded-md bg-gray-50 border-transparent outline-0 focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                style={{
                  backgroundColor: mode === "dark" ? "rgb(64 66 70)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                {/* Map through initial product data to generate options */}
                {initialProduct.map((item, index) => {
                  return <option value={item.category}>{item.category}</option>;
                })}
              </select>
              {/* Filter by price */}
              <select
                value={filterPrice}
                onChange={(e) => setFilterPrice(e.target.value)}
                className="px-4 py-3 w-full rounded-md bg-gray-50 border-transparent outline-0  focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                style={{
                  backgroundColor: mode === "dark" ? "rgb(64 66 70)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                {/* Map through initial product data to generate options */}
                {initialProduct.map((item, index) => {
                  return <option value={item.price}>{item.price}</option>;
                })}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
