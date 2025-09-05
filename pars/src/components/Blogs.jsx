"use client"
import { motion } from "framer-motion"
import { Calendar, User, ArrowRight, Clock } from "lucide-react"

// Demo blog posts array - can be replaced with real data later
const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2024",
    excerpt:
      "Explore the latest trends shaping web development, from AI integration to progressive web apps and the rise of serverless architecture.",
    content: "Full article content here...",
    author: "John Smith",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Web Development",
    image: "/web-dev-trends-2024.png",
    featured: true,
  },
  {
    id: 2,
    title: "Mastering SEO: A Complete Guide for Small Businesses",
    excerpt:
      "Learn essential SEO strategies that can help your small business rank higher in search results and attract more customers.",
    content: "Full article content here...",
    author: "Sarah Johnson",
    date: "2024-01-12",
    readTime: "8 min read",
    category: "SEO",
    image: "/seo-guide-small-business.png",
    featured: false,
  },
  {
    id: 3,
    title: "Brand Identity Design: Creating Memorable Visual Experiences",
    excerpt:
      "Discover the key elements of effective brand identity design and how it impacts customer perception and business success.",
    content: "Full article content here...",
    author: "Mike Davis",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Design",
    image: "/brand-identity-design.png",
    featured: false,
  },
  {
    id: 4,
    title: "Digital Marketing Strategies That Actually Work in 2024",
    excerpt:
      "Cut through the noise with proven digital marketing strategies that deliver real results for businesses of all sizes.",
    content: "Full article content here...",
    author: "Emily Chen",
    date: "2024-01-08",
    readTime: "7 min read",
    category: "Digital Marketing",
    image: "/digital-marketing-strategies.png",
    featured: true,
  },
  {
    id: 5,
    title: "Responsive Design Best Practices for Modern Websites",
    excerpt:
      "Learn how to create websites that look and perform perfectly across all devices with these responsive design techniques.",
    content: "Full article content here...",
    author: "Alex Rodriguez",
    date: "2024-01-05",
    readTime: "4 min read",
    category: "Web Development",
    image: "/responsive-design-practices.png",
    featured: false,
  },
  {
    id: 6,
    title: "The Psychology of Color in Web Design",
    excerpt: "Understand how color choices impact user behavior and conversion rates in web design projects.",
    content: "Full article content here...",
    author: "Lisa Wang",
    date: "2024-01-03",
    readTime: "5 min read",
    category: "Design",
    image: "/color-psychology-web-design.png",
    featured: false,
  },
]

const categories = ["All", "Web Development", "Design", "SEO", "Digital Marketing"]

export default function Blogs() {
  const featuredPosts = blogPosts.filter((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl text-gray-900 md:text-6xl font-bold mb-6">
              Our <span className="text-rose-600">Blog</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Insights, tips, and trends from the world of web development, design, and digital marketing
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Articles</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-rose-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="bg-rose-100 text-rose-700 px-2 py-1 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-rose-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{post.author}</span>
                        </div>
                        <button className="flex items-center gap-2 text-rose-600 hover:text-rose-700 font-medium group">
                          Read More
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full border-2 border-rose-200 text-rose-700 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all duration-300 font-medium"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-rose-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                    </div>
                    <button className="w-full mt-4 flex items-center justify-center gap-2 text-rose-600 hover:text-rose-700 font-medium group border-t pt-4">
                      Read Article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-rose-600 to-rose-700">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl text-rose-100 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and get the latest insights delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
              <button className="bg-white text-rose-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
