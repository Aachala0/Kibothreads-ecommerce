import React, { useContext } from "react";
import Layout from "../../components/Layout/layout";
import Context from "../../context/data/context";
import HeroSection from "../../components/Hero/HeroSection";
import Filter from "../../components/Filter/filter";
import ProductCard from "../../components/ProductCard/productCard";

function Home() {
  return (
    <Layout>
      <HeroSection />
      <Filter />
      <ProductCard />
    </Layout>
  );
}

export default Home;
