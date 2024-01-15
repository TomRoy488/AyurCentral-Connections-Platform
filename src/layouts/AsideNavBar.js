import { NAVLINKS } from "../config/constants";
import { NavLink } from "react-router-dom";

function AsideNavBar() {
  return (
    <nav className="  w-[25%] bg-white h-full px-[.75rem] border-e-[2px] border-solid border-[#e8ebf2] fixed left-0 top-0 bottom-0">
      <div className="nav-container">
        <div className="nav-logo-container">
          <div className="nav-logo-img py-[1rem]  flex justify-start items-center">
            <span className="logo text-[1.2rem]   font-bold text-[#f85033]">LOGO</span>
          </div>
        </div>
        <div className="nav-links-lists flex flex-col ">
          <div className="nav-btn-box pb-[1rem] border-b-[2px] border-solid border-[#e8ebf2]">
            <button className="nav-btn font-semibold bg-[#0c3ebb] text-white py-[.2rem] w-full rounded-[.2rem]">
              Create new
            </button>
          </div>
          <ul className="nav-list flex flex-col gap-[.5rem] mt-[1rem]">
            {NAVLINKS.map((link, key) => (
              <li
                className={`nav-item ${
                  key === 0 &&
                  "bg-[#edf2ff] text-[#0c3ebb] border-s-[.2rem] border-solid border-[#0c3ebb] cursor-pointer"
                } p-[.5rem] ps-[.75rem]  rounded-[.2rem]`}
                key={key + link.label}
              >
                <NavLink className="nav-link  font-semibold" to={link.href}>
                  {link.label}
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
