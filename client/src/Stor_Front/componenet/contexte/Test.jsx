import React, { useContext, useState } from 'react'
// import {Cart, } from './CartShoppingContexte'
import {Comp}  from './Comp'
import usercontext from '../../../context/AuthContext'
import { Button } from '@mui/material'

// const arr=[{id:0,age:4},{id:1,age:4},{id:2,age:4}]
export default function Test() {
const [arr,setarr]=useState([{id:0,age:4},{id:1,age:3},{id:2,age:0}])
// console.log("hna",!arr.find((item)=> item.id===0));
  const user=useContext(usercontext)
console.log("hna dial arr",arr);
console.log("jjj");
  const decre=(id)=>{
    console.log(id);
    // let a=arr.find((item)=> item.id===id)
      console.log("hna",!arr.find((item)=> {return item.id===id}));
    setarr((prev )=>{
      // console.log(prev);
        if(!prev.find((item)=> item.id===id)) {
            //  console.log([...prev]);
            return [...prev]
             
       }else{
          return []
          // console.log("hhhhhhh");
       }
      })
   
  }
  // console.log('ddial user',user.userdata.Data);
  return (
    <>
   {user.userdata.isConnected ? "hhhhh" :"lllllll"  }
    jj
        < Comp/>
        <Button onClick={()=>decre(9)}>add</Button>
         </>
  )
}
