import React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Edit, Trash2, X, Upload, Save } from "lucide-react"
import { toast } from "react-toastify"
import getOptimizedCloudinaryUrl from "../utils/OptimizedUrl"
import { useApi } from "../middleware/ApiContext"

const AdminServices = () => {
  const { API_BASE_URL } = useApi();
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    features: [""],
    price: 0,
    duration: "",
    image: null,
  })
  const [imagePreview, setImagePreview] = useState("")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState(null)

  // Fetch services
  const fetchServices = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/api/services`)
      const data = await response.json()
      setServices(Array.isArray(data.services) ? data.services : [])
    } catch (error) {
      console.error("Error fetching services:", error)
      setServices([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle features array changes
  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData((prev) => ({
      ...prev,
      features: newFeatures,
    }))
  }

  // Add new feature input
  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }))
  }

  // Remove feature input
  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index)
    setFormData((prev) => ({
      ...prev,
      features: newFeatures,
    }))
  }

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }))

      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      features: [""],
      price: 0,
      duration: "",
      image: null,
    })
    setImagePreview("")
    setEditingService(null)
  }

  // Open modal for adding new service
  const openAddModal = () => {
    resetForm()
    setShowModal(true)
  }

  // Open modal for editing service
  const openEditModal = (service) => {
    setEditingService(service)
    setFormData({
      title: service.title,
      description: service.description,
      features: service.features,
      price: service.price,
      duration: service.duration,
      image: null,
    })
    setImagePreview(service.image?.secure_url || "")
    setShowModal(true)
  }

  // Submit form (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault()

    const toastId = toast.loading(editingService ? "Updating service..." : "Creating service...")

    const formDataToSend = new FormData()
    formDataToSend.append("title", formData.title)
    formDataToSend.append("description", formData.description)
    formDataToSend.append("features", JSON.stringify(formData.features.filter((f) => f.trim())))
    formDataToSend.append("price", formData.price)
    formDataToSend.append("duration", formData.duration)

    if (formData.image) {
      formDataToSend.append("image", formData.image)
    }

    try {
      const url = editingService
        ? `${API_BASE_URL}/api/services/${editingService._id}`
        : `${API_BASE_URL}/api/services`

      const method = editingService ? "PATCH" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: formDataToSend,
      })

      if (response.ok) {
        await fetchServices()
        setShowModal(false)
        resetForm()
        toast.update(toastId, {
          render: editingService ? "Service updated successfully!" : "Service created successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        })
      } else {
        const error = await response.json()
        toast.update(toastId, {
          render: error.message || "Failed to save service",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        })
      }
    } catch (error) {
      toast.update(toastId, {
        render: "An error occurred",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      })
    }
  }

  // Delete service
  const handleDelete = async (serviceId) => {
    setServiceToDelete(serviceId)
    setShowDeleteDialog(true)
  }

  // Confirm delete
  const confirmDelete = async () => {
    const serviceId = serviceToDelete
    setShowDeleteDialog(false)
    const toastId = toast.loading("Deleting service...")

    try {
      const response = await fetch(`${API_BASE_URL}/api/services/${serviceId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (response.ok) {
        await fetchServices()
        toast.update(toastId, {
          render: "Service deleted successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        })
      } else {
        toast.update(toastId, {
          render: "Failed to delete service",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        })
      }
    } catch (error) {
      toast.update(toastId, {
        render: "An error occurred",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      })
    }
  }

  return (
    <React.Fragment>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Services Management</h1>
              <p className="text-gray-600 mt-2">Manage your company services</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openAddModal}
              className="bg-rose-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-rose-700 transition-colors cursor-pointer"
            >
              <Plus size={20} />
              Add Service
            </motion.button>
          </div>

          {/* Services Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col min-h-[600px]"
                >
                  {service.image?.secure_url && (
                    <img
                      src={getOptimizedCloudinaryUrl(service.image.secure_url) || "/placeholder.svg"}
                      alt={service.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Features:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {service.features?.slice(0, 3).map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-rose-600 rounded-full mr-2"></span>
                              {feature}
                            </li>
                          ))}
                          {service.features?.length > 3 && (
                            <li className="text-rose-600 text-xs">+{service.features.length - 3} more</li>
                          )}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-2xl font-bold text-rose-600">Rs. {service.price}</span>
                        <span className="text-sm text-gray-500">{service.duration}</span>
                      </div>

                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => openEditModal(service)}
                          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors cursor-pointer"
                        >
                          <Edit size={16} />
                          Edit
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDelete(service._id)}
                          className="bg-red-600 text-white py-2 px-4 rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Modal */}
          <AnimatePresence>
            {showModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {editingService ? "Edit Service" : "Add New Service"}
                      </h2>
                      <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                        <X size={24} />
                      </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Service Name</label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                          placeholder="Enter service title"
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          required
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                          placeholder="Enter service description"
                        />
                      </div>

                      {/* Features */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                        {formData.features.map((feature, index) => (
                          <div key={index} className="flex gap-2 mb-2">
                            <input
                              type="text"
                              value={feature}
                              onChange={(e) => handleFeatureChange(index, e.target.value)}
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                              placeholder={`Feature ${index + 1}`}
                            />
                            {formData.features.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeFeature(index)}
                                className="text-red-600 hover:text-red-800 cursor-pointer"
                              >
                                <X size={20} />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={addFeature}
                          className="text-rose-600 hover:text-rose-800 text-sm flex items-center gap-1 cursor-pointer"
                        >
                          <Plus size={16} />
                          Add Feature
                        </button>
                      </div>

                      {/* Price and Estimated Time */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Price (Rs)</label>
                          <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Time</label>
                          <input
                            type="text"
                            name="duration"
                            value={formData.duration}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                            placeholder="e.g., 2-4 weeks"
                          />
                        </div>
                      </div>

                      {/* Image Upload */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Service Image</label>
                        <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          {imagePreview ? (
                            <div className="space-y-4">
                              <img
                                src={imagePreview || "/placeholder.svg"}
                                alt="Preview"
                                className="max-h-48 mx-auto rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setImagePreview("")
                                  setFormData((prev) => ({ ...prev, image: null }))
                                }}
                                className="text-red-600 hover:text-red-800 text-sm cursor-pointer"
                              >
                                Remove Image
                              </button>
                            </div>
                          ) : (
                            <div
                              className="cursor-pointer"
                              onClick={() => document.querySelector("#imageInput").click()}
                            >
                              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                              <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                              <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                          )}
                          <input
                            id="imageInput"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </div>
                      </div>

                      {/* Submit Buttons */}
                      <div className="flex gap-4 pt-6">
                        <button
                          type="button"
                          onClick={() => setShowModal(false)}
                          className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Save size={20} />
                          {editingService ? "Update Service" : "Create Service"}
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Delete Confirmation Dialog */}
          <AnimatePresence>
            {showDeleteDialog && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-white rounded-lg p-6 max-w-md w-full"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Delete</h3>
                  <p className="text-gray-600 mb-6">
                    Are you sure you want to delete this service? This action cannot be undone.
                  </p>
                  <div className="flex gap-4 justify-end">
                    <button
                      onClick={() => setShowDeleteDialog(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </React.Fragment>
  )
}

export default AdminServices
