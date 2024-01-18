import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Analytics from "../pages/Analytics";
import CreateQRCode from "../pages/CreateQRCode";

import QRCodes from "../pages/QRCodes";
import { data } from "../config/constants";
const { links: linklist } = data;
function PageContainer() {
  const [links, setLinks] = useState([...linklist]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectPage, setSelectPage] = useState("");
  const linkDetails = links.find((link) => link?.id === selectPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          // "http://localhost:8000/api/urls/shorts"
          "https://bitly-shorturl.onrender.com/api/urls/shorts"
        );
        console.log("response", response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log(result);
        setLinks(result);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <h1>hi</h1>
  );
}

export default PageContainer;
