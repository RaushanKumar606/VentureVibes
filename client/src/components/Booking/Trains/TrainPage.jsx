
import Navbar from "../../Navbar/Navbar"
import TrainCus from "./TrainCus"
import TrainHero from "./TrainHero"
import TrainHolidayPage from "./TrainHolidayPage"
import TrainInquiry from "./TrainInquiry"
import TrainFooter from './TrainFooter'
function TrainPage() {
  return (
   <>
   {/* <Navbar/> */}
   <TrainHero/>
   <TrainCus/>
   <TrainInquiry/>
   <TrainHolidayPage/>
   <TrainFooter/>
   </>
  )
}

export default TrainPage
