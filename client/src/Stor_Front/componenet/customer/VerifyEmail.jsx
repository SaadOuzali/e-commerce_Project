// import { useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import request from "../../../components/axios";

import { Box, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MailIcon from "@mui/icons-material/Mail";
import { Button } from "bootstrap";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerifyEmail = () => {
  let query = useQuery();
  let status = query.get("status");
  let message = query.get("message");
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate("/home/login");
  };

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <MailIcon sx={{ fontSize: "150px", mb: 2 }} />
      {status === "success" ? (
        <div>
          <Typography
            variant="h4"
            style={{ fontFamily: "Montserrat" }}
            className="fw-bold"
          >
            Your account is validated!
          </Typography>
          <p className="px-5 pt-3">
            Congratulations on successfully verifying your email, and a
            heartfelt welcome to DECOVIB! We are thrilled to have you join our
            vibrant community. With your new account, you are all set to explore
            and enjoy the full range of features and services we offer. To get
            started, simply click on the Go To Login button below and sign in to
            embark on your exciting journey with us. Welcome aboard!
          </p>
          <button
            onClick={handleGoToLogin}
            style={{
              marginTop: "20px",
              color: "white",
              fontFamily: "Montserrat",
              fontWeight: "bold",
              marginLeft: "20px",
              marginBottom: "20px",
              backgroundColor: "#43a047",
              borderColor: "transparent",
              padding: "10px 20px",
              borderRadius: "4px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#43a047", // darker shade on hover
              },
              "&:active": {
                backgroundColor: "#388e3c", // darker color on click
              },
              "& .MuiButton-endIcon": {
                marginLeft: "8px", // Space between text and icon
              },
            }}
          >
            Go to Login
          </button>
        </div>
      ) : status === "already_validated" ? (
        <div>
          <Typography
            variant="h5"
            style={{ fontFamily: "Montserrat" }}
            className="fw-bold"
          >
            This account has already been validated.
          </Typography>
          <p style={{ marginTop: "10px" }}>
            Looks like you have already verified your email. You can proceed to
            login.
          </p>
          <button
            onClick={handleGoToLogin}
            style={{
              marginTop: "20px",
              color: "white",
              fontFamily: "Montserrat",
              fontWeight: "bold",
              marginLeft: "20px",
              marginBottom: "20px",
              backgroundColor: "#43a047",
              borderColor: "transparent",
              padding: "10px 20px",
              borderRadius: "4px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#43a047", // darker shade on hover
              },
              "&:active": {
                backgroundColor: "#388e3c", // darker color on click
              },
              "& .MuiButton-endIcon": {
                marginLeft: "8px", // Space between text and icon
              },
            }}
          >
            Go to Login
          </button>
        </div>
      ) : (
        <div>
          <Typography
            variant="h4"
            color="red"
            style={{ fontFamily: "Montserrat" }}
            className="fw-bold"
          >
            Verification Failed: {message}
          </Typography>
          <button
            onClick={handleGoToLogin}
            style={{
              marginTop: "20px",
              color: "white",
              fontFamily: "Montserrat",
              fontWeight: "bold",
              marginLeft: "20px",
              marginBottom: "20px",
              backgroundColor: "#43a047",
              borderColor: "transparent",
              padding: "10px 20px",
              borderRadius: "4px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#43a047", // darker shade on hover
              },
              "&:active": {
                backgroundColor: "#388e3c", // darker color on click
              },
              "& .MuiButton-endIcon": {
                marginLeft: "8px", // Space between text and icon
              },
            }}
          >
            Go to Login
          </button>
        </div>
      )}
    </Box>
  );
};

export default VerifyEmail;
