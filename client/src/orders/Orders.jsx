import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import request from "../components/axios";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Stack } from "@mui/material";
import DetailsIcon from "@mui/icons-material/Details";
import ModalOrder from "./ModalOrder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import PendingIcon from "@mui/icons-material/Pending";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import WarehouseIcon from "@mui/icons-material/Warehouse";
export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = React.useState([]);
  const [search, setSearch] = React.useState("");

  //   choice icon
  const Choice_Icon = (status) => {
    if (status === "Processing") {
      return {
        component: <WarehouseIcon />,
        status,
        color: "#cf6a94",
        backgroundColor: "#e9c7c4",
      };
    } else if (status === "Shipped") {
      return {
        component: <DeliveryDiningIcon />,
        status,
        color: "#7f7e7e",
        backgroundColor: "#c7c7c7",
      };
    } else if (status === "Delivered") {
      return {
        component: <DoneOutlineIcon />,
        status,
        color: "#d79c5f",
        backgroundColor: "#f2dec6",
      };
    } else {
      return {
        component: <PendingIcon />,
        status,
        color: "#899f84",
        backgroundColor: "#d7ead3",
      };
    }
  };

  const columns = React.useMemo(
    () => [
      {
        field: "status",
        headerName: "Status",
        width: 230,
        align: "center",
        headerAlign: "center",
        renderCell: ({ row }) => (
          <>
            <Button
              size="small"
              variant="text"
              // color="info"
              startIcon={Choice_Icon(row.status)?.component}
              // onClick={() => handle()}
              // sx={{ color: Choice_Icon(row.status)?.color }}
              sx={{
                color: Choice_Icon(row.status)?.color,
                backgroundColor: Choice_Icon(row.status)?.backgroundColor,
                borderRadius: "8px",
                fontWeight: "bold",
                fontFamily: "Montserrat",
                border: "none",
                "&:hover": {
                  backgroundColor: Choice_Icon(row.status)?.backgroundColor,
                  opacity: 0.8,
                },
              }}
            >
              {row.status}
            </Button>
          </>
        ),
      },
      {
        field: "id",
        headerName: "ID",
        width: 220,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "customer_name",
        headerName: "Customer Name",
        width: 130,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "date",
        headerName: "Creation date",
        width: 130,
        align: "center",
        headerAlign: "center",
      },

      {
        field: "details",
        headerName: "Actions",
        width: 230,
        align: "center",
        headerAlign: "center",
        renderCell: ({ row }) => (
          <Link to={`/singleorder/${row.id}`}>
            <Button
              // size="small"
              variant="text"
              color="info"
              className="buttons"
              style={{ color: "#1d075f" }}
              endIcon={<VisibilityIcon />}
            ></Button>
          </Link>
        ),
      },
    ],
    []
  );

  const mappedorders = React.useMemo(() => {
    return orders.length > 0
      ? orders
          .filter((order) => {
            return (
              order.customer &&
              order.customer.first_name &&
              order.customer.first_name
                .toLowerCase()
                .includes(search.toLowerCase())
            );
          })
          .map((order) => {
            return {
              id: order.id,
              customer_name: order.customer ? order.customer.first_name : "",
              date: order.order_date,
              status: order.status,
            };
          })
      : [];
  }, [orders, search]);

  console.log("dial ordersssss", mappedorders);
  // search
  //   const searching = (input_value) => {
  //     return mappedorders.filter((order) => {
  //       return order.customer_name
  //         .toLowerCase()
  //         .includes(input_value.toLowerCase());
  //     });
  //   };

  //   get orders
  React.useEffect(() => {
    // console.log("hnaaaaa dial order");
    const getOrders = async () => {
      try {
        const { data } = await request.get("/v1/orders/");
        if (data.status === 200) {
          setOrders(data.data);
        }
        // console.log(data.data);
        toast.success("Orders listed successfully");
      } catch ({ response }) {
        if (response.status == 401) {
          toast.error("session expired please login again");
          navigate("/users/login");
        }
      }
    };
    getOrders();
  }, []);

  return (
    <>
      <h2 className="product-heading">ORDERS</h2>

      <Stack direction="row" sx={{ marginBottom: "10px" }}>
        <input
          placeholder="search"
          value={search}
          style={{
            width: "400px",
            padding: "12px",
            borderRadius: "15px",
            border: "1px solid #ccc",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "16px",
            transition:
              "border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
            outline: "none",
          }}
          onChange={({ target }) => {
            // console.log("dial seraching ", searching(target.value));
            setSearch(target.value);
          }}
        />
        {/* <Button variant="contained" sx={{borderRadius:"15px"}}>
        < SearchIcon />
        </Button> */}
      </Stack>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          sx={{
            // height: 400,
            fontFamily: "Montserrat",
            border: 0,
            margin: "20px",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#d1dde1",
              borderRadius: "12px",
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: "bold", // titles bold
              },
            },
            "& .MuiDataGrid-row": {
              backgroundColor: "#f5f5f5",
              borderRadius: "12px",
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "&:hover": {
                backgroundColor: "#9696c3", // Change this color to your preferred hover color
              },
              "&:nth-of-type(odd)": {
                backgroundColor: "#bdc4e3", // Slightly different shade for zebra striping
                "&:hover": {
                  backgroundColor: "#9696c3", // Change this color to your preferred hover color
                },
              },
            },
            "& .MuiDataGrid-row.Mui-selected, & .MuiDataGrid-row.Mui-selected:hover":
              {
                backgroundColor: "#9696c3", // Active row color
              },
            "& .MuiDataGrid-virtualScrollerRenderZone": {
              "& .MuiDataGrid-row": {
                marginBottom: "10px", // Adds space between rows
                "&:last-child": {
                  marginBottom: 0,
                },
              },
            },
          }}
          rows={mappedorders}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
        {/* <Outlet /> */}
      </div>
    </>
  );
}
