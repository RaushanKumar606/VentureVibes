import FlightNavbar from "./FlightNavbar"
import HeroFlight from "./HeroFlight"
import  "./Flight.css"
import FlightSearchForm from "./FlightSearchForm"
import AirportSearch from "./AirportSearch"


function FlightPage() {
  return (
    <div>
       <FlightNavbar/>
      <HeroFlight/>
     <FlightSearchForm/>
     <AirportSearch/>
     
    </div>
  )
}

export default FlightPage
