
import HeroBus from "./HeroBus"
import BusCusTrust from "./BusCusTrust"
import BusList from "./BusList"
import BusFeature from "./BusFeature"
import BusRoute from "./BusRoute"
// import Navbar from "../../Navbar/Navbar"
// import BusTravData from "./BusTravData"

import UnderConstruction from "../../Pages/UnderConstruction";

function BusPage() {
  return (
    <>
    {/* <Navbar/> */}
    <HeroBus/>
    <BusCusTrust/>
    <BusList/>
    <BusRoute/>
    {/* <BusTravData/> */}
    <UnderConstruction/>
    <BusFeature/>

    </>
    
  )
}

export default BusPage