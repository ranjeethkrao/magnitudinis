const api = require('../api');
const crypto = require('crypto');
const express = api.getExpress();
const router = express.Router();
const connection = api.getDatabaseConnection();
const firebase = api.getFirebase();
const firebaseDB = api.getFirebaseDB();


/* GET api listing. */

router.get('/findCountries', (req, res) => {
    responseObject = new Object();
    connection.query('SELECT `id`, `name` FROM countries order by `name`', function(err, rows, fields){
        if(!err) {
            responseObject = {
                data: rows,
                success: true
            }
        }
        else {
            responseObject = {
                message: 'Exception occurred : ' + err.message,
                success: false
            }
        }

        return res.send(responseObject);
    });
});

router.get('/fetchAllUsers', (req, res) => {
    /* var userId = firebase.auth().currentUser.uid;
    console.log(userId); */
    return res.send(firebaseDB.ref().child('/USERS/').once('value'));
});

router.post('/register', (req, res) => {
    queryParams = req.body;
    responseObject = {};
    firebaseDB.ref().child('/USERS/' + queryParams.uuid).set(getFormattedRegisterObject(queryParams))
    .then(
        responseObject = {
            message: 'User successfully saved into database',
            success: true
        }
    ).catch((err) => {
            responseObject = {
                message: err.message,
                success: false
            };
        }
    );
    return res.send(responseObject);
});

function getFormattedRegisterObject(obj) {
    if(obj) {
        for(var key in obj) {
            if(Object.prototype.toString.call(obj[key]) == '[object Array]') {
                var objArr = obj[key];
                if(objArr[0].itemName) {
                    if(objArr.length === 1) {
                        obj[key] = objArr[0].itemName;
                    }
                    else {
                        obj[key] = [];
                        for(val of objArr) {
                            
                            obj[key].push(val.itemName);
                        }
                    }
                }
            }
        }
    
        obj['password'] = getEncryptedPassword(obj['password']);
    }
    return obj;

}
/**
 * generates an encrypted version of plain password text
 * @function
 * @param {string} plainPassText 
 */
function getEncryptedPassword(plainPassText) {
    var salt = getRandomString(18);
    var passwordData = getHashCode(plainPassText, salt);

    return passwordData;
}

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
function getRandomString(length) {
    return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0,length);   /** return required number of characters */
}

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
function getHashCode(password, salt) {
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
}

module.exports = {
    router: router
};