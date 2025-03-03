import { useEffect, useState } from "react";
import "./Train.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { fetchData } from "../../../../utils/rapid.api";

const TrainSearch = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [tatkal, setTatkal] = useState("Today");


  // Search train used r for api call 
  useEffect(()=>{
 const featchData =async ()=>{
  try {
     const response= await fetch(featchData +source );
     const data1 = response.json();
     setSource(data1)
     console.lpg(data1)
  } catch (error) {
    console.log(error)
    
  }
 }
 featchData();
  },[source])

  const SearchButton = async (event) => {
    event.preventDefault();
    console.log("🔍 Searching Trains...");
    let newInfo = await fetchData(); // Ye API Call hai
   console.log (newInfo)
  };



  return (
    <>
    <div className="heding-container">
    <div className="train-left">
      <h2 className="trainHeading">Train Ticket Booking</h2>
    </div>
    <div className="train-right">
      <h2 className="trainHeading">IRCTC Authorized Partner</h2>
    </div>
  </div>
      <div className="booking_box">
        <RadioGroup
          row
          value={tatkal}
          onChange={(e) => setTatkal(e.target.value)}
        >
          {["Book Train", "Check PNR Status", "Live Trains Status"].map(
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

        <RadioGroup
          row
          value={tatkal}
          onChange={(e) => setTatkal(e.target.value)}
        >
          {["Today", "Tomorrow", "Day After Tomorrow"].map((day, index) => (
            <FormControlLabel
              key={index}
              value={day}
              control={<Radio />}
              label={
                <>
                  <span className="tatkal_btn">TATKAL OPEN</span> {day}
                </>
              }
            />
          ))}
        </RadioGroup>

        <Button variant="contained" color="success" className="search_btn" onClick={SearchButton}>
          SEARCH TRAINS
        </Button>
      </div>
      
      </>
  );
};

export default TrainSearch;
