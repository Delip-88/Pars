"use client"

import { motion } from "framer-motion"
import { Home, ArrowLeft, Mail } from "lucide-react"
import { NavLink } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-rose-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated 404 */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-9xl md:text-[12rem] font-bold text-rose-600 leading-none">404</h1>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Oops! Page Not Found</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <NavLink
            to="/"
            className="inline-flex items-center gap-2 bg-rose-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors"
          >
            <Home size={20} />
            Go Home
          </NavLink>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 border-2 border-rose-600 text-rose-600 px-6 py-3 rounded-lg font-semibold hover:bg-rose-600 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </motion.div>

        {/* Quick NavLinks */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="border-t border-gray-200 pt-8"
        >
          <p className="text-gray-600 mb-4">Or try these popular pages:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <NavLink to="/services" className="text-rose-600 hover:text-rose-700 font-medium transition-colors">
              Our Services
            </NavLink>
            
            <NavLink to="/contact" className="text-rose-600 hover:text-rose-700 font-medium transition-colors">
              Contact Us
            </NavLink>
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Mail size={20} className="text-rose-600" />
            <span className="font-semibold text-gray-900">Need Help?</span>
          </div>
          <p className="text-gray-600 text-sm">
            If you believe this is an error, please contact our support team at{" "}
            <a to="mailto:support@pars.com" className="text-rose-600 hover:text-rose-700">
              support@pars.com
            </a>
          </p>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-rose-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-rose-300 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-1/2 left-5 w-12 h-12 bg-rose-400 rounded-full opacity-10 animate-ping"></div>
      </div>
    </div>
  )
}
