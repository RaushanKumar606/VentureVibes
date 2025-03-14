import { useAuth } from "../Hooks/ContextApi";

const BookingList = () => {
  const { bookings} = useAuth();
  console.log("booking deatiels",bookings)

  return (
    <div>
      <h2>Your Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            {booking.name} - {booking.date} - {booking.paymentStatus}
            <button>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;
