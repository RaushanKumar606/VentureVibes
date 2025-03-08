import { useAuth } from "../../Hooks/ContextApi/ContextApi";

function FlightDetails() {
  const { flightData } = useAuth(); // Ensure correct key name

  console.log("All flight data:", flightData);

  return (
    <div className="mt-10 text-center">
      <h1>ALL FLIGHT DATA</h1>
      
      {flightData && flightData.caption && flightData.caption.user ? (
        <div className="border p-4 my-2">
          <p><strong>Username:</strong> {flightData.caption.user.username}</p>
          <p><strong>User ID:</strong> {flightData.caption.user.pk}</p>
          <p><strong>Full Name:</strong> {flightData.caption.user.full_name}</p>
          <img src={flightData.caption.user.profile_pic_url} alt="Profile" width="100" />
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
}

export default FlightDetails;

