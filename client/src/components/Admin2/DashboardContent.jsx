
const DashboardContent = () => {
  return (
    <div className="dashboard-content">
      <div className="stats">
        <div className="stat-card">2.8B Total Earnings</div>
        <div className="stat-card">1.5M Happy Users</div>
        <div className="stat-card">10K Employees</div>
        <div className="stat-card">12K New Bookings</div>
      </div>
      <div className="latest-bookings">
        <h3>Latest Hotel Bookings</h3>
        {/* Example bookings */}
        <div>Queens Hotel - 28-29 May</div>
        <div>Hotel Lavilia - 28 May - 1 June</div>
      </div>
      {/* Add more sections like Earnings Stats, Monthly Report */}
    </div>
  );
};

export default DashboardContent;
