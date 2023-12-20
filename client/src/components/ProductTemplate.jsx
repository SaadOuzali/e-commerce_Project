// import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/categories_style.css";
import SofaImage from "./sofa_1.png";

const ProductTemplate = () => {
  return (
    <>
      <div className="text-center" style={{ height: "100vh" }}>
        <div className="style_category_header">
          <h1>Product</h1>
        </div>
        <div className="row " style={{ height: "100%" }}>
          <div
            className="col-md-6 "
            style={{ backgroundColor: "rgb(160 167 177)" }}
          >
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ margin: "auto", height: "100%" }}
            >
              <img src={SofaImage} alt="sofa_image" />
            </div>
          </div>
          <div className="col-md-6 ">
            <div
              className="d-flex justify-content-start align-items-start"
              style={{ margin: "auto", height: "100%" }}
            >
              <div className="ms-5 mt-5">
                <div className="d-flex justify-content-start">
                  <h2 style={{ fontWeight: "700" }}>Name of the product</h2>
                </div>
                <div className="pt-1 mb-5 d-flex justify-content-start">
                  <h5 style={{ fontWeight: "700", color: "#858484" }}>
                    150.00$
                  </h5>
                </div>
                <div className="mt-5 d-flex justify-content-start">
                  <p className="text-start" style={{ fontWeight: "500" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
                <div className="d-flex justify-content-start">
                  <p
                    className="text-start"
                    style={{ fontWeight: "300", color: "#858484" }}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Deleniti, aut. Ratione animi cupiditate ipsam eos inventore,
                    optio quo? Dolor expedita laudantium iure perferendis nisi
                    maxime exercitationem nam. Temporibus, odit sed.
                  </p>
                </div>
                <div className="mt-5 d-flex justify-content-start">
                  <button className="style_button_product btn btn-outline-secondary">
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductTemplate;
