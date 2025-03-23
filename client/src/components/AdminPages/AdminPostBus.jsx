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
      const { name, value } = e.target;

      if (name === "departureTime" || name === "arrivalTime") {
        const now = new Date();
        const today = now.toISOString().split("T")[0];
        const fullDateTime = new Date(`${today}T${value}:00.000Z`).toISOString();

        console.log(`${name} formatted:`, fullDateTime);
        setBusData({ ...busData, [name]: fullDateTime });
      } else {
        setBusData({ ...busData, [name]: value });
      }
    };
  const handleMultiSelect = (e) => {
    setBusData({ ...busData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setBusData({ ...busData, image: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  const formData = new FormData();
  formData.append("name", busData.name);
  formData.append("operator", busData.operator);
  formData.append("busNumber", busData.busNumber);
  formData.append("departureTime", busData.departureTime);
  formData.append("arrivalTime", busData.arrivalTime);
  formData.append("duration", busData.duration);
  formData.append("departureLocation", busData.departureLocation);
  formData.append("arrivalLocation", busData.arrivalLocation);
  formData.append("price", busData.price);
  formData.append("seatsAvailable", busData.seatsAvailable);
  formData.append("totalSeats", busData.totalSeats);
  formData.append("busType", busData.busType);
  formData.append("status", busData.status);

  busData.to.forEach((item) => formData.append("to[]", item));
  busData.day.forEach((item) => formData.append("day[]", item));
  busData.amenities.forEach((item) => formData.append("amenities[]", item));

  if (busData.image) {
    formData.append("image", busData.image);
  }
    try {
      const response = await fetch("http://localhost:8080/api/admin/create-bus", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body:formData
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
        console.log("Bus Data Before Sending:", busData);
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
          <TextField type="datetime-local" label="Departure Time" name="departureTime" value={busData.departureTime} onChange={handleChange} required />
          <TextField type="datetime-local" label="Arrival Time" name="arrivalTime" value={busData.arrivalTime} onChange={handleChange} required />
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

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 p-2 rounded-lg" id="inputGroupFile02" required
            />
          </div>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          🚀 Create Bus
        </Button>
      </form>
    </Box>
  );
};

export default AdminCreateBus;
