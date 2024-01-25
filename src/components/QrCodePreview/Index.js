import QRCodeMaker from "../QRCode/Index";

function QRcodePreview({
  urlValue,
  isBlur = false,
  hexBgColor,
  hexCodeColor,
  qrCodeLogo,
}) {
  return (
    <div className="qrcode-display bg-white w-full flex flex-col  items-center justify-center gap-[1rem]">
      <p className=" font-semibold">Preview</p>
      <div
        className={`qrcode-img ${isBlur && "blur-[6px]"} w-[250px] h-[250px]`}
      >
        <QRCodeMaker
          url={urlValue}
          bgColor={hexBgColor}
          codeColor={hexCodeColor}
          qrCodeLogo={qrCodeLogo}
        />
      </div>
    </div>
  );
}

export default QRcodePreview;
