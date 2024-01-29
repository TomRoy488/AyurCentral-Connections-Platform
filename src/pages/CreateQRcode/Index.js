import { useState } from "react";

import QRcodePreview from "../../components/QrCodePreview/Index";
import MainTitle from "../../components/MainTitle/Index";
import QRCodeDetails from "./Components/QRCodeDetails";
import { useNavigate } from "react-router-dom";

function CreateQRCode({ setQrCodeUrl, qrCodeUrl }) {
  const [urlValue, setUrlValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiEndpoint =
      "https://bitly-shorturl.onrender.com/bitlyqrcode/generator";

    const data = {
      long_url: urlValue,
      title: titleValue,
    };

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("API Response:", responseData);
    } catch (error) {
      // Handle errors here
      console.error("Error:", error.message || "Something went wrong");
    } finally {
      setQrCodeUrl(urlValue);
      // navigate("/customizeQRCode");
    }
  };

  return (
    <div className="CreateQRCode-container h-full flex bg-[#f4f6fa]">
      <div className="qrcode-options h-full relative w-full  grid  pe-[2rem]">
        <div className="header-holder dashbrd-header  py-[2rem]">
          <MainTitle tag="h2" titleStyle="text-[2rem]">
            Create a QR Code
          </MainTitle>
        </div>
        <div className="qrcode-details">
          <QRCodeDetails
            urlValue={urlValue}
            titleValue={titleValue}
            setTitleValue={setTitleValue}
            setUrlValue={setUrlValue}
            setQrCodeUrl={setQrCodeUrl}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
      <QRcodePreview urlValue={qrCodeUrl} isBlur={true} />
    </div>
  );
}

export default CreateQRCode;
