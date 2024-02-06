import { useState, useEffect } from "react";
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
import { data } from "./config/constants";

// const { links: linklist } = data;
function PublicRoute() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectPage, setSelectPage] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const linkDetails = links.find((link) => link?.id === selectPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          // "https://bitly-shorturl.onrender.com/qrcode/scan/links"
          // "https://bitly-shorturl.onrender.com/urls/shorts"
          "https://bitly-shorturl.onrender.com/short/urls"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log(result);
        setLinks(result);
      } catch (error) {
        console.log(error);
        // setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
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
            element={
              <LinkDetails pageData={linkDetails} setQrCodeUrl={setQrCodeUrl} />
            }
          />

          <Route path="/qrcodes" element={<QRCodes links={links} />} />
          <Route
            path="/createQRCode"
            element={
              <CreateQRCode setQrCodeUrl={setQrCodeUrl} qrCodeUrl={qrCodeUrl} />
            }
          />
          <Route
            path="/customizeQRCode"
            element={
              <CustomizeQrcode qrCodeUrl={qrCodeUrl} pageData={linkDetails} />
            }
          />
          <Route path="/createShortLinks" element={<CreateShortLink />} />

          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </main>
    </>
  );
}

export default PublicRoute;
