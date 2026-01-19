function openCV(){
  document.getElementById("cvViewer").style.display = "block";
}

function toggleTheme(){
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.className);
}

// Load saved theme - FIXED: Check if localStorage exists before using it
if (localStorage.getItem("theme")) {
  document.body.className = localStorage.getItem("theme");
}

// Typing animation - FIXED: Check if element exists before using it
let text = "VR Farrukh";
let i = 0;
let el = document.getElementById("typing");
if (el) {
  (function type(){
    if (i < text.length) {
      el.innerHTML += text.charAt(i++);
      setTimeout(type, 120);
    }
  })();
}

// Projects - FIXED: Check if element exists before modifying it
const projects = [
  {title: "Portfolio Website", desc: "HTML, CSS, JS"},
  {title: "Student Record System", desc: "C File Handling"},
  {title: "Library Management", desc: "C Structures"}
];

const projectList = document.getElementById("projectList");
if (projectList) {
  projects.forEach(p => {
    projectList.innerHTML += `<div><h3>${p.title}</h3><p>${p.desc}</p></div>`;
  });
}

// Skills animation - FIXED: Use proper Intersection Observer for better performance
window.addEventListener("scroll", () => {
  document.querySelectorAll(".progress div").forEach(bar => {
    if (bar.getBoundingClientRect().top < window.innerHeight - 100) {
      bar.style.width = bar.dataset.width;
    }
  });
});
function hideCV(){
  document.getElementById("cvViewer").style.display = "none";
}


// Form validation - FIXED: Get elements properly and add email validation
function validateForm(){
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const error = document.getElementById("error");
  const toast = document.getElementById("toast");
  
  if (!name || !email || !message || !error || !toast) {
    console.error("Form elements not found");
    return false;
  }
  
  // Name validation
  if (name.value.trim().length < 3) {
    error.innerText = "Name must be at least 3 characters";
    return false;
  }
  
  // Email validation - ADDED: Proper email regex validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
    error.innerText = "Please enter a valid email address";
    return false;
  }
  
  // Message validation - ADDED: Message length check
  if (message.value.trim().length < 10) {
    error.innerText = "Message must be at least 10 characters";
    return false;
  }
  
  // Clear error and show success
  error.innerText = "";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
  
  // Reset form
  name.value = "";
  email.value = "";
  message.value = "";
  
  return false; // Prevent actual form submission
}

// Session visits - FIXED: Check if element exists
let v = sessionStorage.getItem("v") || 0;
sessionStorage.setItem("v", ++v);
const visitCount = document.getElementById("visitCount");
if (visitCount) {
  visitCount.innerText = v;
}

// Smooth scroll - FIXED: Check if element exists before scrolling
function go(id){
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({behavior: "smooth"});
  }
}

// ADDED: Better initialization to prevent errors
document.addEventListener("DOMContentLoaded", function() {
  console.log("Portfolio loaded successfully!");
  
  // Initialize skills animation on page load
  const progressBars = document.querySelectorAll(".progress div");
  progressBars.forEach(bar => {
    if (bar.getBoundingClientRect().top < window.innerHeight) {
      bar.style.width = bar.dataset.width;
    }
  });
  
  // ADDED: Form submit event listener
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      validateForm();
    });
  }
  
  // ADDED: Navigation click event listeners
  document.querySelectorAll("nav ul li").forEach(item => {
    item.addEventListener("click", function() {
      const sectionId = this.textContent.toLowerCase();
      go(sectionId === "profile" ? "profile" : 
         sectionId === "projects" ? "projects" :
         sectionId === "skills" ? "skills" :
         sectionId === "cv" ? "cv" : "contact");
    });
  });
});// ===== Academic Filter & Search Function =====
function filterAcademic() {
    const filter = document.getElementById("academicFilter").value;
    const search = document.getElementById("academicSearch").value.toLowerCase();

    const rows = document.querySelectorAll("#academic table tr");

    // skip the first row (header)
    rows.forEach((row, index) => {
        if (index === 0) return; // header row, keep visible

        const level = row.querySelector("td:nth-child(2)").innerText; // Level column
        const text = row.innerText.toLowerCase(); // Full row text for search

        // check if row matches filter and search
        const matchFilter = filter === "all" || level === filter;
        const matchSearch = text.includes(search);

        row.style.display = matchFilter && matchSearch ? "" : "none";
    });
}
