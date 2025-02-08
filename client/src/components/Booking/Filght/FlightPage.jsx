import FlightNavbar from "./FlightNavbar"
import HeroFlight from "./HeroFlight"
import  "./Flight.css"
import FlightSearchForm from "./FlightSearchForm"


function FlightPage() {
  return (
    <div>
       <FlightNavbar/>
      <HeroFlight/>
     <FlightSearchForm/>
     
    </div>
  )
}

export default FlightPage
