import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Analytics from "../pages/Analytics";
import CreateQRCode from "../pages/CreateQRCode";
import DashBoard from "../pages/DashBoard";
import LinkDetails from "../pages/LinkDetails";
import Links from "../pages/Links";
import QRCodes from "../pages/QRCodes";

function PageContainer() {
  const [links, setLinks] = useState([]);
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
        // console.log("response", response);
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
        <Route path="/createQRCode" element={<CreateQRCode />} />

        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </main>
  );
}

export default PageContainer;
