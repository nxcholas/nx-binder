import MainContent from "../components/MainContent";
import Navbar from "../components/Navbar";
import NoAccountFound from "../components/NoAccount";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

function Binder() {
  const { isAuthenticated } = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar />
      <MainContent>
        {!isAuthenticated ? (
          <NoAccountFound />
        ) : (
          <>
            <div className="w-full text-center rounded-t-2xl py-4">
              <h1 className="md:text-6xl text-2xl font-bold">{`${user.name}'s Binder`}</h1>
            </div>
            <div className="binder-grid grid grid-cols-3  w-full overflow-y-auto max-h-[80vh] gap-x-1 leading-none">
              {user.binder.map((card, index) => (
                <div
                  key={index}
                  className="w-full aspect-63/88 flex items-center justify-center"
                >
                  <img
                    src={card.image + "/high.png"}
                    alt={card.name || `Card ${index}`}
                    className="max-w-full max-h-full object-contain block"
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </MainContent>
    </>
  );
}
export default Binder;
