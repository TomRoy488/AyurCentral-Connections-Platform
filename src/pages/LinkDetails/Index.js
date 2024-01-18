import { useRef } from "react";
import { Link } from "react-router-dom";
import { toPng, toSvg } from "html-to-image";

import UtilController from "../../utils/Utilcontroller";
import Stats from "../../components/Stats/Index";
import LinkHeader from "../../components/LinkHeader/Index";
import QRCodeMaker from "../../components/QRCode/Index";
function LinkDetails({ pageData }) {
  const qrcodeSave = useRef(null);

  const downloadQRCode = (dataUrl, titleValue) => {
    const link = document.createElement("a");
    link.download = `${
      titleValue.toLowerCase().replaceAll(" ", "") || "qrcode"
    }.svg`;
    link.href = dataUrl;
    return link;
  };

  const saveQRcodeAsPng = (titleValue) => {
    toPng(qrcodeSave.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = downloadQRCode(dataUrl, titleValue);
        link.click();
        // setDownloaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //helper fn
  const saveQRcodeAsBlob = (titleValue) => {
    toPng(qrcodeSave.current, { cacheBust: false })
      .then((dataUrl) => {
        // const link = downloadQRCode(dataUrl, titleValue);
        fetch(dataUrl)
          .then((response) => response.blob())
          .then((blob) => {
            navigator.clipboard.write([
              new ClipboardItem({
                "image/png": blob,
              }),
            ]);
            // setCopied(true);
          })
          .catch((error) => {
            console.error("Error fetching or copying image:", error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="link-details-container flex flex-col gap-[1.5rem]">
      <div className="back-btn font-semibold">
        <Link to="/links">{`< Back to Links`}</Link>
      </div>
      <div className="link-details ">
        <LinkHeader link={pageData} fontSize="text-[2rem]">
          <span> {UtilController.formatDateTime(pageData?.createdAt)}</span>
        </LinkHeader>
      </div>
      <div className="link-stats-qr flex gap-[1rem]">
        <Stats links={[pageData]} />

        <div className="link-qrcode w-full  bg-white p-[1rem] rounded-[.5rem]">
          <h3 className="text-[1.5rem] font-bold">QR Code</h3>
          <div className="stats-list flex gap-[1.5rem] mt-[1rem]">
            <div
              className="qrcode-holder bg-white w-[200px] h-[200px]"
              ref={qrcodeSave}
            >
              <QRCodeMaker url={pageData?.link} />
            </div>
            <div className="qrcode-btns flex flex-col gap-[1rem]  justify-center ">
              <button
                className="font-semibold bg-[#0c3ebb]   text-white   py-[.4rem] px-[1rem] rounded-[.2rem]"
                onClick={() => saveQRcodeAsBlob(`${pageData?.title}QrCode`)}
              >
                {"Copy"}
              </button>
              <button
                className="font-semibold bg-[#0c3ebb] text-white  py-[.4rem] px-[1rem] rounded-[.2rem]"
                onClick={() => saveQRcodeAsPng(`${pageData?.title}QrCode`)}
              >
                {"Download ▼"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinkDetails;
