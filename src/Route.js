import { useState } from "react";
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

const { links: linklist } = data;

function PublicRoute() {
  const [links, setLinks] = useState([...linklist]);
  const [loading, setLoading] = useState(false);
  const [selectPage, setSelectPage] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const linkDetails = links.find((link) => link?.id === selectPage);
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
            element={<CustomizeQrcode qrCodeUrl={qrCodeUrl} />}
          />
          <Route path="/createShortLinks" element={<CreateShortLink />} />

          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </main>
    </>
  );
}

export default PublicRoute;
