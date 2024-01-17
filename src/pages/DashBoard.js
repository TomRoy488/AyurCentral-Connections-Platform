import { useNavigate } from "react-router-dom";

function DashBoard({ links, setSelectPage }) {
  const navigate = useNavigate();

  const { totalEngagement, totalScans, totalclicks } = links.reduce(
    (acc, link, i) => {
      if (link.clicks) {
        return {
          ...acc,
          totalclicks: acc.totalclicks + link.clicks,
          totalEngagement: acc.totalEngagement + link.clicks,
        };
      }
      return acc;
    },
    {
      totalEngagement: 0,
      totalScans: 0,
      totalclicks: 0,
    }
  );
  const sortLink = links.slice().sort((a, b) => b.clicks - a.clicks);
  return (
    <div className="dashboard-container">
      <div className="header-holder dashbrd-header py-[2rem] ">
        <h1 className="text-[2rem] font-bold ">Connections Dashboard</h1>
      </div>
      <div className="stats-holder flex w-full gap-[2rem] ">
        <div className="stats-data w-full  bg-white p-[1rem] rounded-[.5rem]">
          <h3 className="text-[1.5rem] font-bold">Stats</h3>
          <div className="stats-list flex flex-col gap-[1rem] mt-[1rem]">
            <div className="total-count engage-count ">
              <h4>Total Engagements</h4>
              <h3 className="text-[1.8rem] font-bold my-[.3rem]">
                {totalEngagement}
              </h3>
            </div>
            <div className="total-count link-count">
              <h4>Link Clicks</h4>
              <h3 className="text-[1.8rem] font-bold my-[.3rem]">
                {totalclicks}
              </h3>
            </div>
            <div className="total-count qr-count">
              <h4>QR Code Scans</h4>
              <h3 className="text-[1.8rem] font-bold my-[.3rem]">
                {totalScans}
              </h3>
            </div>
          </div>
        </div>
        <div className="top-links w-full  bg-white p-[1rem] rounded-[.5rem]">
          <h3 className="text-[1.5rem] font-bold">Top Links</h3>
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
                          `/links/${link?.title
                            .toLowerCase()
                            .replaceAll(" ", "")}`
                        );
                      }}
                    >
                      {link?.title}
                    </h4>
                    <p className="font-bold my-[.5rem]  text-[#0c3ebb] cursor-pointer flex w-fit">
                      <a href={link?.link} target="_blank">
                        {link.link}
                      </a>
                    </p>
                  </div>
                )
            )}

          </div>

        </div>
      </div>
    </div>
  );
}

export default DashBoard;
