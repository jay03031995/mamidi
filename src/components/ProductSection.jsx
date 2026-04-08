import React, { useEffect, useState } from "react";
import Addtocart from "./Addtocart";
import BuyNow from "./BuyNow";

const ProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://mamidi-backend.onrender.com/api/products");
        const data = await response.json();
        // assuming your API response has { data: [...] }
        setProducts(data.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center py-16">Loading products...</p>;
  }

  if (products.length === 0) {
    return <p className="text-center py-16">No products available.</p>;
  }

  return (
    <section className="bg-[#C6E6F2] py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-12">
          Made with You in Mind
        </h2>

        {/* Products Row with Horizontal Scroll */}
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-6 w-max">
            {products.map((product, idx) => (
              <div
                key={idx}
                className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col min-w-[300px] max-w-[300px]"
              >
                {/* Product Image */}
                <div className="flex justify-center items-center w-[300px] h-[200px]">
                  <img
                    src={product.main} // ensure your backend sends the correct image URL
                    alt={product.title}
                    className="h-[200px] w-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div className="flex gap-5 items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900">
                      {product.title}
                    </h3>
                    <p className="text-gray-900">{product.price}</p>
                  </div>

                  <div className="flex justify-end">
                    <div className="flex gap-3 mt-4 w-[200px]">
                   <Addtocart product={product} quantity={1} />
                     <BuyNow productId={product._id}/>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
