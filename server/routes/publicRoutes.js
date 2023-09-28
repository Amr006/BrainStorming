const teamController = require("../controllers/teamControllers");
const ideaController = require("../controllers/ideasControllers");
const userControler = require("../controllers/userControllers");
const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /Teams:
 *   get:
 *     summary: Get a list of all teams
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: Successful response with the list of teams
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Team'
 *       404:
 *         description: Teams not found
 */




router.get("/Teams", teamController.displayTeams);

router.get("/Profile/:id", userControler.getProfile);

router.get("/searchTeam" , teamController.searchTeam)

module.exports = router;
