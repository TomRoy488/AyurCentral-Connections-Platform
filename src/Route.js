import { useState, useEffect, useMemo } from "react";
import { Route, Routes } from "react-router-dom";

import QRCodes from "./pages/QRCodes";

// pages
import Analytics from "./pages/Analytics/Index";
import CreateQRCode from "./pages/CreateQRcode/Index";
import CreateShortLink from "./pages/CreateShortLink";
import CustomizeQrcode from "./pages/CustomizeQrcode/Index";
import DashBoard from "./pages/Dashboard/Index";
import LinkDetails from "./pages/LinkDetails/Index";
import Links from "./pages/Links/Index";

// text data
// import { data } from "./config/constants";

// const { links: linklist } = data;
function PublicRoute() {
  const [links, setLinks] = useState([]);
  const [qrCodeData, setQrCodeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectPage, setSelectPage] = useState("");
  const [selectqr, setSelectQR] = useState(false);

  const linkData = useMemo(
    () => links.find((link) => link?.id === selectPage),
    [selectPage, links, qrCodeData, selectqr]
  );

  const qrCodeDetails = useMemo(
    () => qrCodeData.find((qrcode) => qrcode?.customizeId === selectPage),
    [qrCodeData, links, selectPage, selectqr]
  );

  const linkDetails = { ...linkData, ...qrCodeDetails };

  /* fetchShortUrls */

  const fetchShortUrls = async () => {
    try {
      const response = await fetch(
        "https://bitly-shorturl.onrender.com/short/urls"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setLinks(data);
    } catch (error) {
      // setError(error);
      console.log(error)
      throw error;
    }
  };

  // Function to fetch QR codes
  const fetchQrCodes = async () => {
    try {
      const response = await fetch(
        "https://bitly-shorturl.onrender.com/all/customizeQr"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setQrCodeData(data.result);
    } catch (error) {
      console.log(error)
      // setError(error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchShortUrls(), fetchQrCodes()]);
      } catch (error) {
        // setError(error);
        setLoading(false);
        console.log(error)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectPage, selectqr]);

  return (
    <>
      <main className="h-full main-page-container p-[2rem] pt-[1rem]  bg-[#f4f6fa] grow">
        <Routes>
          <Route
            index
            element={<DashBoard links={links} setSelectPage={setSelectPage} />}
          />
          <Route
            path="/links"
            element={
              <Links
                setSelectPage={setSelectPage}
                links={links}
                isLoading={loading}
              />
            }
          />

          <Route
            path="links/:id"
            element={<LinkDetails pageData={linkDetails} />}
          />

          <Route path="/qrcodes" element={<QRCodes links={links} />} />
          <Route
            path="/createQRCode"
            element={<CreateQRCode setSelectPage={setSelectPage} />}
          />
          <Route
            path="/customizeQRCode"
            element={
              <CustomizeQrcode
                pageData={linkDetails}
                setSelectQR={setSelectQR}
                qrCodeData={qrCodeData}
              />
            }
          />
          <Route
            path="/createShortLinks"
            element={<CreateShortLink setSelectPage={setSelectPage} />}
          />

          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </main>
    </>
  );
}

export default PublicRoute;
