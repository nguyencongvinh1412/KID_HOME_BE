const path = require("path");
const fs = require("fs");
const accountModel = require("../models/account.model");
const centreUserModel = require("../models/centreUser.model");
const centreModel = require("../models/centre.model");
const imageModel = require("../models/image.model");
const roleModel = require("../models/role.model");
const { ROLE } = require("../../constants/role.constant");
const authHelper = require("../../helpers/auth.helper");
const cityModel = require("../models/city.model");
const districtModel = require("../models/district.model");
const wardModel = require("../models/ward.model");

const mockData = {
  createDBApp: async () => {
    try {
      const role = await roleModel.findOne({ name: ROLE.CENTRE_ADMIN });
      const accountFile = JSON.parse(
        fs.readFileSync(path.join(__dirname, "../../../db_mock/account.json"))
      );
      const centresFile = JSON.parse(
        fs.readFileSync(path.join(__dirname, "../../../db_mock/centres.json"))
      );
      const imagesFile = JSON.parse(
        fs.readFileSync(path.join(__dirname, "../../../db_mock/image.json"))
      );
      let accounts = [];
      let centres = [];
      let index = 0;

      for (let account of accountFile) {
        account.roleId = role._id;
        account.password = authHelper.hashedPassword(account.password);
        account = new accountModel(account);
        account = await account.save();
        accounts.push(account);
      }

      for (let centre of centresFile) {
        centre = new centreModel(centre);
        centre = await centre.save();
        centreUser = new centreUserModel({
          accountId: accounts[index]._id,
          centreId: centre._id,
        });
        index += 1;
        await centreUser.save();
        centres.push(centre);
      }
      index = 0;

      for (let image of imagesFile) {
        image = new imageModel({ ...image, centreId: centres[index]._id });
        image = image.save();
        index += 1;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },

  createAddressDB: async () => {
    const dataFile = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../../../db_mock/address.json"))
    );
    console.log("start read data");
    const [cities, districts, wards] = mockData.getCitiesDBFromFile(dataFile);
    await Promise.all([
      cityModel.bulkSave(cities),
      districtModel.bulkSave(districts),
      wardModel.bulkSave(wards)
    ]);
  },

  getCitiesDBFromFile: (data) => {
    let cities = [];
    let districtsRoot = [];
    let wardsRoot = [];
    data.forEach((item) => {
      cities.push(new cityModel({
        name: item.name,
        code: item.code,
        codename: item.codename,
        division_type: item.division_type,
        phone_code: item.phone_code
      }));
      const [districts, wards] = mockData.getDistrictDBFromFile(item.districts, item.code);
      districtsRoot.push(...districts);
      wardsRoot.push(...wards);
    });
    return [cities, districtsRoot, wardsRoot];
  },
  
  getDistrictDBFromFile: (data, city_code) => {
    let districts = [];
    let wards = [];
    data.forEach((item) => {
      districts.push(new districtModel({
        name: item.name,
        code: item.code,
        codename: item.codename,
        division_type: item.division_type,
        short_codename: item.short_codename,
        city_code: city_code
      }));
      const wds = mockData.getWardDBfromFile(item.wards, item.code);
      wards.push(...wds);
    });
    return [districts, wards];
  },

  getWardDBfromFile: (data, district_code) => {
    let wards = [];
    data.forEach((item) => {
      wards.push(new wardModel({
        name: item.name,
        code: item.code,
        codename: item.codename,
        division_type: item.division_type,
        short_codename: item.short_codename,
        district_code: district_code
      }))
    });
    return wards;
  }
};

module.exports = mockData;
