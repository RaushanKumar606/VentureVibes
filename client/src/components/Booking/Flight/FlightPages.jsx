import FlightDeals from "./FlightDeals"
import FlightDetails from "./FlightDetails"
import FlightFooter from "./FlightFooter"
import FlightHero from "./FlightHero"
import Navbar from "../../Navbar/Navbar"
import FlightService from "./FlightService"


function FlightPages() {
  return (
   <>
    <Navbar/>
   <FlightHero/>
   <FlightService/>
   <FlightDeals/>
   <FlightDetails/>
   <FlightFooter/>

   </>
  )
}

export default FlightPages