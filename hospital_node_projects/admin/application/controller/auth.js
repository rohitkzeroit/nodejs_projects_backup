/**
 * Copyright (C)  - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential. Dissemination of this information or reproduction 
 * of this material is strictly forbidden unless prior written permission is obtained
 * from Zero IT Solutions.
 
 * 
 * Written By  : Rohit  Kumar <rohit.zeroit@gmail.com>, May 2022
 * Description :
 * Modified By :
 */	

const   passwordHash    = require('password-hash'),
        path            = require('path'),
        Busboy          = require('busboy'),
        helper          = require('../helpers/index'),
        mongoHelper     = require('../helpers/mongo_helper'),
        autModel        = require('../model/auth_model');

let  authObj = {} ; 




module.exports = authObj;