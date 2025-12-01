import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, forwardRef, useMemo } from "react";
import Navbar from "../components/Navbar";
import MainContent from "../components/MainContent";
import Button from "../components/Button";
import CardPriceSkeleton from "../components/CardPriceSkeleton";
import CardPriceDifferenceChartSkeleton from "../components/CardPriceDifferenceChartSkeleton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import api from "../lib/axios.mjs";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import TextField from "@mui/material/TextField";
import TCGdex from "@tcgdex/sdk";
import CardPriceChart from "../components/CardPriceChart";
import CardPriceDifferenceChart from "../components/CardPriceDifferenceChart";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SetPage() {
  // url param
  const { id } = useParams();

  // states
  const [data, setData] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const [search, setSearch] = useState("");
  const [pricing, setPricing] = useState(null);
  const [loaded, setLoaded] = useState(false);

  // init variables
  const { isAuthenticated } = useAuth();
  const filteredCards = useMemo(() => {
    if (!data?.cards) return [];

    return data.cards.filter((card) =>
      card.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

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

  // get pricing data on card click
  useEffect(() => {
    async function getPricing() {
      if (selectedCard) {
        const tcgdex = new TCGdex("en");
        const card = await tcgdex.card.get(selectedCard.id);
        const { low, avg, avg7, avg30, trend } = card.pricing.cardmarket;
        const destructuredPricing = {
          low,
          avg,
          avg7,
          avg30,
          trend,
        };
        setPricing(destructuredPricing);
        console.log(pricing);
      }
    }
    getPricing();
  }, [selectedCard]);

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
            {!loaded && Array.from({ length: 12 }).map((_, i) => (
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
        <div className="flex flex-col px-8">
          <div className="w-full sticky top-0 z-0">
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
          <div
            className="
          binder-grid
          grid grid-cols-2 md:grid-cols-3 w-full overflow-y-auto max-h-[80vh] gap-x-1 leading-none
        "
          >
            {[...filteredCards].reverse().map((card) => (
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
                  onLoad={() => setLoaded(true)}
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
                  className="min-w-[70vw] max-h-[90%] p-4 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={selectedCard.image + "/high.png"}
                    alt={selectedCard.name}
                    className="max-h-[90vh] w-auto object-contain drop-shadow-2xl transition-transform duration-300 scale-100 mb-4 md:mb-0"
                  />
                  <div className="chart-container flex flex-col w-full gap-2">
                    <div className="flex justify-between items-center px-4 py-4 rounded-2xl bg-gray-900">
                      <h1 className="text-xl font-semibold">
                        {selectedCard.name}
                      </h1>
                      <Button
                        text={"Add Card"}
                        type={"submit"}
                        onClick={handleAdd}
                      />
                    </div>
                    <div>
                      {/* charts here */}
                      <div className="bg-gray-900 rounded-2xl flex flex-col">
                        {pricing === null ? (
                          <CardPriceSkeleton />
                        ) : (
                          <>
                            <div className="label w-full text-center p-4 font-bold">
                              <h1>Card Pricing (USD)</h1>
                            </div>
                            {/* insert more charts here */}
                            <CardPriceChart pricing={pricing} />
                          </>
                        )}
                      </div>
                    </div>
                    <div className="bg-gray-900 rounded-2xl">
                      {pricing === null ? (
                        <CardPriceDifferenceChartSkeleton />
                      ) : (
                        <>
                          <div className="label w-full text-center p-4 font-bold">
                            <h1>Pricing Difference (USD)</h1>
                          </div>
                          <CardPriceDifferenceChart pricing={pricing} />
                        </>
                      )}
                    </div>
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
        </div>
      </MainContent>
    </>
  );
}
export default SetPage;
