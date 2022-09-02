/**
 * Copyright (C)- All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential. Dissemination of this information or reproduction 
 * of this material is strictly forbidden unless prior written permission is obtained
 * from Zero IT Solutions.
 
 * 
 * Written By  : Rohit kumar <rohit.zeroit@gmail.com>, jun 2022
 * Description :
 * Modified By :
 */	

    const express        = require('express'),
        bodyParser		   = require('body-parser'),
        cookieParser	   = require('cookie-parser'),
        helmet           = require('helmet'),
        jwt				       = require('jsonwebtoken'),
        http			    = require('http'),
        https			    = require('https');

    const session       = require('express-session');
    const path = require('path');
    const app		    = express();

    let port            = process.env.PORT || 3000;
        global.app      = app;
        global.jwt      = jwt;
        global.basePath = __dirname;
   let isUseHTTPs  = false;    

   var options = {};


//static view engine 
   app.use(express.static(__dirname +''));

   app.set('views', [ path.join(__dirname, 'admin/application/views')

   ]);

//ejs engine
   app.set ('view engine', 'ejs');

//ejs body-Parser engain
  app.use(bodyParser.json({
      limit: '50mb',
   })) ;
  
  app.use(bodyParser.urlencoded({ 
      extended: false,
      limit:'50mb'
    }));

//upload file engain
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//main file engain
 require('./admin/')(); 

//session engine 
 app.use(session({
  secret: 'ssshhhhh',
  cookie: { maxAge: 200000000 },
  saveUninitialized: true,
  resave: false,
}));

//helmet engine
app.use(helmet.hidePoweredBy());

//cookieParser engine
app.use(cookieParser());

//function engine
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

//server
var server;
if ( isUseHTTPs === false ) {
    server     = http.createServer( app );
} else {
    server     = https.createServer( options, app );
}


   app.listen (port, function(){
       console.log(`server started on PORT ->${port} `);
   })