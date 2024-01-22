import {
  Box,
  Container,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import "./toggle.css";
import blackSwivelDetails from "../../../images/blackswivel.jpeg";
import blackSwivel from "../../../images/blackswivelHAHA.jpeg";
import marronclairSwivel from "../../../images/marronclairSwivel.jpg";
import marronclairSwivelDetails from "../../../images/marronClairSwivelDetails.jpg";
import marronSwivelDetails from "../../../images/marronSwivelDetails.png";
import marronSwivel from "../../../images/marronSwivel.png";
import redSwivelDetails from "../../../images/redSwivelDetails.png";
import redSwivel from "../../../images/redSwivel.png";

import Section from "./Section";

export default function Main({ theme, data }) {
  const [alignment, setAlignment] = React.useState("web");
  const [imageSrc1, setImageSrc1] = useState(blackSwivel);
  const [imageSrc2, setImageSrc2] = useState(marronclairSwivel);
  const [imageSrc3, setImageSrc3] = useState(marronSwivel);
  const [imageSrc4, setImageSrc4] = useState(redSwivel);

  // const [data, setData] = React.useState([
  //   {id:0, title: "Jeans", price: 15,img:img1 },
  //   {id:1, title: "T-Shirt", price: 10,img:img2 },
  //   { id:2,title: "Nike", price: 75,img:img3 },
  //   {id:3, title: "Denim Jeans", price: 15,img:img3 },
  //   {id:4, title: "Robe", price: 5  ,img:img3 },
  //   {id:5, title: "Bracelet", price: 15 ,img:img3 },
  //   { id:6,title: "Jordan", price: 100 ,img:img3 },
  //   { id:7,title: "Jordan", price: 150 ,img:img3 },

  // ]);
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <>
      <div className="mt-5 px-md-0 px-5">
        <h3
          className="fw-bold text-center"
          style={{ color: theme.palette.section4.title }}
        >
          Creating a Narrative of Home and Harmony
        </h3>
        <h3
          className="text-center"
          style={{ color: theme.palette.section4.subtitle }}
        >
          Offering Reassurance and Reliability
        </h3>
      </div>
      <div className="d-flex flex-wrap gap-3 my-md-5 mx-4 container2">
        <div
          className="col-12 col-lg-3 d-flex flex-column custom-card"
          style={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            // width: "23%",
          }}
        >
          <div className="text-center">
            <img
              width={"80%"}
              src={imageSrc1}
              alt="image of a sofa in landing page"
              onMouseEnter={() => setImageSrc1(blackSwivelDetails)}
              onMouseLeave={() => setImageSrc1(blackSwivel)}
            />
          </div>
          <p
            className="text-center fw-bold mt-1 mb-1"
            style={{ color: theme.palette.section4.box1.title }}
          >
            Indulge
          </p>
          <div
            className="mx-auto mb-3"
            style={{
              borderRadius: "50px",
              backgroundColor: theme.palette.section4.box1.subtitleBG,
              width: "160px",
              height: "30px",
            }}
          >
            <p className="text-center fw-bold small m-0 pt-1 ">In Luxury</p>
          </div>
        </div>
        <div
          className="col-12 col-lg-3 d-flex flex-column custom-card"
          style={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            // width: "23%",
          }}
        >
          <div className="text-center">
            <img
              width={"80%"}
              src={imageSrc2}
              alt="image of a sofa in landing page"
              onMouseEnter={() => setImageSrc2(marronclairSwivelDetails)}
              onMouseLeave={() => setImageSrc2(marronclairSwivel)}
            />
          </div>
          <p
            className="text-center fw-bold mt-1 mb-1"
            style={{ color: theme.palette.section4.box2.title }}
          >
            Imagine
          </p>
          <div
            className="mx-auto mb-3"
            style={{
              borderRadius: "50px",
              backgroundColor: theme.palette.section4.box2.subtitleBG,
              width: "160px",
              height: "30px",
            }}
          >
            <p className="text-center fw-bold small m-0 pt-1">Cozy Evenings</p>
          </div>
        </div>
        <div
          className="col-12 col-lg-3 d-flex flex-column custom-card"
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            // width: "23%",
          }}
        >
          <div className="text-center">
            <img
              // height={"185px"}
              width={"65%"}
              src={imageSrc3}
              alt="image of a sofa in landing page"
              onMouseEnter={() => setImageSrc3(marronSwivelDetails)}
              onMouseLeave={() => setImageSrc3(marronSwivel)}
            />
          </div>
          <p
            className="text-center fw-bold mt-1 mb-1"
            style={{ color: theme.palette.section4.box3.title }}
          >
            Cherish
          </p>
          <div
            className="mx-auto mb-3"
            style={{
              borderRadius: "50px",
              backgroundColor: theme.palette.section4.box3.subtitleBG,
              width: "160px",
              height: "30px",
            }}
          >
            <p className="text-center fw-bold small m-0 pt-1">Family Moments</p>
          </div>
        </div>
        <div
          className="col-12 col-lg-3 d-flex flex-column custom-card"
          style={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            // width: "23%",
          }}
        >
          <div className="text-center">
            <img
              width={"80%"}
              src={imageSrc4}
              alt="image of a sofa in landing page"
              onMouseEnter={() => setImageSrc4(redSwivelDetails)}
              onMouseLeave={() => setImageSrc4(redSwivel)}
            />
          </div>
          <p
            className="text-center fw-bold mt-1 mb-1"
            style={{ color: theme.palette.section4.box4.title }}
          >
            Personalize
          </p>
          <div
            className="mx-auto mb-3"
            style={{
              borderRadius: "50px",
              backgroundColor: theme.palette.section4.box4.subtitleBG,
              width: "160px",
              height: "30px",
            }}
          >
            <p className="text-center fw-bold small m-0 pt-1">Your Space</p>
          </div>
        </div>
      </div>
      <Container sx={{ mt: 5 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }} // Stack direction changes on small screens
          alignItems={{ xs: "stretch", sm: "center" }} // Align items stretch to take full width on small screens
          justifyContent={"space-between"}
          spacing={{ xs: 2, sm: 0 }} // Add spacing between elements on small screens
        ></Stack>
        <Stack sx={{ marginTop: 8 }}>
          <Section theme={theme} />
        </Stack>
      </Container>
    </>
  );
}
