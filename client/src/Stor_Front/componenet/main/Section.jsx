import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import img2 from "../../../images/img.jpg";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import formatCurrency from "../../formatCurrency";
import { Shoppigncartcontexte } from "../contexte/CartShoppingContexte";

export default function ({ data, theme }) {
  
  const [value, setValue] = useState(4);
  const {
    cartItems,
    setCartItems,
    getCartItemsQuantity,
    increaseProductToCart,
    decreaseItemInCart,
    removeItemInCart
  } = useContext(Shoppigncartcontexte);

  let quantity = 0;
  // console.log("dial cart items",cartItems);

  return (
    <Container>
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        // justifyContent={"space-between"}
        gap={4}
      >
        {data.map((item, index) => {
          return (
            <Card
              sx={{
                maxWidth: 250,
                ":hover ": { scale: "1.15", transition: "0.15s" },
              }}
            >
              <CardMedia
                sx={{ height: 250 }}
                image={item?.img}
                title="green iguana"
              />
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: theme.palette.bg1.main,
                  height: 180,
                }}
              >
                <Stack
                  width={300}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography
                    gutterBottom
                    variant="h6"
                    color={theme.palette.text.primary}
                    component="div"
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h6"
                    fontWeight={"bold"}
                    component="div"
                    color={theme.palette.text.primary}
                  >
                    {formatCurrency(item.price)}
                  </Typography>
                  <Rating
                    readOnly
                    sx={{ marginBottom: 2 }}
                    name="simple-controlled"
                    // bgcolor={theme.palette.text.primary}
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                  {getCartItemsQuantity(item?.id) === 0 ? (
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{ textTransform: "capitalize" }}
                      onClick={() => increaseProductToCart(item?.id)}
                    >
                      <AddShoppingCartIcon fontSize="small" />
                      Add to Cart
                    </Button>
                  ) : (
                    <>
                      <Box>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => increaseProductToCart(item.id)}
                        >
                          +
                        </Button>
                        <Button> {getCartItemsQuantity(item?.id)} </Button>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => decreaseItemInCart(item.id)}
                        >
                          -
                        </Button>
                      </Box>

                      <Button
                        variant="contained"
                        size="small"
                        sx={{ marginTop: "5px" }}
                        onClick={() => removeItemInCart(item.id)}
                      >
                        Remove
                      </Button>
                    </>
                  )}
                </Stack>
              </CardContent>
            </Card>
          );
        })}
      </Stack>
    </Container>
  );
}
