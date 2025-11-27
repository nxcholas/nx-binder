import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import FolderIcon from "@mui/icons-material/Folder";
import HomeIcon from "@mui/icons-material/Home";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [sideOpen, setSideOpen] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setSideOpen(!sideOpen);
  };
  return (
    <>
      <div
        className={`
          absolute md:fixed
          top-0 left-0
          z-2
          w-3/4 min-w-3/4
          md:w-[340px] md:min-w-[340px] md:max-w-[340px]
          min-h-screen
          max-h-screen
          bg-gray-950
          transform transition-transform duration-300
          ${sideOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      ></div>
      <div className="z-2 sticky bg-gray-900 flex min-w-screen border border-t-0 border-l-0 border-r-0 border-b-neutral-600 justify-between max-w-[38px] text-nowrap max-h-[67px] items-center">
        <div className="px-4 py-4 flex gap-2">
          <div>
            <Button
              type="link"
              sx={{ fontSize: 36 }}
              icon={HomeIcon}
              onClick={() => navigate("/")}
            />
          </div>
          <div className="md:hidden">
            <Button
              type="toggle"
              sx={{ fontSize: 36 }}
              icon={MenuIcon}
              onClick={toggleMenu}
            />
          </div>
        </div>
        <div className="px-2 py-4 ml-auto flex gap-2">
          <Button
            type="link"
            icon={LoginIcon}
            sx={{ fontSize: 25 }}
            text="Log In"
            onClick={() => navigate("/login")}
          />
          <Button
            type="link"
            icon={FolderIcon}
            sx={{ fontSize: 25 }}
            onClick={() => navigate("/binder")}
          />
        </div>
      </div>
    </>
  );
}
export default Navbar;
