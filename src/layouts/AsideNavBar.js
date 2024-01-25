import { NavLink, useLocation } from "react-router-dom";
import { NAVLINKS } from "../config/constants";
import { useState } from "react";

function AsideNavBar() {
  const { pathname } = useLocation();
  const [showCreate, setShowCreate] = useState(false);
  function handleShowCreate() {
    setShowCreate((show) => !show);
  }
  return (
    <nav className="  w-[25%] bg-white h-full px-[.75rem] border-e-[2px] border-solid border-[#e8ebf2] fixed left-0 top-0 bottom-0 lg:w-[16%]">
      <div className="nav-container">
        <div className="nav-logo-container">
          <div className="nav-logo-img py-[1rem]  flex justify-start items-center">
            <span className="logo text-[1.2rem]   font-bold text-[#f85033]">
              LOGO
            </span>
          </div>
        </div>
        <div className="nav-links-lists flex flex-col ">
          <div className="nav-btn-box pb-[1rem] border-b-[2px] border-solid border-[#e8ebf2] flex flex-col gap-[1rem]">
            <button
              className="nav-btn font-semibold bg-[#0c3ebb] text-white py-[.2rem] w-full rounded-[.2rem]"
              onClick={handleShowCreate}
            >
              + Create new
            </button>
            <div
              className={`create-option border-[2px] border-solid border-[#e8ebf2]  ${
                showCreate ? `block` : `hidden`
              } `}
            >
              <ul className="nav-list flex flex-col" onClick={handleShowCreate}>
                <li
                  className={`nav-item   cursor-pointer w-full  rounded-[.2rem] hover:bg-[#edf2ff] hover:text-[#0c3ebb]`}
                >
                  <NavLink
                    className="nav-link p-[.5rem] ps-[.75rem]  font-semibold w-full flex"
                    to="/createQRCode"
                  >
                    + Create QR Code
                  </NavLink>
                </li>
                <li
                  className={`nav-item  cursor-pointer w-full  rounded-[.2rem] hover:bg-[#edf2ff] hover:text-[#0c3ebb]`}
                >
                  <NavLink
                    className="nav-link p-[.5rem] ps-[.75rem]  font-semibold w-full flex"
                    to="/createShortLinks"
                  >
                    + Create Link
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <ul className="nav-list flex flex-col gap-[.5rem] mt-[1rem]">
            {NAVLINKS.map((link, key) => (
              <li
                className={`nav-item  border-s-[.2rem] border-solid cursor-pointer w-full  rounded-[.2rem]   ${
                  link.href === pathname
                    ? "bg-[#edf2ff] text-[#0c3ebb] border-[#0c3ebb]"
                    : " border-[#ffffff]"
                } hover:text-[#0c3ebb] hover:border-[#0c3ebb] `}
                key={key + link?.label}
                onClick={() => setShowCreate(false)}
              >
                <NavLink
                  className="nav-link p-[.5rem] ps-[.75rem]  font-semibold w-full flex"
                  to={link?.href}
                >
                  {link?.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AsideNavBar;
