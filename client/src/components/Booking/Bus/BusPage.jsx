
import HeroBus from "./HeroBus"
import './Bus.css'
import FlightNavbar from "../Filght/FlightNavbar"
import BusCusTrust from "./BusCusTrust"
import BusList from "./BusList"
import BusFeature from "./BusFeature"
import BusRoute from "./BusRoute"
// import BusTravData from "./BusTravData"



function BusPage() {
  return (
    <>
     <FlightNavbar/>
    <HeroBus/>
    <BusCusTrust/>
    <BusList/>
    <BusRoute/>
    {/* <BusTravData/> */}
    <BusFeature/>

    </>
    
  )
}

export default BusPage