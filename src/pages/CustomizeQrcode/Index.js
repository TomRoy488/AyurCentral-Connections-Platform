import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import MainTitle from "../../components/MainTitle/Index";
import LogoAdder from "./Components/LogoAdder";
import QrcodeEdit from "./Components/QrcodeEdit";
import QRcodePreview from "../../components/QrCodePreview/Index";

function CustomizeQrcode({ qrCodeUrl, pageData }) {
  const [logoImageList, setLogoImageList] = useState([]);
  const [deletedLogos, setdeletedLogos] = useState([]);
  const [codeColorHex, setCodeColorHex] = useState("#000000");
  const [bgColorHex, setBgColorHex] = useState("#ffffff");
  const [qrCodeLogo, setQrCodeLogo] = useState(null);
  const navigate = useNavigate();
  const toHexString = (color) =>
    typeof color === "string" ? color : color?.toHexString();

  const hexCodeColor = useMemo(() => toHexString(codeColorHex), [codeColorHex]);
  const hexBgColor = useMemo(() => toHexString(bgColorHex), [bgColorHex]);

  const onCancel = (e) => {
    e.preventDefault();
    setBgColorHex("#ffffff");
    setCodeColorHex("#000000");
    setQrCodeLogo(null);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://bitly-shorturl.onrender.com/image/allimages"
        );
        console.log(response);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log(result, "result");
        const imageArray = await result.slice().reverse();
        const removeDeletedImage = imageArray
          .slice()
          .filter((img) => !deletedLogos.includes(img._id));
        setLogoImageList(removeDeletedImage);
        console.log(qrCodeLogo);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [qrCodeLogo, deletedLogos]);
  return (
    <div className="Customize-container w-full h-full flex bg-[#f4f6fa]">
      <div className="qrcode-options h-full relative w-full  grid  pe-[2rem]">
        <div className="header-holder dashbrd-header  py-[2rem]">
          <MainTitle tag="h2" titleStyle="text-[2rem]">
            Customize your QR Code
          </MainTitle>
        </div>
        <div className="qrcode-details w-full url-details flex flex-col gap-[1.5rem] relative">
          <QrcodeEdit
            codeColorHex={codeColorHex}
            setCodeColorHex={setCodeColorHex}
            bgColorHex={bgColorHex}
            setBgColorHex={setBgColorHex}
            hexBgColor={hexBgColor}
            hexCodeColor={hexCodeColor}
          />
          <LogoAdder
            logoImageList={logoImageList}
            setLogoImageList={setLogoImageList}
            setQrCodeLogo={setQrCodeLogo}
            deletedLogos={deletedLogos}
            setdeletedLogos={setdeletedLogos}
          />
          <div className="code-btns bottom-0 w-full py-[1rem] pb-[2rem flex justify-between absolute bottom-0 left-0  right-0">
            <button
              className="font-semibold bg-white  text-[#273144] border-[3px]  py-[.4rem] px-[1rem] rounded-[.2rem]"
              onClick={onCancel}
            >
              Reset
            </button>
            <div>
              <Link
                className="font-semibold bg-white  text-[#273144] border-[3px] me-[2rem]  py-[.4rem] px-[1rem] rounded-[.2rem]"
                onClick={() => navigate(-1)}
              >
                Back
              </Link>
              <button
                className="font-semibold bg-[#0c3ebb] text-white  py-[.4rem] px-[1rem] rounded-[.2rem]"
                onClick={() => navigate("/")}
              >
                Create your code
              </button>
            </div>
          </div>
        </div>
      </div>
      <QRcodePreview
        urlValue={pageData?.qrCodeLink}
        hexBgColor={hexBgColor}
        hexCodeColor={hexCodeColor}
        qrCodeLogo={qrCodeLogo}
      />
    </div>
  );
}

export default CustomizeQrcode;
