import FlightDeals from "./FlightDeals"
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
   <FlightFooter/>
   </>
  )
}

export default FlightPages