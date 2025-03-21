import { useAuth } from "../Hooks/ContextApi";
const BookingList = () => {
  const { bookings } = useAuth();
 
  return (
    <div>
      <h2>Your Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>
            {booking.name} - {booking.date} - <br /> {booking.paymentStatus} -
            {booking.bookingType} <br />
            {booking.status} <br /> {booking.updatedAt} <br />
            {booking.user.name} <br />
            {/* {booking.bus.departureLocation}  <br /> */}
            {/* {booking.bus.arrivalLocation} <br /> */}
            <button className="bg-lime-400">Check</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;
