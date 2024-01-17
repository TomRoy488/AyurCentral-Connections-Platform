import { useNavigate } from "react-router-dom";

function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    undefined,
    options
  );
  return formattedDate;
}

function Links({ setSelectPage, links, isLoading }) {
  const navigate = useNavigate();
  return (
    <div className="link-container">
      <div className="header-holder dashbrd-header py-[2rem] ">
        <h2 className="text-[2rem] font-bold ">Links</h2>
      </div>
      <div className="stats-list flex flex-col gap-[1.5rem] mt-[1rem] w-full ">
        {isLoading
          ? "Loading"
          : links.length > 0
          ? links?.map((link, key) => (
              <div
                className={`link-item link-${link?.title}  w-full  bg-white p-[1rem] rounded-[.5rem]`}
                key={link?.id}
              >
                <h4
                  className="font-bold text-[1.2rem] my-[.3rem] cursor-pointer flex w-fit hover:underline hover:decoration-solid "
                  onClick={() => {
                    setSelectPage(link?.id);
                    navigate(
                      `/links/${link?.title.toLowerCase().replaceAll(" ", "")}`
                    );
                  }}
                >
                  {link?.title}
                </h4>
                <h3 className="font-semibold my-[.5rem]  text-[#0c3ebb] cursor-pointer flex w-fit">
                  <a href={link?.link} target="_blank">
                    {link?.link}
                  </a>
                </h3>
                <p>
                  <a href={link?.long_url}>{link?.long_url}</a>
                </p>
                <div className="mt-[1rem] flex  items-center gap-[1rem]">
                  <span className="total-count font-semibold text-[.8rem]  text-[#046923]">
                    {link?.clicks} Engagements
                  </span>
                  <span>Created: {formatDate(link?.createdAt)}</span>
                </div>
              </div>
            ))
          : "no links"}
      </div>
    </div>
  );
}

export default Links;
