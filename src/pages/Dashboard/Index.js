import MainTitle from "../../components/MainTitle/Index";
import Stats from "../../components/Stats/Index";
import TopLinks from "./Components/TopLinks";
function DashBoard({ links, setSelectPage }) {
  const sortLink = links.slice().sort((a, b) => b.clicks - a.clicks);
  return (
    <div className="dashboard-container">
      <div className="header-holder dashbrd-header py-[2rem] ">
        <MainTitle tag="h1" titleStyle="text-[2rem]">
          Connections Dashboard
        </MainTitle>
      </div>
      <div className="stats-holder flex w-full gap-[2rem] ">
        <Stats links={links} />
        <TopLinks links={sortLink} setSelectPage={setSelectPage} />
      </div>
    </div>
  );
}

export default DashBoard;
