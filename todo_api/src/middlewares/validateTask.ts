
import { Request, Response, NextFunction } from "express";

// CREATE TASK VALIDATION
export const validateCreateTask = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { title, description } = req.body;

    if (typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Title is required and must be a valid string"
        });
    }

    if (title.trim().length > 255) {
        return res.status(400).json({
            success: false,
            message: "Title cannot exceed 255 characters"
        });
    }

    if (
        description !== undefined &&
        description !== null &&
        typeof description !== "string"
    ) {
        return res.status(400).json({
            success: false,
            message: "Description must be a string"
        });
    }

    next();
};

// UPDATE TASK VALIDATION
export const validateUpdateTask = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { title, description, status } = req.body;

    if (typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Title is required"
        });
    }

    if (title.trim().length > 255) {
        return res.status(400).json({
            success: false,
            message: "Title cannot exceed 255 characters"
        });
    }

    if (
        description !== undefined &&
        description !== null &&
        typeof description !== "string"
    ) {
        return res.status(400).json({
            success: false,
            message: "Description must be a string"
        });
    }

    if (!["pending", "completed"].includes(status)) {
        return res.status(400).json({
            success: false,
            message: "Status must be pending or completed"
        });
    }

    next();
};

// TASK ID VALIDATION
export const validateTaskId = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            success: false,
            message: "Task ID must be a valid positive number"
        });
    }

    next();
};

// SEARCH VALIDATION
export const validateSearch = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const search = req.query.search;

    if (search !== undefined && typeof search !== "string") {
        return res.status(400).json({
            success: false,
            message: "Search must be a valid string"
        });
    }

    next();
};
