import { useState } from "react";
import axios from "axios";

// https://bitly-shorturl.onrender.com/image/allimages

import { addImage, deleteImage, removeImage } from "../../../assets";
import MainTitle from "../../../components/MainTitle/Index";
function LogoAdder({ selectedImage, setSelectedImage, setQrCodeLogo }) {
  console.log(selectedImage);

  const upLoadImage = async (fileselect) => {
    try {
      const formData = new FormData();
      formData.append("image", fileselect);

      // Add the axios method for fetching the api
      const response = await axios.post(
        "https://bitly-shorturl.onrender.com/imageupload",
        formData
      );

      // Updated Data for getting response
      const imgData = response.data;
      setQrCodeLogo(imgData.imageUrl);

      // setCreateImg(data);
    } catch (error) {
      // Handle errors appropriately, e.g., show an error message
      console.error("Error uploading image:", error.message);
    }
  };

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
        // setSelectedImage([...selectedImage, reader.result]);
      };
    };

    upLoadImage(file);

    reader.readAsDataURL(file);
  };

  const handleDelete = (index) => {
    const updatedImages = selectedImage.slice();
    const d = updatedImages.splice(index, 1);
    console.log(d,"updated")
    setSelectedImage(updatedImages);

  };
  return (
    <div className="qr-destinatio w-full qr-color-selection">
      <MainTitle tag="h2" titleStyle="text-[1.5rem] font-semibold">
        Add a logo
      </MainTitle>
      <div className="image-selection  grid grid-cols-3 lg:grid-cols-5 xl:grid-cols-7  w-full h-fit gap-[1rem] items-center  pt-[.8rem] flex-wrap">
        <form>
          <label
            htmlFor="logoUpload"
            className=" cursor-pointer text-[3rem] bg-white flex  justify-center items-center rounded-[.5rem] w-[4rem] h-[4rem] text-[#273144] border-[3px]  p-[.5rem]"
          >
            <div className="w-full h-full  flex justify-center items-center">
              <img
                src={addImage}
                alt="add logo icon"
                className="  w-full h-full object-contain  opacity-[.4]"
              />
            </div>
          </label>
          <input
            type="file"
            accept="image/png"
            onChange={handleImageChange}
            className="hidden"
            id="logoUpload"
          />
        </form>
        <div
          className="w-[4rem] h-[4rem] text-[3rem]  text-[#273144] bg-white rounded-[.5rem]  border-[3px] flex justify-center flex-wrap items-center cursor-pointer  p-[.5rem]"
          onClick={() => setQrCodeLogo(null)}
        >
          <div className="w-full h-full  flex justify-center items-center">
            <img
              src={removeImage}
              alt="remove logo icon"
              className="  w-full h-full object-contain "
            />
          </div>
        </div>
        {selectedImage &&
          selectedImage?.map((img, i) => (
            <div
              className=" logo-list-item w-[4rem] h-[4rem] bg-white rounded-[.5rem] p-[.2rem] flex justify-center items-center  text-[#273144] border-[3px] cursor-pointer relative"
              key={i}
              onClick={() => setQrCodeLogo(img.imageUrl)}
            >
              <img
                src={img.imageUrl}
                alt="Selected"
                className="w-full h-full"
              />
              <div
                className=" logo-delete-icon w-[1.5rem] h-[1.5rem] absolute  bg-white rounded-[100%] p-[.3rem]  flex justify-center flex-wrap items-center cursor-pointer   top-[-.5rem] right-[-.5rem]"
                onClick={() => handleDelete(i)}
              >
                <img
                  src={deleteImage}
                  alt="remove logo icon"
                  className="  w-full h-full object-contain "
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default LogoAdder;
