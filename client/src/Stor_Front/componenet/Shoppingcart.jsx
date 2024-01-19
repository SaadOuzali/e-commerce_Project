import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import formatCurrency from "../formatCurrency";
import CloseIcon from "@mui/icons-material/Close";
import { Shoppigncartcontexte } from "./contexte/CartShoppingContexte";

export default function Shoppingcart({ id, img, price, title, quantity }) {
  const { removeItemInCart } = useContext(Shoppigncartcontexte);
  const totalprice = (price, quantity) => {
    const total = price * quantity;
    return formatCurrency(total);
  };
  // const findproduct = data.find((prd) => prd.id === id);
  // if (!findproduct) return null;
  return (
    <>
      <Stack spacing={3} direction={"row"} alignItems={"center"} height={120}>
        <img src={img} width={80} />
        <Stack>
          <p className="fw-bold my-0" style={{ fontSize: "14px" }}>
            {title}
          </p>
          <p className="my-0" style={{ color: "#a9a9a9", fontSize: "14px" }}>
            {formatCurrency(price)}*{quantity}
          </p>
          <p
            className="my-0 fw-bold"
            style={{ color: "#dc143c", fontSize: "14px" }}
          >
            {totalprice(price, quantity)}
          </p>
        </Stack>
        <IconButton
          sx={{
            width: "40px",
            ":hover": { color: "#dc143c" },
            display: "felx",
            justifyContent: "flex-end",
          }}
          onClick={() => removeItemInCart(id)}
        >
          <CloseIcon />
        </IconButton>
      </Stack>
      <Divider />
    </>
  );
}
