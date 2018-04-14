const api = require('../../api');
const express = api.getExpress();
const router = express.Router();
const connection = api.getDatabaseConnection();


module.exports = {
    router : router
}