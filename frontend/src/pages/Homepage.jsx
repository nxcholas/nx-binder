import MainContent from "../components/MainContent";
import Navbar from "../components/Navbar";
import NoAccountFound from "../components/NoAccount";
import {useState, useEffect} from 'react';

function Homepage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsAuthenticated(true);
    }
  }, [isAuthenticated])
  return (
    <>
      <Navbar />
      <MainContent>
        {/* render content here */}
        <div className="flex justify-center items-center">
          {!isAuthenticated && (
            <NoAccountFound />
          )}
          {}
        </div>
      </MainContent>
    </>
  );
}
export default Homepage;
