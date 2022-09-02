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
 const helper = require("../helpers/index");

let homeObj = {};

/**
 * 
 * This is function dashboard using  
 * @param    
 * @developer : Rohit kumar
 * @returns
 * 
 */
homeObj.dashboardPage = async function(req, res) {
    res.render("index", {

    });   
};

/**
 * 
 * This is function dashboard using  
 * @param    
 * @developer : Rohit kumar
 * @returns
 * 
 */
 homeObj.dashboardPage2 = async function(req, res) {
    res.render("index2", {

    });   
};

/**
 * 
 * This is function dashboard using  
 * @param    
 * @developer : Rohit kumar
 * @returns
 * 
 */
 homeObj.profilePage = async function(req, res) {
    res.render("profile", {

    });   
};

/**
 * 
 * This is function dashboard using  
 * @param    
 * @developer : Rohit kumar
 * @returns
 * 
 */
 homeObj.faq = async function(req, res) {
    res.render("faq", {

    });   
};

/**
 * 
 * This is function Login using  
 * @param    
 * @developer : Rohit kumar
 * @returns
 * 
 */
homeObj.loginPage = async function(req, res){
    res.render("login", {

    });
};

/**
 * 
 * This is function Login using  
 * @param    
 * @developer : Rohit kumar
 * @returns
 * 
 */
 homeObj.registerPage = async function(req, res){
    res.render("register", {

    });
};

/**
 * 
 * This is function Login using  
 * @param    
 * @developer : Rohit kumar
 * @returns
 * 
 */
 homeObj.loginPage = async function(req, res){
    res.render("login", {

    });
};

/**
 * 
 * This is function Login using  
 * @param    
 * @developer : Rohit kumar
 * @returns
 * 
 */
 homeObj.forgotPasswordPage = async function(req, res){
     
    res.render("forgotPassword", {

    });
};

/**
 * 
 * This is function Login using  
 * @param    
 * @developer : Rohit kumar
 * @returns
 * 
 */
 homeObj.formWizardPage = async function(req, res){
     
    res.render("formWizard", {

    });
};






module.exports = homeObj;