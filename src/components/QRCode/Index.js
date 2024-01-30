import { QRCode } from "antd";

function QRCodeMaker({
  url,
  bgColor = "#ffffff",
  codeColor = "#000000",
  qrCodeLogo,
}) {
  return (
    <QRCode
      value={url || "-"}
      color={codeColor}
      bgColor={bgColor}
      icon={qrCodeLogo}
      size="180"
      // iconSize={40}
      bordered={false}
    />
  );
}

export default QRCodeMaker;
