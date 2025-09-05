
import { motion } from "framer-motion"
import {
  Code,
  Palette,
  Search,
  TrendingUp,
  Users,
  DollarSign,
  Award,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Zap,
  Shield,
  Target,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

const statsData = [
  { name: "Projects", value: 150 },
  { name: "Clients", value: 85 },
  { name: "Success Rate", value: 98 },
  { name: "Team Size", value: 12 },
]

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Custom websites and web applications built with modern technologies",
    features: ["Responsive Design", "Fast Performance", "SEO Optimized"],
  },
  {
    icon: Palette,
    title: "Graphics Designing",
    description: "Creative visual solutions that make your brand stand out",
    features: ["Brand Identity", "UI/UX Design", "Print Design"],
  },
  {
    icon: Search,
    title: "SEO",
    description: "Boost your online visibility and drive organic traffic",
    features: ["Keyword Research", "On-Page SEO", "Analytics"],
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Strategic marketing campaigns that deliver measurable results",
    features: ["Social Media", "PPC Campaigns", "Content Strategy"],
  },
]

const features = [
  {
    icon: Users,
    title: "Experienced Team",
    description: "Our skilled professionals bring years of industry expertise to every project",
  },
  {
    icon: DollarSign,
    title: "Affordable Solutions",
    description: "Quality services at competitive prices that fit your budget",
  },
  {
    icon: Award,
    title: "Creative & Modern Designs",
    description: "Cutting-edge designs that keep you ahead of the competition",
  },
  {
    icon: CheckCircle,
    title: "Proven Results",
    description: "Track record of successful projects and satisfied clients",
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "TechStart Inc.",
    text: "PARS transformed our online presence completely. Their web development team delivered beyond our expectations.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    company: "Creative Agency",
    text: "The graphic design work was outstanding. They perfectly captured our brand vision and brought it to life.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    company: "E-commerce Store",
    text: "Our SEO rankings improved dramatically within 3 months. Highly recommend their digital marketing services.",
    rating: 5,
  },
]

const projects = [
  {
    title: "E-commerce Platform",
    category: "Web Development",
    description: "Modern online store with advanced features",
    image: "/modern-ecommerce-mockup.png",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "Brand Identity Design",
    category: "Graphics Design",
    description: "Complete brand makeover for tech startup",
    image: "/brand-identity-design-mockup.png",
    tags: ["Branding", "Logo", "UI/UX"],
  },
  {
    title: "SEO Campaign Success",
    category: "SEO",
    description: "300% increase in organic traffic",
    image: "/seo-analytics-dashboard.png",
    tags: ["Analytics", "Keywords", "Content"],
  },
]

const growthData = [
  { year: "2020", projects: 25, clients: 15, revenue: 45 },
  { year: "2021", projects: 60, clients: 35, revenue: 85 },
  { year: "2022", projects: 95, clients: 55, revenue: 125 },
  { year: "2023", projects: 130, clients: 75, revenue: 165 },
  { year: "2024", projects: 150, clients: 85, revenue: 195 },
]

export default function Home() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen">

      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-rose-50 overflow-hidden">
        {/* Subtle animated background elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-100/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-100/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <div className="container mx-auto my-3 px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-rose-100/80 backdrop-blur-sm border border-rose-200/50 rounded-full px-6 py-3 text-rose-700 text-sm font-medium mb-8"
          >
            <Zap className="w-4 h-4" />
            <span>Trusted by 85+ businesses worldwide</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 text-balance leading-tight"
          >
            Transform Your
            <motion.span
              className="block bg-gradient-to-r from-rose-600 via-rose-700 to-blue-600 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Digital Presence
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto text-pretty leading-relaxed"
          >
            We craft exceptional digital experiences through innovative web development, stunning design, strategic SEO,
            and results-driven marketing that elevate your brand
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-rose-400 hover:bg-rose-500 text-white px-10 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-2xl"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group border-2 border-gray-300 hover:border-rose-300 text-gray-700 hover:text-rose-700 px-10 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm flex items-center gap-3 cursor-pointer"
              onClick={()=>navigate("/portfolio")}
            >
              <Play className="w-5 h-5" />
              Watch Our Work
            </motion.button>
          </motion.div>

          {/* Floating service cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-4xl mx-auto"
          >
            {[
              { icon: Code, label: "Web Dev" },
              { icon: Palette, label: "Design" },
              { icon: Search, label: "SEO" },
              { icon: TrendingUp, label: "Marketing" },
            ].map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <service.icon className="w-8 h-8 text-rose-600 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-700">{service.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-24 px-4 bg-white"
      >
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 rounded-full px-4 py-2 text-sm font-medium mb-4">
              <Target className="w-4 h-4" />
              Our Expertise
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-balance">
              Services That Drive Results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
              From concept to execution, we deliver comprehensive digital solutions that help your business thrive in
              the modern marketplace
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-rose-200 transform hover:-translate-y-2"
              >
                <div className="bg-gradient-to-br from-rose-500 to-rose-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-rose-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="group/btn text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-2 transition-colors" onClick={()=>navigate("/services")}>
                  Explore Service
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 rounded-full px-4 py-2 text-sm font-medium mb-4">
              <Award className="w-4 h-4" />
              Our Work
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-balance">Projects That Inspire</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
              Discover how we've helped businesses like yours achieve remarkable digital transformation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-rose-200"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-rose-200 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-rose-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="group/btn text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-2 transition-colors">
                    View Project
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-rose-500 hover:bg-rose-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl" onClick={()=>navigate("/portfolio")}>
              View All Projects
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-4 bg-gradient-to-br from-gray-50 to-rose-50">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 rounded-full px-4 py-2 text-sm font-medium mb-4">
              <Shield className="w-4 h-4" />
              Why Choose Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-balance">
              Excellence in Every Detail
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
              We combine technical expertise with creative vision to deliver solutions that exceed expectations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group text-center">
                <div className="bg-gradient-to-br from-rose-500 to-rose-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-rose-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Growth Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Consistent growth and success over the years</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-rose-600 mb-2">150+</div>
                <div className="text-gray-600">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-rose-600 mb-2">85+</div>
                <div className="text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-rose-600 mb-2">98%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-rose-600 mb-2">5+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="year" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="projects"
                    stroke="#9333ea"
                    strokeWidth={3}
                    dot={{ fill: "#9333ea", strokeWidth: 2, r: 4 }}
                    name="Projects"
                  />
                  <Line
                    type="monotone"
                    dataKey="clients"
                    stroke="#06b6d4"
                    strokeWidth={3}
                    dot={{ fill: "#06b6d4", strokeWidth: 2, r: 4 }}
                    name="Clients"
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                    name="Revenue (K)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Mini About Us */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About PARS</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 text-pretty">
            We are a passionate team of digital experts committed to helping businesses thrive in the digital landscape.
            Our mission is to deliver innovative solutions that drive growth and create lasting impact for our clients.
          </p>
          <button className="bg-rose-500 hover:bg-rose-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center gap-2 mx-auto cursor-pointer">
            Read More <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 rounded-full px-4 py-2 text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              Testimonials
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-balance">
              Loved by Businesses Worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
              Don't just take our word for it - hear from the businesses we've helped transform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-rose-200 transform hover:-translate-y-1"
              >
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-900 mb-6 italic text-lg leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 px-4 bg-gradient-to-br from-rose-600 via-rose-700 to-rose-800 relative overflow-hidden ">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto text-center relative z-10 ">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance leading-tight">
            Ready to Transform Your
            <span className="block">Digital Future?</span>
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto text-pretty leading-relaxed">
            Join 85+ successful businesses who trust PARS to deliver exceptional digital solutions. Let's discuss your
            project and create something amazing together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group bg-white hover:bg-gray-50 text-rose-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Start Your Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm">
              Schedule a Call
            </button>
          </div>
        </div>
      </section>

    </main>
  )
}
