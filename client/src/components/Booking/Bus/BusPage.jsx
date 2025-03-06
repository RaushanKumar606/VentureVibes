
import HeroBus from "./HeroBus"
import BusCusTrust from "./BusCusTrust"
import BusList from "./BusList"
import BusFeature from "./BusFeature"
import BusRoute from "./BusRoute"
import FlightNavbar from "../Flight/FlightNavbar"
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