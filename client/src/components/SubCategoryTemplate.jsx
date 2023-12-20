import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/categories_style.css";
// import SofaImage from "./sofa_1.png";
import { useEffect, useState } from "react";
import axios from "axios";

const SubCategoryTemplate = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/v1/products/");
        const responseData = response.data;
        console.log("Fetched Products: ", responseData);
        setProducts(responseData.data || []);
      } catch (error) {
        console.error("ERROR UGH fetching products data: ", error.message);
      }
    };
    fetchProducts();
  }, []);
  return (
    <>
      <div className="text-center" style={{ height: "100vh" }}>
        <div className="style_category_header">
          <h1>SOFAS</h1>
          <p>Living-Room</p>
        </div>
        <div
          className="row gap-3 mx-auto my-auto mt-5 justify-content-evenly"
          style={{ width: "90%", height: "100%" }}
        >
          {products.map((product, index) => (
            <div
              key={index}
              className="card col-md-4"
              style={{ width: "18rem" }}
            >
              <img
                src={product.product_img}
                className="card-img-top pt-5 pb-3"
                alt={product.product_name}
              />
              <div className="card-body">
                <div className="d-flex justify-content-start">
                  <h5 className="card-title">{product.product_name}</h5>
                </div>
                <div className="d-flex">
                  <p className="col-8 d-flex justify-content-start">
                    {product.sku}
                  </p>
                  <p className="col-4 d-flex justify-content-end">
                    {product.price} dhs
                  </p>
                </div>
                <button
                  className="btn btn-outline-secondary style_button_product d-flex justify-content-start"
                  style={{ borderRadius: "50px" }}
                >
                  View Product
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SubCategoryTemplate;
