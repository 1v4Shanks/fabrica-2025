import React, { useContext, useEffect, useState } from "react";
import "./Product.css";
import { useParams } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import { assets } from "../../assets/assets";
import Title from "../../components/Title/Title";
import ProductItem from "../../components/ProductItem/ProductItem";
import { toast } from "react-toastify";

function Product() {
  // Context and Route
  const { products, currency, mainRef, cartItems, setCartItems } = useContext(ShopContext);
  const { productId } = useParams();

  // State
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState(null);
  const [size, setSize] = useState("");
  const [sizeError, setSizeError] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  // Fetch Product Data
  const fetchProductData = () => {
    const product = products.find((p) => p._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  };

  // Scroll to Top on Product Change
  useEffect(() => {
    if (mainRef?.current) {
      mainRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [productId]);

  // Get Product on Load or Products Update
  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  // Filter Related Products
  const filterRelatedProducts = () => {
    const category = productData.category.toLowerCase();
    const keywords = productData.keywords.map((keyword) =>
      keyword.toLowerCase()
    );

    const filteredProducts = products.filter((product) => {
      const matchCategory = product.category.toLowerCase() === category;
      const matchKeywords = product.keywords.some((keyword) =>
        keywords.includes(keyword.toLowerCase())
      );
      return matchCategory && matchKeywords;
    });

    setRelatedProducts(filteredProducts.slice(0, 5));
  };

  // Get Related Products
  useEffect(() => {
    if (!productData || !products) return;
    filterRelatedProducts();
  }, [productData, products]);

  // Size Handler
  const handleSize = (size) => {
    setSize(size);
    setSizeError(false);
  };

  // Add to Cart Handler
  const handleAddToCart = (product, selectedSize) => {
    if (!size) {
      setSizeError(true);
      return;
    }

   setCartItems((prevCart)=> {
    const existingIndex = prevCart.findIndex((item)=> item._id === product._id && item.size === selectedSize);
    if(existingIndex !== -1){
     return prevCart.map((item)=> {
        if(item._id === product._id && item.size === selectedSize){
          return {...item, quantity:item.quantity + 1}
        }else{
          return item;
        }
      });
    }else{
      return [...prevCart,
        {
          _id:product._id,
          name:product.name,
          price:product.price,
          size:selectedSize,
          quantity: 1,
          image:product.image[0],
        }
      ]
    }
   })
   toast.success('Item added to cart!');
  };

  if (!productData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-container">
      {/* Product Content */}
      <div className="product-content-box">
        {/* Product Images */}
        <div className="product-image-container">
          <ul className="thumbnail-list">
            {productData.image.map((img, index) => (
              <li key={index}>
                <img
                  className="thumbnail-list-image"
                  src={img}
                  alt={`thumbnail-${index}`}
                  onClick={() => setImage(img)}
                />
              </li>
            ))}
          </ul>

          <div className="main-image-container">
            <img src={image} alt={productData.name} className="main-image" />
          </div>
        </div>

        {/* Product Details */}
        <div className="product-details-container">
          <h2 className="product-title">{productData.name}</h2>

          <div className="product-rating">
            <img src={assets.star_icon} alt="star" />
            <img src={assets.star_icon} alt="star" />
            <img src={assets.star_icon} alt="star" />
            <img src={assets.star_icon} alt="star" />
            <img src={assets.star_dull_icon} alt="star dull" />
            <p className="rating-count">(144)</p>
          </div>

          <p className="product-price">
            {currency}
            {productData.price}
          </p>

          <p className="product-description">{productData.description}</p>

          {/* Size Selection */}
          <div className="product-size-section">
            <p className="product-size-label">Select Size</p>
            {sizeError && (
              <p className="size-error-msg">Please select a size</p>
            )}

            <div className="product-size-buttons">
              {productData.sizes.map((s, index) => (
                <button
                  key={index}
                  className={`product-size-button ${
                    size === s ? "size-selected" : ""
                  } ${sizeError ? "shake" : ""}`}
                  onClick={() => handleSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button className="product-add-to-cart-btn" onClick={()=>handleAddToCart(productData,size)}>
            ADD TO CART
          </button>

          <hr />

          <div className="product-info">
            <p className="product-info-item">100% Original product.</p>
            <p className="product-info-item">
              Cash on delivery is available on this product.
            </p>
            <p className="product-info-item">
              Easy return and exchange policy within 7 days.
            </p>
          </div>
        </div>
      </div>

      {/* Description and Reviews */}
      <div className="product-description-and-reviews-container">
        <div className="description-and-reviews">
          <p className="description-title">Description</p>
          <p className="reviews-title">Reviews (144)</p>
        </div>

        <div className="description">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <div className="related-products-container">
        <div className="title">
          <Title text1={"RELATED"} text2={"PRODUCTS"} />
        </div>

        <div className="related-products">
          {relatedProducts.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              image={item.image[0]}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Product;
