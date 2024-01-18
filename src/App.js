import PublicRoute from "./Route";
import AsideNavBar from "./layouts/AsideNavBar";

function App() {
  return (
    <div className="main-container flex h-full w-full relative">
      <AsideNavBar />
      <div className="space-maker w-[16%] basis-[16%] bg-black"></div>
      {/* <PageContainer /> */}
      <PublicRoute />
    </div>
  );
}

export default App;
