import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React, { useCallback, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import request from "../axios";
import { styled } from "@mui/material/styles";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

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

export default function CreateNewSubcategory() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const [createsubcategory, setCreatesubcategory] = useState({
    category_id: "",
    subcategory_name: "",
    active: false,
  });
  console.log(createsubcategory);
  // to fetch categories
  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await request.get("/v1/categories/");
        if (data.status === 200) {
          setCategories(data.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  // to handle creation of subcategories
  const handleCreate = useCallback(async () => {
    try {
      const data = await request.post("/v1/subcategories/", createsubcategory);
      if (data.status === 201) {
        toast.success("subcategory created successfully");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response.status == 401) {
          toast.error("session expired please login again");
          navigate("/users/login");
        }
      }
    }
  }, []);

  return (
    <Stack spacing={15}>
      <Box>
        <NavLink to={"/subcategory"}>
          <Button variant="outlined">Back</Button>
        </NavLink>
      </Box>
      <Stack justifyContent={"center"}>
        <Typography textAlign={"center"}> Add New Subcategory</Typography>
        <Stack alignItems={"center"} marginTop={2} spacing={3}>
          <FormControl sx={{ width: 300 }}>
            <InputLabel id="demo-simple-select-label">Categories</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={createsubcategory.category_id}
              label="Categories"
              onChange={(e) =>
                setCreatesubcategory((prev) => {
                  return { ...prev, category_id: e.target.value };
                })
              }
            >
              {categories.length !== 0
                ? categories.map((item) => {
                    return (
                      <MenuItem value={item._id}>{item.category_name}</MenuItem>
                    );
                  })
                : null}
            </Select>
          </FormControl>

          <TextField
            sx={{ width: 300 }}
            id="standard-basic"
            value={createsubcategory.subcategory_name}
            label="New Subcategory"
            onChange={(e) =>
              setCreatesubcategory((prev) => {
                return { ...prev, subcategory_name: e.target.value };
              })
            }
            helperText="enter a subcategory"
          />

          <Box>
            <FormControlLabel
              label="active"
              control={
                <Switch
                  checked={createsubcategory.active}
                  onChange={(e) =>
                    setCreatesubcategory((prev) => {
                      return { ...prev, active: e.target.checked };
                    })
                  }
                />
              }
            />
          </Box>

          <Button
            variant="contained"
            sx={{ width: 300 }}
            onClick={handleCreate}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
