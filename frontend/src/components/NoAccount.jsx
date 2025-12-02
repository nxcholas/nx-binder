import FolderSharedIcon from "@mui/icons-material/FolderShared";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";

const NoAccountFound = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  return (
    <>
      {!isAuthenticated && (
        <div className="flex flex-col items-center justify-center space-y-6 max-w-md mx-auto text-center">
          <div className="bg-gray-600 rounded-3xl p-4">
            <FolderSharedIcon sx={{ fontSize: 84 }} />
          </div>
          <h1 className="text-2xl font-bold">No account found</h1>
          <p className="text-lg">
            Ready to showcase your binder? Click the link below to get started.
          </p>
          <Button
            text={"Register Now"}
            onClick={() => navigate("/register")}
            type={"link"}
            sx={{ fontSize: 25 }}
          />
        </div>
      )}
    </>
  );
};

export default NoAccountFound;
