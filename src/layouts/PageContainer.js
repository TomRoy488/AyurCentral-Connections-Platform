import { Route, Routes } from "react-router-dom";
import DashBoard from "../pages/DashBoard";
import Links from "../pages/Links";
import QRCodes from "../pages/QRCodes";
import Analytics from "../pages/Analytics";
import { data } from "../config/constants";

function PageContainer() {
  return (
    <main className="w-[75%] h-full main-page-container">
      <Routes>
        <Route index element={<DashBoard />} />
        <Route path="/links" element={<Links />} />
        <Route path="/qrcodes" element={<QRCodes />} />

        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </main>
  );
}

export default PageContainer;
