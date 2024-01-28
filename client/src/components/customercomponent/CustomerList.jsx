import { useCallback, useEffect, useMemo, useState } from "react";
import { AxiosError } from "axios";
import { DataGrid } from "@mui/x-data-grid";
import "./stylingProduct.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";
import {
  Button,
  IconButton,
  InputBase,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import CustomerDetails from "./CustomerDetails";
import EditCustomer from "./EditCustomer";
import PropTypes from "prop-types";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import request from "../axios";

const theme = createTheme();
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#f2f2f2",
  "&:hover": {
    backgroundColor: "#e6e6e6",
  },
  marginRight: "16px",
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: "24px",
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: "0 16px",
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  "& .MuiInputBase-input": {
    padding: "8px 8px 8px 0",
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    "@media (min-width: 768px)": {
      // Adjust for different breakpoints if needed
      width: "20ch",
      "&:focus": {
        width: "30ch", // Expands more on focus
      },
    },
  },
}));

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState([]);

  const handleOpenDetailsModal = (customer) => {
    console.log("details customer ");
    setSelectedCustomer(customer);
    setIsDetailsOpen(true);
  };

  const handleOpenEditModal = (customer) => {
    console.log("edit customer ");
    setSelectedCustomer(customer);
    setIsEditOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditOpen(false);
  };

  const handleDeleteCustomer = useCallback((row) => {
    console.log("delete customer", row);
    request
      .delete("/v1/customers/" + row._id)
      .then(({ data }) => {
        console.log(data);
        toast.success(data?.message ?? "YAAAY deleted!!");
        setCustomers((prev) => prev.filter((prd) => prd._id !== row?._id));
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          if (err.response.status === 401) {
            toast.error("session expired please login again");
            navigate("/users/login");
          }
        } else {
          console.log("Error deleting: ", err);
        }
      });
  }, []);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await request.get("/v1/customers/");
        const responseData = response.data;
        console.log("Fetched Customers: ", responseData);
        toast.success("Customers listed successfully");
        setCustomers(responseData.data || []);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response.status === 401) {
            toast.error("session expired please login again");
            navigate("/users/login");
          }
        } else {
          console.log("Error deleting: ", error);
        }
      }
    };
    fetchCustomers();
  }, []);

  useEffect(() => {
    console.log(searchTerm.length);
    const filteredCustomers = async () => {
      try {
        const response = await request.get(
          `/v1/customers/search/?query=${searchTerm}`
        );
        const responseData = response.data;
        console.log("Filtered Customers: ", responseData);
        setCustomers(responseData.data || []);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response.status === 401) {
            toast.error("session expired please login again");
            navigate("/users/login");
          }
        } else {
          console.log("ERROR UGH searching customer: ", error.message);
        }
      }
    };
    if (searchTerm.length !== 0) {
      filteredCustomers();
    }
  }, [searchTerm]);

  const columns = useMemo(() => {
    return [
      { field: "_id", headerName: "ID", flex: 0.5, minWidth: 100 },
      {
        field: "first_name",
        headerName: "First Name",
        type: "string",
        flex: 0.5, // more flexible as names can be longer
        minWidth: 100,
      },
      {
        field: "last_name",
        headerName: "Last Name",
        type: "string",
        flex: 0.5,
        minWidth: 100,
      },
      {
        field: "email",
        headerName: "Email",
        type: "string",
        flex: 1,
        minWidth: 150,
      },
      {
        field: "active",
        headerName: "active",
        type: "boolean",
        flex: 0.3,
        minWidth: 80,
      },
      {
        field: "valid_account",
        headerName: "valid",
        type: "boolean",
        flex: 0.3,
        minWidth: 80,
      },
      {
        field: "last_login",
        headerName: "Last Login",
        type: "string",
        flex: 1,
        minWidth: 100,
      },
      {
        field: "details",
        headerName: "Details",
        sortable: false,
        width: 70,
        renderCell: (params) => (
          <IconButton
            aria-label="details"
            color="primary"
            className="buttons"
            style={{ color: "#1d075f" }}
          >
            <VisibilityIcon
              onClick={() => handleOpenDetailsModal(params.row)}
            />
          </IconButton>
        ),
      },
      {
        field: "edit",
        headerName: "Edit",
        sortable: false,
        width: 70,
        renderCell: (params) => (
          <IconButton
            aria-label="edit"
            color="primary"
            className="buttons buttonEdit"
            style={{ color: "#1d075f" }}
          >
            <EditIcon onClick={() => handleOpenEditModal(params.row)} />
          </IconButton>
        ),
      },
      {
        field: "delete",
        headerName: "Delete",
        sortable: false,
        width: 70,
        renderCell: (params) => (
          <IconButton
            aria-label="delete"
            color="secondary"
            className="buttons buttonDelete"
            style={{ color: "#e60023", margin: "5px" }}
          >
            <DeleteIcon
              style={{ fontSize: "1.5rem" }}
              onClick={() => handleDeleteCustomer(params.row)}
            />
          </IconButton>
        ),
      },
    ];
  }, []);

  return (
    <div style={{ backgroundColor: "#d1dde1" }}>
      <h2 className="product-heading">CUSTOMERS</h2>
      <ThemeProvider theme={theme}>
        <Search className="search">
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </ThemeProvider>
      <div className="data-grid-container">
        <DataGrid
          // autoHeight
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
          rows={customers}
          columns={columns}
          pageSize={10}
        />
      </div>
      <CustomerDetails
        customer={selectedCustomer}
        open={isDetailsOpen}
        handleClose={handleCloseDetailsModal}
      />
      <EditCustomer
        customer={selectedCustomer}
        open={isEditOpen}
        handleClose={handleCloseEditModal}
        setIsEditOpen={setIsEditOpen}
        setSelectedCustomer={setSelectedCustomer}
        setCustomers={setCustomers}
      />
    </div>
  );
};

CustomerDetails.propTypes = {
  customers: PropTypes.object,
};

export default CustomerList;
