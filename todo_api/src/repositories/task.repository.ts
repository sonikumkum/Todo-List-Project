
import db from "../config/database";
import { Task } from "../models/task.model";
import { ResultSetHeader } from "mysql2";

class TaskRepository {

    // Create Task
    async createTask(task: Task) {
        const [result] = await db.execute<ResultSetHeader>(
            "INSERT INTO tasks (title, description) VALUES (?, ?)",
            [task.title, task.description || null]
        );

        return result.insertId;
    }

    // Get All Tasks
    async getAllTasks() {
        const [rows] = await db.execute(
            "SELECT * FROM tasks ORDER BY created_at DESC"
        );

        return rows;
    }

    // Search Tasks
    async searchTasks(search: string) {
        const [rows] = await db.execute(
            "SELECT * FROM tasks WHERE title LIKE ? ORDER BY created_at DESC",
            [`%${search}%`]
        );

        return rows;
    }

    // Update Task
    async updateTask(
        id: number,
        title: string,
        description: string,
        status: "pending" | "completed"
    ) {
        const [result] = await db.execute<ResultSetHeader>(
            `UPDATE tasks
             SET title = ?, description = ?, status = ?
             WHERE id = ?`,
            [title, description, status, id]
        );

        return result.affectedRows;
    }

    // Delete Task
    async deleteTask(id: number) {
        const [result] = await db.execute<ResultSetHeader>(
            "DELETE FROM tasks WHERE id = ?",
            [id]
        );

        return result.affectedRows;
    }
}

export default new TaskRepository();
