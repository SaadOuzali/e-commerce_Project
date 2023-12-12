import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Pagination() {
  const [arr, setArr] = useState([1, 2, 3, 4]);
  const arr2 = [
    { id: 1, email: "saad@gmail.com" },
    { id: 2, email: "saad@gmail.com" },
    { id: 3, email: "saad@gmail.com" },
    { id: 4, email: "saad@gmail.com" },
    { id: 5, email: "saad@gmail.com" },
    {id:6,email:"saad@gmail.com"},
    {id:7,email:"saad@gmail.com"},
    {id:8,email:"saad@gmail.com"},
    {id:9,email:"saad@gmail.com"},
    {id:10,email:"saad@gmail.com"},
    

  ];
  const [page, setPage] = useState(1);
  let recordperPage=3
  let lastIndex= recordperPage * page;
  let firstIndex=lastIndex - recordperPage;
  let record=arr2.slice(firstIndex,lastIndex)
  let npage=Math.ceil(arr2.length / recordperPage );
  console.log("npage",npage);
  const number=[...Array(npage +1).keys()].slice(1);
  console.log("numberrr",number);
  useEffect(() => {
    console.log(page);
  }, [page]);

  return (
    <div>
      <h1>hello </h1>

        <Grid container spacing={1}>
            {record.map((elm,ind)=>{
                  return  <Grid xs={12} sx={{display:"flex",gap:"20 px"}}  >
                        
                            <div>{elm.id} </div>
                            <div>{elm.email} </div>
                        
                    </Grid>
            })}
        </Grid>

        <nav>
                {number.map((elm,ind)=>{
                    
                   return  <button id={ind+1} key={ind} onClick={({target})=>setPage(target.id)} > {elm} </button>
                })}
        </nav>
                <Link to="add" >addd</Link>
                <Outlet />
      {/* {arr.map((elm, index) => {
        return (
          <button
            key={elm}
            onClick={({ target }) => {
              setPage(target.id);
            }}
          >
            {elm}{" "}
          </button>
        );
      })} */}
    </div>
  );
}
