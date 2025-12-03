import MainContent from "../components/MainContent";
import Navbar from "../components/Navbar";
import api from "../lib/axios.mjs";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

function SearchSets() {
  const [selectedSet, setSelectedSet] = useState(null);
  const [sets, setSets] = useState([]);
  const [data, setData] = useState(null);

  const navigate = useNavigate();

  // get all sets
  useEffect(() => {
    const fetchSets = async () => {
      const res = await api.get("/searchsets");
      setSets(res.data);
    };
    fetchSets();
  }, []);

  // get set by id
  const handleClick = async (id) => {
    setSelectedSet(id);
    console.log(id)

    try {
      const res = await api.get(`/searchsets/${id}`);
      setData(res.data);
      navigate(`/searchsets/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <MainContent>
        {/* render content here */}
        {/* get all sets */}
        {data === null ? (
          <div className="binder-grid grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-9/10 overflow-y-auto max-h-[80vh] gap-2 leading-none">
            {sets.map((set) => (
              <div
                key={set.id}
                className="w-full flex items-center justify-center bg-gray-950 rounded-4xl p-4 cursor-pointer min-w-[200px]"
                onClick={() => handleClick(set.id)}
              >
                <img
                  key={set._id}
                  src={set.logo + ".png"}
                  alt={set.name || `Set ${set.id}`}
                  className="max-w-full max-h-full object-contain block "
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ) : (
            <div className="binder-grid grid grid-cols-3 w-full overflow-y-auto max-h-[80vh] gap-x-1 leading-none">
              {data.cards.map((card) => (
                <div
                  key={card._id}
                  className="w-full aspect-63/88 flex items-center justify-center"
                >
                  <img
                    src={card.image + "/high.png"}
                    alt={card.name || `Card ${card._id}`}
                    className="max-w-full max-h-full object-contain block cursor-pointer transition-transform duration-200 hover:scale-95"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
        )}
      </MainContent>
    </>
  );
}
export default SearchSets;
