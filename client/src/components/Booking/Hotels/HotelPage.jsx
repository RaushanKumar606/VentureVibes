
import AllHotels from "./AllHotels"
import HotelChoice from "./HotelChoice"
import HotelFeatures from "./HotelFeatures"
import HotelSearch from "./HotelSearch"
import HotelFooter from "./HotelsFooter"
import PopularHotel from "./PopularHotel"

import UnderConstruction from "../../Pages/UnderConstruction";

function HotelPage() {
  return (
    <>
      {/* <Navbar/> */}
    <HotelSearch/>
    <HotelChoice/>
    <AllHotels/>
    <PopularHotel/>
    <HotelFeatures/>
    <UnderConstruction/>
    <HotelFooter/>
    </>
  )
}

export default HotelPage