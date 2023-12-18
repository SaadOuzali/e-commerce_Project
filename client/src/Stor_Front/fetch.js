import { useEffect, useState } from "react";
import request from "../components/axios";
import { AxiosError } from "axios";

const handleActions = ({ url, method, initialValue }) => {
  const [data, setData] = useState(initialValue);
  const [err, setErr] = useState([]);

  useEffect(() => {
    const fetchdata = async (url,method) => {
      try {
        const { data } = await request[method](url);
        if (data.status === "success") {
          setData(data);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          setErr(error.response);
        } else {
          setErr(error);
        }
      }
    };

    fetchdata();
    
  }, [url,method]);

  return { data, err };
};

export default handleActions;
