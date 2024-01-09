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
    <Box sx={{ padding: "30px" }}>
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
          <SwiperSlide>
            <img src={img} />
            <Stack
              sx={{
                position: "absolute",
                alignItems: "flex-start",
                left: "40px",
              }}
            >
              {/* <Typography variant="caption" sx={{ fontSize: "20px" }}>
                LIFESTYLE COLLECTION
              </Typography> */}
              <p>LIFESTYLE COLLECTION</p>
              {/* <Typography variant="caption" sx={{ fontSize: "40px" }}>
                MEN
              </Typography> */}
              <p>MEN</p>
              <Stack direction={"row"} spacing={1}>
                {/* <Typography variant="caption" sx={{ fontSize: "25px" }}>
                  SALE UP TO
                </Typography> */}
                <p>SALE UP TO</p>
                {/* <Typography
                  variant="caption"
                  sx={{ fontSize: "25px", color: "#D23F57" }}
                >
                  30 % OFF
                </Typography> */}
                <p style={{ color: "#D23F57" }}>30 % OFF</p>
              </Stack>
              {/* <Typography sx={{ fontSize: "12px" }}>
                Get Free Shipping on orders over 99$
              </Typography> */}
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
          </SwiperSlide>
          <SwiperSlide>
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
              <Typography variant="caption" sx={{ fontSize: "40px" }}>
                MEN
              </Typography>
              <Stack direction={"row"} spacing={1}>
                <Typography variant="caption" sx={{ fontSize: "25px" }}>
                  SALE UP TO
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ fontSize: "25px", color: "#D23F57" }}
                >
                  30 % OFF
                </Typography>
              </Stack>
              <Typography sx={{ fontSize: "12px" }}>
                Get Free Shipping on orders over 99$
              </Typography>
              <Box>
                <Button
                  variant="outlined"
                  sx={{ color: "#fff", mt: 1, backgroundColor: "#222" }}
                >
                  <Link sx={{ color: "#fff" }}>Shop Now ►</Link>
                </Button>
              </Box>
            </Stack>
          </SwiperSlide>

          <SwiperSlide>
            <img src={img} />
          </SwiperSlide>
        </Swiper>

        <Box>
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
        </Box>
      </Container>
    </Box>
  );
}
