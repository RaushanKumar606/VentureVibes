import { useAuth } from "../Hooks/ContextApi/ContextApi";
import { useState, useEffect } from "react";

const AdminTable = () => {
  const [users, setUsers] = useState([]);
const {token} = useAuth();
  
  useEffect(() => {
  
    const fetchUsers = async () => {
      try {
        const respone = await fetch(`http://localhost:8080/api/admin/users`,{
            method:"GET",
            headers:{
                Authorization: `Bearer ${token}`,
            },
          })
          if(respone.ok){
            const userData =  await respone.json()
            setUsers(userData);
          }
        
      } catch (error) {
        console.log(error)
      }
      
    };

    fetchUsers();
  }, []);


  const handleEdit = (id) => {
    console.log("Edit user with ID:", id);
  };
  const handleRemove = (id) => {
    setUsers(users.filter((user) => user._id !== id)); 
    console.log("Remove user with ID:", id);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "20px", color: "#333" }}>Admin User Table</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #ddd",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4" }}>
            <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Username</th>
            <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Email</th>
            <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Phone</th>
            <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={{ border: "1px solid #ddd" }}>
              <td style={{ padding: "12px", border: "1px solid #ddd" }}>{user.name}</td>
              <td style={{ padding: "12px", border: "1px solid #ddd" }}>{user.email}</td>
              <td style={{ padding: "12px", border: "1px solid #ddd" }}>{user.number}</td>
              <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                <button
                  onClick={() => handleEdit(user.id)}
                  style={{
                    marginRight: "10px",
                    padding: "8px 16px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleRemove(user.id)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#e53935")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#f44336")}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
