import SdCardAlertIcon from '@mui/icons-material/SdCardAlert';
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";

const NoCardsFound = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  return (
    <>
      {!isAuthenticated && (
        <div className="flex flex-col items-center justify-center  space-y-6 max-w-md mx-auto text-center">
          <div className="bg-gray-600 rounded-3xl p-4">
            <SdCardAlertIcon sx={{ fontSize: 84 }} />
          </div>
          <h1 className="text-2xl font-bold">No cards found</h1>
          <p className="text-l">
            Ready to showcase your binder? Let's log you in before we get started.
          </p>
          <Button
            text={"Log In"}
            onClick={() => navigate("/login")}
            type={"link"}
            sx={{ fontSize: 25 }}
            icon={LoginIcon}
          />
        </div>
      )}
    </>
  );
};

export default NoCardsFound;
