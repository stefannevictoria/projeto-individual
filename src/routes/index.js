const express = require('express');
const router = express.Router();

const landingPageRoutes = require("./landingPageRoutes");
router.use("/", landingPageRoutes);

const userRoutes = require("./userRoutes");
router.use("/usuarios", userRoutes);

const entityRoutes = require("./entityRoutes");
router.use("/entidades", entityRoutes);

const eventRoutes = require("./eventRoutes");
router.use("/eventos", eventRoutes);

const registrationRoutes = require("./registrationRoutes");
router.use("/inscricoes", registrationRoutes);

const certificateRoutes = require("./certificateRoutes");
router.use("/certificados", certificateRoutes);

module.exports = router;