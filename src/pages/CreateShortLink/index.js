import { useState } from "react";
import MainTitle from "../../components/MainTitle/Index";
import { Link, useNavigate } from "react-router-dom";

function CreateShortLink() {
  const [urlValue, setUrlValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate(-1);
  }
  return (
    <div className="CreateQRCode-container h-full flex bg-[#f4f6fa]">
      <div className="qrcode-options h-full relative w-[50%]  grid  pe-[2rem]">
        <div className="header-holder dashbrd-header  py-[2rem]">
          <MainTitle tag="h2" titleStyle="text-[2rem]">
            Create a Link
          </MainTitle>
        </div>
        <div className="qrcode-details">
          <form
            className="url-details flex flex-col gap-[1.5rem] relative  h-full"
            onSubmit={handleSubmit}
          >
            <div className="qr-destination">
              <MainTitle tag="h2" titleStyle="text-[1.5rem] font-semibold">
                Enter your link destination
              </MainTitle>
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
              <MainTitle tag="h2" titleStyle="text-[1.5rem] font-semibold">
                Link details
              </MainTitle>
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
            <div className="code-btns bottom-0 w-full py-[1rem] pb-[2rem flex justify-between absolute bottom-0 left-0  right-0 ">
              <Link
                to="/links"
                className="font-semibold bg-white  text-[#273144] border-[3px]  py-[.4rem] px-[1rem] rounded-[.2rem]"
              >
                Cancel
              </Link>
              <button className="font-semibold bg-[#0c3ebb] text-white  py-[.4rem] px-[1rem] rounded-[.2rem]">
                Create your link
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateShortLink;
