import {
  Box,
  // Button,
  Container,
  // Grid,
  Stack,
  // Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
// import img from "../../images/solde2.png";
// import landing_page2 from "../../images/landing_page2.jpeg";
import landing_page1 from "../../images/landing_page1.jpeg";
import bg_landing_page2 from "../../images/bg_landing_page2.png";
import swivel_chair_black_lp from "../../images/infiniti-swivel-chair_black-BG.png";
import swivel_chair_blue_lp from "../../images/infiniti-swivel-chair_blue-BG.png";
import swivel_chair_white_lp from "../../images/infiniti-swivel-chair_white-BG.png";
import swivel_chair_grey_lp from "../../images/infiniti-swivel-chair_grey-BG.png";

// import landing_page1 from "../../../assets/images/landing_page1.jpeg";
import "./landing_page_style.css";
// import Slider from "./Slider";
// import img2 from "../../images/pc.png";
// import img3 from "../../images/sbat.png";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./slider.css";

// import required modules
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import IconSection from "./IconSection";
import { ScrollContext } from "./ScrollContext";

export default function Section() {
  const theme = useTheme();
  console.log(theme.palette.section1);
  const { sectionRef } = useContext(ScrollContext);
  const scrollToSection = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Box sx={{ paddingBottom: "20px" }}>
      <Container
        className="container1"
        sx={{
          // mt: 5,
          // position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 2,
          maxWidth: {
            xs: "100%",
            sm: "100%",
            md: "100%",
            lg: "100%",
            xl: "100%",
          },
          paddingLeft: "0 !important",
          paddingRight: "0 !important",
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
          <SwiperSlide>
            {/* DECOVIB Title for small screens */}
            <div
              className="d-flex flex-column pt-5"
              style={{ backgroundColor: theme.palette.section1.smallScreen.bg }}
            >
              <h2
                className="d-block d-sm-none pt-2 mb-0"
                style={{
                  fontWeight: "600",
                  color: theme.palette.section1.smallScreen.title,
                }}
              >
                DECOVIB
              </h2>
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: theme.palette.section1.smallScreen.subtitle,
                }}
                className="d-block d-sm-none my-0"
              >
                EVERY SPACE TELLS A STORY
              </p>
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "600",
                  color: theme.palette.section1.smallScreen.paragraph,
                }}
                className="px-3 d-block d-sm-none mb-0 mt-3 text-start"
              >
                At DECOVIB, we believe that your home is more than just a space
                to live, it is a place where memories are made.
              </p>

              <div className="d-flex justify-content-center">
                <button
                  onClick={scrollToSection}
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

            {/* DECOVIB Title for large screens */}
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
                  <h3
                    style={{
                      fontWeight: "600",
                      color: theme.palette.section1.leftSide,
                    }}
                  >
                    Decoration Home
                  </h3>
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: "600",
                      color: theme.palette.section1.leftSide,
                    }}
                    className="mt-3"
                  >
                    At DECOVIB, we believe that your home is more than just a
                    space to live, it is a place where memories are made.
                  </p>
                </div>
              </div>

              <button
                onClick={scrollToSection}
                className="btn button_landing_page d-none d-sm-block"
                style={{
                  fontSize: "15px",
                  color: "#fff",
                  fontWeight: "600",
                  width: "150px",
                  height: "30px",
                  marginTop: "15px",
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
                style={{
                  color: theme.palette.section1.rightSide,
                  fontSize: "130px",
                }}
              >
                DE
              </p>
              <p
                className=" mb-0 d-none d-sm-block"
                style={{
                  color: theme.palette.section1.rightSide,
                  fontSize: "130px",
                }}
              >
                CO
              </p>
              <p
                className=" mb-0 d-none d-sm-block"
                style={{
                  color: theme.palette.section1.rightSide,
                  fontSize: "112px",
                }}
              >
                VIB
              </p>
            </Stack>
          </SwiperSlide>
        </Swiper>
      </Container>

      {/*container2*/}
      <Container
        className="container2"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          maxWidth: {
            xs: "100%",
            sm: "100%",
            md: "100%",
            lg: "100%",
            xl: "100%",
          },
          paddingLeft: "0 !important",
          paddingRight: "0 !important",
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
          <SwiperSlide>
            <div
              className="d-flex flex-column py-5 d-block d-sm-none"
              style={{ backgroundColor: "#bab9b5" }}
            >
              <div className="d-flex">
                <div className="col-6 d-flex flex-column">
                  <img
                    src={swivel_chair_blue_lp}
                    alt="a black chair"
                    className="d-block d-sm-none"
                  />
                  <div className="text-center">
                    <p
                      className="fw-bold"
                      style={{
                        fontSize: "15px",
                        color: theme.palette.section1.leftSide,
                      }}
                    >
                      Vibe with Style
                    </p>
                  </div>
                  <div className="text-center">
                    <p style={{ fontSize: "13px", color: "#000" }}>
                      Tradition Meets Trend
                    </p>
                  </div>
                </div>
                <div className="col-6 d-flex flex-column ">
                  <img
                    src={swivel_chair_white_lp}
                    alt="a black chair"
                    className="d-block d-sm-none"
                  />
                  <div className="text-center">
                    <p
                      className="fw-bold"
                      style={{
                        fontSize: "15px",
                        color: theme.palette.section1.leftSide,
                      }}
                    >
                      Live in Elegance
                    </p>
                  </div>
                  <div className="text-center">
                    <p style={{ fontSize: "13px", color: "#000" }}>
                      Harmony in Design
                    </p>
                  </div>
                </div>
              </div>
              <div className="d-flex">
                <div className="col-6 d-flex flex-column ">
                  <img
                    src={swivel_chair_grey_lp}
                    alt="a black chair"
                    className="d-block d-sm-none"
                  />
                  <div className="text-center">
                    <p
                      className="fw-bold"
                      style={{
                        fontSize: "15px",
                        color: theme.palette.section1.leftSide,
                      }}
                    >
                      Crafting Vibes
                    </p>
                  </div>
                  <div className="text-center">
                    <p style={{ fontSize: "13px", color: "#000" }}>
                      Quality Meets Creativity
                    </p>
                  </div>
                </div>
                <div className="col-6 d-flex flex-column ">
                  <img
                    src={swivel_chair_black_lp}
                    alt="a black chair"
                    className="d-block d-sm-none"
                  />
                  <div className="text-center">
                    <p
                      className="fw-bold"
                      style={{
                        fontSize: "15px",
                        color: theme.palette.section1.leftSide,
                      }}
                    >
                      Creating Homes
                    </p>
                  </div>
                  <div className="text-center">
                    <p style={{ fontSize: "13px", color: "#000" }}>
                      Beyond Decor, A Lifestyle
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <img
              src={bg_landing_page2}
              alt="image of a sofa in landing page"
              className="d-none d-sm-block "
            />
            <Stack
              sx={{
                position: "absolute",
                alignItems: "flex-start",
                bottom: "10%",
              }}
            >
              <div className="text-start d-none d-sm-block">
                <div className="d-flex">
                  <div className="col-3 d-flex flex-column">
                    <img
                      src={swivel_chair_blue_lp}
                      alt="a black chair"
                      className="d-none d-sm-block"
                    />
                    <div className="text-center">
                      <p
                        className="fw-bold"
                        style={{
                          fontSize: "15px",
                          color: theme.palette.section1.leftSide,
                        }}
                      >
                        Vibe with Style
                      </p>
                    </div>
                    <div className="text-center">
                      <p style={{ fontSize: "13px", color: "#000" }}>
                        Tradition Meets Trend
                      </p>
                    </div>
                  </div>
                  <div className="col-3 d-flex flex-column ">
                    <img
                      src={swivel_chair_white_lp}
                      alt="a black chair"
                      className="d-none d-sm-block"
                    />
                    <div className="text-center">
                      <p
                        className="fw-bold"
                        style={{
                          fontSize: "15px",
                          color: theme.palette.section1.leftSide,
                        }}
                      >
                        Live in Elegance
                      </p>
                    </div>
                    <div className="text-center">
                      <p style={{ fontSize: "13px", color: "#000" }}>
                        Harmony in Design
                      </p>
                    </div>
                  </div>
                  <div className="col-3 d-flex flex-column ">
                    <img
                      src={swivel_chair_grey_lp}
                      alt="a black chair"
                      className="d-none d-sm-block"
                    />
                    <div className="text-center">
                      <p
                        className="fw-bold"
                        style={{
                          fontSize: "15px",
                          color: theme.palette.section1.leftSide,
                        }}
                      >
                        Crafting Vibes
                      </p>
                    </div>
                    <div className="text-center">
                      <p style={{ fontSize: "13px", color: "#000" }}>
                        Quality Meets Creativity
                      </p>
                    </div>
                  </div>
                  <div className="col-3 d-flex flex-column ">
                    <img
                      src={swivel_chair_black_lp}
                      alt="a black chair"
                      className="d-none d-sm-block"
                    />
                    <div className="text-center">
                      <p
                        className="fw-bold"
                        style={{
                          fontSize: "15px",
                          color: theme.palette.section1.leftSide,
                        }}
                      >
                        Creating Homes
                      </p>
                    </div>
                    <div className="text-center">
                      <p style={{ fontSize: "13px", color: "#000" }}>
                        Beyond Decor, A Lifestyle
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Stack>
            <Stack
              sx={{
                position: "absolute",
                alignItems: "flex-end",
                top: "20%",
              }}
            >
              <p
                className=" mb-0 d-none d-sm-block "
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  color: theme.palette.section1.leftSide,
                }}
              >
                Where every room
              </p>
            </Stack>
          </SwiperSlide>
        </Swiper>
      </Container>
    </Box>
  );
}
