import { useState } from "react";
import MainTitle from "../../../components/MainTitle/Index";
function LogoAdder({ selectedImage, setSelectedImage, setQrCodeLogo }) {
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
        setQrCodeLogo(reader.result);
        setSelectedImage([...selectedImage, reader.result]);
      };
    };

    reader.readAsDataURL(file);
  };
  return (
    <div className="qr-destinatio qr-color-selection">
      <MainTitle tag="h2" titleStyle="text-[1.5rem] font-semibold">
        Add a logo
      </MainTitle>
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
          className="w-[4rem] h-[4rem] text-[3rem]  text-[#273144] bg-white rounded-[.5rem]  border-[3px] flex justify-center flex-wrap items-center cursor-pointer  p-[.5rem]"
          onClick={() => setQrCodeLogo(null)}
        >
          <div className="w-full h-full  flex justify-center items-center" >
            ⨂
          </div>
        </div>
        {selectedImage &&
          selectedImage?.map((img,i) => (
            <div className="w-[4rem] h-[4rem] bg-white rounded-[.5rem] p-[.2rem] flex justify-center items-center  text-[#273144] border-[3px] cursor-pointer" key={i}  onClick={() => setQrCodeLogo(img)} >
              <img src={img} alt="Selected" className="w-full h-full" />
            </div>
          ))}
      </div>
    </div>
  );
}

export default LogoAdder;
