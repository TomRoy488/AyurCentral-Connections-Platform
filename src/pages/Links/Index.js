import { useNavigate } from "react-router-dom";
import LinkHeader from "../../components/LinkHeader/Index";
import MainTitle from "../../components/MainTitle/Index";
import UtilController from "../../utils/Utilcontroller";

function Links({ setSelectPage, links, isLoading }) {
  const navigate = useNavigate();
  return (
    <div className="link-container">
      <div className="header-holder dashbrd-header py-[2rem] ">
        <MainTitle tag="h1" titleStyle="text-[2rem]">
          Links
        </MainTitle>
      </div>
      <div className="stats-list flex flex-col gap-[1.5rem] mt-[1rem] w-full ">
        {isLoading
          ? "Loading"
          : links.length > 0
          ? links?.map((link, key) => (
              <LinkHeader
                setSelectPage={setSelectPage}
                link={link}
                navigate={navigate}
                key={key + 1}
                isLink={true}
              >
                <span className="font-semibold text-[.8rem]  text-[#046923]">
                  {link?.clicks} Engagements
                </span>
                <span>
                  Created: {UtilController.formatdate(link?.createdAt)}
                </span>
              </LinkHeader>
            ))
          : "no links"}
      </div>
    </div>
  );
}

export default Links;
