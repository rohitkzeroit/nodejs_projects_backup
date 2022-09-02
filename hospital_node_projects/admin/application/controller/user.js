/**
 * Copyright - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential. Dissemination of this information or reproduction 
 * of this material is strictly forbidden unless prior written permission is obtained

 * 
 * Written By  : Rohit kumar <mailto:rohit.zeroit@gmail.com>, june 2022
 * Description :
 * Modified By :
 */

 const { async }   = require("q");
 const helper      = require("../helpers/index"),
       path        = require('path'),
       Busboy      = require('busboy'),
       mongoHelper = require('../helpers/mongo_helper'),
       userModel   = require("../model/user_model"); 


let userObj = {};

/**
 * This function is using to userInsert
 * @param     :
 * @returns   :
 * @developer :
 */
 userObj.insertDoctor = async function (req, res) {
  console.log(req, "ewohfbewooooooooooooooofobobhobfo8ibb")
     
    let user = helper.getUidByToken(req);
  
    if (user && user.userId) {

      if ( req && req.body && req.body.userName && req.body.userEmail && req.body.userPassword && req.body.userGender) {

        let result = await userModel.insertDoctor(req.body, user.userId);
  
        helper.successHandler(res, {});
      } else {
        helper.errorHandler(res, {
          code: "ASL-E1002",
          message: "Please fill manadatory fields.",
          status: false,
        });
      }
    } else {
      helper.errorHandler(res, {
        code: "ASL-E1002",
        message: "Unauthorized Error.",
        status: false,
      });
    }
  };
  







module.exports = userObj ;