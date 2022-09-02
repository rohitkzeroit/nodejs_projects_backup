/**
 * Copyright (C)  - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential. Dissemination of this information or reproduction 
 * of this material is strictly forbidden unless prior written permission is obtained
 * from Zero IT Solutions.
 
 * 
 * Written By  : Rohit Kumar <rohit.zeroit@gmail.com>, june 2022
 * Description :
 * Modified By :
 */

    const q           = require("q"),
         passwordHash = require("password-hash"),
         { v4 }       = require("uuid"),
         helper       = require("../helpers/index"),
         randomstring = require("randomstring");

    let  autModel  = {};
    
    
module.exports  =  autModel 
