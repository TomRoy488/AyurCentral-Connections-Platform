import { Link } from "react-router-dom";
function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
    hour12: true,
    timeZone: "Asia/Kolkata", // Adjust the timeZone as needed
  };

  const formattedDate = new Date(dateString).toLocaleString("en-US", options);
  return formattedDate;
}
function LinkDetails({ pageData }) {
  return (
    <div className="link-details-container flex flex-col gap-[1.5rem]">
      <div className="back-btn font-semibold">
        <Link to="/links">{`< Back to list`}</Link>
      </div>
      <div className="link-details ">
        <div
          className={`link-item link-${pageData?.title}  w-full  bg-white p-[1.5rem] rounded-[.5rem]`}
        >
          <h2 className="font-bold text-[2rem] my-[.3rem] cursor-pointer flex w-fit hover:underline hover:decoration-solid ">
            {pageData?.title}
          </h2>
          <h3 className="font-semibold my-[.5rem]  text-[#0c3ebb] cursor-pointer flex w-fit">
            <a href={pageData?.link} target="_blank">
              {pageData?.link}
            </a>
          </h3>
          <p>
            <a href={pageData?.long_url}>{pageData?.long_url}</a>
          </p>
          <div className="mt-[1rem] flex  items-center gap-[1rem] border-t-[2px] border-solid border-[#e8ebf2] pt-[1rem]">
            <span>{formatDate(pageData?.createdAt)}</span>
          </div>
        </div>
      </div>
      <div className="link-stats-qr flex gap-[1rem]">
        <div className="stats-data w-full  bg-white p-[1rem] rounded-[.5rem]">
          <h3 className="text-[1.5rem] font-bold">Stats</h3>

          <div className="stats-list flex flex-col gap-[1.5rem] mt-[1rem]">
            <div className="total-count engage-count ">
              <h4>Total Engagements</h4>
              <h3 className="text-[1.8rem] font-bold my-[.3rem]">
                {pageData?.clicks || 0}
              </h3>
            </div>
            <div className="total-count link-count">
              <h4>Link Clicks</h4>
              <h3 className="text-[1.8rem] font-bold my-[.3rem]">
                {pageData?.clicks || 0}
              </h3>
            </div>
            <div className="total-count qr-count">
              <h4>QR Code Scans</h4>
              <h3 className="text-[1.8rem] font-bold my-[.3rem]">
                {pageData?.totalscans || 0}
              </h3>
            </div>
          </div>
        </div>
        <div className="link-qrcode w-full  bg-white p-[1rem] rounded-[.5rem]">
          <h3 className="text-[1.5rem] font-bold">QR Code</h3>
          <div className="stats-list flex flex-col gap-[1.5rem] mt-[1rem]">
            <div className="qrcode-holder w-[200px] h-[200px]">
              {pageData?.qr_code?.svg ? (
                <img
                  src={pageData?.qr_code?.svg}
                  className="w-full h-full"
                  alt="qr code"
                />
              ) : (
                <div className="w-full h-full bg-[#e8ebf2] flex justify-center items-center flex-col ">
                  <button className="text-[1rem] font-bold flex justify-center items-center flex-col w-full h-full bg-[#e8ebf2] ">
                    <span className="text-[2rem] font-bold">+</span>
                    Create QR Code
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinkDetails;
