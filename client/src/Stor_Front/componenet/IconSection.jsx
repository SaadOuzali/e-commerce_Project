import {
  Box,
  Container,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import PaymentIcon from "@mui/icons-material/Payment";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { useMode } from "../them";
import pinkSofaLandingPage from "../../images/pinkSofa-removebg.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { ScrollContext } from "./ScrollContext";

const MyBox = ({ icon, text1, text2 }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        alignItems: "center",
        justifyContent: { xs: "start", md: "center" },
        marginBottom: { xs: "15px", md: "15px", lg: 0 },
        gap: 3,
      }}
    >
      <div style={{ backgroundColor: "#b7c0c9", borderRadius: "5px" }}>
        {icon}
      </div>
      <Box>
        <p className="fw-bold m-0" style={{ fontSize: "15px" }}>
          {text1}
        </p>
        <p className="m-0" style={{ fontSize: "13px" }}>
          {text2}
        </p>
      </Box>
    </Box>
  );
};

export default function IconSection({ theme }) {
  // const [theme, colorMode] = useMode();
  const { sectionRef } = useContext(ScrollContext);
  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Container sx={{ mt: 1, bgcolor: theme.palette.bg1.main }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          sx={{ padding: "30px" }}
          divider={
            <Divider
              orientation={{ xs: "horizontal", md: "vertical" }}
              flexItem
            />
          }
        >
          <MyBox
            icon={
              <ElectricBoltIcon sx={{ fontSize: "40px", padding: "8px" }} />
            }
            text1={"Fast Delivery"}
            text2={"Start from 10dhs"}
          />
          <MyBox
            icon={
              <WorkspacePremiumIcon sx={{ fontSize: "40px", padding: "8px" }} />
            }
            text1={"Money Guarantee"}
            text2={"7 Days Back"}
          />
          <MyBox
            icon={<AccessAlarmIcon sx={{ fontSize: "40px", padding: "8px" }} />}
            text1={"365 Days"}
            text2={"For free return"}
          />
          <MyBox
            icon={<PaymentIcon sx={{ fontSize: "40px", padding: "8px" }} />}
            text1={"Payment"}
            text2={"Secure systeme"}
          />
        </Stack>
      </Container>
      <Container
        className="container2 py-5"
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          bgcolor: "#E8DFD8",
          gap: 2,
          maxWidth: {
            xs: "100%",
            sm: "100%",
            md: "100%",
            lg: "100%",
            xl: "100%",
          },
          // paddingLeft: "0 !important",
          // paddingRight: "0 !important",
        }}
      >
        <div>
          <img
            src={pinkSofaLandingPage}
            alt="image of a sofa in landing page"
            className="d-none d-md-block"
          />
        </div>
        <Stack
          sx={{
            position: { xs: "relative", md: "absolute" },
            alignItems: "flex-start",
            left: { md: "5%" },
            top: { md: "25%" },
            width: "100%",
            padding: { xs: "0 20px", md: 0 },
          }}
        >
          <div className="d-flex">
            <div className="col-md-5 text-start">
              <h3
                style={{
                  fontWeight: "600",
                  fontSize: { xs: "1.5rem", md: "inherit" },
                }}
              >
                Simplify your home furniture
              </h3>
              <p style={{ fontSize: "15px", color: "black" }} className="mt-3">
                Explore the art of fine living with our exclusive furniture
                collections. Each piece is a blend of comfort, design, and
                durability, meant to bring a new definition of elegance to your
                home.
              </p>
              <button
                className="mt-md-5 mt-3 "
                style={{
                  backgroundColor: "rgb(115 46 75)",
                  borderColor: "white",
                  color: "white",
                  padding: "8px 32px",
                  textAlign: "center",
                  textDecoration: "none",
                  display: "inline-block",
                  fontSize: "15px",
                  cursor: "pointer",
                  borderRadius: "50px",
                  transition: "all 0.3s ease 0s",
                }}
                onClick={scrollToSection}
              >
                Explore Our Collection
              </button>
            </div>
          </div>
        </Stack>
      </Container>
    </>
  );
}
