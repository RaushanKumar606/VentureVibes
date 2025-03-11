import Navbar from "../../Navbar/Navbar"
import AllHotels from "./AllHotels"
import HotelChoice from "./HotelChoice"
import HotelFeatures from "./HotelFeatures"
import HotelSearch from "./HotelSearch"
import HotelFooter from "./HotelsFooter"
import PopularHotel from "./PopularHotel"


function HotelPage() {
  return (
    <>
      <Navbar/>
    <HotelSearch/>
    <HotelChoice/>
    <AllHotels/>
    <PopularHotel/>
    <HotelFeatures/>
    <HotelFooter/>
    </>
  )
}

export default HotelPage