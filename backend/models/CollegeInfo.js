const mongoose = require("mongoose");

const CollegeInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String },
  website: { type: String },
  address: { type: String },
  email: { type: String },
  phone: { type: String },
  establishedYear: { type: Number },
  affiliatedTo: { type: String },
  accreditation: { type: String },

  departments: [String],

  academics: {
    eligibility: String,
    admissionProcess: String,
    courses: [String],
  },

  admissionCriteria: {
    B_Tech: {
      eligibility: String,
      entranceExam: String,
      cutoffRange: String,
    },
    M_Tech: {
      eligibility: String,
      entranceExam: String,
    },
    Diploma: {
      eligibility: String,
      entranceExam: String,
    },
  },

  facilities: {
    hostel: {
      available: Boolean,
      details: String,
      fee: String,
    },
    transportation: {
      available: Boolean,
      details: String,
      fee: String,
    },
    library: String,
    canteen: String,
    labs: String,
  },

  fees: {
    tuition: String,
    hostel: String,
    bus: String,
    scholarships: String,
  },

  placements: {
    averagePackage: String,
    highestPackage: String,
    recruiters: [String],
    placementRate: String,
    internships: String,
  },

  events: [String],

  faqs: [
    {
      question: String,
      answer: String,
    },
  ],

  hods: [
    {
      name: String,
      department: String,
      designation: String,
      email: String,
      phone: String,
    },
  ],
});

module.exports = mongoose.model("CollegeInfo", CollegeInfoSchema);
