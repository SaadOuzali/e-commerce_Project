import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import request from "../axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import usercontext from "../../context/AuthContext";
import Modaluser from "./Modaluser";
import ModalEdit from "./ModalEdit";
import SearchIcon from "@mui/icons-material/Search";
import { userTableGeneralColumns } from "../../util";

export default function DataTable() {
  const user = useContext(usercontext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  console.log("dial users", users);

  //   for deleting users
  const handleDelete = useCallback(async (row) => {
    const { _id } = row;
    console.log(_id);
    try {
      const { _id } = row;
      console.log(_id);
      const id = "6004a2e031b65381d7d7cdd3";

      // const { data } = await request.delete(`/v1/users/${id}`);
      // if (data?.status == "success") {
      //   toast.success("user deleted successfully");
      // }
    } catch ({ response }) {
      if (response.status == 401) {
        toast.error("session expired please logain again");
        console.log("error", response);
        navigate("/users/login");
      }
      // console.log("dial hna",response);
      else if (response.status == 404) {
        toast.error(response.data.Error);
      }
    }
  }, []);
  //   const handleDelete2 = ({ row, field }) => console.log("row,field");

  //for display data of user
  const mappeduser = useMemo(() => {
    return users.map((user) => {
      return { ...user };
    });
  }, [users]);

  // static variable
  const columns = useMemo(
    () =>
      user.userdata.Data.role === "manager"
        ? userTableGeneralColumns
        : [
            ...userTableGeneralColumns,
            {
              field: "actions",
              headerName: "Actions",
              width: 240,
              renderCell: ({ row }) => (
                <>
                  <Button
                    size="small"
                    variant="text"
                    color="info"
                    endIcon={<EditIcon style={{ fontSize: "1.5rem" }} />}
                    // onClick={()=>handleDelete2(celldata)}
                  >
                    <ModalEdit
                      // name={"Edit"}
                      data={{
                        first_name: row.first_name,
                        last_name: row.last_name,
                        user_name: row.user_name,
                        email: row.email,
                      }}
                      _id={row._id}
                      setUsers={setUsers}
                    />
                    {/* <Modaluser name={"Edit"} /> */}
                  </Button>
                  {user.userdata.Data.id !== row.id && (
                    <Button
                      size="small"
                      variant="text"
                      color="error"
                      endIcon={<DeleteIcon style={{ fontSize: "1.5rem" }} />}
                      onClick={() => handleDelete(row)}
                    >
                      {/* Delete */}
                    </Button>
                  )}
                </>
              ),
            },
          ],
    []
  );

  // for getting users
  useEffect(() => {
    const getalluser = async () => {
      try {
        const { data } = await request.get("/v1/users/");
        setUsers(data.data);
        console.log(data.data);
      } catch ({ response }) {
        if (response.status == 401) {
          toast.error("session expired please logain again");
          navigate("/users/login");
        }
        console.log("hna error", response);
      }
    };
    getalluser();
  }, []);

  //   for searching
  useEffect(() => {
    const searching = async () => {
      try {
        const { data } = await request.get(`/v1/users/search?query=${search}`);
        if (data?.status === "success") {
          console.log("hnaaaaaaa", data.data);
          setUsers(data.data);
        }
      } catch ({ response }) {
        if (response.status == 401) {
          toast.error("session expired please logain again");
          console.log("error", response);
          navigate("/users/login");
        }
        console.log("response", response);
      }
    };

    if (search) {
      setTimeout(() => searching(), 1000);
    }
  }, [search]);

  return (
    <>
      <Stack direction={"row"} justifyContent={"center"}>
        <h2 className="product-heading">USERS</h2>
      </Stack>
      {user.userdata.Data.role == "admin" && (
        <Button
          variant="contained"
          // color="inherit"
          sx={{
            fontFamily: "Montserrat",
            fontWeight: "bold",
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
          endIcon={<AddIcon />}
        >
          Create New User
        </Button>
      )}
      <Box sx={{ height: 400, width: "100%" }}>
        <Stack direction="row" sx={{ marginBottom: "10px" }}>
          <input
            placeholder="search"
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
            onChange={({ target }) => setSearch(target.value)}
          />
        </Stack>
        {/* <DataGrid rows={mappeduser} columns={columns}  initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick /> */}

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
          rows={mappeduser}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
}
