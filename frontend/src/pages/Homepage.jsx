import MainContent from "../components/MainContent";
import Navbar from "../components/Navbar";
import NoAccountFound from "../components/NoAccount";

function Homepage() {
  return (
    <>
      <Navbar />
      <MainContent>
        {/* render content here */}
        <div className="flex justify-center items-center">
          <NoAccountFound />
        </div>
      </MainContent>
    </>
  );
}
export default Homepage;
