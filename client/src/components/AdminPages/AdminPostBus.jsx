import { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  Chip,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";
import {useAuth} from "../Hooks/ContextApi"
const AdminCreateBus = () => {
  const [busData, setBusData] = useState({
    name: "",
    operator: "",
    busNumber: "",
    departureTime: "",
    arrivalTime: "",
    duration: "",
    departureLocation: "",
    arrivalLocation: "",
    to: [],
    day: [],
    price: "",
    seatsAvailable: "",
    totalSeats: "",
    busType: "AC",
    status: "Scheduled",
    amenities: [],
  });

  const {token} = useAuth() 
  const handleChange = (e) => {
    setBusData({ ...busData, [e.target.name]: e.target.value });
  };
  const handleMultiSelect = (e) => {
    setBusData({ ...busData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...busData,
      price: Number(busData.price),
      seatsAvailable: Number(busData.seatsAvailable),
      totalSeats: Number(busData.totalSeats),
    };

    try {
      const response = await fetch("http://localhost:8080/api/admin/create-bus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success("Bus created successfully!");
        setBusData({
          name: "",
          operator: "",
          busNumber: "",
          departureTime: "",
          arrivalTime: "",
          duration: "",
          departureLocation: "",
          arrivalLocation: "",
          to: [],
          day: [],
          price: "",
          seatsAvailable: "",
          totalSeats: "",
          busType: "AC",
          status: "Scheduled",
          amenities: [],
        });
      } else {
        toast.error(result.message || "Error creating bus");
      }
    } catch (error) {
      toast.error("Something went wrong!",error);
    }
  };

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const amenitiesList = ["WiFi", "Charging Ports", "AC", "TV", "Food Service"];

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}>
      <h2 style={{ textAlign: "center", marginBottom: "16px" }}>🚌 Add New Bus</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <TextField label="Bus Name" name="name" value={busData.name} onChange={handleChange} required />
        <TextField label="Operator" name="operator" value={busData.operator} onChange={handleChange} required />
        <TextField label="Bus Number" name="busNumber" value={busData.busNumber} onChange={handleChange} required />

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField type="time" label="Departure Time" name="departureTime" value={busData.departureTime} onChange={handleChange} required />
          <TextField type="time" label="Arrival Time" name="arrivalTime" value={busData.arrivalTime} onChange={handleChange} required />
        </Box>

        <TextField type="number" label="Duration (minutes)" name="duration" value={busData.duration} onChange={handleChange} required />

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField label="Departure Location" name="departureLocation" value={busData.departureLocation} onChange={handleChange} required />
          <TextField label="Arrival Location" name="arrivalLocation" value={busData.arrivalLocation} onChange={handleChange} required />
        </Box>

        <TextField type="number" label="Price" name="price" value={busData.price} onChange={handleChange} required />
        <TextField type="number" label="Seats Available" name="seatsAvailable" value={busData.seatsAvailable} onChange={handleChange} required />
        <TextField type="number" label="Total Seats" name="totalSeats" value={busData.totalSeats} onChange={handleChange} required />

        <FormControl>
          <InputLabel>Bus Type</InputLabel>
          <Select name="busType" value={busData.busType} onChange={handleChange}>
            {["AC", "Non-AC", "Sleeper", "Semi-Sleeper", "Seater"].map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Operating Days</InputLabel>
          <Select multiple name="day" value={busData.day} onChange={handleMultiSelect} input={<OutlinedInput />} renderValue={(selected) => selected.join(", ")}>
            {daysOfWeek.map((day) => (
              <MenuItem key={day} value={day}>{day}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Amenities</InputLabel>
          <Select multiple name="amenities" value={busData.amenities} onChange={handleMultiSelect} input={<OutlinedInput />} renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>{selected.map((value) => <Chip key={value} label={value} />)}</Box>
          )}>
            {amenitiesList.map((amenity) => (
              <MenuItem key={amenity} value={amenity}>{amenity}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          🚀 Create Bus
        </Button>
      </form>
    </Box>
  );
};

export default AdminCreateBus;
