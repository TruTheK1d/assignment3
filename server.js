/********************************************************************************
* WEB322 – Assignment 03
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: Turmunkh Davaajargal Student ID: 164138232 Date: 02/18/2025
*
* Published (web app) URL:
*
********************************************************************************/
const express = require("express");
const siteData = require("./modules/data-service");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public"))); // Serve all files in "public"
app.use(express.static(path.join(__dirname, "view")));   // Serve all files in "view"

// Route to home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "home.html"));
});

// Route to about page
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "about.html"));
});

// Dynamic route for sites
app.get("/sites", (req, res) => {
  const { region, provinceOrTerritory } = req.query;

  if (region) {
    siteData.getSitesByRegion(region)
      .then((data) => res.json(data))
      .catch(() => res.status(404).json({ error: "Region not found" }));
  } else if (provinceOrTerritory) {
    siteData.getSitesByProvinceOrTerritoryName(provinceOrTerritory)
      .then((data) => res.json(data))
      .catch(() => res.status(404).json({ error: "Province/Territory not found" }));
  } else {
    siteData.getAllSites()
      .then((data) => res.json(data))
      .catch(() => res.status(500).json({ error: "Error fetching sites" }));
  }
});

// Route to specific site by ID
app.get("/sites/:id", (req, res) => {
  const { id } = req.params;
  siteData.getSiteById(id)
    .then((data) => res.json(data))
    .catch(() => res.status(404).json({ error: "Site not found" }));
});

// 404 page for all unmatched routes
app.get("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "view", "404.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);

  // Initialize the site data
  siteData.initialize()
    .then(() => console.log("✅ Data initialized successfully"))
    .catch((err) => console.error("❌ Failed to initialize data:", err));
});
