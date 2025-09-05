import mongoose from "mongoose";
import dotenv from "dotenv";
import Service from "./src/models/services.js";

dotenv.config();

const IMAGE_DATA = {
  public_id: "pars/services/qxqkylikwuhjcxvjccua",
  secure_url:
    "https://res.cloudinary.com/dduky37gb/image/upload/v1756883455/pars/services/qxqkylikwuhjcxvjccua.png",
  asset_id: "3f5e450c654f6da02c5dacd92df207c8",
  version: 1756883455,
  format: "png",
  width: 1366,
  height: 768,
  created_at: "2025-09-03T07:10:55.000Z",
};

const services = [
  {
    title: "Website Development",
    description: "Professional website solutions tailored to your business needs.",
    features: [
      "Custom Websites (Business, Portfolio, E-commerce)",
      "Responsive & Mobile-Friendly Design",
      "CMS Integration (WordPress, Shopify, etc.)",
    ],
    price: 1500,
    duration: "3-4 weeks",
    image: IMAGE_DATA,
  },
  {
    title: "Mobile App Development",
    description: "Custom iOS & Android app development for all industries.",
    features: [
      "Native & Hybrid Apps",
      "User-Friendly UI/UX",
      "App Store / Play Store Publishing",
    ],
    price: 2500,
    duration: "6-8 weeks",
    image: IMAGE_DATA,
  },
  {
    title: "Search Engine Optimization (SEO)",
    description: "Boost your visibility and rankings on search engines.",
    features: [
      "On-Page & Off-Page SEO",
      "Local SEO for Businesses",
      "Keyword Research & Ranking Strategy",
    ],
    price: 800,
    duration: "1-3 months",
    image: IMAGE_DATA,
  },
  {
    title: "Graphic Designing",
    description: "Creative designs to establish your brand identity.",
    features: [
      "Logo & Brand Identity",
      "Business Cards, Brochures & Posters",
      "Creative Visuals for Social Media",
    ],
    price: 600,
    duration: "1-2 weeks",
    image: IMAGE_DATA,
  },
  {
    title: "Motion Graphics",
    description: "Engaging animated visuals for marketing & branding.",
    features: [
      "Animated Videos & Explainers",
      "Logo Animations",
      "Professional Video Editing",
    ],
    price: 1000,
    duration: "2-3 weeks",
    image: IMAGE_DATA,
  },
  {
    title: "Digital Marketing",
    description: "Strategies to grow your brand online and generate leads.",
    features: [
      "Social Media Management (Facebook, Instagram, TikTok)",
      "Paid Ads (Facebook & Instagram Boosting)",
      "Leads Generation Campaigns",
      "Industry-Expert Marketing Strategies",
    ],
    price: 1200,
    duration: "1 month",
    image: IMAGE_DATA,
  },
  {
    title: "Brand Ad Shoots",
    description: "Professional ad shoots to capture your brand’s essence.",
    features: [
      "Professional Photography & Videography",
      "Commercial Ad Production",
      "Creative Storytelling for Brands",
    ],
    price: 2000,
    duration: "2-4 weeks",
    image: IMAGE_DATA,
  },
  {
    title: "Product Packaging Design",
    description: "Modern and innovative product packaging solutions.",
    features: [
      "2D & 3D Mockup Designs",
      "Innovative Product Packaging Concepts",
      "Brand-Oriented Packaging Solutions",
    ],
    price: 700,
    duration: "1-2 weeks",
    image: IMAGE_DATA,
  },
  {
    title: "Website & App Maintenance",
    description: "Keep your website and apps updated and secure.",
    features: [
      "Regular Updates & Bug Fixes",
      "Security & Performance Monitoring",
      "Backup & Support Services",
    ],
    price: 500,
    duration: "Monthly",
    image: IMAGE_DATA,
  },
  {
    title: "Software & Development",
    description: "End-to-end software solutions for businesses.",
    features: [
      "Custom Software Development (ERP, CRM, Inventory systems)",
      "E-commerce Solutions (multi-vendor platforms, dropshipping systems)",
      "Cloud Solutions (AWS, Google Cloud, Azure setup & management)",
      "API Integration & Development",
      "UI/UX Design Services",
    ],
    price: 4000,
    duration: "8-12 weeks",
    image: IMAGE_DATA,
  },
  {
    title: "Cybersecurity & IT Support",
    description: "Protect your business with advanced IT security solutions.",
    features: [
      "Cybersecurity Solutions (firewall setup, threat monitoring, penetration testing)",
      "Data Backup & Recovery",
      "IT Helpdesk & Support Services",
      "Network Setup & Maintenance",
    ],
    price: 1800,
    duration: "Ongoing / Monthly",
    image: IMAGE_DATA,
  },
  {
    title: "Emerging Technologies",
    description: "Leverage AI, Blockchain, AR/VR, and IoT for innovation.",
    features: [
      "AI & Chatbot Solutions",
      "Machine Learning & Data Analytics",
      "Blockchain Development",
      "AR/VR Solutions",
      "IoT Solutions",
    ],
    price: 5000,
    duration: "12-16 weeks",
    image: IMAGE_DATA,
  },
  {
    title: "Digital Growth & Marketing",
    description: "Scale your brand with tailored digital growth campaigns.",
    features: [
      "Content Marketing (blogs, copywriting, storytelling)",
      "Email Marketing Campaigns",
      "YouTube & TikTok Marketing",
      "Influencer Marketing Management",
    ],
    price: 1500,
    duration: "1-2 months",
    image: IMAGE_DATA,
  },
  {
    title: "Creative & Branding",
    description: "Make your brand stand out with unique creative assets.",
    features: [
      "UI Kits & Design Systems",
      "3D Modeling & Product Visualization",
      "Corporate Presentation Design",
      "Event Branding & Launch Campaigns",
    ],
    price: 1200,
    duration: "3-4 weeks",
    image: IMAGE_DATA,
  },
  {
    title: "Training & Consulting",
    description: "Empowering businesses with knowledge and strategies.",
    features: [
      "IT Consulting (business digital transformation strategies)",
      "Corporate Training (digital tools, marketing, IT basics)",
      "Tech Workshops & Bootcamps",
    ],
    price: 1000,
    duration: "2-3 weeks",
    image: IMAGE_DATA,
  },
];

const seedServices = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected ✅");

    await Service.deleteMany();
    console.log("Old services cleared ❌");

    await Service.insertMany(services);
    console.log("New services inserted ✅");

    mongoose.connection.close();
  } catch (error) {
    console.error("Seeding failed:", error);
    mongoose.connection.close();
  }
};

seedServices();
