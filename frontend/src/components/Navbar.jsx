import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import FolderIcon from "@mui/icons-material/Folder";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import ScreenSearchDesktopIcon from "@mui/icons-material/ScreenSearchDesktop";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useState, forwardRef } from "react";
import { useAuth } from "../context/AuthContext";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Navbar() {
  const [sideOpen, setSideOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  // nav links
  const navLinks = [
    {
      text: "Search Sets",
      icon: <ScreenSearchDesktopIcon sx={{ fontSize: 36 }} />,
      href: "/searchsets",
    },
  ];

  // init
  const navigate = useNavigate();

  // 👇 pull auth state from context
  const { isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setSideOpen((prev) => !prev);
  };

  const handleLogoutOpen = () => {
    setLogoutOpen(true);
  };

  const handleLogoutClose = () => {
    setLogoutOpen(false);
  };

  const handleLogout = () => {
    // use context logout (updates token + isAuthenticated)
    logout();

    // close the modal
    setLogoutOpen(false);

    // navigate to home
    navigate("/");
  };

  const handleLink = (link) => {
    toggleMenu();
    console.log(link)
    navigate(link);
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
      >
        {/* side nav */}
        <div className="container w-full h-full overflow-y-auto mt-17 flex flex-col justify-center items-center">
          <div className="relative p-1 mb-8">
            <img
              src="/nx-binder-banner.jpg"
              alt="banner"
              className="rounded-xl brightness-75"
            />
            <h1 className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold">
              NX-Binder
            </h1>
          </div>
          <div className="w-full border border-gray-700 mb-4"></div>
          <div className="w-full">
            {/* map nav links here */}
            {navLinks.map((link) => (
              <ul>
                <li
                  onClick={() => handleLink(link.href)}
                  key={link.text}
                  className="flex items-center gap-4 cursor-pointer rounded-lg pl-4 hover:bg-gray-800"
                >
                  {link.icon}
                  <h1 key={link.text} className="text-xl font-bold">
                    {link.text}
                  </h1>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>

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
          {isAuthenticated ? (
            <Button
              type="link"
              icon={LogoutIcon}
              sx={{ fontSize: 25 }}
              text="Log Out"
              onClick={handleLogoutOpen}
            />
          ) : (
            <Button
              type="link"
              icon={LoginIcon}
              sx={{ fontSize: 25 }}
              text="Log In"
              onClick={() => navigate("/login")}
            />
          )}

          <Button
            type="link"
            icon={FolderIcon}
            sx={{ fontSize: 25 }}
            onClick={() => navigate("/binder")}
          />
        </div>

        <Dialog
          open={logoutOpen}
          slots={{ transition: Transition }}
          keepMounted
          onClose={handleLogoutClose}
          aria-describedby="alert-dialog-slide-description"
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: "oklch(13% 0.028 261.692)",
              color: "#ffffff",
              fontFamily: "Geist, sans-serif",
            },
            "& .MuiDialogTitle-root": {
              fontFamily: "Geist, sans-serif",
              color: "#ffffff",
            },
            "& .MuiDialogContent-root": {
              fontFamily: "Geist, sans-serif",
              color: "#ffffff",
            },
            "& .MuiDialogContentText-root": {
              fontFamily: "Geist, sans-serif",
              color: "#ffffff",
            },
            "& .MuiDialogActions-root": {
              fontFamily: "Geist, sans-serif",
              color: "#ffffff",
            },
          }}
        >
          <DialogTitle>{"Ready to Log Out?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              You can always come back and sign in again whenever you're ready.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button type="secondary" text="Log out" onClick={handleLogout} />
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default Navbar;
