const siteData = require("../data/NHSiteData");
const provinceAndTerritoryData = require("../data/provinceAndTerritoryData");
let sites = [];
function initialize() {
    return new Promise((resolve, reject) => {
      try {
        siteData.forEach(site => {
          const provinceOrTerritoryObj = provinceAndTerritoryData.find(
            pt => pt.code === site.provinceOrTerritoryCode
          );
          sites.push({ ...site, provinceOrTerritoryObj });
        });
        resolve();
      } catch (error) {
        reject("Error");
      }
    });
  }

  function getAllSites() {
    return new Promise((resolve, reject) => {
      if (sites.length > 0) {
        resolve(sites);
      } else {
        reject("No sites available");
      }
    });
  }

  function getSiteById(id) {
    return new Promise((resolve, reject) => {
      const site = sites.find(s => s.siteId === id);
      if (site) {
        resolve(site);
      } else {
        reject("Site not found");
      }
    });
  }

  function getSitesByProvinceOrTerritoryName(name) {
    return new Promise((resolve, reject) => {
      const filteredSites = sites.filter(s =>
        s.provinceOrTerritoryObj.name.toLowerCase().includes(name.toLowerCase())
      );
      if (filteredSites.length > 0) {
        resolve(filteredSites);
      } else {
        reject("No sites found for the specified province/territory");
      }
    });
  }

  function getSitesByRegion(region) {
    return new Promise((resolve, reject) => {
      const filteredSites = sites.filter(s =>
        s.provinceOrTerritoryObj.region.toLowerCase().includes(region.toLowerCase())
      );
      if (filteredSites.length > 0) {
        resolve(filteredSites);
      } else {
        reject("No sites found for the specified region");
      }
    });
  }

  module.exports = { initialize, getAllSites, getSiteById, getSitesByProvinceOrTerritoryName, getSitesByRegion };

  initialize()
  .then(() => {
    console.log("Initialization successful");
    return getAllSites();
  })
  .then(data => console.log(data))
  .catch(err => console.error(err));