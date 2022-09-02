
const q           = require('q');
let constants     = {};

constants.getConstant =  async function() {
    let deferred                     = q.defer(),
        obj                          = {};
        obj.KWACHA_USER_UUID         = '09d36bc0-54353-4840-a247-df7a0df6e85c';
        obj.TOTAL_VAULT_GENERATE     = 10000;


    deferred.resolve(obj);
    return deferred.promise;

}

module.exports = constants;


