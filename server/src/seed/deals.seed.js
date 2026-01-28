import mongoose from "mongoose";
import dotenv from "dotenv";
import Deal from "../modals/deal/deal.modal.js";

dotenv.config();

await mongoose.connect(process.env.DATABASE_URI);

await Deal.deleteMany();

await Deal.insertMany([
  // already existing deals 👆

  {
    title: "GitHub Student Pack",
    shortDescription: "Free developer tools & services",
    fullDescription:
      "Get free access to premium developer tools including GitHub Pro, DigitalOcean credits, and more through the GitHub Student Developer Pack.",
    partner: {
      name: "GitHub",
      website: "https://education.github.com",
      logo: "https://logo.clearbit.com/github.com"
    },
    eligibility: [
      "User must be a verified student",
      "Valid college email required",
      "One pack per user"
    ],
    accessLevel: "locked",
    isActive: true
  },

  {
    title: "DigitalOcean Credits",
    shortDescription: "$200 cloud credits",
    fullDescription:
      "Receive $200 in DigitalOcean credits to deploy and manage your cloud infrastructure for development and testing.",
    partner: {
      name: "DigitalOcean",
      website: "https://www.digitalocean.com",
      logo: "https://logo.clearbit.com/digitalocean.com"
    },
    eligibility: [
      "New DigitalOcean users only",
      "Credits valid for 60 days"
    ],
    accessLevel: "public",
    isActive: true
  },

  {
    title: "Udemy Premium Courses",
    shortDescription: "Free access to selected courses",
    fullDescription:
      "Access selected premium Udemy courses for free to upskill in web development, DSA, and system design.",
    partner: {
      name: "Udemy",
      website: "https://www.udemy.com",
      logo: "https://logo.clearbit.com/udemy.com"
    },
    eligibility: [
      "Applicable on selected courses only",
      "Limited time offer"
    ],
    accessLevel: "public",
    isActive: true
  },

  {
    title: "MongoDB Atlas Credits",
    shortDescription: "$500 database credits",
    fullDescription:
      "Get $500 in MongoDB Atlas credits to build and scale modern applications using cloud-native databases.",
    partner: {
      name: "MongoDB",
      website: "https://www.mongodb.com",
      logo: "https://logo.clearbit.com/mongodb.com"
    },
    eligibility: [
      "Verified users only",
      "New Atlas projects only"
    ],
    accessLevel: "locked",
    isActive: true
  },

  {
    title: "Figma Professional",
    shortDescription: "3 months free Figma Pro",
    fullDescription:
      "Collaborate and design better with 3 months of free Figma Professional for teams and individuals.",
    partner: {
      name: "Figma",
      website: "https://www.figma.com",
      logo: "https://logo.clearbit.com/figma.com"
    },
    eligibility: [
      "Available for new Pro subscribers",
      "One-time redemption"
    ],
    accessLevel: "public",
    isActive: true
  }
]);


console.log("Deals seeded");
process.exit();
