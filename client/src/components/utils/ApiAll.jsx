 export const flightApi = async () => {
  const url = import.meta.env.FLIGHT_API;
    const options = {
      method: 'GET',
  headers: {
        'x-rapidapi-key': import.meta.env.FLIGHT_KEY,
        'x-rapidapi-host': 'booking-com15.p.rapidapi.com',
      },
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };
  
  export const trainApi = async () => {
    const url = import.meta.env.TRAIN_API;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': import.meta.env.FLIGHT_KEY,
        'x-rapidapi-host': 'instagram230.p.rapidapi.com'
      }
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };
  
   export const busApi = async () => {
    const url = import.meta.env.BUS_API;
  const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': import.meta.env.FLIGHT_KEY,
        'x-rapidapi-host': 'instagram230.p.rapidapi.com'
      }
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };
  
   export const hotelApi = async () => {
    const url = import.meta.env.HOTEL_API;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': import.meta.env.HOTEL_KEY,
        'x-rapidapi-host': 'booking-com15.p.rapidapi.com',
      },
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };
  
