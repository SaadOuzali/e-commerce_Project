import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import backgroundImg from "../images/img2.jpg";
import { toast } from "react-toastify";
import usercontext from '../context/AuthContext'
import { useLocation, useNavigate } from "react-router-dom";

import request from './axios'

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide() {
 
  const user=useContext(usercontext);
  const navigate=useNavigate()
  const [signin, setSignin] = useState({ email: "", password: "" });
  const {state} =useLocation()
  console.log("dial state",state);


  // function handle submit
  const handleSubmit =async  (e) => {
    e.preventDefault();
    try {
        // const response=await fetch("http://localhost:3000/v1/users/login", {
        //       method: "POST",
        //       headers: {
        //         "Content-type": "application/json",
        //         origin: "*",
        //       },
        //       body: JSON.stringify({
        //         email: signin.email,
        //         password: signin.password,
        //       }),
        //     })
        // const data=await response.json()
        
        const User={
          email: signin.email,
          password: signin.password,
        };
        const {data}=await request.post("/v1/users/login",User)
        console.log(data);
        if(data?.status=="Failed"){
            data.error?.forEach((d)=>toast.error(d.msg));
            return;
        }
        if(data?.status=="failed"){
            // data.error?.forEach((d)=>toast.error(d.msg));
            toast.error(data.Error)
            return;
        }
        toast.success('authentication success');
        user.userdata.Data=data?.data;
        user.userdata.isConnected=true;
        // console.log(user.userdata);
    
        console.log("dial state",state?.path);
        // navigate(state?.path);
        navigate("/");

    } catch (error) {
        toast.error(error?.message)
        console.error('dial hadi error',error);
    }
    
    // fetch("http://localhost:3000/v1/users/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //     origin: "*",
    //   },
    //   body: JSON.stringify({
    //     email: signin.email,
    //     password: signin.password,
    //   }),
    // })
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((res) => {
    //     if (res.status == "failed") {
    //       toast.error("res.error.msg");
    //       return;
    //     }
    //     console.log(res);
    //     if (res.status == "success") {
    //       // user.userdata.Data=res.data;
    //       // user.userdata.isConnected=true;
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("hnaaaaa", err);
    //   });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${backgroundImg})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                autoSave
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={signin.email}
                onChange={({ target }) =>
                  setSignin((prev) => {
                    console.log(target.value);
                    return { ...prev, email: target.value };
                  })
                }
              />
              <TextField
                autoSave

                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={signin.password}
                onChange={({ target }) =>
                  setSignin((prev) => {
                    return { ...prev, password: target.value };
                  })
                }
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/users/register" variant="body2">
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
