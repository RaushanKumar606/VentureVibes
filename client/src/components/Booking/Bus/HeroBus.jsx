
import { useState } from "react";
// import "./Train.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const HeroBus = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [tatkal, setTatkal] = useState("Today");

  return (
    <>
    <div className="heding-container">
    <div className="train-left">
      <h2 className="trainHeading">Bus Ticket Booking</h2>
    </div>
  
  </div>
      <div className="booking_box">
        <RadioGroup
          row
          value={tatkal}
          onChange={(e) => setTatkal(e.target.value)}
        >
          {["Book Bus", "Check Bus Status", "Live Bus Status"].map(
            (option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio />}
                label={option}
              />
            )
          )}
        </RadioGroup>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "25px" }}>
          <TextField
            label="Enter Source Name"
            variant="outlined"
            style={{ flex: "1 1 300px", height: "70px" }}
            margin="normal"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            InputProps={{ style: { height: "70px" } }}
          />
          <TextField
            label="Enter Destination Name"
            variant="outlined"
            style={{ flex: "1 1 300px", height: "70px" }}
            margin="normal"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            InputProps={{ style: { height: "70px" } }}
          />
          <TextField
            type="date"
            label="Departure Date"
            variant="outlined"
            style={{ flex: "1 1 300px", height: "70px" }}
            margin="normal"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            InputProps={{ style: { height: "70px" } }}
          />
        </div>

     

        <Button variant="contained" color="success" className="search_btn">
          SEARCH TRAINS
        </Button>
      </div>
      
      </>
  );
};

export default HeroBus;
