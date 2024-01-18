import { useNavigate } from "react-router-dom";
import MainTitle from "../../../components/MainTitle/Index";

function TopLinks({ links, setSelectPage }) {
  const navigate = useNavigate();
  const sortLink = links.slice().sort((a, b) => b.clicks - a.clicks);

  return (
    <div className="top-links w-full  bg-white p-[1rem] rounded-[.5rem]">
      <MainTitle tag="h2" titleStyle="text-[1.5rem]">
        Top Links
      </MainTitle>
      <div className="link-data stats-list flex flex-col gap-[.8rem] mt-[1rem]">
        {sortLink?.map(
          (link, key) =>
            key <= 2 && (
              <div
                className={`link link${key + 1}  ${
                  key <= 1
                    ? "border-b-[2px] border-solid border-[#e8ebf2] "
                    : ""
                } pb-[.5rem]`}
                key={link?.id}
              >
                <h4
                  className="font-semibold my-[.5rem] cursor-pointer flex w-fit hover:underline hover:decoration-solid "
                  onClick={() => {
                    setSelectPage(link?.id);
                    navigate(
                      `/links/${link?.title.toLowerCase().replaceAll(" ", "")}`
                    );
                  }}
                >
                  {link?.title}
                </h4>
                <p className="font-bold my-[.5rem]  text-[#0c3ebb] cursor-pointer flex w-fit">
                  <a
                    href={link?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.link}
                  </a>
                </p>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default TopLinks;
