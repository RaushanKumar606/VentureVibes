import HeroHotel from "./HeroHotel"
import './hotel.css'
import HotelFeature from "./HotelFeature"
import HotelService from "./HotelService"
import Footer from  "../../../Footer/Footer"
import HotelsImages from "./HotelsImages"

function HotelPage() {
  return (
    <div>
      <HeroHotel/>
      <HotelService/>
      <HotelFeature/>
      <HotelsImages/>
      <Footer/>
    </div>
  )
}

export default HotelPage

