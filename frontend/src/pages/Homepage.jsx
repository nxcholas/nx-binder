import MainContent from "../components/MainContent";
import Navbar from "../components/Navbar";
import NoAccountFound from "../components/NoAccount";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function Homepage() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Navbar/>
      <MainContent>
        {/* render content here */}
        <div className="flex justify-center items-center">
          {isAuthenticated ? (
            // insert dashboard here or user data
            <p>test</p>
          ) : (
            <NoAccountFound />
          )}
        </div>
      </MainContent>
    </>
  );
}
export default Homepage;
