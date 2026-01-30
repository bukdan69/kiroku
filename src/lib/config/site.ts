// Site Configuration
// Update these values with your actual information

export const siteConfig = {
  name: "Arisan KU",
  description: "Platform Arisan Online Terpercaya di Indonesia",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  
  // Contact Information
  contact: {
    email: "info@arisanku.com",
    phone: "+62 812-3456-7890",
    whatsapp: "6281234567890", // Format: country code + number (no + or spaces)
    address: "Jl. Contoh No. 123, Jakarta Selatan, DKI Jakarta 12345",
  },
  
  // Social Media
  social: {
    facebook: "https://facebook.com/arisanku",
    instagram: "https://instagram.com/arisanku",
    twitter: "https://twitter.com/arisanku",
    linkedin: "https://linkedin.com/company/arisanku",
    youtube: "https://youtube.com/@arisanku",
  },
  
  // Business Information
  business: {
    companyName: "PT Arisan Digital Indonesia",
    taxId: "01.234.567.8-901.000", // NPWP
    businessLicense: "123/ABC/2024",
    established: "2024",
  },
  
  // Features
  features: {
    maxGroupSize: 50,
    minContribution: 50000, // Rp 50,000
    maxContribution: 100000000, // Rp 100,000,000
    platformFee: 2, // 2%
    affiliateCommission: 2, // 2%
  },
  
  // Support
  support: {
    email: "support@arisanku.com",
    hours: "24/7",
    responseTime: "< 2 jam",
  },
}

export type SiteConfig = typeof siteConfig
