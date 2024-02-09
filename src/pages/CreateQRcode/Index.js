import { useState } from "react";

import QRcodePreview from "../../components/QrCodePreview/Index";
import MainTitle from "../../components/MainTitle/Index";
import QRCodeDetails from "./Components/QRCodeDetails";
import { useNavigate } from "react-router-dom";

function CreateQRCode({ setSelectPage }) {
  const [urlValue, setUrlValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiEndpoint =
      "https://bitly-shorturl.onrender.com/bitlyurl/generator";

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
      setSelectPage(responseData?.id);
    } catch (error) {
      // Handle errors here
      console.error("Error:", error.message || "Something went wrong");
    } finally {

      navigate("/customizeQRCode");
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
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
      <QRcodePreview urlValue={urlValue} isBlur={true} />
    </div>
  );
}

export default CreateQRCode;
