import Footer from "../../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import About from "./About";
import Blogs from "./Blogs";
import Hero from "./Hero";
import Services from "./Service";
function HomePages() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Blogs/>
      <About />
      <Footer />
    </>
  );
}

export default HomePages;
