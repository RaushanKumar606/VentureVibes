

export const fetchData = async () => {
    const url = 'https://hotels-com-provider.p.rapidapi.com/v2/regions?query=Prag&domain=AR&locale=es_AR';
  
    const options = {
      method: 'GET',
      headers: {
   	'x-rapidapi-key': '44ba591c20msh00f3b3d3cb71c73p1f8861jsn3cda8d86a314',
		'x-rapidapi-host': 'hotels-com-provider.p.rapidapi.com'
      },
    };
  
    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
    //   console.log("all data ",data);
      return data;
  
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };
  