
import { Router } from "express";
import taskController from "../controllers/task.controller";

import {
    validateCreateTask,
    validateUpdateTask,
    validateTaskId,
    validateSearch
} from "../middlewares/validateTask";

const router = Router();

// Check middleware and controller functions
console.log("VALIDATE CREATE:", typeof validateCreateTask);
console.log("VALIDATE UPDATE:", typeof validateUpdateTask);
console.log("VALIDATE ID:", typeof validateTaskId);
console.log("VALIDATE SEARCH:", typeof validateSearch);

console.log("CREATE CONTROLLER:", typeof taskController.createTask);
console.log("GET ALL CONTROLLER:", typeof taskController.getAllTasks);
console.log("SEARCH CONTROLLER:", typeof taskController.searchTasks);
console.log("UPDATE CONTROLLER:", typeof taskController.updateTask);
console.log("DELETE CONTROLLER:", typeof taskController.deleteTask);

// CREATE TASK
router.post(
    "/",
    validateCreateTask,
    taskController.createTask
);

// GET ALL TASKS
router.get(
    "/",
    taskController.getAllTasks
);

// SEARCH TASKS
router.get(
    "/search",
    validateSearch,
    taskController.searchTasks
);

// UPDATE TASK
router.put(
    "/:id",
    validateTaskId,
    validateUpdateTask,
    taskController.updateTask
);

// DELETE TASK
router.delete(
    "/:id",
    validateTaskId,
    taskController.deleteTask
);

export default router;
