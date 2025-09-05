import { motion } from "framer-motion"
import { Check, Star } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  const fetchServices = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("http://localhost:4000/api/services")
      const data = await response.json()
      setServices(Array.isArray(data.services) ? data.services : [])
    } catch (error) {
      console.error("Error fetching services:", error)
      setError("Failed to load services. Please try again later.")
      setServices([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ClipLoader color="#E11D48" size={50} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">{error}</p>
          <button
            onClick={fetchServices}
            className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-gray-50 to-rose-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-rose-600">Services</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to elevate your business and drive growth
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.12 }}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100 ${
                  service.popular ? "ring-2 ring-rose-500 ring-offset-2" : ""
                }`}
              >
                {service.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-rose-600 to-rose-400 text-white px-5 py-2 rounded-bl-2xl z-10 shadow-md flex items-center gap-2">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="text-sm font-semibold tracking-wide">Popular</span>
                  </div>
                )}

                <div className="relative h-48 flex-shrink-0">
                  <img
                    src={service.image.secure_url || "/placeholder.svg"}
                    alt={`${service.title} service illustration`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  {/* Service Header */}
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-2xl font-extrabold text-gray-900">{service.title}</h3>
                    <span className="bg-rose-50 text-rose-600 font-semibold text-xs px-3 py-1 rounded-full shadow-sm">
                      {service.duration}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 text-base mb-5 leading-relaxed min-h-[3.5rem]">{service.description}</p>

                  {/* Features */}
                  <div className="mb-8 flex-grow">
                    <h4 className="text-base font-semibold text-gray-900 mb-3">What's Included</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-800 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing and CTA */}
                  <div className="pt-6 border-t border-gray-200 mt-auto flex items-center justify-between">
                    <div>
                      <span className="text-gray-500 text-xs uppercase tracking-wide">Starting from</span>
                      <div className="text-2xl font-bold text-gray-900 mt-1">Rs {service.price}</div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.97 }}
                      className="bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 text-white px-6 py-2 rounded-lg text-base font-semibold shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-400 cursor-pointer" onClick={()=> navigate('/contact',{state: { service: service.title }})}
                    >
                      Get Started
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gradient-to-r from-rose-600 to-rose-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl text-rose-100 mb-8">
              Let's discuss your requirements and create something amazing together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-rose-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
              >
                Get Free Consultation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-rose-600 transition-colors duration-200"
              >
                View Portfolio
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
