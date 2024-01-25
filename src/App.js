import PublicRoute from "./Route";
import AsideNavBar from "./layouts/AsideNavBar";

function App() {
  return (
    <div className="main-container flex h-full w-full relative">
      <AsideNavBar />
      <div
        className="space-maker  w-[25
        %] basis-[25%] bg-white lg:basis-[16%] lg:w-[16%]"
      ></div>
      {/* <PageContainer /> */}
      <PublicRoute />
    </div>
  );
}

export default App;
