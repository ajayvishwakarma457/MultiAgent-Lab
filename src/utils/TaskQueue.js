import { randomUUID } from 'crypto';

// TaskQueue manages and distributes tasks to agents
export class TaskQueue {
  constructor() {
    this.tasks = new Map();
    this.pendingQueue = [];
    this.agents = [];
  }

  // Add a new task to the queue
  addTask(description) {
    const task = {
      id: randomUUID(),
      description,
      status: 'pending',
      createdAt: new Date(),
      completedAt: null,
      result: null
    };

    this.tasks.set(task.id, task);
    this.pendingQueue.push(task.id);

    return task;
  }

  // Register an agent to be available for tasks
  registerAgent(agent) {
    this.agents.push(agent);
  }

  // Get next pending task
  getNextTask() {
    if (this.pendingQueue.length === 0) return null;
    const taskId = this.pendingQueue.shift();
    return this.tasks.get(taskId);
  }

  // Assign a task to an agent and execute it
  async assignTask(agent, task) {
    if (!task) return null;

    const taskRecord = this.tasks.get(task.id);
    taskRecord.status = 'running';

    try {
      const result = await agent.execute(task);
      taskRecord.status = 'completed';
      taskRecord.completedAt = new Date();
      taskRecord.result = result;

      return result;
    } catch (error) {
      taskRecord.status = 'failed';
      taskRecord.completedAt = new Date();
      taskRecord.error = error.message;

      console.error(`[TaskQueue] Task ${task.id} failed: ${error.message}`);
      return null;
    }
  }

  // Process all pending tasks using available agents
  async processQueue() {
    const processing = [];

    while (this.pendingQueue.length > 0 && this.agents.length > 0) {
      const task = this.getNextTask();
      const agent = this.agents[Math.floor(Math.random() * this.agents.length)];

      processing.push(this.assignTask(agent, task));
    }

    await Promise.all(processing);
  }

  // Get statistics about the queue and tasks
  getStats() {
    const completed = Array.from(this.tasks.values()).filter(t => t.status === 'completed');
    const pending = Array.from(this.tasks.values()).filter(t => t.status === 'pending');
    const running = Array.from(this.tasks.values()).filter(t => t.status === 'running');

    return {
      total: this.tasks.size,
      completed: completed.length,
      pending: pending.length,
      running: running.length,
      agents: this.agents.length
    };
  }

  // Get detailed task information
  getTaskStatus(taskId) {
    return this.tasks.get(taskId) || null;
  }

  // Get all tasks
  getAllTasks() {
    return Array.from(this.tasks.values());
  }
}
