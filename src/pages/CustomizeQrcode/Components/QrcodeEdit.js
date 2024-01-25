import MainTitle from "../../../components/MainTitle/Index";
import { ColorPicker } from "antd";
function QrcodeEdit({
  codeColorHex,
  setCodeColorHex,
  bgColorHex,
  setBgColorHex,
  hexCodeColor,
  hexBgColor,
}) {
  return (
    <div className="url-details flex flex-col gap-[1.5rem] relative">
      <div className="qr-destination qr-color-selection">
        <MainTitle tag="h2" titleStyle="text-[1.5rem] font-semibold">
          Choose your colors
        </MainTitle>
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
    </div>
  );
}

export default QrcodeEdit;
