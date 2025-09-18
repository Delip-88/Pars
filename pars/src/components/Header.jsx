
import { Menu, X, LogOut } from "lucide-react"
import { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error("Error parsing user data:", error)
        localStorage.removeItem("user")
      }
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUser(null)
    toast.success("Logged out successfully")
    navigate("/")
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer">
            <div className="text-2xl lg:text-3xl font-bold text-rose-600" onClick={() => (window.location.href = "/")}>
              PARS
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <NavLink
              to="home"
              className="text-gray-700 hover:text-rose-600 font-medium transition-colors duration-200"
            >
              Home
            </NavLink>
            <NavLink
              to="about"
              className="text-gray-700 hover:text-rose-600 font-medium transition-colors duration-200"
            >
              About
            </NavLink>
            <NavLink
              to="services"
              className="text-gray-700 hover:text-rose-600 font-medium transition-colors duration-200"
            >
              Services
            </NavLink>
            <NavLink
              to="portfolio"
              className="text-gray-700 hover:text-rose-600 font-medium transition-colors duration-200"
            >
              Portfolio
            </NavLink>
            <NavLink
              to="contact"
              className="text-gray-700 hover:text-rose-600 font-medium transition-colors duration-200"
            >
              Contact
            </NavLink>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-gray-700 font-medium">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-rose-600 hover:text-rose-700 font-medium transition-colors duration-200 cursor-pointer"
                    title="Logout"
                  >
                    <LogOut size={18} />
                    <span></span>
                  </button>
                </div>
              ) : (
                <>
                  <button
                    className="text-rose-600 hover:text-rose-700 font-medium transition-colors duration-200 cursor-pointer"
                    onClick={() => {
                      navigate("/signin")
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    className="bg-rose-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-rose-700 transition-colors duration-200 cursor-pointer"
                    onClick={() => {
                      navigate("/signup")
                    }}
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-rose-600 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div
          className={`lg:hidden border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col space-y-4 py-4">
            <NavLink
              to="home"
              className="text-gray-700 hover:text-rose-600 font-medium transition-colors duration-200 py-2"
            >
              Home
            </NavLink>
            <NavLink
              to="about"
              className="text-gray-700 hover:text-rose-600 font-medium transition-colors duration-200 py-2"
            >
              About
            </NavLink>
            <NavLink
              to="services"
              className="text-gray-700 hover:text-rose-600 font-medium transition-colors duration-200 py-2"
            >
              Services
            </NavLink>
            <NavLink
              to="portfolio"
              className="text-gray-700 hover:text-rose-600 font-medium transition-colors duration-200 py-2"
            >
              Portfolio
            </NavLink>
            <NavLink
              to="contact"
              className="text-gray-700 hover:text-rose-600 font-medium transition-colors duration-200 py-2"
            >
              Contact
            </NavLink>
            <div className="flex flex-col space-y-3">
              {user ? (
                <div className="flex flex-col space-y-3">
                  <span className="text-gray-700 font-medium text-center">Welcome, {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center space-x-2 text-rose-600 hover:text-rose-700 font-medium transition-colors duration-200 w-full"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <>
                  <button
                    className="text-rose-600 hover:text-rose-700 font-medium transition-colors duration-200 w-full text-center"
                    onClick={() => {
                      navigate("/signin")
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    className="bg-rose-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-rose-700 transition-colors duration-200 w-full"
                    onClick={() => {
                      navigate("/signup")
                    }}
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
