const mockDataService = require("../services/mock_data.service");

const mockDataController = {
  createDBApp: async (req, res) => {
    try {
      await mockDataService.createDBApp();
      return res.status(201).json({ message: "Successfully", result: {} });
    } catch (error) {
      return res.status(500).json({ message: error.message, result: error });
    }
  },

  createAddressDB: async (req, res) => {
    try {
      await mockDataService.createAddressDB();
      return res.status(201).json({ message: "Successfully", result: {} });
    } catch (error) {
      return res.status(500).json({ message: error.message, result: error });
    }
  },
};

module.exports = mockDataController;
