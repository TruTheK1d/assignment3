/********************************************************************************
*  WEB322 – Assignment 02
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Turmunkh Davaajargal Student ID: 164138232 Date: FEB 04 2025
*
********************************************************************************/
const express = require("express");
const siteData = require("./modules/data-service");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));

// Initialize the site data
siteData
  .initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize data:", err);
  });

// Route to home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

// Route to about page
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

// Route to handle sites with dynamic query parameters for region or province/territory
app.get("/sites", (req, res) => {
  const { region, provinceOrTerritory } = req.query;

  if (region) {
    siteData
      .getSitesByRegion(region)
      .then((data) => res.json(data))
      .catch((err) => res.status(404).send(err));
  } else if (provinceOrTerritory) {
    siteData
      .getSitesByProvinceOrTerritoryName(provinceOrTerritory)
      .then((data) => res.json(data))
      .catch((err) => res.status(404).send(err));
  } else {
    siteData
      .getAllSites()
      .then((data) => res.json(data))
      .catch((err) => res.status(500).send(err));
  }
});

// Route to handle specific site by ID
app.get("/sites/:id", (req, res) => {
  const { id } = req.params;
  siteData
    .getSiteById(id)
    .then((data) => res.json(data))
    .catch((err) => res.status(404).send(err));
});

// 404 page for all unmatched routes
app.get("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});