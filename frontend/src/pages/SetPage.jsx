import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, forwardRef } from "react";
import Navbar from "../components/Navbar";
import MainContent from "../components/MainContent";
import Button from "../components/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import api from "../lib/axios.mjs";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SetPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchSet = async () => {
      try {
        const res = await api.get(`/searchsets/${id}`);
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSet();
  }, [id]);

  const handleAdd = () => {
    setAddOpen(!addOpen);
  };

  const addCard = async (card) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("no token found");
        return;
      }

      const res = await toast.promise(
        api.post(`/binder/addcard/`, card, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        {
          loading: "Adding card...",
          success: "Card Added!",
          error: "Error when adding card.",
        }
      );

      const updatedBinder = res.data.binder;

      // update current user state
      setUser((prev) => ({
        ...prev,
        binder: updatedBinder,
      }));

      // update local storage user
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          binder: updatedBinder,
        })
      );

      // close modal
      setAddOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (!data)
    return (
      <>
        <Navbar />
        <MainContent>
          <div className="binder-grid grid grid-cols-3 w-full overflow-y-auto max-h-[80vh] gap-1 leading-none">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="w-full aspect-63/88 bg-gray-950 rounded-md animate-pulse"
              />
            ))}
          </div>
        </MainContent>
      </>
    );

  return (
    <>
      <Navbar />
      <MainContent>
        {/* render content here */}
        {/* add a search here maybe */}
        <div
          className="
          binder-grid
          grid grid-cols-2 md:grid-cols-3 w-full overflow-y-auto max-h-[80vh] gap-x-1 leading-none
        "
        >
          {[...data.cards].reverse().map((card) => (
            <div
              key={card._id}
              className="w-full aspect-63/88 flex items-center justify-center"
              onClick={() => {
                const { _id, ...cardWithoutId } = card;
                setSelectedCard(cardWithoutId);
              }}
            >
              <img
                src={card.image + "/high.png"}
                alt={card.name || `Card ${card._id}`}
                className="max-w-full max-h-full object-contain block cursor-pointer transition-transform duration-200 hover:scale-95"
              />
            </div>
          ))}
          {selectedCard && isAuthenticated && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center
              bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedCard(null)}
            >
              <div
                className="max-w-[90%] max-h-[90%] p-4 flex"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedCard.image + "/high.png"}
                  alt={selectedCard.name}
                  className="max-h-[90vh] w-auto object-contain drop-shadow-2xl transition-transform duration-300 scale-100"
                />
                <div className="">
                  <Button text={"Add"} type={"submit"} onClick={handleAdd} />
                </div>
              </div>
              <Dialog
                open={addOpen}
                slots={{ transition: Transition }}
                keepMounted
                onClose={() => setAddOpen(false)}
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
                <DialogTitle>{"Add this card?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    This card will be added to your personal binder!
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    type="submit"
                    text="Add Card"
                    onClick={() => addCard(selectedCard)}
                  />
                </DialogActions>
              </Dialog>
            </div>
          )}
        </div>
      </MainContent>
    </>
  );
}
export default SetPage;
