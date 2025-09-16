
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, Trash2, X, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { toast } from "react-toastify"
import { useApi } from "../middleware/ApiContext"

const UsersPage = () => {
  const { API_BASE_URL } = useApi();



  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [userToDelete, setUserToDelete] = useState(null)
  const [statusDropdown, setStatusDropdown] = useState(null)

  const statusOptions = ["active", "inactive", "suspended"]
  const statusColors = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    suspended: "bg-red-100 text-red-800",
  }

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true)

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      const response = await fetch(`${API_BASE_URL}/api/contacts/users/`, {
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setUsers(Array.isArray(data.users) ? data.users : [])
    } catch (error) {
      setUsers([])

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Update user status
  const updateUserStatus = async (userId, newStatus) => {
    const loadingToast = toast.loading("Updating status...")

    try {
      const response = await fetch(`${API_BASE_URL}/api/contacts/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        // Update local state
        setUsers((prev) => prev.map((user) => (user._id === userId ? { ...user, status: newStatus } : user)))

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
      console.log("API not available, updating demo data locally")
      // Update demo data locally
      setUsers((prev) => prev.map((user) => (user._id === userId ? { ...user, status: newStatus } : user)))

      toast.update(loadingToast, {
        render: "Status updated (demo mode)!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      })
    } finally {
      setStatusDropdown(null)
    }
  }

  // Delete user
  const handleDeleteClick = (user) => {
    setUserToDelete(user)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = async () => {
    if (!userToDelete) return

    const loadingToast = toast.loading("Deleting user...")

    try {
      const response = await fetch(`${API_BASE_URL}/api/contacts/users/${userToDelete._id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userToDelete._id))
        toast.update(loadingToast, {
          render: "User deleted successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        })
      } else {
        throw new Error("Failed to delete user")
      }
    } catch (error) {
      console.log("API not available, deleting from demo data")
      setUsers((prev) => prev.filter((user) => user._id !== userToDelete._id))
      toast.update(loadingToast, {
        render: "User deleted (demo mode)!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      })
    } finally {
      setShowDeleteConfirm(false)
      setUserToDelete(null)
    }
  }

  const cancelDelete = () => {
    setShowDeleteConfirm(false)
    setUserToDelete(null)
  }

  const viewUser = (user) => {
    setSelectedUser(user)
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
            <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
            <p className="text-gray-600 mt-2">Manage user accounts and verification status</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">Total: {users.length} users</div>
          </div>
        </div>

        {/* Users Table */}
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
                      Verified
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">{formatDate(user.createdAt)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {user.verified ? (
                            <div className="flex items-center text-green-600">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              <span className="text-sm font-medium">Verified</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-red-600">
                              <XCircle className="w-4 h-4 mr-2" />
                              <span className="text-sm font-medium">Not Verified</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => viewUser(user)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDeleteClick(user)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete User"
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

        {/* View User Modal */}
        <AnimatePresence>
          {showViewModal && selectedUser && (
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
                    <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
                    <button onClick={() => setShowViewModal(false)} className="text-gray-500 hover:text-gray-700">
                      <X size={24} />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <p className="text-gray-900 font-medium">{selectedUser.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <p className="text-gray-900">{selectedUser.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Verification Status</label>
                        <div className="flex items-center">
                          {selectedUser.verified ? (
                            <div className="flex items-center text-green-600">
                              <CheckCircle className="w-5 h-5 mr-2" />
                              <span className="font-medium">Verified</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-red-600">
                              <XCircle className="w-5 h-5 mr-2" />
                              <span className="font-medium">Not Verified</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                        <p className="text-gray-900 font-medium">{selectedUser.role || "User"}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
                        <p className="text-gray-900">{formatDate(selectedUser.createdAt)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-6">
                    <button
                      onClick={() => setShowViewModal(false)}
                      className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
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
                      <h3 className="text-lg font-semibold text-gray-900">Delete User</h3>
                      <p className="text-sm text-gray-600">This action cannot be undone.</p>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6">
                    Are you sure you want to delete the user "{userToDelete?.name}"? This will permanently remove the
                    user account and all associated data.
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={cancelDelete}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Delete User
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

export default UsersPage
