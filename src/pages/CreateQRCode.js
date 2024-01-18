import React, { useState, useMemo, useRef, useEffect } from "react";
import { QRCode, ColorPicker } from "antd";
import { Link } from "react-router-dom";
import { toPng, toSvg } from "html-to-image";
function CreateQRCode() {
  const [urlValue, setUrlValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [codeColorHex, setCodeColorHex] = useState("#000000");
  const [bgColorHex, setBgColorHex] = useState("#ffffff");
  const [selectedImage, setSelectedImage] = useState(null);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const qrcodeSave = useRef(null);
  const toHexString = (color) =>
    typeof color === "string" ? color : color?.toHexString();

  const hexCodeColor = useMemo(() => toHexString(codeColorHex), [codeColorHex]);
  const hexBgColor = useMemo(() => toHexString(bgColorHex), [bgColorHex]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return alert("Please choosse one imager");

    // Check file size
    if (file.size > 5 * 1024 * 1024) {
      alert("Maximum file size allowed is 5MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        if (img.width !== img.height || img.width > 2500 || img.height > 2500) {
          alert(
            "Please upload an image with a 1:1 aspect ratio and maximum size of 2500x2500 pixels."
          );
          return;
        }

        setSelectedImage(reader.result);
      };
    };

    reader.readAsDataURL(file);
  };

  const downloadQRCode = (dataUrl, titleValue) => {
    const link = document.createElement("a");
    link.download = `${
      titleValue.toLowerCase().replaceAll(" ", "") || "qrcode"
    }.svg`;
    link.href = dataUrl;

    return link;
  };

  const saveQRcodeAsPng = (titleValue) => {
    toSvg(qrcodeSave.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = downloadQRCode(dataUrl, titleValue);
        link.click();
        setDownloaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //helper fn
  const saveQRcodeAsBlob = () => {
    toPng(qrcodeSave.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = downloadQRCode(dataUrl, titleValue);
        fetch(dataUrl)
          .then((response) => response.blob())
          .then((blob) => {
            navigator.clipboard.write([
              new ClipboardItem({
                "image/png": blob,
              }),
            ]);
            setCopied(true);
          })
          .catch((error) => {
            console.error("Error fetching or copying image:", error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    setCopied(false);
    setDownloaded(false);
  }, [urlValue, titleValue, codeColorHex, bgColorHex, selectedImage]);

  const handleSubmit = () => {
    const apiEndpoint =
      // "https://bitly-shorturl.onrender.com/api/bitlyurl/generator";
    "http://localhost:8000/api/bitlyurl/generator";
    const data = {
      long_url: urlValue,
      title: titleValue,
    };
    console.log(`data`, data);
    fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log("response", response);
        return response.json();
      })
      .then((responseData) => {
        console.log("API Response:", responseData);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  };

  return (
    <div className="CreateQRCode-container bg-[#f4f6fa]">
      <div className="header-holder dashbrd-header py-[2rem] ">
        <h2 className="text-[2rem] font-bold ">Create a QR Code</h2>
      </div>
      <div className="qrcode-maker w-full flex gap-[2rem] ">
        <div className="qrcode-details w-[45%]  flex flex-col gap-[1.5rem] ">
          <div className="qr-destination">
            <h2>Enter your QR Code destination</h2>
            <p>Destination URL</p>
            <input
              type="url"
              name="url"
              id="url"
              placeholder="https://example.com"
              required
              value={urlValue}
              onChange={(e) => setUrlValue(e.target.value)}
            />
          </div>
          <div className="qr-destination">
            <h2>Code details</h2>
            <p>Title</p>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Title"
              required
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
            />
          </div>
          <div className="qr-color-selection">
            <h2>Choose your colors</h2>
            <div className="color-selections pt-[.8rem] flex gap-[1rem]">
              <div className="code-color">
                <p>Code</p>
                <div className="color-box">
                  <div className="color-picker">
                    <ColorPicker
                      value={codeColorHex}
                      onChange={setCodeColorHex}
                      trigger="hover"
                      defaultFormat="hex"
                      size="large"
                    />
                  </div>
                  <div className="colorCode">
                    <input
                      type="text"
                      name="code-color"
                      value={hexCodeColor}
                      onChange={(e) => setCodeColorHex(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="code-color">
                <p>Background</p>
                <div className="color-box">
                  <div className="color-picker">
                    <ColorPicker
                      value={bgColorHex}
                      onChange={setBgColorHex}
                      trigger="hover"
                      defaultFormat="hex"
                      size="large"
                    />
                  </div>
                  <div className="colorCode">
                    <input
                      type="text"
                      name="bg-color"
                      value={hexBgColor}
                      onChange={(e) => setBgColorHex(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="add-logo">
            <h2>Add a logo</h2>
            <div className="image-selection flex h-fit gap-[1rem] items-center  pt-[.8rem]">
              <label
                htmlFor="logoUpload"
                className=" cursor-pointer text-[3rem] bg-white flex  justify-center items-center rounded-[.5rem] w-[4rem] h-[4rem] text-[#273144] border-[3px]"
              >
                +
              </label>
              <input
                type="file"
                accept="image/png"
                onChange={handleImageChange}
                className="hidden"
                id="logoUpload"
              />
              <div
                className="w-[4rem] h-[4rem] text-[3rem]  text-[#273144] bg-white rounded-[.5rem]  border-[3px] flex justify-center items-center cursor-pointer  p-[.5rem]"
                onClick={() => setSelectedImage(null)}
              >
                <div className="w-full h-full  flex justify-center items-center">
                  ⨂
                </div>
              </div>
              {selectedImage && (
                <div className="w-[4rem] h-[4rem] bg-white rounded-[.5rem] p-[.2rem] flex justify-center items-center">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="code-btns bottom-0 w-full py-[1rem] pb-[2rem flex justify-between ">
            <Link
              to="/qrcodes"
              className="font-semibold bg-white  text-[#273144] border-[3px]  py-[.4rem] px-[1rem] rounded-[.2rem]"
            >
              Cancel
            </Link>
            <button
              className="font-semibold bg-[#0c3ebb] text-white  py-[.4rem] px-[1rem] rounded-[.2rem]"
              onClick={handleSubmit}
            >
              Create your code
            </button>
            <button
              className="font-semibold bg-[#0c3ebb] text-white  py-[.4rem] px-[1rem] rounded-[.2rem]"
              onClick={handleSubmit}
            >
              Get Btn
            </button>
          </div>
        </div>
        <div
          className="qrcode-result bg-white w-[40%] bottom-0 fixed flex justify-center items-center top-0 right-0 grow
         "
        >
          <div
            className={`grcode-holder flex flex-col justify-center items-center gap-[1rem] `}
          >
            <p className=" font-semibold">Preview</p>
            <div
              className={`qrcode-img ${
                !urlValue && "blur-[6px]"
              } w-[300px] h-[300px]`}
              ref={qrcodeSave}
            >
              {!urlValue ? (
                <QRCode value={"-"} bordered={false} size="180" />
              ) : (
                <QRCode
                  value={urlValue}
                  color={hexCodeColor}
                  bgColor={hexBgColor}
                  icon={selectedImage}
                  size="180"
                  bordered={false}
                />
              )}
            </div>
            <div
              className={`qr-save-btns items-center gap-[1rem] ${
                !urlValue ? "flex" : "flex"
              }`}
            >
              <button
                className="font-semibold bg-[#0c3ebb]   text-white   py-[.4rem] px-[1rem] rounded-[.2rem]"
                onClick={saveQRcodeAsBlob}
              >
                {copied ? "Copied" : "Copy"}
              </button>
              <button
                className="font-semibold bg-[#0c3ebb] text-white  py-[.4rem] px-[1rem] rounded-[.2rem]"
                onClick={() => saveQRcodeAsPng(titleValue)}
              >
                {downloaded ? "Download ✓" : "Download ▼"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
/*  <QRCode
      value="https://ant.design/"
      icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
    /> */
export default CreateQRCode;
