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
import { useAuth } from "../Hooks/ContextApi";

const AdminCreateHotel = () => {
  const [hotelData, setHotelData] = useState({
    name: "",
    location: "",
    kilometers: "",
    typeRoom: "Single",
    persons: "",
    pricePerNight: "",
    status: "Available",
    amenities: [],
    rating: "",
    description: "",
  });

  const { token } = useAuth();
  const handleChange = (e) => {
    setHotelData({ ...hotelData, [e.target.name]: e.target.value });
  };

  const handleMultiSelect = (e) => {
    setHotelData({ ...hotelData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setHotelData({ ...hotelData, image: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", hotelData.name);
    formData.append("location", hotelData.location);
    formData.append("kilometers", hotelData.kilometers);
    formData.append("typeRoom", hotelData.typeRoom);
    formData.append("persons", hotelData.persons);
    formData.append("pricePerNight", hotelData.pricePerNight);
    formData.append("status", hotelData.status);
    formData.append("rating", hotelData.rating);
    formData.append("description", hotelData.description);
    hotelData.amenities.forEach((amenity) =>
      formData.append("amenities", amenity)
    );
    if (hotelData.image ) {
      formData.append("image", hotelData.image); 
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/create-hotel",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // No need for Content-Type with FormData
          },
          body: formData,
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast.success("Hotel created successfully!");
        setHotelData({
          name: "",
          location: "",
          kilometers: "",
          typeRoom: "Single",
          persons: "",
          pricePerNight: "",
          status: "Available",
          amenities: [],
          rating: "",
          description: "",
          image: null,
        });
      } else {
        toast.error(result.message || "Error creating hotel");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  const roomTypes = ["Single", "Double", "Suite", "Family", "Luxury"];
  const amenitiesList = [
    "Free WiFi",
    "Swimming Pool",
    "Parking",
    "Gym",
    "Breakfast Included",
  ];

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "white",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "16px" }}>
        🏨 Add New Hotel
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <TextField
          label="Hotel Name"
          name="name"
          value={hotelData.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Location"
          name="location"
          value={hotelData.location}
          onChange={handleChange}
          required
        />
        <TextField
          type="number"
          label="Kilometers from City Center"
          name="kilometers"
          value={hotelData.kilometers}
          onChange={handleChange}
          required
        />
        <TextField
          type="number"
          label="Persons Allowed"
          name="persons"
          value={hotelData.persons}
          onChange={handleChange}
          required
        />
        <TextField
          type="number"
          label="Price Per Night"
          name="pricePerNight"
          value={hotelData.pricePerNight}
          onChange={handleChange}
          required
        />

        <FormControl>
          <InputLabel>Room Type</InputLabel>
          <Select
            name="typeRoom"
            value={hotelData.typeRoom}
            onChange={handleChange}
          >
            {roomTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Amenities</InputLabel>
          <Select
            multiple
            name="amenities"
            value={hotelData.amenities}
            onChange={handleMultiSelect}
            input={<OutlinedInput />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {amenitiesList.map((amenity) => (
              <MenuItem key={amenity} value={amenity}>
                {amenity}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          type="number"
          label="Rating (0-5)"
          name="rating"
          value={hotelData.rating}
          onChange={handleChange}
          required
        />

        <TextField
          multiline
          rows={3}
          label="Description"
          name="description"
          value={hotelData.description}
          onChange={handleChange}
          required
        />

        <FormControl>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={hotelData.status}
            onChange={handleChange}
          >
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="Not Available">Not Available</MenuItem>
          </Select>
        </FormControl>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
         Hotel Image
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
          🚀 Create Hotel
        </Button>
      </form>
    </Box>
  );
};

export default AdminCreateHotel;
