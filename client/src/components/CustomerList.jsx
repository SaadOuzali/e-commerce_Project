import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import "../styles/stylingProduct.css";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";
import {
  IconButton,
  InputBase,
  ThemeProvider,
  alpha,
  createTheme,
} from "@mui/material";
import CustomerDetails from "./CustomerDetails";
import PropTypes from "prop-types";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditableCustomerDetails from "./EditableCustomerDetails";

const theme = createTheme();
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState([]);

  const handleOpenDetailsModal = (customer) => {
    console.log("details customer");
    setSelectedCustomer(customer);
    setIsDetailsOpen(true);
  };

  const handleOpenEditModal = (customer) => {
    console.log("edit customer");
    setSelectedCustomer(customer);
    setIsEditOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditOpen(false);
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/v1/customers/");
        const responseData = response.data;
        console.log("Fetched customers: ", responseData);
        setCustomers(responseData.data || []);
      } catch (error) {
        console.error("ERROR UGH fetching customers data: ", error.message);
      }
    };
    fetchCustomers();
  }, []);

  useEffect(() => {
    const filteredCustomers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/v1/customers/search/?query=${searchTerm}`
        );
        const responseData = response.data;
        console.log("Filtered Customers: ", responseData);
        setCustomers(responseData.data || []);
      } catch (error) {
        console.log("ERROR UGH searching customer: ", error.message);
      }
    };
    filteredCustomers();
  }, [searchTerm]);

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "first_name",
      headerName: "First Name",
      type: "string",
      width: 300,
    },
    {
      field: "last_name",
      headerName: "Last Name",
      type: "string",
      width: 300,
    },
    { field: "active", headerName: "active", type: "boolean", width: 200 },
    {
      field: "valid_account",
      headerName: "valid_account",
      type: "boolean",
      width: 200,
    },
    {
      field: "creation_date",
      headerName: "Creation Date",
      type: "string",
      width: 300,
    },
    {
      field: "details",
      headerName: "Details",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <IconButton aria-label="details" color="primary" className="buttons">
          <VisibilityIcon onClick={() => handleOpenDetailsModal(params.row)} />
        </IconButton>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <IconButton
          aria-label="edit"
          color="primary"
          className="buttons buttonEdit"
        >
          <EditIcon onClick={() => handleOpenEditModal(params.row)} />
        </IconButton>
      ),
    },
  ];

  return (
    <>
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
          sx={{ margin: "20px" }}
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
      <EditableCustomerDetails
        customer={selectedCustomer}
        open={isEditOpen}
        handleClose={handleCloseEditModal}
        setIsEditOpen={setIsEditOpen}
        setSelectedCustomer={setSelectedCustomer}
        setCustomers={setCustomers}
      />
    </>
  );
};

CustomerList.propTypes = {
  products: PropTypes.object,
};

export default CustomerList;
