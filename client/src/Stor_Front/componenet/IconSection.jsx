import { Box, Container, Divider, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import PaymentIcon from "@mui/icons-material/Payment";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { useMode } from "../them";

const MyBox = ({ icon, text1, text2 }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
      }}
    >
      {icon}
      <Box>
        <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
          {text1}
        </Typography>
        <Typography sx={{ fontSize: "12px" }}>{text2}</Typography>
      </Box>
    </Box>
  );
};

export default function IconSection({theme}) {
  // const [theme, colorMode] = useMode();

  return (
    <Container sx={{mt:1,bgcolor:theme.palette.bg1.main}}>
      <Stack
        direction={"row"}
        sx={{  padding: "30px" }}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <MyBox
          icon={<ElectricBoltIcon sx={{ fontSize: "40px" }} />}
          text1={"Fast Delivery"}
          text2={"Start from 10$"}
        />

        <MyBox
          icon={<WorkspacePremiumIcon sx={{ fontSize: "40px" }} />}
          text1={"Money Guarantie"}
          text2={"7 Days Back"}
        />

        <MyBox
          icon={<AccessAlarmIcon sx={{ fontSize: "40px" }} />}
          text1={"365 Days"}
          text2={"For free return"}
        />

        <MyBox
          icon={<PaymentIcon sx={{ fontSize: "40px" }} />}
          text1={"Payement"}
          text2={"Secure systeme"}
        />
      </Stack>
    </Container>
  );
}
