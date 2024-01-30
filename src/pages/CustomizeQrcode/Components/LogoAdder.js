import { useState } from "react";
import { addImage, deleteImage, removeImage } from "../../../assets";
import MainTitle from "../../../components/MainTitle/Index";
function LogoAdder({ selectedImage, setSelectedImage, setQrCodeLogo }) {
  const [filesselect, setFile] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("file", filesselect);
    try {
      const formData = new FormData();
      formData.append("image", filesselect);
      const response = await fetch(
        "https://bitly-shorturl.onrender.com/imageupload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to upload image. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      // setCreateImg(data);
    } catch (error) {
      // Handle errors appropriately, e.g., show an error message
      console.error("Error uploading image:", error.message);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log("hi", file);
    setFile((prevFile) => ({ ...prevFile, ...file }));
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
        console.log(reader.result);
        setSelectedImage([...selectedImage, reader.result]);
        // "https://bitly-shorturl.onrender.com/short/urls";
        // /imageupload
      };
    };

    reader.readAsDataURL(file);
  };

  const handleDelete = (index) => {
    const updatedImages = selectedImage.slice();
    updatedImages.splice(index, 1);
    setSelectedImage(updatedImages);
  };
  return (
    <div className="qr-destinatio qr-color-selection">
      <MainTitle tag="h2" titleStyle="text-[1.5rem] font-semibold">
        Add a logo
      </MainTitle>
      <div className="image-selection flex h-fit gap-[1rem] items-center  pt-[.8rem]">
        <form onSubmit={handleSubmit}>
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
          <button className="p-[.5rem] border-4 m-[.5rem]">submit</button>
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
              onClick={() => setQrCodeLogo(img)}
            >
              <img src={img} alt="Selected" className="w-full h-full" />
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
