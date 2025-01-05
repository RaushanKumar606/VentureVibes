import  { useEffect, useState } from "react";

function SingleTure() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your API endpoint
    const apiUrl = "https://api.example.com/data";

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px", maxWidth: "400px", margin: "20px auto" }}>
      <img src={data.image} alt={data.title} style={{ width: "100%", borderRadius: "8px" }} />
      <h2 style={{ margin: "10px 0" }}>{data.title}</h2>
      <p>{data.description}</p>
    </div>
  );
}

export default SingleTure;
