import { QRCode } from "antd";

function QRCodeMaker({ url }) {
  return (
    <QRCode
      value={url || "unknown"}
      /* color={hexCodeColor}
      bgColor={hexBgColor}
      icon={selectedImage} */
      size="180"
      bordered={false}
    />
  );
}

export default QRCodeMaker;
