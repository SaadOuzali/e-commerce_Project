import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Pagination, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { subcategoryTableGeneralColumn } from "../../util";
import ModalEditSub from "./ModalEditSub";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import request from "../axios";
import { AxiosError } from "axios";
import { toast } from "react-toastify";



export default function Subcategory() {
  const navigate = useNavigate();
  const [subcategory, setSubcategory] = useState([]);

  // to delete subcategories
  const handleDelete = async (_id) => {
    try {
      const data = await request.delete(`/v1/subcategories/${_id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response.status == 401) {
          toast.error("session expired please login again");
          console.log("error", response);
          navigate("/users/login");
        }
      }
    }
  };

  // to fetch all subcategory
  useEffect(() => {
    const getSubcategory = async () => {
      try {
        const data = await request.get("/v1/subcategories/");
        if (data.status === 200) {
          setSubcategory(data.data.data);
        }
        toast.success("Subcategories listed successfully");
      } catch (error) {
        console.log(error);
      }
    };
    getSubcategory();
  }, []);

  //for static columns
  const columns = useMemo(
    () => [
      ...subcategoryTableGeneralColumn,
      {
        field: "action",
        headerName: "Action",
        width: 180,
        align: "center",
        headerAlign: "center",
        renderCell: ({ row }) => (
          <Stack direction={"row"} spacing={2}>
            <ModalEditSub row={row}  setSubcategory={setSubcategory} />

            <Button
              variant="text"
              color="error"
              endIcon={<DeleteIcon />}
              onClick={() => handleDelete(row._id)}
            >
              Delete
            </Button>
          </Stack>
        ),
      },
    ],
    []
  );

  const mappedsubcategory = useMemo(() => {
    return subcategory.length > 0
      ? subcategory.map((item) => {
          return {
            id: item.id,
            _id: item._id,
            slug: item.slug,
            category_name: item.category_id.category_name,
            subcategory_name: item.subcategory_name,
          };
        })
      : [];
  }, [subcategory]);

  return (
    <Stack spacing={3}>
      <h2 className="product-heading">SUBCATEGORIES</h2>

      <Box>
        <NavLink to={"/create/subcategory"}>
          <Button
            sx={{
              fontFamily: "Montserrat",
              fontWeight: "bold",
              color: "white",
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
            variant="outlined"
            endIcon={<AddIcon />}
          >
            New Subcategory{" "}
          </Button>
        </NavLink>
      </Box>
      <Box sx={{ height: 400, width: "100%" }}>
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
          rows={mappedsubcategory}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 100,
              },
            },
          }}
          pageSizeOptions={[10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
        {/* <Pagination
          onClick={() => console.log()}
          count={10}
          color="secondary"
        /> */}
      </Box>
    </Stack>
  );
}
