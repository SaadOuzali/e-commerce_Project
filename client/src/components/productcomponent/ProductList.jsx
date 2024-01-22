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

const ProductList = () => {
  const [products, setProducts] = useState([]);
  //   const [products, setProducts] = useState([]);
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
            toast.error("session expired please logain again");
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
            toast.error("session expired please logain again");
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
      { field: "_id", headerName: "ID", width: 250 },
      {
        field: "product_name",
        headerName: "Product Name",
        type: "string",
        width: 300,
      },
      { field: "sku", headerName: "SKU", type: "string", width: 300 },
      { field: "active", headerName: "active", type: "boolean", width: 200 },
      { field: "price", headerName: "Price", type: "number", width: 200 },
      {
        field: "details",
        headerName: "Details",
        sortable: false,
        width: 100,
        renderCell: (params) => (
          <IconButton aria-label="details" color="primary" className="buttons">
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
      {
        field: "delete",
        headerName: "Delete",
        sortable: false,
        width: 100,
        renderCell: (params) => (
          <IconButton
            aria-label="delete"
            color="secondary"
            className="buttons buttonDelete"
          >
            <DeleteIcon onClick={() => handleDeleteProduct(params.row)} />
          </IconButton>
        ),
      },
    ];
  }, []);

  return (
    <>
      <h2 className="product-heading">PRODUCTS</h2>
      <Button
        onClick={handleOpenCreateModal}
        sx={{ marginLeft: "20px", marginBottom: "20px" }}
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
          sx={{ margin: "20px" }}
          rows={products}
          columns={columns}
          pageSize={10}
          //   rowsPerPageOptions={[5, 10, 20]}
          //   checkboxSelection
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
    </>
  );
};

ProductDetails.propTypes = {
  products: PropTypes.object,
};

export default ProductList;
