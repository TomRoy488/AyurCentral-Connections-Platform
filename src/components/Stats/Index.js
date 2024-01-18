import { useMemo } from "react";
import MainTitle from "../MainTitle/Index";

function Stats({ links }) {
  const { totalEngagement, totalScans, totalclicks } = useMemo(() => {
    return links.reduce(
      (acc, link) => {
        if (link?.clicks) {
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
  }, [links]);
  return (
    <div className="stats-data w-full  bg-white p-[1rem] rounded-[.5rem]">
      <MainTitle tag="h2" titleStyle="text-[1.5rem]">
        Stats
      </MainTitle>
      <div className="stats-list flex flex-col gap-[1rem] mt-[1rem]">
        <div className="total-count engage-count ">
          <h4>Total Engagements</h4>
          <h3 className="text-[1.8rem] font-bold my-[.3rem]">
            {totalEngagement}
          </h3>
        </div>
        <div className="total-count link-count">
          <h4>Link Clicks</h4>
          <h3 className="text-[1.8rem] font-bold my-[.3rem]">{totalclicks}</h3>
        </div>
        <div className="total-count qr-count">
          <h4>QR Code Scans</h4>
          <h3 className="text-[1.8rem] font-bold my-[.3rem]">{totalScans}</h3>
        </div>
      </div>
    </div>
  );
}

export default Stats;
