/**
 * Copyright (C) Zero IT Solutions - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential. Dissemination of this information or reproduction 
 * of this material is strictly forbidden unless prior written permission is obtained
 * from Zero IT Solutions.
 
 * 
 * Written By  : Diksha Jaswal <dikshaj.zeroit@gmail.com>, May 2022
 * Description :
 * Modified By :
 */

 const MongoClient = require("mongodb").MongoClient,
 mongoConfig       = require("../../../common/config/mongo_config"),
 q                 = require("q");

 let mongoObj = {};

 /**
* This functin Database connection  mongoDB
* @param        :
* @returns      :
* @developer    :
* @modification :
*/

 mongoObj = {},
 dbName = mongoConfig.dbName,
 url = mongoConfig.url;
const options = {
 keepAlive: true,
 useUnifiedTopology: true,
 useNewUrlParser: true,
};

/**
* This functin insert
* @param        :
* @returns      :
* @developer    :
* @modification :
*/
mongoObj.insert = async function (dataObj, tableName) {
 let deferred = q.defer();

 if (dataObj && tableName) {
   MongoClient.connect(url, options, function (err, db) {
     if (err) {
       deferred.resolve(false);
     } else {
       let database = db.db(dbName);

       database.collection(tableName).insertOne(dataObj, function (err, res) {
         if (err) {
           deferred.resolve(false);
         }

         if (res) {
           db.close();
           deferred.resolve(true);
         }
       });
     }
   });
 }

 return deferred.promise;
};

/**
* This function is used to get data from Mongo tables.
* @param       :
* @returns     :
* @developer   :
* @ModifiedBy  :
*/
mongoObj.getData = async (dataObj, tableName) => {
 let deferred = q.defer();

 if (dataObj && tableName) {
   MongoClient.connect(url, options, function (err, db) {
     if (err) {
       deferred.resolve([]);
     } else {
       let database = db.db(dbName);

       database
         .collection(tableName)
         .find(dataObj)
         .toArray(function (err, res) {
           if (err) {
             deferred.resolve([]);
           }

           if (res) {
             db.close();
             deferred.resolve(res);
           } else {
             deferred.resolve([]);
           }
         });
     }
   });
 } else {
   deferred.resolve([]);
 }

 return deferred.promise;
};

/**
* This function is using to deleteData
* @param       :
* @returns     :
* @developer   :
* @ModifiedBy  :
*/
mongoObj.deleteData = async function (dataObj, tableName) {
 let deferred = q.defer();

 if (dataObj && tableName) {
   MongoClient.connect(url, options, function (err, db) {
     if (err) {
       deferred.resolve(false);
     }

     let database = db.db(dbName);

     database.collection(tableName).deleteOne(dataObj, function (err, res) {
       if (err) {
         deferred.resolve(false);
       }
       if (res) {
         db.close();
         deferred.resolve(res);
       }
     });
   });
 }

 return deferred.promise;
};
/**
* This function is using to
* @param       :
* @returns     :
* @developer   :
* @ModifiedBy  :
*/
mongoObj.getLastId = async function (tableName) {
 let deferred = q.defer();

 if (tableName) {
   MongoClient.connect(url, options, function (err, db) {
     if (err) {
       deferred.resolve(false);
     } else {
       let database = db.db(dbName);

       database.collection(tableName, function (err, collection) {
         collection
           .find()
           .sort({ $natural: -1 })
           .limit(1)
           .next()
           .then(
             function (result) {
               deferred.resolve(result);
             },
             function (err) {
               deferred.resolve(false);
             }
           );

         if (err) {
           deferred.resolve(false);
         }
       });
     }
   });
 } else {
   deferred.resolve(false);
 }

 return deferred.promise;
};

/**
* This function is using to
* @param       :
* @returns     :
* @developer   :
* @ModifiedBy  :
*/
mongoObj.updateData = async function (dataObj, tableName, updateObj) {
 let deferred = q.defer();

 if (dataObj && tableName && updateObj) {
   let newvalues = { $set: updateObj };

   MongoClient.connect(url, options, function (err, db) {
     if (err) {
       deferred.resolve(false);
     }

     let database = db.db(dbName);

     database
       .collection(tableName)
       .updateOne(dataObj, newvalues, function (err, res) {
         if (err) {
           deferred.resolve(false);
         }

         if (res) {
           db.close();
           deferred.resolve(true);
         }
       });
   });
 }

 return deferred.promise;
};
/**
* This function is using to
* @param       :
* @returns     :
* @developer   :
* @ModifiedBy  :
*/
mongoObj.getKeysListData = async function (dataObj, tableName) {
 let deferred = q.defer();

 if (dataObj && tableName) {
   MongoClient.connect(url, options, function (err, db) {
     if (err) {
       deferred.resolve(false);
     } else {
       let database = db.db(dbName),
         mysort = { kk_uuid: -1 },
         sortBy = "",
         sortOrder = "",
         lastId = "",
         queryObj = "",
         recordsPerPage = 10,
         page = 0,
         query = {};

       if (dataObj.per_page) {
         recordsPerPage = dataObj.per_page;
       }

       if (dataObj.page) {
         page = dataObj.page;
       }

       if (dataObj.sortBy) {
         sortBy = dataObj.sortBy;
       }

       if (dataObj.sortOrder) {
         sortOrder = dataObj.sortOrder;
       }

       if (dataObj.last) {
         lastId = dataObj.last;
       }

       if (lastId) {
         query._id = { $lte: lastId };
       }

       if (sortBy == "kk_uuid") {
         if (sortOrder == "ASC") {
           mysort = { kk_uuid: 1 };
         }
       }

       let offset = page * recordsPerPage;

       database
         .collection(tableName)
         .find(queryObj)
         .sort(mysort)
         .toArray(function (err, result) {
           database
             .collection(tableName)
             .find(queryObj)
             .sort(mysort)
             .skip(offset)
             .limit(Number(recordsPerPage))
             .toArray(function (err, res) {
               if (err) {
                 console.log("Mongo db error is : ", err);
                 deferred.resolve([]);
               }
               if (res) {
                 console.log("Mongo res is : ", res);

                 if (dataObj.last && dataObj.last != "") {
                   database
                     .collection(tableName)
                     .find(queryObj)
                     .sort(mysort)
                     .toArray(function (err, result1) {
                       let obj = {
                         data: res,
                         more_records: result1.length,
                         total_records: result.length,
                         last: result[0]["kk_uuid"],
                       };
                       deferred.resolve(obj);
                     });
                 } else {
                   let id = "";

                   if (res != "") {
                     id = res[0]["kk_uuid"];
                   }

                   let obj = {
                     data: res,
                     more_records: 0,
                     total_records: result.length,
                     last: id,
                   };
                   deferred.resolve(obj);
                 }

                 db.close();
               }
             });
         });
     }
   });
 }
 return deferred.promise;
};

/**
* This function is using to
* @param       :
* @returns     :
* @developer   :
* @ModifiedBy  :
*/
mongoObj.getVaultsListData = async function (dataObj, tableName) {
 let deferred = q.defer();

 if (dataObj && tableName) {
   MongoClient.connect(url, options, function (err, db) {
     if (err) {
       deferred.resolve(false);
     } else {
       let database = db.db(dbName),
         mysort = { kv_uuid: -1 },
         sortBy = "",
         sortOrder = "",
         lastId = "",
         queryObj = "",
         recordsPerPage = 10,
         page = 0,
         query = {};

       if (dataObj.per_page) {
         recordsPerPage = dataObj.per_page;
       }

       if (dataObj.page) {
         page = dataObj.page;
       }

       if (dataObj.sortBy) {
         sortBy = dataObj.sortBy;
       }

       if (dataObj.sortOrder) {
         sortOrder = dataObj.sortOrder;
       }

       if (dataObj.last) {
         lastId = dataObj.last;
       }

       if (lastId) {
         query._id = { $lte: lastId };
       }

       if (sortBy == "kv_uuid") {
         if (sortOrder == "ASC") {
           mysort = { kv_uuid: 1 };
         }
       }

       let offset = page * recordsPerPage;

       database
         .collection(tableName)
         .find(queryObj)
         .sort(mysort)
         .toArray(function (err, result) {
           database
             .collection(tableName)
             .find(queryObj)
             .sort(mysort)
             .skip(offset)
             .limit(Number(recordsPerPage))
             .toArray(function (err, res) {
               if (err) {
                 console.log("Mongo db error is : ", err);
                 deferred.resolve([]);
               }
               if (res) {
                 if (dataObj.last && dataObj.last != "") {
                   database
                     .collection(tableName)
                     .find(queryObj)
                     .sort(mysort)
                     .toArray(function (err, result1) {
                       let obj = {
                         data: res,
                         more_records: result1.length,
                         total_records: result.length,
                         last: result[0]["kv_uuid"],
                       };
                       deferred.resolve(obj);
                     });
                 } else {
                   let id = "";

                   if (res != "") {
                     id = res[0]["kv_uuid"];
                   }

                   let obj = {
                     data: res,
                     more_records: 0,
                     total_records: result.length,
                     last: id,
                   };
                   deferred.resolve(obj);
                 }

                 db.close();
               }
             });
         });
     }
   });
 }
 return deferred.promise;
};
/**
* This function is using to
* @param       :
* @returns     :
* @developer   :
* @ModifiedBy  :
*/
mongoObj.getuserListData = async function (dataObj, tableName) {
 let deferred = q.defer();

 if (dataObj && tableName) {
   MongoClient.connect(url, options, function (err, db) {
     if (err) {
       deferred.resolve(false);
     } else {
       let database = db.db(dbName),
         mysort = { uc_uuid: -1 },
         sortBy = "",
         sortOrder = "",
         lastId = "",
         queryObj = "",
         recordsPerPage = 10,
         page = 0,
         query = {};

       if (dataObj.per_page) {
         recordsPerPage = dataObj.per_page;
       }

       if (dataObj.page) {
         page = dataObj.page;
       }

       if (dataObj.sortBy) {
         sortBy = dataObj.sortBy;
       }

       if (dataObj.sortOrder) {
         sortOrder = dataObj.sortOrder;
       }

       if (dataObj.last) {
         lastId = dataObj.last;
       }

       if (lastId) {
         query._id = { $lte: lastId };
       }

       if (sortBy == "uc_uuid") {
         if (sortOrder == "ASC") {
           mysort = { uc_uuid: 1 };
         }
       }

       let offset = page * recordsPerPage;

       database
         .collection(tableName)
         .find(queryObj)
         .sort(mysort)
         .toArray(function (err, result) {
           database
             .collection(tableName)
             .find(queryObj)
             .sort(mysort)
             .skip(offset)
             .limit(Number(recordsPerPage))
             .toArray(function (err, res) {
               if (err) {
                 console.log("Mongo db error is : ", err);
                 deferred.resolve([]);
               }
               if (res) {
                 console.log("Mongo res is : ", res);

                 if (dataObj.last && dataObj.last != "") {
                   database
                     .collection(tableName)
                     .find(queryObj)
                     .sort(mysort)
                     .toArray(function (err, result1) {
                       let obj = {
                         data: res,
                         more_records: result1.length,
                         total_records: result.length,
                         last: result[0]["uc_uuid"],
                       };
                       deferred.resolve(obj);
                     });
                 } else {
                   let id = "";

                   if (res != "") {
                     id = res[0]["uc_uuid"];
                   }

                   let obj = {
                     data: res,
                     more_records: 0,
                     total_records: result.length,
                     last: id,
                   };
                   deferred.resolve(obj);
                 }

                 db.close();
               }
             });
         });
     }
   });
 }
 return deferred.promise;
};
/**
* This function is using to
* @param       :
* @returns     :
* @developer   :
* @ModifiedBy  :
*/
mongoObj.getagentListData = async function (dataObj, tableName) {
 let deferred = q.defer();

 if (dataObj && tableName) {
   MongoClient.connect(url, options, function (err, db) {
     if (err) {
       deferred.resolve(false);
     } else {
       let database = db.db(dbName),
         mysort = { uc_uuid: -1 },
         sortBy = "",
         sortOrder = "",
         lastId = "",
         queryObj = "",
         recordsPerPage = 10,
         page = 0,
         query = {};

       if (dataObj.per_page) {
         recordsPerPage = dataObj.per_page;
       }

       if (dataObj.page) {
         page = dataObj.page;
       }

       if (dataObj.sortBy) {
         sortBy = dataObj.sortBy;
       }

       if (dataObj.sortOrder) {
         sortOrder = dataObj.sortOrder;
       }

       if (dataObj.last) {
         lastId = dataObj.last;
       }

       if (lastId) {
         query._id = { $lte: lastId };
       }

       if (sortBy == "uc_uuid") {
         if (sortOrder == "ASC") {
           mysort = { uc_uuid: 1 };
         }
       }

       let offset = page * recordsPerPage;

       database
         .collection(tableName)
         .find(queryObj)
         .sort(mysort)
         .toArray(function (err, result) {
           database
             .collection(tableName)
             .find(queryObj)
             .sort(mysort)
             .skip(offset)
             .limit(Number(recordsPerPage))
             .toArray(function (err, res) {
               if (err) {
                 console.log("Mongo db error is : ", err);
                 deferred.resolve([]);
               }
               if (res) {
                 console.log("Mongo res is : ", res);

                 if (dataObj.last && dataObj.last != "") {
                   database
                     .collection(tableName)
                     .find(queryObj)
                     .sort(mysort)
                     .toArray(function (err, result1) {
                       let obj = {
                         data: res,
                         more_records: result1.length,
                         total_records: result.length,
                         last: result[0]["uc_uuid"],
                       };
                       deferred.resolve(obj);
                     });
                 } else {
                   let id = "";

                   if (res != "") {
                     id = res[0]["uc_uuid"];
                   }

                   let obj = {
                     data: res,
                     more_records: 0,
                     total_records: result.length,
                     last: id,
                   };
                   deferred.resolve(obj);
                 }

                 db.close();
               }
             });
         });
     }
   });
 }
 return deferred.promise;
};
/**
* This function is used to get data from Mongo tables.
* @param       :
* @returns     :
* @developer   :
* @ModifiedBy  :
*/
mongoObj.getRandomData = async (dataObj, tableName,size) => {
 let deferred = q.defer();

 if ( dataObj && tableName ) {

   MongoClient.connect(url, options, function (err, db) {

     if ( err ) {
       deferred.resolve([]);
     } else {

       let database = db.db(dbName);
     
       database.collection(tableName).aggregate([
         {$match: dataObj}, // filter the results
         {$sample: {size: size}} // You want to get 5 docs
       ]).toArray(function (err, res) {
         if ( err ) {
           deferred.resolve([]);
         }

         if ( res ) {
           db.close();
           deferred.resolve(res);
         } else {
           deferred.resolve([]);
         }

       });

     }

   });

 } else {
   deferred.resolve([]);
 }

 return deferred.promise;

};
module.exports = mongoObj;
