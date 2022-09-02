/**
 * Copyright (C)  - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential. Dissemination of this information or reproduction 
 * of this material is strictly forbidden unless prior written permission is obtained
 * from Zero IT Solutions.
 
 * 
 * Written By  : Rohit Kumar <rohti.zeroit@gmail.com>, June 2022
 * Description :
 * Modified By :
 */

const  homeObj = require(basePath + "/admin/application/controller/home");
       userObj = require(basePath + "/admin/application/controller/user");



module.exports = function () {

 /*------------------------------Home--------------------------------*/
    app.get("/index", homeObj.dashboardPage);
    app.get("/index2", homeObj.dashboardPage2);
    app.get("/profile", homeObj.profilePage);
    app.get("/faq", homeObj.faq);
    app.get("/login", homeObj.loginPage);
    app.get("/register", homeObj.registerPage);
    app.get("/forgotPassword", homeObj.forgotPasswordPage);
    app.get("/formWizardPage", homeObj.formWizardPage);

 /*------------------------------User--------------------------------*/
  app.post("/admin/doctor", userObj.insertDoctor);
    

};