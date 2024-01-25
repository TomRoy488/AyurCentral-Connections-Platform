import { Link } from "react-router-dom";

function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    undefined,
    options
  );
  return formattedDate;
}

function QRCodes({ links }) {

  return (
    <div className="link-container">
      <div
        className="header-holder dashbrd-header py-[2rem] flex
           items-center justify-between
       "
      >
        <h2 className="text-[2rem] font-bold ">QR Codes</h2>
        <div className="qr-create-btn">
          <Link
            to="/createQRCode"
            className="font-semibold bg-[#0c3ebb] text-white  py-[.4rem] px-[1rem] rounded-[.2rem] "
          >
            + Create QR Code
          </Link>
        </div>
      </div>
      <div className="stats-list flex flex-col gap-[1.5rem] mt-[1rem] w-full ">
        {links?.map(
          (link, key) =>
            link?.qr_code?.svg && (
              <div
                className="w-full  bg-white p-[1rem] rounded-[.5rem] flex gap-[1rem]"
                key={key}
              >
                <div className="qrcode-holder w-[200px] h-full">
                  <img
                    src={link?.qr_code?.svg}
                    className="w-full h-full"
                    alt="qr code"
                  />
                </div>
                <div>
                  <div
                    className={`link-item link-${link?.title}  w-full `}
                    key={link?.id}
                  >
                    <h4 className="font-bold text-[1.5rem] my-[.3rem] cursor-pointer flex w-fit hover:underline hover:decoration-solid ">
                      {link?.title}
                    </h4>
                    <h3 className="font-semibold my-[.5rem]  text-[#0c3ebb] cursor-pointer flex w-fit">
                      <a href={link?.long_url}>{link?.id}</a>
                    </h3>
                    <p>
                      <a href={link?.long_url}>{link?.long_url}</a>
                    </p>
                    <div className="mt-[1rem] flex  items-center gap-[1rem]">
                      <span className="total-count font-semibold text-[.8rem]  text-[#046923]">
                        {link?.totalscans} Scans
                      </span>
                      <span>Created: {formatDate(link?.created_at)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default QRCodes;
