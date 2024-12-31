import DashboardContent from "./DashboardContent"
import DashboardHeader from "./DashboardHeader"
import Sidebar from "./Salider"


function AdminPage() {
  return (
    <div className="dashboard">
             <Sidebar />
             {/* Main Content Area */}
             <div className="main-content">
               {/* Navbar/Header */}
              <DashboardHeader />
              <DashboardContent />
              </div>
     </div>
  )
}

export default AdminPage
