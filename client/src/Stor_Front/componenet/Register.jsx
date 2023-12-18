import {
  Avatar,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useMemo } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function Register() {
  const theme= useTheme()
 
  return (
    <Stack justifyContent={"center"} bgcolor={"#f5f5f5"} height={748}>
      <Stack width={480} margin={"auto"} height={748} spacing={3} bgcolor={"#fff"} justifyContent={"center"} borderRadius={3}  >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
        </Box>
        <Typography textAlign={"center"} fontSize={"25px"}>
          Sign Up
        </Typography>
        <Stack direction={"row"} spacing={3} justifyContent={"center"}>
          <TextField
            sx={{ width: 200 }}
            autoComplete="given-name"
            name="first Name"
            required
            fullWidth
            label="First Name"
            autoFocus
            helperText="first name"
          />
          <TextField
            sx={{ width: 200 }}
            autoComplete="given-name"
            name="last Name"
            required
            fullWidth
            label="Last Name"
            autoFocus
            helperText="last name"
          />
        </Stack>
        <Box textAlign={"center"}>
          <TextField
            sx={{ width: 420 }}
            autoComplete="given-name"
            name="email"
            required
            fullWidth
            label="Email"
            autoFocus
            helperText="email"
          />
        </Box>
        <Box textAlign={"center"}>
          <TextField
            sx={{ width: 420 }}
            autoComplete="given-name"
            name="password"
            required
            fullWidth
            label="Password"
            helperText="password"

            autoFocus
          />
        </Box>
        <Box width={500} textAlign={"center"}>
          <Button variant="contained" sx={{width:420}}>Create Account</Button>
        </Box>
      </Stack>
    </Stack>
  );
}
