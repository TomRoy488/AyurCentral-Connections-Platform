import { data } from "../config/constants";

const { links } = data;
console.log(links);
const dashboardData = {
  totalEngagement: 0,
  totalScans: 0,
  totalclicks: 0,
  linktitles: [],
  linksids: [],
};

const titles = links.map((link) => link.title);
links.forEach((link) => {
  dashboardData.totalEngagement += link.engagementtotal;
  dashboardData.totalScans += link.totalscans;
  dashboardData.totalclicks += link.totalclicks;
});
console.log(dashboardData);

function DashBoard() {
  return (
    <div className="dashboard-container">
      <h1>Connections Dashboard</h1>
    </div>
  );
}

export default DashBoard;
