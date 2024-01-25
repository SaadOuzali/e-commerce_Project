import { useCallback, useEffect, useMemo, useState } from "react";
import axios, { AxiosError } from "axios";
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
  alpha,
  createTheme,
} from "@mui/material";
import ProductDetails from "./ProductDetails";
import EditProduct from "./EditProduct";
import PropTypes from "prop-types";
import AddIcon from "@mui/icons-material/Add";
import CreateProductModal from "./CreateProductModal";
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

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);

  const handleOpenDetailsModal = (product) => {
    console.log("details product ");
    setSelectedProduct(product);
    setIsDetailsOpen(true);
  };

  const handleOpenEditModal = (product) => {
    console.log("edit product ");
    setSelectedProduct(product);
    setIsEditOpen(true);
  };

  const handleOpenCreateModal = () => {
    console.log("create product ");
    setIsCreateOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditOpen(false);
  };

  const handleCreateCloseModal = () => {
    setIsCreateOpen(false);
  };

  const handleDeleteProduct = useCallback((row) => {
    console.log("delete product", row);
    request
      .delete("/v1/products/" + row._id)
      .then(({ data }) => {
        console.log(data);
        toast.success(data?.message ?? "YAAAY deleted!!");
        setProducts((prev) => prev.filter((prd) => prd._id !== row?._id));
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
    const fetchProducts = async () => {
      try {
        const response = await request.get("/v1/products/");
        const responseData = response.data;
        console.log("Fetched Products: ", responseData);
        setProducts(responseData.data || []);
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
    fetchProducts();
  }, []);

  useEffect(() => {
    console.log(searchTerm.length);
    const filteredProducts = async () => {
      try {
        const response = await request.get(
          `/v1/products/search/?query=${searchTerm}`
        );
        const responseData = response.data;
        console.log("Filtered Products: ", responseData);
        setProducts(responseData.data || []);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response.status === 401) {
            toast.error("session expired please login again");
            navigate("/users/login");
          }
        } else {
          console.log("ERROR UGH searching product: ", error.message);
        }
      }
    };
    if (searchTerm.length !== 0) {
      filteredProducts();
    }
  }, [searchTerm]);

  const columns = useMemo(() => {
    return [
      { field: "_id", headerName: "ID", flex: 0.5, minWidth: 100 },
      {
        field: "product_name",
        headerName: "Product Name",
        type: "string",
        flex: 1, // more flexible as names can be longer
        minWidth: 150,
      },
      {
        field: "sku",
        headerName: "SKU",
        type: "string",
        flex: 0.5,
        minWidth: 100,
      },
      {
        field: "active",
        headerName: "active",
        type: "boolean",
        flex: 0.3,
        minWidth: 80,
      },
      {
        field: "price",
        headerName: "Price",
        type: "number",
        flex: 0.3,
        minWidth: 80,
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
              onClick={() => handleDeleteProduct(params.row)}
            />
          </IconButton>
        ),
      },
    ];
  }, []);

  return (
    <div style={{ backgroundColor: "#d1dde1" }}>
      <h2 className="product-heading">PRODUCTS</h2>
      <Button
        onClick={handleOpenCreateModal}
        sx={{
          marginLeft: "20px",
          marginBottom: "20px",
          backgroundColor: "#43a047",
          padding: "10px 20px",
          borderRadius: "4px",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#43a047", // darker shade on hover
          },
          "&:active": {
            backgroundColor: "#388e3c", // darker color on click
          },
          "& .MuiButton-endIcon": {
            marginLeft: "8px", // Space between text and icon
          },
        }}
        variant="contained"
        endIcon={<AddIcon />}
      >
        Add Product
      </Button>
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
          rows={products}
          columns={columns}
          pageSize={10}
        />
      </div>
      <ProductDetails
        product={selectedProduct}
        open={isDetailsOpen}
        handleClose={handleCloseDetailsModal}
      />
      <EditProduct
        product={selectedProduct}
        open={isEditOpen}
        handleClose={handleCloseEditModal}
        setIsEditOpen={setIsEditOpen}
        setSelectedProduct={setSelectedProduct}
        setProducts={setProducts}
      />
      <CreateProductModal
        open={isCreateOpen}
        handleClose={handleCreateCloseModal}
        setIsCreateOpen={setIsCreateOpen}
        setProducts={setProducts}
      />
    </div>
  );
};

ProductDetails.propTypes = {
  products: PropTypes.object,
};

export default ProductList;
