// server.js
require("./db"); // Connect to MongoDB
const express = require("express");
const cors = require("cors");
const CollegeInfo = require("./models/CollegeInfo");

const app = express();
app.use(cors());
app.use(express.json());

// Chatbot route
app.post("/chat", async (req, res) => {
  const userMessage = (req.body && req.body.message ? String(req.body.message) : "").toLowerCase().trim();

  try {
    // Fetch the first college document from MongoDB
    const college = await CollegeInfo.findOne();

    // DEBUG: log the retrieved document so we can confirm DB is returning data
    console.log("DEBUG: college from DB:", college ? JSON.stringify(college, null, 2) : "null");

    if (!college) {
      return res.json({ reply: "College data is not available right now." });
    }

    let reply = "Sorry, I didn’t understand that. Can you please rephrase?";

    // Keyword-based responses (use optional chaining and existence checks)
    if (userMessage.includes("hi") || userMessage.includes("hello")) {
      reply = "Hello! I'm your college chatbot. Ask me anything about our college.";
    } else if (userMessage.includes("college") || userMessage.includes("name") || userMessage.includes("what is this college")) {
      reply = `This is ${college.name}. ${college.address ? `Located at ${college.address}.` : ""} ${college.establishedYear ? `Established in ${college.establishedYear}.` : ""}`;
    } else if (userMessage.includes("departments")) {
      if (Array.isArray(college.departments) && college.departments.length) {
        reply = `We have the following departments: ${college.departments.join(", ")}.`;
      } else {
        reply = "Departments information is not available.";
      }
    } else if (userMessage.includes("fees")) {
      const tuition = college.fees?.tuition ?? "N/A";
      const hostel = college.fees?.hostel ?? "N/A";
      const bus = college.fees?.bus ?? "N/A";
      
      if (userMessage.includes("btech") || userMessage.includes("b.tech")) {
        reply = `B.Tech Program Fees:\n• Tuition: ${tuition}\n• Hostel: ${hostel}\n• Bus: ${bus}`;
      } else if (userMessage.includes("mba")) {
        reply = `MBA Program Fees:\n• Tuition: ${tuition}\n• Hostel: ${hostel}\n• Bus: ${bus}\n\nNote: Please contact the admissions office for specific MBA fee details.`;
      } else if (userMessage.includes("mtech") || userMessage.includes("m.tech")) {
        reply = `M.Tech Program Fees:\n• Tuition: ${tuition}\n• Hostel: ${hostel}\n• Bus: ${bus}\n\nNote: Please contact the admissions office for specific M.Tech fee details.`;
      } else {
        reply = `General Fee Structure:\n• Tuition: ${tuition}\n• Hostel: ${hostel}\n• Bus: ${bus}\n\nFor specific program fees, please mention the program (B.Tech, MBA, M.Tech, etc.)`;
      }
    } else if (userMessage.includes("principal")) {
      reply = `Our principal is ${college.principal ?? "Dr. Suresh Kumar"}.`;
    } else if (userMessage.includes("events")) {
      if (Array.isArray(college.events) && college.events.length) {
        reply = `Upcoming events: ${college.events.join(", ")}.`;
      } else {
        reply = "There are no upcoming events listed.";
      }
    } else if (userMessage.includes("hod")) {
      const hods = Array.isArray(college.hods) ? college.hods : [];
      const deptHOD = hods.find(h => h.department && userMessage.includes(h.department.toLowerCase()));
      if (deptHOD) {
        reply = `${deptHOD.name} is the ${deptHOD.designation} of ${deptHOD.department} department.`;
      } else {
        reply = "Specify the department (e.g., 'HOD computer science') to get HOD details.";
      }
    } else if (userMessage.includes("vacancy") || userMessage.includes("apply") || userMessage.includes("job")) {
      reply = "You can check vacant positions on our website or contact HR for application links.";
    } else {
      // Check FAQs for first word match
      const faqs = Array.isArray(college.faqs) ? college.faqs : [];
      const faq = faqs.find(f => {
        if (!f.question || !f.answer) return false;
        const firstWord = String(f.question).toLowerCase().split(" ")[0];
        return firstWord && userMessage.includes(firstWord);
      });
      if (faq) reply = faq.answer;
    }

    res.json({ reply });

  } catch (err) {
    console.error("ERROR /chat:", err);
    res.status(500).json({ reply: "Something went wrong. Please try again later." });
  }
});

// Optional: Get full college info
app.get("/college", async (req, res) => {
  try {
    const college = await CollegeInfo.findOne();
    res.json(college);
  } catch (err) {
    console.error("ERROR /college:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
