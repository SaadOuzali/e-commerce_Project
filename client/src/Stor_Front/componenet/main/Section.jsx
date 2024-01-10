import {
  Box,
  Button,
  Container,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import formatCurrency from "../../formatCurrency";
import { Shoppigncartcontexte } from "../contexte/CartShoppingContexte";
import request from "../../../components/axios";
import { AxiosError } from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styleSwiper.css";

export default function Section({ theme }) {
  const [swiperRef, setSwiperRef] = useState(null);
  let appendNumber = 4;
  let prependNumber = 1;
  const [data, setData] = useState([]);
  const [value, setValue] = useState(4);
  const shopCtx = useContext(Shoppigncartcontexte);

  if (!shopCtx) throw new Error("Shop context is required");

  const {
    getCartItemsQuantity,
    increaseProductToCart,
    decreaseItemInCart,
    removeItemInCart,
  } = shopCtx;

  const prepend2 = () => {
    swiperRef.prependSlide([
      '<div class="swiper-slide">Slide ' + --prependNumber + "</div>",
      '<div class="swiper-slide">Slide ' + --prependNumber + "</div>",
    ]);
  };

  const prepend = () => {
    swiperRef.prependSlide(
      '<div class="swiper-slide">Slide ' + --prependNumber + "</div>"
    );
  };

  const append = () => {
    swiperRef.appendSlide(
      '<div class="swiper-slide">Slide ' + ++appendNumber + "</div>"
    );
  };

  const append2 = () => {
    swiperRef.appendSlide([
      '<div class="swiper-slide">Slide ' + ++appendNumber + "</div>",
      '<div class="swiper-slide">Slide ' + ++appendNumber + "</div>",
    ]);
  };

  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const data = await request.get("/v1/products/");
        if (data.status === 200) {
          setData(data.data.data);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error);
        }
      }
    };
    fetchproducts();
  }, []);

  return (
    <Container>
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        // justifyContent={"space-between"}
        gap={4}
      >
        {data.length === 0 ? null : (
          <Swiper
            id="products-swiper"
            style={{ margin: "20 0" }}
            onSwiper={setSwiperRef}
            initialSlide={1}
            slidesPerView={3}
            centeredSlides={true}
            spaceBetween={30}
            pagination={{
              type: "fraction",
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {data.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <Stack width={"100%"}>
                    <img src={item.product_img} />
                    <Stack
                      // width={"100%"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <h5 className="mt-3">{item.short_description}</h5>
                      <h6 className="fw-bold">{formatCurrency(item.price)}</h6>

                      {getCartItemsQuantity(item?.id) === 0 ? (
                        <button
                          className="btn btn-outline-dark button_prd_landing_page"
                          onClick={() =>
                            increaseProductToCart(
                              item.id,
                              item.product_img,
                              item.price,
                              item.product_name
                            )
                          }
                        >
                          <AddShoppingCartIcon fontSize="small" />
                          Add to Cart
                        </button>
                      ) : (
                        <>
                          <Box>
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() =>
                                increaseProductToCart(
                                  item.id,
                                  item.product_img,
                                  item.price,
                                  item.product_name
                                )
                              }
                            >
                              +
                            </Button>
                            <Button> {getCartItemsQuantity(item.id)} </Button>
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
                  </Stack>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </Stack>
    </Container>
  );
}
