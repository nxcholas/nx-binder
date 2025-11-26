import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex min-w-screen border border-b-rose-300/90 justify-between">
        <div className="px-8 py-4">
          <Button
            type="toggle"
            sx={{ fontSize: 36 }}
            icon={MenuIcon}
            onClick={() => {}}
          />
        </div>
        <div className="px-8 py-4">
          <Button
            type="link"
            icon={LoginIcon}
            sx={{ fontSize: 30 }}
            text="Log In"
            onClick={() => navigate('/login')}
          />
        </div>
      </div>
    </>
  );
}
export default Navbar;
