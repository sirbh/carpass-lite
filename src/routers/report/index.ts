import express from "express";
import { RequestHandler } from "express";
import { getReport, getReportStructure, saveReport, populateReport, initializeReport, getPutObejctURLs, sendReport} from "../../controllers/report";
import {
    validateGetReport,
    validateGetReportStructure,
    validateSaveReport,
    validatePopulateReport,
    validateInitializeReport,
    validateGetPutObjectUrls,
    sendReportValidator,
} from "../../middleware/validate/report";
import {TokenExtractor} from "../../middleware";


const router = express.Router();



/**
 * @openapi
 * /api/v1/report:
 *   get:
 *     tags:
 *       - Report
 *     summary: Get Report
 *     description: Get report with given id
 *     parameters:
 *       - name: registration_number
 *         in: query
 *         description: Registration number of the vehicle.
 *       - name: production_number
 *         in: query
 *         description: Production number of the vehicle.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *        description: All report with given registration number
 *        content:
 *          application/json:
 *            schema:
 *             type: array
 *             items:
 *              $ref: '#/components/schemas/GetReportResponse'
 */
router.get(
    "/",
    validateGetReport,
    TokenExtractor as RequestHandler,
    getReport as RequestHandler
);



/**
 * @openapi
 * /api/v1/report:
 *   post:
 *     tags:
 *       - Report
 *     summary: Save Report
 *     description: Save report
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SaveReport'
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Report saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               g$ref: '#/components/schemas/SaveReportResponse'
 */
router.post(
    "/",
    validateSaveReport,
    TokenExtractor as RequestHandler,
    saveReport as RequestHandler
);


/**
 * @openapi
 * /api/v1/report/structure:
 *   get:
 *     tags:
 *       - Report
 *     summary: Report Structure
 *     description: Get report structure
 *     parameters:
 *      - name: Report Properties
 *        in: query
 *        description: Details about report structure
 *        schema:
 *          $ref: '#/components/schemas/ReportStructure'
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      200:
 *       description: Report structure
 *       content:
 *        application/json:
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ReportStructureResponse'
 */
router.get(
  "/structure",
  validateGetReportStructure,
  TokenExtractor as RequestHandler,
  getReportStructure as RequestHandler
);

/**
 * @openapi
 * /api/v1/report/send:
 *   get:
 *     tags:
 *       - Report
 *     summary: Send Report Html
 *     description: populate and send report html
 *     parameters:
 *       - name: registration_number
 *         in: query
 *         description: Registration number of the vehicle.
 *         required: true
 *       - name: report_id
 *         in: query
 *         description: Id of the desired report
 *         required: true
 *       - name: language
 *         in: query
 *         description: language code of the desired report, defaulted to 'fi'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: HTML of the populated report
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: "<!DOCTYPE html><html><head>...</head><body>...</body></html>"
 */

router.get(
    "/send",
    validatePopulateReport,
    TokenExtractor as RequestHandler,
    populateReport as RequestHandler
);

/**
 * @openapi
 * /api/v1/report/initialize:
 *   post:
 *     tags:
 *       - Report
 *     summary: Initialize Report
 *     description: Initialize report
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InitializeReport'
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Report initialized successfully
 *         content:
 *           application/json:
 *             schema:
 *               g$ref: '#/components/schemas/InitializeReportResponse'
 */

router.post(
    "/initialize",
    validateInitializeReport,
    TokenExtractor as RequestHandler,
    initializeReport as RequestHandler
);

/**
 * @openapi
 * /api/v1/report/upload-urls:
 *   post:
 *     tags:
 *       - Report
 *     summary: Get Put Object URLs
 *     description: Get URLs to upload objects to S3
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GetPutObjectURLs'
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: URLs to upload objects
 *             
 */

router.post(
    "/upload-urls",
    validateGetPutObjectUrls,
    TokenExtractor as RequestHandler,
    getPutObejctURLs as RequestHandler
);


/**
 * @openapi
 * /api/v1/report/sendemail:
 *   post:
 *     tags:
 *       - Report
 *     summary: Send a report via email
 *     description: Fetches a report, generates a PDF, and sends it via email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SendReport'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The email with the report was sent successfully
 *       400:
 *         description: Invalid request, validation error in parameters
 *       404:
 *         description: Report not found or translations missing
 *       500:
 *         description: Internal server error, email not sent
 */
router.post(
    "/sendemail",
    sendReportValidator,
    TokenExtractor as RequestHandler,
    sendReport as RequestHandler
);

export default router;
