const path = require("path");
const fs = require("fs");
const accountModel = require("../models/account.model");
const centreUserModel = require("../models/centreUser.model");
const centreModel = require("../models/centre.model");
const imageModel = require("../models/image.model");
const roleModel = require('../models/role.model');
const { ROLE } = require("../../constants/role.constant");
const authHelper = require("../../helpers/auth.helper");

const mockData = async () => {
  try {
    const role = await roleModel.findOne({name: ROLE.CENTRE_ADMIN});
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

    for(let account of accountFile) {
        account.roleId = role._id;
        account.password = authHelper.hashedPassword(account.password);
        account = new accountModel(account);
        account = await account.save();
        accounts.push(account);
    }

    for(let centre of centresFile) {
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

    for(let image of imagesFile) {
        image = new imageModel({ ...image, centreId: centres[index]._id });
        image = image.save();
        index += 1;
    }

  } catch (error) {
    return error;
  }
};

module.exports = mockData;
