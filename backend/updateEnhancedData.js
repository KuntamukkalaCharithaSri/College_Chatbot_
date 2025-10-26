// updateEnhancedData.js - Script to update database with enhanced Ramachandra College data
const mongoose = require("mongoose");
const CollegeInfo = require("./models/CollegeInfo");

// Enhanced Ramachandra College data
const enhancedCollegeData = {
  name: "Ramachandra College of Engineering",
  logo: "RCE_LOGO.png",
  website: "https://rcee.ac.in",
  address: "NH-16, Vatluru, Eluru, Andhra Pradesh",
  email: "helpdesk@rcee.ac.in",
  phone: "+91 9492935222",
  establishedYear: 2008,
  affiliatedTo: "JNTUK, Kakinada",
  accreditation: "NBA & NAAC A+ Accredited",

  departments: [
    "Computer Science and Engineering (CSE)",
    "Electronics and Communication Engineering (ECE)",
    "Electrical and Electronics Engineering (EEE)",
    "Mechanical Engineering (ME)",
    "Civil Engineering (CE)"
  ],

  academics: {
    eligibility: "Candidates must have passed Intermediate (10+2) with Mathematics, Physics, and Chemistry as core subjects.",
    admissionProcess: "Admission is based on AP EAMCET rank or through management quota.",
    courses: [
      "B.Tech Computer Science and Engineering",
      "B.Tech Electronics and Communication Engineering", 
      "B.Tech Electrical and Electronics Engineering",
      "B.Tech Mechanical Engineering",
      "B.Tech Civil Engineering",
      "M.Tech (Various Specializations)",
      "Diploma Programs"
    ]
  },

  admissionCriteria: {
    B_Tech: {
      eligibility: "Candidates must have passed Intermediate (10+2) with Mathematics, Physics, and Chemistry as core subjects.",
      entranceExam: "Admission is based on AP EAMCET rank or through management quota.",
      cutoffRange: "EAMCET Rank up to 50,000 (varies each year)."
    },
    M_Tech: {
      eligibility: "Bachelor's degree in Engineering/Technology from a recognized university.",
      entranceExam: "Through GATE or PGECET scores."
    },
    Diploma: {
      eligibility: "Students must have completed 10th standard (SSC).",
      entranceExam: "Admission through AP POLYCET rank."
    }
  },

  facilities: {
    hostel: {
      available: true,
      details: "Separate hostel facilities for boys and girls with mess and Wi-Fi.",
      fee: "₹50,000 per year"
    },
    transportation: {
      available: true,
      details: "College provides bus facility covering major routes in and around Eluru, Bhimavaram, Tanuku, and Tadepalligudem.",
      fee: "₹15,000 per year"
    },
    library: "Well-stocked central library with 30,000+ books, digital access, and e-journals.",
    canteen: "Clean and hygienic canteen offering both vegetarian and non-vegetarian food.",
    labs: "Modern computer and research labs for all departments."
  },

  fees: {
    tuition: "₹70,000 per year",
    hostel: "₹50,000 per year",
    bus: "₹15,000 per year"
  },

  placements: {
    averagePackage: "₹3.2 LPA",
    highestPackage: "₹10 LPA",
    recruiters: ["TCS", "Infosys", "Wipro", "Tech Mahindra", "Cognizant", "IBM"],
    placementRate: "85%"
  },

  events: [
    "TechFest",
    "Cultural Fest", 
    "Sports Meet",
    "Hackathon",
    "AI & ML Workshop"
  ],

  faqs: [
    {
      question: "What is the admission process?",
      answer: "Students can apply through AP EAMCET counseling or management quota."
    },
    {
      question: "Is there bus transportation?",
      answer: "Yes, bus transportation is available covering nearby towns. Annual bus fee is ₹15,000."
    },
    {
      question: "What are the eligibility criteria for B.Tech?",
      answer: "You must have completed 10+2 with MPC subjects and a valid AP EAMCET rank."
    },
    {
      question: "Does the college provide hostel facility?",
      answer: "Yes, separate hostel facilities are available for both boys and girls with all amenities."
    },
    {
      question: "What is the fee structure?",
      answer: "Tuition fees are ₹70,000 per year, hostel fees are ₹50,000 per year, and bus fees are ₹15,000 per year."
    },
    {
      question: "What courses are offered?",
      answer: "We offer B.Tech programs in Computer Science, Electronics & Communication, Electrical & Electronics, Mechanical, and Civil Engineering, plus M.Tech and Diploma programs."
    },
    {
      question: "What are the placement opportunities?",
      answer: "Our average package is ₹3.2 LPA with highest package reaching ₹10 LPA. Top recruiters include TCS, Infosys, Wipro, Tech Mahindra, Cognizant, and IBM."
    }
  ],

  hods: [
    {
      name: "Dr. Vadhri Suryanarayana",
      department: "CSE",
      designation: "Head of Department",
      email: "hod-cse@rcee.ac.in",
      phone: "+91 9492935222"
    },
    {
      name: "Dr. R. Ramesh", 
      department: "ECE",
      designation: "Head of Department",
      email: "hod-ece@rcee.ac.in",
      phone: "+91 9876543210"
    },
    {
      name: "Dr. K. Srinivas",
      department: "EEE",
      designation: "Head of Department", 
      email: "hod-eee@rcee.ac.in",
      phone: "+91 9123456789"
    },
    {
      name: "Dr. G. Praveen",
      department: "ME",
      designation: "Head of Department",
      email: "hod-me@rcee.ac.in", 
      phone: "+91 9001234567"
    },
    {
      name: "Dr. A. Manohar",
      department: "CE",
      designation: "Head of Department",
      email: "hod-ce@rcee.ac.in", 
      phone: "+91 9345678901"
    }
  ]
};

async function updateEnhancedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb://127.0.0.1:27017/CollegeDB");
    console.log("Connected to MongoDB");

    // Clear existing data
    await CollegeInfo.deleteMany({});
    console.log("Cleared existing data");

    // Insert enhanced college data
    const college = new CollegeInfo(enhancedCollegeData);
    await college.save();
    console.log("Enhanced Ramachandra College data inserted successfully");

    // Verify the data was inserted
    const count = await CollegeInfo.countDocuments();
    console.log(`Total documents in database: ${count}`);

    // Show sample data
    const sample = await CollegeInfo.findOne();
    console.log("Sample data:");
    console.log("Name:", sample.name);
    console.log("Address:", sample.address);
    console.log("Departments:", sample.departments.length);
    console.log("FAQs:", sample.faqs.length);
    console.log("HODs:", sample.hods.length);

    // Disconnect
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    
  } catch (error) {
    console.error("Error updating database:", error);
    process.exit(1);
  }
}

// Run the update function
updateEnhancedDatabase();
