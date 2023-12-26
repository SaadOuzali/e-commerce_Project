import { Paper } from "@mui/material";
import React from "react";
import Pie from "./Pie";

export default function Row3() {
  return (
    <Paper sx={{ width: "75", height: 500, marginTop:2 }} elevation={6}>
      <Pie />
    </Paper>
  );
}
