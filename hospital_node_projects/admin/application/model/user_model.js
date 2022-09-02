/**
 * Copyright (C) - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential. Dissemination of this information or reproduction 
 * of this material is strictly forbidden unless prior written permission is obtained
 
 * 
 * Written By  : Rohit kumar <mailto:rohit.zeroit@gmail.com>, April 2022
 * Description :
 * Modified By :
 */

const { urlencoded }    = require("express");
const { async, defer }  = require("q");
const  q                = require("q");
      helper            = require("../helpers/index");
      mongoHelper       = require("../helpers/mongo_helper");
      passwordHash      = require("password-hash"),
      { v4 }            = require("uuid");


const  userModel = {};

/**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
 userModel.insertDoctor = async function (body, userId) {
    let deferred = q.defer();
    
    if (body.userName && body.userEmail && body.userPassword && body.userGender) {
      let date = await helper.getUtcTime();
      let hashedPassword = passwordHash.generate(body.userPassword);
      let insertObj = {
        uc_uuid: v4(Date.now()),
        uc_fk_au_uuid: userId,
        uc_name: body.userName,
        uc_email: body.userEmail,
        uc_password: hashedPassword,
        uc_gender: body.userGender,
        uc_balance: 3256,
        uc_image: "",
        uc_active: "1",
        uc_deleted: "0",
        uc_created: date,
        uc_updated: date,
      };
  
      let results = await mongoHelper.insert(insertObj, "users_credential");
      console,log(results,resultsresultsresultsresultsresultsresultsresults)
  
      if (results) {
        deferred.resolve(true);
      } else {
        deferred.resolve(false);
      }
    } else {
      deferred.resolve(false);
    }
  
    return deferred.promise;
  };
  




module.exports =  userModel;  