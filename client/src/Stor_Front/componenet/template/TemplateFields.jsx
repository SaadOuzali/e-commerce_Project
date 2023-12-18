import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import request from "../../../components/axios";
import { toast } from "react-toastify";

export default function TemplateFields({ fields, btn, icon,handleSubmit}) {
  const [inputValue, setInputValue] = useState({});
  // console.log("dial inputtt valueee",inputValue);

  // to handle value of inputs
  const handlechange = ({ target }) => {
    const name = target.name;
    const value = target.value;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  // to handle sign in
  
  // const handleSubmit = async () => {
  //   try {
  //     const { data } = await request.post("/v1/customers/login", inputValue);
  //     console.log("dial data",data);
  //   } catch ({ response }) {
  //     if(response.status === 404){
  //       toast.error(response.data.message);
  //       setOpenmdl(false)
  //     }
  //   }
  // };

  let check = true;
  if (!btn) {
    check = false;
  }

  return (
    <Stack spacing={2}>
      <Box textAlign={"center"}>{icon}</Box>
      {fields.map((item, index) => {
        return (
          <TextField
            helperText={item.label}
            key={index + 1}
            label={item?.label}
            name={item?.label}
            variant="outlined"
            autoFocus
            required
            type={item?.type}
            onChange={handlechange}
          />
        );
      })}

      {check && (
        <Button variant="contained" onClick={()=> handleSubmit(inputValue)}>
          {btn.title}
        </Button>
      )}
    </Stack>
  );
}
