import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate= useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit =async (e) => {
    e.preventDefault();

    try{
        console.log("inside try")
        const response= await fetch('http://localhost:3000/users/login',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify({
                email,
                password
            })
        })

        console.log(response);
        const data= await response.json()

        if(!response.ok){
            alert(data.message || "Login failed"); return;
        }

        alert("Login successfully");

        navigate('/')
    }catch(error){
        alert( "something went wrong")
    }
  };

  return (
    <div className="min-h-[90%] flex items-center justify-center bg-gray-100 px-4 ">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg mt-16">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;