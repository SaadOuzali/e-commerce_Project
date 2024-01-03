// import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import "../styles/categories_style.css";
import SofaImage from "./sofa_1.png";
// import TableImage from "./table_2.png";
// import WallArtImage from "./wall_art.png";
// import axios from "axios";
import { mainAxiosInstance } from "../config/api";

const CategoryTemplate = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await mainAxiosInstance.get(
          "http://localhost:3000/v1/categories/"
        );
        const responseData = response.data;
        console.log("Fetched categories: ", responseData);
        setCategories(responseData.categories);
      } catch (error) {
        console.error("ERROR UGH fetching Categories data: ", error.message);
      }
    };
    fetchCategories();
  }, []);

  const renderCorrespondingId = (order) => {
    switch (order) {
      case 0:
        return "columnSubOneToHover";

      case 1:
        return "columnSubTwoToHover";

      case 2:
        return "columnSubThreeToHover";

      default:
        return "columnSubTwoToHover";
    }
  };

  return (
    <>
      <div className="text-center" style={{ height: "100vh" }}>
        <div className="style_category_header">
          <h1>LIVING ROOM</h1>
        </div>
        <div className="row" style={{ height: "100%" }}>
          {categories.map((category, index) => (
            <div
              key={index}
              className="col-md-3 col-sm-3 col-12 columnsToHover"
              id={renderCorrespondingId(index)}
            >
              <div
                className="container ms-3 d-flex flex-column align-items-start"
                style={{ marginTop: 100, height: "100%" }}
              >
                <div style={{ height: "30%" }}>
                  <h1 className="h1_header" style={{ fontSize: 60 }}>
                    0{index + 1}
                  </h1>
                </div>
                <div>
                  <h3 className="fw-bold m-0">{category.category_name}</h3>
                </div>
                <div>
                  <p>{category.category_name} for Living Room</p>
                </div>
                <div className="mt-4">
                  <button
                    // style={style_button}
                    type="button"
                    className="fw-bold btn btn-sm btn-outline-secondary mb-3 style_button"
                  >
                    View Products
                  </button>
                </div>
                <div className="image mt-5">
                  <img src={SofaImage} alt="sofa_image" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryTemplate;
