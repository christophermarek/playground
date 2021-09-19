"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../controllers/bnnmarketcall/index");
const index_2 = require("../controllers/yahooStockPrices/index");
const index_3 = require("../controllers/wsb/index");
const index_4 = require("../controllers/cryptocurrency/index");
const index_5 = require("../controllers/realtime/index");
const router = express_1.Router();
router.get("/yahoofinance/current-data/:id", index_2.getCurrentDataController);
router.get("/yahoofinance/current-price/:id", index_2.getCurrentPriceController);
router.get("/yahoofinance/historical-prices/:startMonth/:startDay/:startYear/:endMonth/:endDay/:endYear/:ticker/:frequency", index_2.getHistoricalPricesController);
router.get("/bnnmarketcall", index_1.getbnnmarketcallData);
router.get("/wsb/allFrequencyLists", index_3.getAllWsbFrequencyLists);
router.get("/wsb/singleFrequencyList/:date", index_3.getWsbFrequencyListAtDate);
router.get("/cryptocurrency/allFrequencyLists", index_4.getAllCryptoCurrencyFrequencyLists);
router.get("/cryptocurrency/singleFrequencyList/:date", index_4.getCryptoCurrencyFrequencyListAtDate);
router.get("/realtime/crypto", index_5.getAllRealTimeCryptoData);
router.get("/realtime/wsb", index_5.getAllRealTimeWsb);
exports.default = router;