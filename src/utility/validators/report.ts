import {attachment_type, engine_type, inspection_status, report_type} from "@prisma/client";
import { object,string,number, array, mixed, } from "yup";

/**
 * @openapi
 * components:
 *   schemas:
 *     ReportStructure:
 *       type: object
 *       properties:
 *         language:
 *           type: string
 *           description: Language of the report.
 *           enum:
 *             - fi
 *             - en
 *           default: fi
 *         engine_type:
 *           type: string
 *           description: Type of engine for the report.
 *           enum:
 *             - petrol
 *             - diesel
 *             - electric
 *             - hybrid
 *             - hybrid_diesel
 *             - hybrid_petrol
 *           default: petrol
 *         report_type:
 *           type: string
 *           description: Type of the report.
 *           enum:
 *             - full
 *             - narrow
 *             - light
 *           default: full
 *         sections:
 *           type: array
 *           description: Sections for the report
 *           items:
 *             type: integer
 *           example:
 *             - 1
 *             - 2
 *           nullable: true
 * 
 */
export const getReportStructureValidator = object().shape({
    language: string().trim().oneOf(["fi", "en"], "Invalid language").default("fi"),
    engine_type: mixed<engine_type>().oneOf(Object.values(engine_type), "Invalid engine type").default("petrol"),
    report_type: mixed<report_type>().oneOf(Object.values(report_type), "Invalid report type").default("full"),
    sections:array().when("report_type",{
        is: report_type.light,
        then: (schema) => schema.min(1, "At least one section is required").of(number().required("Section ids are required")),
       otherwise: (schema) => schema.notRequired(),
    })
});


/**
 * @openapi
 * components:
 *   schemas:
 *     SaveReport:
 *       type: object
 *       properties:
 *         report_id:
 *           type: number
 *           description: Unique ID of the report.
 *         report_rows:
 *           type: array
 *           description: Array of report rows, each containing inspection details.
 *           items:
 *             type: object
 *             properties:
 *               question_id:
 *                 type: number
 *                 description: ID of the question.
 *               inspection_status:
 *                 type: string
 *                 description: Inspection status.
 *                 enum:
 *                   - green
 *                   - yellow
 *                   - red
 *               comment:
 *                 type: string
 *                 description: Comment for the report row.
 *               input_left:
 *                 type: number
 *                 description: Input left value.
 *               input_left_measurement:
 *                 type: string
 *                 description: Measurement unit for the left input.
 *               input_right:
 *                 type: number
 *                 description: Input right value.
 *               input_right_measurement:
 *                 type: string
 *                 description: Measurement unit for the right input.
 *               additional_input:
 *                 type: number
 *                 description: Additional input value.
 *               additional_input_measurement:
 *                 type: string
 *                 description: Measurement unit for the additional input.
 *               attachments:
 *                 type: array
 *                 description: Array of attachments for the report row.
 *                 items:
 *                   type: object
 *                   properties:
 *                     attachment_type:
 *                       type: string
 *                       description: Type of attachment.
 *                       enum:
 *                         - image
 *                         - audio
 *                     data:
 *                       type: string
 *                       description: Attachment data.
 *       required:
 *         - report_id
 *         - report_rows
 */
export const saveReportValidator = object().shape(
    {
        report_id: number().required("Report id is required"),
        report_rows:array().defined().of(
            object().shape({
                question_id: number().required("Question id is required"),
                inspection_status: mixed<inspection_status>().required("Inspection status is required").oneOf(Object.values(inspection_status), "Invalid inspection status"),
                comment: string().trim(),
                input_left: number(), 
                input_left_measurement: string().trim(), 
                input_right: number(), 
                input_right_measurement: string().trim(), 
                additional_input: number(),
                additional_input_measurement: string().trim(),
                attachments: array().of(
                    object().shape({
                        attachment_type: mixed<attachment_type>().required("Attachment type is required").oneOf(Object.values(attachment_type), "Invalid attachment type"),
                        data: string().required("Attachment data is required"),
                    }),
                ),
            }).required("Report row is required"),
        ).required("Report rows are required"),
        // order_id: number().required("Order id is required"),
    }
);

export const getReportValidator = object().shape({
    registration_number: string().trim().required("Registration number is required"),
    language: string().trim().oneOf(["fi", "en"], "Invalid language").default("fi"),
});

export const populateReportValidator = object().shape({
    registration_number: string().trim().required("Registration number is required"),
    language: string().trim().oneOf(["fi","en"],"Invalid language").default("fi"),
    report_id: string().trim().required("Report id is required"),
});




/**
 * @openapi
 * components:
 *   schemas:
 *     InitializeReport:
 *       type: object
 *       properties:
 *         registration_number:
 *           type: string
 *           description: Registration number of the vehicle.
 *           default: "ABC-123"
 *         engine_type:
 *           type: string
 *           description: Type of engine.
 *           enum:
 *             - petrol
 *             - diesel
 *             - electric
 *             - hybrid
 *             - hybrid_diesel
 *             - hybrid_petrol
 *         brand_and_model:
 *           type: string
 *           description: Brand and model of the vehicle.
 *           default: "Toyota Corolla"
 *         odometer_reading:
 *           type: number
 *           description: Odometer reading of the vehicle.
 *           default: 10000
 *         production_number:
 *           type: string
 *           description: Production number of the vehicle.
 *           default: "123456"
 *       required:
 *         - registration_number
 *         - engine_type
 *         - brand_and_model
 *         - odometer_reading
 *         - production_number
 */

export const initializeReportValidator = object().shape({
    registration_number: string().trim().required("Registration number is required"),
    engine_type: mixed<engine_type>().required("Engine type is required").oneOf(Object.values(engine_type), "Invalid report type"),
    brand_and_model: string().trim().required("Brand and model is required"),
    odometer_reading: number().required("Odometer reading is required"),
    production_number: string().trim().required("Production number is required")
});

/**
 * @openapi
 * components:
 *   schemas:
 *     GetPutObjectURLs:
 *       type: object
 *       properties:
 *         file_names:
 *           type: array
 *           items:
 *             type: string
 *             description: Name of the file to be uploaded.
 *           description: Array of file names to get URLs for uploading.
 *           example: ["/org-123/usr-32/report-32/report-32-atch-1-time-123423.jpeg", "/org-123/usr-32/report-32/report-32-atch-2-time-12333.jpeg"]
 *       required:
 *         - file_names
 */

export const getPutObejctURLsValidator = object().shape({
    file_names: array().of(string().trim().required("File name is required")).required("File names array is required"),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     SendReport:
 *       type: object
 *       properties:
 *         registration_number:
 *           type: string
 *           description: The registration number of the vehicle.
 *           example: "ABC1234"
 *         report_id:
 *           type: string
 *           description: The unique ID of the report.
 *           example: "report-12345"
 *         language:
 *           type: string
 *           description: The language in which the report should be generated.
 *           enum: ["fi", "en"]
 *           default: "fi"
 *           example: "en"
 *         email:
 *           type: string
 *           description: The email address to send the report.
 *           example: "user@example.com"
 *       required:
 *         - registration_number
 *         - report_id
 *         - email
 */
export const validateSendReport = object().shape({
    registration_number: string().trim().required("Registration number is required"),
    report_id: string().trim().required("Report id is required"),
    language: string().trim().oneOf(["fi","en"],"Invalid language").default("fi"),
    email: string().trim().email("Invalid email").required("Email is required"),
});