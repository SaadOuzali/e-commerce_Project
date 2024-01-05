import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button, Chip, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import request from "../axios";
import { useNavigate } from "react-router-dom";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});


// my component
const CreateProductModal = ({
  open,
  handleClose,
  setIsCreateOpen,
  setProducts,
}) => {
  const Navigate = useNavigate();
  const [slugsubcategory,setSlugsubcategory]=useState([])
  const [createProductModal, setCreateProductModal] = useState({
    product_name: "",
    sku: "",
    short_description: "",
    long_description: "",
    quantity: "",
    price: "",
    slug: "",
    active: "",
    product_img: null,
  });

  console.log("hnaaa fproduct", createProductModal);

  // to handle creation of poducts
  const handleCreateButton = useCallback(() => {
    
    request
      .post("/v1/products/", createProductModal, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((data) => {
        console.log("Product created: ", data.data);
        if(data.status === 201){
          
          toast.success("product created successfully");
           setProducts((prev) => [...prev, { ...data.data.data }]);
          setIsCreateOpen(false);
        }
      })
      .catch((err) => {
        // Err: Axios
        // 1- Backend with an Error response
        // --- response.data.message ?? ""
        // 2- AxiosError: {message: ""}
        // TypeError



        if (err instanceof AxiosError) {
          Navigate("/users/login");
          toast.error(err.response.data?.message ?? "Couldn't create product");
        }
        console.error("Error creating product: ", err);
      });
  }, [createProductModal]);

  // to handle changes
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    console.log("Name of the input: ", name);
    setCreateProductModal((prev) => ({
      ...prev,
      [name]: value,
    }));
  },[createProductModal]);


  // to fetch all subcategorie
  useEffect(()=>{
    const fetchcategory=async ()=>{
      try {
        const data=await request('/v1/subcategories/all');
        
        if(data.status === 200){
            setSlugsubcategory(data.data.data)
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchcategory()
  },[])
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    color: "black",
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Products
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Product Name"
                  variant="outlined"
                  fullWidth
                  required
                  name="product_name"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="SKU"
                  variant="outlined"
                  fullWidth
                  required
                  name="sku"
                  onChange={handleInputChange}
                />
                 <TextField
                  label="SKU"
                  variant="outlined"
                  hidden
                  value={"jhjhgjhj"}
                  fullWidth
                  required
                  name="productId"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Short Description"
                  variant="outlined"
                  fullWidth
                  required
                  name="short_description"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Long Description"
                  variant="outlined"
                  fullWidth
                  required
                  name="long_description"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Active Status"
                  variant="outlined"
                  fullWidth
                  required
                  name="active"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Quantity"
                  variant="outlined"
                  fullWidth
                  required
                  name="quantity"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Price"
                  variant="outlined"
                  fullWidth
                  required
                  name="price"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {createProductModal.product_img ? (
                  <Chip color="info" label={1} />
                ) : (
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload file
                    <VisuallyHiddenInput
                      type="file"
                      name="product_img"
                      onChange={(e) =>
                        setCreateProductModal((prev) => ({
                          ...prev,
                          product_img: e.target.files[0],
                        }))
                      }
                    />
                  </Button>
                )}
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">subcategory</InputLabel>
                  <Select
                    name="slug"
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={createProductModal.slug}
                    label="subcategory"
                    onChange={handleInputChange}
                  >
                    {slugsubcategory.length ===0 ? null 
                    :
                    slugsubcategory.map((sub)=>{
                        return <MenuItem value={sub.slug}>{sub.subcategory_name}</MenuItem>
                    })
                      
                      }
                    
                    
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  onClick={handleCreateButton}
                  endIcon={<AddIcon />}
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </form>
        </Typography>
      </Box>
    </Modal>
  );
};

CreateProductModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  setIsCreateOpen: PropTypes.bool,
  setProducts: PropTypes.func,
};

export default CreateProductModal;
