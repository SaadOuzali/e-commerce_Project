// import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "./register_style.css";
import home_decor_image_1 from "./home_decor_image_1.jpeg";
import { useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";
import request from "../../../components/axios";
import { Customercontexte } from "../Parent";
import { AxiosError } from "axios";

const LoginTemplate = () => {
  const { customer, setCustomer } = useContext(Customercontexte);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log("contexte ", customer);

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const response = await request.post("v1/customers/login", {
          email,
          password,
        });
        console.log("reponse", response);
        if (response.status === 200) {
          // setCustomer({customerData:response.data.data,iscustConnected:true})
          setCustomer((prev) => {
            return {
              ...prev,
              customerData: response.data.data,
              iscustConnected: true,
            };
          });
          navigate("/home/customer/profile");
          // console.log(response.data.data.first_name);
          toast.success(
            `Login success. Welcome ${response.data.data.first_name}!`
          );
        }
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          if (error.response.status === 400) {
            toast.error(error.response.data.message || "Logain failed");
          } else if (error.response.status === 401) {
            toast.error(error.response.data.message || "Logain failed");
          } else if (error.response.status === 404) {
            toast.error(error.response.data.message || "Logain failed");
          }
        } else {
          toast.error("Error: " + error.message);
        }
      }
    },
    [email, password]
  );
  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-sm-8 col-12" style={{ backgroundColor: "white" }}>
            <div style={{ padding: "5%" }}>
              <div className="text-center">
                <h2 className="fw-bold">Welcome back!</h2>
              </div>
              <form onSubmit={handleLogin}>
                <div className="row mt-sm-5 mt-0 mb-5 justify-content-center">
                  <input
                    type="text"
                    className="form-control mt-5 input-form-register"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control mt-3 input-form-register"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mt-5 text-center pb-5">
                  <button
                    type="submit"
                    className="black_button fw-bold mt-sm-5 mt-0"
                  >
                    SIGN IN
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-sm-4 col-12 p-0" style={{ position: "relative" }}>
            <div
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${home_decor_image_1})`,
                backgroundSize: "cover",
                height: "100%",
                position: "relative",
              }}
            >
              <div
                className="overlay-text"
                style={{ height: "100%", padding: "10%" }}
              >
                <div className="text-center">
                  <h2 className="fw-bold text-light">New here?</h2>
                </div>
                <div className="row" style={{ height: "100%" }}>
                  <div className="mt-5">
                    <h6 className="text-center text-light">
                      Sign Up Now to Uncover the Latest in Trendy Home Decor!
                    </h6>
                  </div>
                  <div className="mt-5 text-center d-flex align-items-center mb-5 justify-content-center">
                    <button
                      className="white_button fw-bold"
                      onClick={() => navigate("/home/signup")}
                    >
                      SIGN UP
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginTemplate;
