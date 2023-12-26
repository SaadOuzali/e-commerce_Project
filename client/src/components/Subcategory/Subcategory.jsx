import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Pagination, Stack } from "@mui/material";
import { subcategoryTableGeneralColumn } from "../../util";
import ModalEditSub from "./ModalEditSub";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import request from "../axios";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function Subcategory() {
  const navigate=useNavigate()
  const [subcategory, setSubcategory] = useState([]);


// to delete subcategories
const handleDelete=async (_id)=>{
try {
  const data=await request.delete(`/v1/subcategories/${_id}`);
      

} catch (error) {
  if(error instanceof AxiosError){
    if (error.response.status == 401) {
      toast.error("session expired please logain again");
      console.log("error", response);
      navigate("/users/login");
    }
  }
}
}

  
// to fetch all subcategory
useEffect(() => {
    const getSubcategory = async () => {
      try {
        const data = await request.get("/v1/subcategories/");
        if (data.status === 200) {
          setSubcategory(data.data.data);
        }
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
        width: 220,
        align: "center",
        headerAlign: "center",
        renderCell: ({ row }) => (
          <Stack direction={"row"} spacing={2}>
            <ModalEditSub row={row} />

            <Button
              size="small"
              variant="text"
              color="error"
              endIcon={<DeleteIcon />}
              onClick={() => handleDelete(row._id)}
            >
              Delete
            </Button>
          </Stack>
        ),
      }   
    ],
    []
);

const mappedsubcategory = useMemo(() => {
    return (subcategory.length >0 ?   subcategory.map((item) => {
      return {
        id: item.id,
        _id: item._id,
        slug: item.slug,
        category_name: item.category_id.category_name,
        subcategory_name:item.subcategory_name
      };
    }) : [])
},[subcategory]);


  return (
    <Stack spacing={3}>
      <Box>
        <NavLink to={"/create/subcategory"}>
          <Button variant="outlined">New Subcategory </Button>
        </NavLink>
      </Box>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={mappedsubcategory}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
         <Pagination onClick={()=>console.log()} count={10} color="secondary" />
      </Box>
    </Stack>
  );
}
