import MainContent from "../components/MainContent";
import Navbar from "../components/Navbar";

function Homepage() {
  return (
    <>
      <Navbar />
      <MainContent>
        {/* render content here */}
        <h1>homepage</h1>
      </MainContent>
    </>
  );
}
export default Homepage;
