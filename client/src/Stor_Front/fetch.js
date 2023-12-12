import { useState } from "react"
import request from "../components/axios"
import { AxiosError } from "axios";


const handleActions = async ({url,method,initialValue})=>{
    const [data,setData]=useState(initialValue);
    const [err,setErr]=useState([])
 try {
    const {data}=await request[method](url);
    if(data.status=== "success"){
        setData(data);
    }
 } catch (error) {
    if(error instanceof AxiosError){
        setErr(error.response);
    }else{
        setErr(error)
    }
 }
 return {data,err}
}

export default handleActions