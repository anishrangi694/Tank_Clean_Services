import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register(){
  const navigate= useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber]= useState("");
  const [name,setName]= useState("")

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const response = await fetch("http://localhost:3000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        email,
        mobileNumber,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Registration failed! Try again");
      return;
    }

    alert("registration successfully");

    navigate("/login");
  } catch (error) {
    alert(error.message || "Something went wrong");
  }
};

  return (
    <div className="min-h-full  flex items-center justify-center bg-gray-100 px-4 ">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg mt-4">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Registration
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>


          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Contact */}
          <div>
            <label
              htmlFor="contact"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Contact
            </label>

            <input
              type="text"
              id="contact"
              name="contact"
              placeholder="Enter your contact"
              onChange={(e) => setMobileNumber(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;