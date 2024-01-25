import { useState } from "react";

import QRcodePreview from "../../components/QrCodePreview/Index";
import MainTitle from "../../components/MainTitle/Index";
import QRCodeDetails from "./Components/QRCodeDetails";

function CreateQRCode({ setQrCodeUrl, qrCodeUrl }) {
  const [urlValue, setUrlValue] = useState("");
  const [titleValue, setTitleValue] = useState("");

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
          />
        </div>
      </div>
      <QRcodePreview urlValue={qrCodeUrl} isBlur={true} />
      
    </div>
  );
}

export default CreateQRCode;
