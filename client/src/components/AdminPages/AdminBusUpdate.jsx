
import { useEffect, useState } from "react";
import { useAuth } from "../Hooks/ContextApi";
import { Navigate, useParams } from 'react-router-dom';
import {toast} from 'react-toastify'
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
 const AdminBusUpdate =()=> {
  const [formData, setFormData] = useState({
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
  const {token} = useAuth();
  const { id } = useParams(); 
  const updateBus = async()=>{
    try {
      const response = await fetch(`http://localhost:8080/admin/create-bus/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
          },  
          });
          const data = await response.json();
          if(response.ok){
              setFormData({
                name:data.name,
                operator:data.operator,
                busNumber:data.busNumber,
                departureTime:data.departureTime,
                arrivalTime:data.arrivalTime,
                duration:data.duration,
                departureLocation:data.departureLocation,
                arrivalLocation:data.arrivalLocation,
                to:data.to,
                day:data.day,
                price:Number(data.price),
                seatsAvailable:Number(data.seatsAvailable),
                totalSeats:Number(data.totalSeats),
                busType:data.busType,
                status:data.status,
                amenities:data.amenities
              });
          }
    }
    catch (error) {
      toast.error("Failed to update bus: " + error.message);
    }
  }
  useEffect(() => {
      updateBus();
  }, []); 
 
  const handleMultiSelect = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSumbit =async (e)=>{
   e.preventDefault();
   try {
    const response = await fetch(`http://localhost:8080/admin/create-bus/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) throw new Error("Failed to update bus")
    toast.success("Bus updated successfully");   
   } catch (error) {
    toast.error(error.message)
    console.log(error)
   }
  }
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const amenitiesList = ["WiFi", "Charging Ports", "AC", "TV", "Food Service"];

  

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}>
      <h2 style={{ textAlign: "center", marginBottom: "16px" }}>🚌 Add New Bus</h2>
      <form onSubmit={handleSumbit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <TextField label="Bus Name" name="name" value={formData.name} onChange={handleChange} required />
        <TextField label="Operator" name="operator" value={formData.operator} onChange={handleChange} required />
        <TextField label="Bus Number" name="busNumber" value={formData.busNumber} onChange={handleChange} required />

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField type="time" label="Departure Time" name="departureTime" value={formData.departureTime} onChange={handleChange} required />
          <TextField type="time" label="Arrival Time" name="arrivalTime" value={formData.arrivalTime} onChange={handleChange} required />
        </Box>

        <TextField type="number" label="Duration (minutes)" name="duration" value={formData.duration} onChange={handleChange} required />

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField label="Departure Location" name="departureLocation" value={formData.departureLocation} onChange={handleChange} required />
          <TextField label="Arrival Location" name="arrivalLocation" value={formData.arrivalLocation} onChange={handleChange} required />
        </Box>

        <TextField type="number" label="Price" name="price" value={formData.price} onChange={handleChange} required />
        <TextField type="number" label="Seats Available" name="seatsAvailable" value={formData.seatsAvailable} onChange={handleChange} required />
        <TextField type="number" label="Total Seats" name="totalSeats" value={formData.totalSeats} onChange={handleChange} required />

        <FormControl>
          <InputLabel>Bus Type</InputLabel>
          <Select name="busType" value={formData.busType} onChange={handleChange}>
            {["AC", "Non-AC", "Sleeper", "Semi-Sleeper", "Seater"].map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Operating Days</InputLabel>
          <Select multiple name="day" value={formData.day} onChange={handleMultiSelect} input={<OutlinedInput />} >
            {daysOfWeek.map((day) => (
              <MenuItem key={day} value={day}>{day}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Amenities</InputLabel>
          <Select multiple name="amenities" value={formData.amenities} onChange={handleMultiSelect} input={<OutlinedInput />} renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>{selected.map((value) => <Chip key={value} label={value} />)}</Box>
          )}>
            {amenitiesList.map((amenity) => (
              <MenuItem key={amenity} value={amenity}>{amenity}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          🚀 Update Bus
        </Button>
      </form>
    </Box>
  );
};

export default AdminBusUpdate