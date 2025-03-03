

const API_KEY = '44ba591c20msh00f3b3d3cb71c73p1f8861jsn3cda8d86a314';
const BASE_URL = "https://trains.p.rapidapi.com/v1/railways/trains/india";

const options = {
    method: "POST", // POST Request
    headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "trains.p.rapidapi.com",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        search: "Rajdhani" // Yeh payload bhejna zaroori hai
    }),
};

export const fetchData = async (url) => {
    try {
        const response = await fetch(`${BASE_URL}${url}`, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetch Result:", data);
        return data;

    } catch (error) {
        console.error("❌ Error fetching data:", error);
        return null;
    }
};

// // Example Usage:
fetchData("/search/?q=New&hl=en&gl=US")
    .then(data => console.log("Fetch Result:", data))
    .catch(err => console.error("Promise Rejection:", err));



