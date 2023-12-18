import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import formatCurrency from "../formatCurrency";
import CloseIcon from "@mui/icons-material/Close";
import { Shoppigncartcontexte } from "./contexte/CartShoppingContexte";

export default function Shoppingcart({ id, quantity, data }) {
    const {removeItemInCart}=useContext(Shoppigncartcontexte)
  const totalprice = (price, quantity) => {
    const total = price * quantity;
    return formatCurrency(total);
  };
  const findproduct = data.find((prd) => prd.id === id);
  if (!findproduct) return null;
  return (
    <>
      

      <Stack spacing={10} direction={"row"} alignItems={"center"} height={120}>
        <img src={findproduct.img} width={80} />
        <Stack >
          <Typography fontWeight={"700"} fontSize={14}>
            {findproduct.title}
          </Typography>
          <h6 style={{ margin: 0, color: "#a9a9a9" }}>
            {formatCurrency(findproduct.price)}*{quantity}
          </h6>
          <Typography color={"#dc143c"}>
            {totalprice(findproduct.price, quantity)}
          </Typography>
        </Stack>
        <IconButton
        sx={{
          width: "40px",
          ":hover": { color: "#dc143c" },
          display: "felx",
          justifyContent: "flex-end",
        }}
        onClick={()=>removeItemInCart(id)}
      >
        <CloseIcon />
      </IconButton>
      </Stack>
      <Divider />
    </>
  );
}
