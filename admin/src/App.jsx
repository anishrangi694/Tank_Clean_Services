import { Routes, Route } from 'react-router-dom'
import './App.css'
import AdminNavbar from './components/Navbar'
import AdminLogin from './Pages/AdminLogin'
import AdminHome from './Pages/AdminHome'
import AdminSidebar from './components/AdminSideBar'

function App() {

  return (
    <>
      <AdminNavbar/>
      <div className="flex">
  <AdminSidebar />

  <main className="flex-1 bg-gray-50 min-h-[calc(100vh-90px)] p-0">
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/" element={<AdminHome />} />

      <Route
        path="/requests"
        element={
          <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-800">
              Requests
            </h1>
          </div>
        }
      />
    </Routes>
  </main>
</div>
    </>
  )
}

export default App
