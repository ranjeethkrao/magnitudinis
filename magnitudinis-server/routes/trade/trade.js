const historic = require('./historic/historic-dao');
const live = require('./live/live-dao');

module.exports = {
    histTradeRoute : historic.router,
    liveTradeRoute : live.router

} 