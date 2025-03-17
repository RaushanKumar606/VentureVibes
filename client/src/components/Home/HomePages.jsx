import Footer from "../../Footer/Footer";
// import Navbar from "../Navbar/Navbar";
import About from "./About";
import Blogs from "./Blogs";
import Hero from "./Hero";
import OverView from "./OverView";
import Services from "./Service";
import ToursPage from "./ToursPage";
function HomePages() {
  return (
    <>
      {/* <Navbar /> */}
      <Hero />
      <Services />
      <Blogs/>
      < ToursPage/>

      <About />
      <OverView/>
      <Footer />
    </>
  );
}

export default HomePages;
