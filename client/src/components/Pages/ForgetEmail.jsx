
function ForgetEmail() {
    const handleSubmit = (e) => {
      e.preventDefault();
      // Logic to handle email submission, e.g., API call
      console.log("Email submitted!");
    };
  
    return (
      <div style={styles.container}>
        <h2 style={styles.heading}>Email</h2>
        <p style={styles.description}>
          Enter your registered email address, and we will send you a recovery link.
        </p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Enter your email"
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Reset Password
          </button>
        </form>
      </div>
    );
  }
  
  const styles = {
    container: {
      maxWidth: "400px",
      margin: "50px auto",
      textAlign: "center",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#f9f9f9",
    },
    heading: {
      fontSize: "1.5rem",
      color: "#333",
      marginBottom: "10px",
    },
    description: {
      fontSize: "1rem",
      color: "#555",
      marginBottom: "20px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    input: {
      padding: "10px",
      fontSize: "1rem",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    button: {
      padding: "10px",
      fontSize: "1rem",
      backgroundColor: "green",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
  };
  
  export default ForgetEmail;
  
