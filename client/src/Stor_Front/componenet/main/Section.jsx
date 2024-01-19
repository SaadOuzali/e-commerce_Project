import {
  Box,
  Button,
  Container,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
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
import { ScrollContext } from "../ScrollContext";

export default function Section({ theme }) {
  const [swiperRef, setSwiperRef] = useState(null);
  let appendNumber = 4;
  let prependNumber = 1;
  const [data, setData] = useState([]);
  const [value, setValue] = useState(4);
  const shopCtx = useContext(Shoppigncartcontexte);
  const ref = useRef(null);
  const { setSectionRef } = useContext(ScrollContext);

  useEffect(() => {
    setSectionRef(ref);
  }, [setSectionRef]);

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
    <>
      <div className="mb-4">
        <h3 className="text-center fw-bold">
          Inviting Exploration and Discovery
        </h3>
        <h5 className="text-center mx-5 px-5">
          Sit. Feel the warmth. Embrace the calm. And enjoy the journey to
          making your space a true embodiment of your dreams.
        </h5>
      </div>
      <Container ref={ref} className="container2">
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
                  <SwiperSlide className="my-custom-slide mb-5" key={item.id}>
                    <Stack width={"100%"}>
                      <img src={item.product_img} />
                      <Stack
                        // width={"100%"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <h5 className="mt-3">{item.product_name}</h5>
                        <h6 className="fw-bold">
                          {formatCurrency(item.price)}
                        </h6>
                        {getCartItemsQuantity(item?.id) === 0 ? (
                          <button
                            className=" mt-3"
                            style={{
                              backgroundColor: "#000",
                              borderColor: "white",
                              color: "white",
                              padding: "8px 32px",
                              textAlign: "center",
                              textDecoration: "none",
                              display: "inline-block",
                              fontSize: "14px",
                              cursor: "pointer",
                              borderRadius: "10px",
                              transition: "all 0.3s ease 0s",
                            }}
                            onClick={() =>
                              increaseProductToCart(
                                item.id,
                                item.product_img,
                                item.price,
                                item.product_name
                              )
                            }
                          >
                            <AddShoppingCartIcon
                              fontSize="small"
                              sx={{ paddingRight: "8px" }}
                            />
                            Add to Cart
                          </button>
                        ) : (
                          <div className="mt-3">
                            <Box>
                              <button
                                className="quantity-button increase-button"
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
                              </button>
                              <button className="quantity-display">
                                {getCartItemsQuantity(item.id)}
                              </button>
                              <button
                                className="quantity-button decrease-button"
                                onClick={() => decreaseItemInCart(item.id)}
                              >
                                -
                              </button>
                            </Box>
                            <button
                              style={{ width: "75%" }}
                              className="remove-button mt-1"
                              onClick={() => removeItemInCart(item.id)}
                            >
                              x
                            </button>
                          </div>
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
    </>
  );
}
