import {NextFunction, Request, Response} from "express";
import {
    getReportStructureValidator,
    getReportValidator,
    saveReportValidator,
    populateReportValidator,
    initializeReportValidator,
    getPutObejctURLsValidator,
    validateSendReport,
} from "../../utility/validators/report";

export const validateGetReportStructure = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    getReportStructureValidator
        .validate(req.query, { abortEarly: false })
        .then(() => {
            next();
        })
        .catch((errors) => {
            next(errors);
        });
};

export const validateSaveReport = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    saveReportValidator
        .validate(req.body, { abortEarly: false })
        .then(() => {
            next();
        })
        .catch((errors) => {
            next(errors);
        });
};

export const validateGetReport = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    getReportValidator
        .validate(req.query, { abortEarly: false })
        .then(() => {
            next();
        })
        .catch((errors) => {
            next(errors);
        });
};

export const validatePopulateReport = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    populateReportValidator
        .validate(req.query, { abortEarly: false})
        .then(() => {
            next();
        })
        .catch((errors) => {
            next(errors);
        });

};

export const validateInitializeReport = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    initializeReportValidator
        .validate(req.body, { abortEarly: false })
        .then(() => {
            next();
        })
        .catch((errors) => {
            next(errors);
        });
};

export const validateGetPutObjectUrls = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    getPutObejctURLsValidator
        .validate(req.body, { abortEarly: false })
        .then(() => {
            next();
        })
        .catch((errors) => {
            next(errors);
        });
};


export const sendReportValidator = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    validateSendReport
        .validate(req.body, { abortEarly: false })
        .then(() => {
            next();
        })
        .catch((errors) => {
            next(errors);
        });
};