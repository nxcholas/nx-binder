import Button from "../components/Button.jsx";
import MainContent from "../components/MainContent";
import Navbar from "../components/Navbar";
import NoCardsFound from "../components/NoCardsFound.jsx";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import { useAuth } from "../context/AuthContext";
import { useState, forwardRef, useMemo } from "react";
import api from "../lib/axios.mjs";
import toast from "react-hot-toast";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Binder() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { isAuthenticated } = useAuth();
  const filteredCards = useMemo(() => {
    if (!user) return [];

    return user.binder.filter((card) =>
      card.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, user]);

  const handleDelete = () => {
    setDeleteOpen(!deleteOpen);
  };

  const deleteCard = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("no token found");
        return;
      }

      const res = await toast.promise(
        api.delete(`/binder/deletecard/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        {
          loading: "Deleting card...",
          success: "Card Deleted!",
          error: "Error when deleting card.",
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
      setDeleteOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <MainContent>
        {!isAuthenticated || user === null ? (
          <NoCardsFound />
        ) : (
          <>
            <div className="w-full text-center rounded-t-2xl py-4 mb-2">
              <h1 className="md:text-6xl text-2xl font-bold">
                {`${user.name}'s Binder`}
              </h1>
            </div>
            <div className="w-full sticky top-0 z-10">
              <TextField
                id="filled"
                label="Search"
                variant="filled"
                type="text"
                sx={{ input: { color: "white" } }}
                margin="normal"
                fullWidth
                name="search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="binder-grid grid grid-cols-3 w-full overflow-y-auto max-h-[80vh] gap-x-1 leading-none">
              {filteredCards.map((card) => (
                <div
                  key={card._id}
                  className="w-full aspect-63/88 flex items-center justify-center"
                  onClick={() => setSelectedCard(card)}
                >
                  <img
                    src={card.image + "/high.png"}
                    alt={card.name || `Card ${card._id}`}
                    className="max-w-full max-h-full object-contain block cursor-pointer transition-transform duration-200 hover:scale-95"
                  />
                </div>
              ))}
            </div>

            {selectedCard && (
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
                    <Button
                      text={"Delete"}
                      type={"secondary"}
                      onClick={handleDelete}
                    />
                  </div>
                </div>
                <Dialog
                  open={deleteOpen}
                  slots={{ transition: Transition }}
                  keepMounted
                  onClose={() => setDeleteOpen(false)}
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
                  <DialogTitle>{"Delete this card?"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      This card will be permanently deleted from your binder.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      type="secondary"
                      text="Delete"
                      onClick={() => deleteCard(selectedCard._id)}
                    />
                  </DialogActions>
                </Dialog>
              </div>
            )}
          </>
        )}
      </MainContent>
    </>
  );
}

export default Binder;
