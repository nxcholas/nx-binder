import MainContent from "../components/MainContent";
import Navbar from "../components/Navbar";
import NoAccountFound from "../components/NoAccount";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import BinderAnalytics from "../components/BinderAnalytics";

function Homepage() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Navbar />
      <MainContent>
        {/* render content here */}
        <div className="flex flex-col min-w-full min-h-screen p-6">
          {isAuthenticated ? (
            // insert dashboard here or user data
            <div className="min-w-full overflow-y-auto">
              <BinderAnalytics />
            </div>
          ) : (
            <div className="min-w-screen min-h-[80vh] flex justify-center items-center">
              <NoAccountFound />
            </div>
          )}
        </div>
      </MainContent>
    </>
  );
}
export default Homepage;
