function ForgetEmail() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted!");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-gray-100 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Email</h2>
      <p className="text-gray-600 mb-6">
        Enter your registered email address, and we will send you a recovery link.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          required
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-md transition duration-300"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ForgetEmail;
