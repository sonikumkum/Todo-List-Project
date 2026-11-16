
import { Request, Response } from "express";
import taskRepository from "../repositories/task.repository";

class TaskController {

    // Create Task
    async createTask(req: Request, res: Response) {
        try {
            const { title, description } = req.body;

            if (!title) {
                return res.status(400).json({
                    message: "Task title is required"
                });
            }

            const taskId = await taskRepository.createTask({
                title,
                description
            });

            return res.status(201).json({
                message: "Task created successfully",
                taskId
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }

    // Get All Tasks
    async getAllTasks(req: Request, res: Response) {
        try {
            const tasks = await taskRepository.getAllTasks();

            return res.status(200).json({
                message: "Tasks fetched successfully",
                data: tasks
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }

    // Search Tasks
    async searchTasks(req: Request, res: Response) {
        try {
            const search = req.query.search as string;

            if (!search) {
                return res.status(400).json({
                    message: "Search keyword is required"
                });
            }

            const tasks = await taskRepository.searchTasks(search);

            return res.status(200).json({
                message: "Search results fetched successfully",
                data: tasks
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }

    // Update Task
    async updateTask(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { title, description, status } = req.body;

            if (!id || isNaN(id)) {
                return res.status(400).json({
                    message: "Valid task ID is required"
                });
            }

            if (!title || !["pending", "completed"].includes(status)) {
                return res.status(400).json({
                    message: "Valid title and status are required"
                });
            }

            const updated = await taskRepository.updateTask(
                id,
                title,
                description || "",
                status
            );

            if (updated === 0) {
                return res.status(404).json({
                    message: "Task not found"
                });
            }

            return res.status(200).json({
                message: "Task updated successfully"
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }

    // Delete Task
    async deleteTask(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            if (!id || isNaN(id)) {
                return res.status(400).json({
                    message: "Valid task ID is required"
                });
            }

            const deleted = await taskRepository.deleteTask(id);

            if (deleted === 0) {
                return res.status(404).json({
                    message: "Task not found"
                });
            }

            return res.status(200).json({
                message: "Task deleted successfully"
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }
}

export default new TaskController();
