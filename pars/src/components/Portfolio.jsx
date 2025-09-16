
import { useState } from "react"

import { motion } from "framer-motion"
import { ExternalLink, Github, Calendar, User, Tag } from "lucide-react"
import getOptimizedCloudinaryUrl from "../utils/OptimizedUrl"


// Demo portfolio data - can be replaced with real data later
const portfolioProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Development",
    description:
      "A modern e-commerce platform built with React and Node.js, featuring real-time inventory management, secure payment processing, and responsive design.",
    image: "https://res.cloudinary.com/dm8ea4r5e/image/upload/v1757998448/ecommerce-project_rxiaw3.png",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    client: "TechStore Inc.",
    completedDate: "2024-01-15",
    projectUrl: "https://example-ecommerce.com",
    githubUrl: "https://github.com/pars/ecommerce-platform",
  },
  {
    id: 2,
    title: "Brand Identity Design",
    category: "Graphics Design",
    description:
      "Complete brand identity package including logo design, color palette, typography, and brand guidelines for a sustainable fashion startup.",
    image: "https://res.cloudinary.com/dm8ea4r5e/image/upload/v1757998444/brand-identity-design_yock1l.png",
    technologies: ["Adobe Illustrator", "Photoshop", "Figma", "InDesign"],
    client: "EcoFashion Co.",
    completedDate: "2023-12-20",
    projectUrl: "https://ecofashion-brand.com",
    githubUrl: null,
  },
  {
    id: 3,
    title: "SEO Optimization Campaign",
    category: "SEO",
    description:
      "https://res.cloudinary.com/dm8ea4r5e/image/upload/v1757998447/digital-marketing-strategies_oxcmai.png",
    image: "/seo-campaign-project.png",
    technologies: ["Google Analytics", "SEMrush", "Ahrefs", "Schema Markup"],
    client: "HealthCare Plus",
    completedDate: "2024-02-10",
    projectUrl: "https://healthcareplus.com",
    githubUrl: null,
  },
  {
    id: 4,
    title: "Social Media Campaign",
    category: "Digital Marketing",
    description:
      "Multi-platform digital marketing campaign that generated 500K+ impressions and increased brand engagement by 250% across social media channels.",
    image: "https://res.cloudinary.com/dm8ea4r5e/image/upload/v1757998452/social-media-project_fxtyqd.png",
    technologies: ["Facebook Ads", "Google Ads", "Instagram", "Analytics"],
    client: "FitLife Gym",
    completedDate: "2024-01-30",
    projectUrl: "https://fitlifegym.com",
    githubUrl: null,
  },
  {
    id: 5,
    title: "Restaurant Management System",
    category: "Web Development",
    description:
      "Full-stack restaurant management system with online ordering, table reservations, inventory tracking, and staff management features.",
    image: "https://res.cloudinary.com/dm8ea4r5e/image/upload/v1757998451/restaurant-system-project_pkjtw8.png",
    technologies: ["Next.js", "PostgreSQL", "Prisma", "Stripe", "Socket.io"],
    client: "Bella Vista Restaurant",
    completedDate: "2023-11-25",
    projectUrl: "https://bellavista-orders.com",
    githubUrl: "https://github.com/pars/restaurant-system",
  },
  {
    id: 6,
    title: "Mobile App UI/UX Design",
    category: "Graphics Design",
    description:
      "Complete UI/UX design for a fitness tracking mobile app, including user research, wireframes, prototypes, and final design system.",
    image: "https://res.cloudinary.com/dm8ea4r5e/image/upload/v1757998449/mobile-app-design-project_rckzex.png",
    technologies: ["Figma", "Adobe XD", "Principle", "InVision"],
    client: "FitTracker App",
    completedDate: "2024-03-05",
    projectUrl: "https://fittracker-app.com",
    githubUrl: null,
  },
]

const categories = ["All", "Web Development", "Graphics Design", "SEO", "Digital Marketing"]

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredProjects, setFilteredProjects] = useState(portfolioProjects)

  const filterProjects = (category) => {
    setSelectedCategory(category)
    if (category === "All") {
      setFilteredProjects(portfolioProjects)
    } else {
      setFilteredProjects(portfolioProjects.filter((project) => project.category === category))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="text-rose-600">Portfolio</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Explore our collection of successful projects across web development, design, SEO, and digital marketing.
              Each project represents our commitment to excellence and innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => filterProjects(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-rose-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-rose-100 hover:text-rose-600"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={getOptimizedCloudinaryUrl(project.image) || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-rose-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>

                  {/* Client & Date */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{project.client}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(project.completedDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-4">
                    <div className="flex items-center gap-1 mb-2">
                      <Tag className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Technologies:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-rose-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-rose-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Live
                    </a>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-rose-600 to-rose-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl text-rose-100 mb-8">
              Let's work together to bring your vision to life with our expertise and creativity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-rose-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Start a Project
              </a>
              <a
                href="/services"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-rose-600 transition-colors"
              >
                View Services
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
