import './Tours.css'
import {Tours} from './Tours'
import Navbar from "../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import CreateTourForm from './createTourForm';
function ToursPages() {
  return (
    <div>
      <Navbar/>
        <Tours/>
       <CreateTourForm/>
        < Footer/>
      
    </div>
  )
}

export default ToursPages
