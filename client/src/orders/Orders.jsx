import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import request from "../components/axios";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Stack } from "@mui/material";
import DetailsIcon from "@mui/icons-material/Details";
import ModalOrder from "./ModalOrder";
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
      return { component: <WarehouseIcon />, status, color: "#000000" };
    } else if (status === "Shipped") {
      return { component: <DeliveryDiningIcon />, status, color: "#6495ed" };
    } else if (status === "Delivered") {
      return { component: <DoneOutlineIcon />, status, color: "#228b22" };
    } else {
      return { component: <PendingIcon />, status, color: "#ff0000" };
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
              onClick={() => handle()}
              sx={{ color: Choice_Icon(row.status)?.color }}
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
              size="small"
              variant="text"
              color="info"
              endIcon={<DetailsIcon />}
            >
              Details
            </Button>
          </Link>
        ),
      },
    ],
    []
  );

  const mappedorders = React.useMemo(() => {
    return orders.length > 0
      ? orders
          .filter((order) =>
            order.customer.first_name.toLowerCase().includes(search.toLowerCase())
          )
          .map((order) => {
            return {
              id: order.id,
              customer_name: order.customer.first_name,
              date: order.order_date,
              status: order.status,
            };
          })
      : [];
  }, [orders, search]);

  console.log("dial ordersssss",mappedorders);
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
      } catch ({ response }) {
        if (response.status == 401) {
          toast.error("session expired please logain again");
          navigate("/users/login");
        }
      }
    };

    getOrders();
  }, []);

  return (
    <>
      <Stack direction="row" sx={{ marginBottom: "10px" }}>
        <input
          placeholder="search"
          value={search}
          style={{ width: "400px", padding: "12px", borderRadius: "15px" }}
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
