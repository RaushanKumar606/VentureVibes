import FlightDeals from "./FlightDeals"
import FlightDetails from "./FlightDetails"
import FlightFooter from "./FlightFooter"
import FlightHero from "./FlightHero"
import FlightNavbar from "./FlightNavbar"
import FlightService from "./FlightService"


function FlightPages() {
  return (
   <>
   <FlightNavbar/>
   <FlightHero/>
   <FlightService/>
   <FlightDeals/>
   <FlightDetails/>
   <FlightFooter/>

   </>
  )
}

export default FlightPages