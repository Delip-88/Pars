
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, Trash2, X, AlertTriangle, ChevronDown } from "lucide-react"
import { toast } from "react-toastify"
import { data } from "react-router-dom"

const ContactsPage = () => {
  const API_BASE_URL = import.meta.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"


  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [selectedContact, setSelectedContact] = useState(null)
  const [contactToDelete, setContactToDelete] = useState(null)
  const [statusDropdown, setStatusDropdown] = useState(null)

  const statusOptions = ["new", "in-progress", "completed"]
  const statusColors = {
    new: "bg-blue-100 text-blue-800",
    "in-progress": "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
  }

  // Fetch contacts
  const fetchContacts =async () => {
    try {
      setLoading(true)
      const response = await fetch("http://localhost:4000/api/contacts",{method: "GET", headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      }})
      const data = await response.json()
      setContacts(Array.isArray(data.contacts) ? data.contacts : [])
    } catch (error) {
      console.error("Error fetching contacts:", error)
      setContacts([])
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchContacts()
  }, [])

  // Update contact status
  const updateContactStatus = async (contactId, newStatus) => {
    const loadingToast = toast.loading("Updating status...")

    try {
      const response = await fetch(`${API_BASE_URL}/api/contacts/update/${contactId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        // Update local state
        setContacts((prev) =>
          prev.map((contact) => (contact._id === contactId ? { ...contact, status: newStatus } : contact)),
        )

        toast.update(loadingToast, {
          render: "Status updated successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        })
      } else {
        throw new Error("Failed to update status")
      }
    } catch (error) {
      setContacts((prev) =>
        prev.map((contact) => (contact._id === contactId ? { ...contact, status: newStatus } : contact)),
      )


    } finally {
      setStatusDropdown(null)
    }
  }

  // Delete contact
  const handleDeleteClick = (contact) => {
    setContactToDelete(contact)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = async () => {
    if (!contactToDelete) return;
  
    const loadingToast = toast.loading("Deleting contact...");
  
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/contacts/delete/${contactToDelete._id}`,
        { method: "DELETE" ,
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }}
      );
  
      const data = await response.json(); // ✅ parse response body
  
      if (response.ok && data.success) {
        setContacts((prev) =>
          prev.filter((contact) => contact._id !== contactToDelete._id)
        );
  
        toast.update(loadingToast, {
          render: "Contact deleted successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        throw new Error(data.message || "Failed to delete contact");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.update(loadingToast, {
        render: "Error deleting contact, please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setShowDeleteConfirm(false);
      setContactToDelete(null);
    }
  };
  
  const cancelDelete = () => {
    setShowDeleteConfirm(false)
    setContactToDelete(null)
  }

  const viewContact = (contact) => {
    setSelectedContact(contact)
    setShowViewModal(true)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contacts Management</h1>
            <p className="text-gray-600 mt-2">Manage customer inquiries and service requests</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">Total: {contacts.length} contacts</div>
          </div>
        </div>

        {/* Contacts Table */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider w-16">
                      S.N.
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {contacts.map((contact, index) => (
                    <tr key={contact._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                        <div className="text-xs text-gray-500">{formatDate(contact.createdAt)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{contact.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{contact.address || "N/A"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{contact.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">{contact.service}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="relative">
                          <button
                            onClick={() => setStatusDropdown(statusDropdown === contact._id ? null : contact._id)}
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColors[contact.status]} hover:opacity-80 transition-opacity cursor-pointer`}
                          >
                            {contact.status}
                            <ChevronDown className="ml-1 w-3 h-3" />
                          </button>

                          <AnimatePresence>
                            {statusDropdown === contact._id && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[120px]"
                              >
                                {statusOptions.map((status) => (
                                  <button
                                    key={status}
                                    onClick={() => updateContactStatus(contact._id, status)}
                                    className={`block cursor-pointer w-full text-left px-3 py-2 text-xs hover:bg-gray-50 transition-colors ${
                                      contact.status === status ? "bg-rose-50 text-rose-600" : "text-gray-700"
                                    }`}
                                  >
                                    {status}
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => viewContact(contact)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDeleteClick(contact)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete Contact"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* View Contact Modal */}
        <AnimatePresence>
          {showViewModal && selectedContact && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setShowViewModal(false)} />

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Contact Details</h2>
                    <button onClick={() => setShowViewModal(false)} className="text-gray-500 hover:text-gray-700">
                      <X size={24} />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <p className="text-gray-900 font-medium">{selectedContact.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <p className="text-gray-900">{selectedContact.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <p className="text-gray-900">{selectedContact.phone}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                        <p className="text-gray-900 font-medium">{selectedContact.service}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColors[selectedContact.status]}`}
                        >
                          {selectedContact.status}
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                        <p className="text-gray-900">{formatDate(selectedContact.createdAt)}</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-900 leading-relaxed">{selectedContact.message}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-6">
                    <button
                      onClick={() => setShowViewModal(false)}
                      className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={cancelDelete} />

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative bg-white rounded-lg max-w-md w-full shadow-2xl"
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Delete Contact</h3>
                      <p className="text-sm text-gray-600">This action cannot be undone.</p>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6">
                    Are you sure you want to delete the contact from "{contactToDelete?.name}"? This will permanently
                    remove the contact and all associated data.
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={cancelDelete}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
                    >
                      Delete Contact
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}

export default ContactsPage
