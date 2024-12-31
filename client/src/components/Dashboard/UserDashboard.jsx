import { useState, useEffect } from "react";
import { useAuth } from "../Hooks/ContextApi/ContextApi";

const UserDashboard = () => {
  const [user, setUser] = useState(null); 
const { token  } = useAuth(); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        // console.log("userData",response)
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>; 
  }
  // console.log("user",user)

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>User Dashboard</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.headerCell}>Field</th>
            <th style={styles.headerCell}>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={styles.cell}>Username</td>
            <td style={styles.cell}>{user.userData.name}</td>
          </tr>
          <tr>
            <td style={styles.cell}>Email</td>
            <td style={styles.cell}>{user.userData.email}</td>
          </tr>
          <tr>
            <td style={styles.cell}>Phone Number</td>
            <td style={styles.cell}>{user.userData.number}</td>
          </tr>
          <tr>
            <td style={styles.cell}>Country</td>
            <td style={styles.cell}>{user.userData.country}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  headerCell: {
    border: "1px solid #ccc",
    padding: "10px",
    backgroundColor: "#f4f4f4",
    fontWeight: "bold",
    textAlign: "left",
  },
  cell: {
    border: "1px solid #ccc",
    padding: "10px",
    textAlign: "left",
  },
};

export default UserDashboard;
