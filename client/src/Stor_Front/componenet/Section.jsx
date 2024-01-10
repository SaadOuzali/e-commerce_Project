import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import img from "../../images/solde2.png";
import landing_page2 from "../../images/landing_page2.jpeg";
import landing_page1 from "../../images/landing_page1.jpeg";
// import landing_page1 from "../../../assets/images/landing_page1.jpeg";
import "./landing_page_style.css";
import Slider from "./Slider";
import img2 from "../../images/pc.png";
import img3 from "../../images/sbat.png";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./slider.css";

// import required modules
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import IconSection from "./IconSection";

export default function Section() {
  const theme = useTheme();
  return (
    <Box sx={{ paddingTop: "20px", paddingBottom: "20px" }}>
      <Container
        sx={{
          // mt: 5,
          // position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Swiper
          id="slider"
          loop={true}
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {/* <SwiperSlide>
            <img src={img} />
            <Stack
              sx={{
                position: "absolute",
                alignItems: "flex-start",
                left: "40px",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "20px" }}>
                LIFESTYLE COLLECTION
              </Typography>
              <p>LIFESTYLE COLLECTION</p>
              <Typography variant="caption" sx={{ fontSize: "40px" }}>
                MEN
              </Typography>
              <p>MEN</p>
              <Stack direction={"row"} spacing={1}>
                <Typography variant="caption" sx={{ fontSize: "25px" }}>
                  SALE UP TO
                </Typography>
                <p>SALE UP TO</p>
                <Typography
                  variant="caption"
                  sx={{ fontSize: "25px", color: "#D23F57" }}
                >
                  30 % OFF
                </Typography>
                <p style={{ color: "#D23F57" }}>30 % OFF</p>
              </Stack>
              <Typography sx={{ fontSize: "12px" }}>
                Get Free Shipping on orders over 99$
              </Typography>
              <p>Get Free Shipping on orders over 99$</p>
              <Button
                variant="outlined"
                sx={{ color: "#fff", mt: 1, backgroundColor: "#222" }}
              >
                <Link sx={{ color: "#fff" }}>
                  <p>Shop Now ►</p>
                </Link>
              </Button>
            </Stack>
          </SwiperSlide> */}
          {/*this code is working but NOT responsive*/}
          <SwiperSlide>
            {/* DECOVIB Title for small screens */}
            <div className="d-flex flex-column pt-5">
              <h2
                className="d-block d-sm-none pt-2 mb-0"
                style={{ fontWeight: "600" }}
              >
                DECOVIB
              </h2>
              {/* <h3 className="d-block d-sm-none mb-0">Decoration Home</h3> */}
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#D23F57",
                }}
                className="d-block d-sm-none my-0"
              >
                EVERY SPACE TELLS A STORY
              </p>
              <p
                style={{ fontSize: "15px", fontWeight: "600", color: "grey" }}
                className="px-3 d-block d-sm-none mb-0 mt-3 text-start"
              >
                At DECOVIB, we believe that your home is more than just a space
                to live, it is a place where memories are made.
              </p>

              <div className="d-flex justify-content-center">
                <button
                  className="btn button_landing_page d-block d-sm-none mt-4 mb-5"
                  style={{
                    borderRadius: "0",
                    fontSize: "12px",
                    backgroundColor: "#2b3445",
                    color: "#fff",
                    fontWeight: "600",
                  }}
                >
                  Shop Now
                </button>
              </div>
            </div>
            <img
              src={landing_page1}
              alt="image of a sofa in landing page"
              className="d-none d-sm-block"
            />
            <Stack
              sx={{
                position: "absolute",
                alignItems: "flex-start",
                left: "5%",
              }}
            >
              <div className="d-flex">
                <div className="col-5 text-start d-none d-sm-block">
                  <h4 style={{ fontWeight: "600" }}>Decoration Home</h4>
                  <p
                    style={{ fontSize: "12px", fontWeight: "600" }}
                    className="mt-3"
                  >
                    At DECOVIB, we believe that your home is more than just a
                    space to live, it is a place where memories are made.
                  </p>
                </div>
              </div>

              <button
                className="btn button_landing_page d-none d-sm-block"
                style={{
                  fontSize: "12px",
                  color: "#fff",
                  fontWeight: "600",
                }}
              >
                Shop Now
              </button>
            </Stack>
            <Stack
              sx={{
                position: "absolute",
                alignItems: "flex-end",
                right: "8%",
              }}
            >
              <p
                className=" mb-0 d-none d-sm-block"
                style={{ color: "#E8E5DF", fontSize: "100px" }}
              >
                DE
              </p>
              <p
                className=" mb-0 d-none d-sm-block"
                style={{ color: "#E8E5DF", fontSize: "100px" }}
              >
                CO
              </p>
              <p
                className=" mb-0 d-none d-sm-block"
                style={{ color: "#E8E5DF", fontSize: "86px" }}
              >
                VIB
              </p>
            </Stack>
          </SwiperSlide>

          {/* <SwiperSlide>
            <img src={landing_page1} />
          </SwiperSlide> */}
        </Swiper>

        {/* <Box>
          <Box position={"relative"}>
            <img src={img2} width={"300px"} height={"90%"} />
            <Stack
              sx={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                left: "4px",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "20px" }}>
                COMPUTER
              </Typography>
              <Typography variant="caption" sx={{ fontSize: "16px" }}>
                SALE 30% OFF
              </Typography>
              <Typography
                variant="caption"
                sx={{ fontSize: "16px", fontWeight: "bold" }}
              >
                <Link sx={{ "&:hover": { color: "primary" } }}>Shop Now ►</Link>
              </Typography>
            </Stack>
          </Box>
          <Box marginTop={1} position={"relative"}>
            <img src={img3} width={"300px"} />
            <Stack
              sx={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                left: "4px",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "18px" }}>
                NEW ARRIVALS
              </Typography>
              <Typography variant="caption" sx={{ fontSize: "16px" }}>
                SUMMER
              </Typography>
              <Typography variant="caption" sx={{ fontSize: "16px" }}>
                SALE 20% OFF
              </Typography>
              <Typography
                variant="caption"
                sx={{ fontSize: "16px", fontWeight: "bold" }}
              >
                <Link sx={{ "&:hover": { color: "primary" } }}>Shop Now ►</Link>
              </Typography>
            </Stack>
          </Box>
        </Box> */}
      </Container>
    </Box>
  );
}
