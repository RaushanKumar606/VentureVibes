import  { useState } from 'react';
import { MapPin, Calendar, Search } from 'lucide-react';

const FlightSearchForm = () => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departure: '',
    return: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Search Data:', formData);
  };

  return (
    <div className="flight-search-container">
      <form className="flight-search-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <MapPin className="icon" />
          <div>
            <label>From</label>
            <input
              type="text"
              name="from"
              placeholder="Pick the location"
              value={formData.from}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <MapPin className="icon" />
          <div>
            <label>To</label>
            <input
              type="text"
              name="to"
              placeholder="Pick the location"
              value={formData.to}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <Calendar className="icon" />
          <div>
            <label>Departure</label>
            <input
              type="date"
              name="departure"
              value={formData.departure}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <Calendar className="icon" />
          <div>
            <label>Return</label>
            <input
              type="date"
              name="return"
              value={formData.return}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="search-btn">
          <Search size={20} />
        </button>
        <h4>Special Fares
<span>(Optional)</span>

:</h4>
<div className="offer">
  <ul>
    <il>Student</il>
  <il>Senior Citizen</il>
  <il>Armed Forces</il>
  </ul>
</div>

      </form>
     
    </div>
  );
};

export default FlightSearchForm;
