const express = require('express');
const router = express.Router();

const registration = require('./controllers/registration');
const auth = require('./controllers/auth');
const energyBalance = require('./controllers/energyBalance');
const emissions = require('./controllers/emissions');
const xlsx = require('./controllers/xlsx');
const emxlsx = require('./controllers/emissionsXLSX');


router.post("/registration", registration);
router.post("/auth", auth);
router.get("/balance", energyBalance);
router.get("/emissions", emissions);
router.get("/xlsx", xlsx);
router.get("/emxlsx", emxlsx);

module.exports = router;