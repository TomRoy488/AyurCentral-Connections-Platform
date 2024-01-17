import AsideNavBar from "./layouts/AsideNavBar";
import PageContainer from "./layouts/PageContainer";

function App() {
  return (
    <div className="main-container flex h-full w-full relative">
      <AsideNavBar />
      <div className="space-maker w-[16%] basis-[16%] bg-black"></div>
      <PageContainer />
    </div>
  );
}

export default App;
