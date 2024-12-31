

const DashboardHeader = () => {
  return (
    <div className="dashboard-header">
      <h2>Admin, Dashboard</h2>
      <div className="header-actions">
        <input type="text" placeholder="Search" />
        <div className="dropdown">EN</div>
        <div className="dropdown">Dollar</div>
       
      </div>
    </div>
  );
};

export default DashboardHeader;
