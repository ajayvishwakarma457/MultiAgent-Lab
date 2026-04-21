import { randomUUID } from 'crypto';

// Base Agent class that all other agents inherit from
export class Agent {
  constructor(name, role) {
    this.id = randomUUID();
    this.name = name;
    this.role = role;
    this.status = 'idle';
  }

  // Execute a task - to be overridden by subclasses
  async execute(task) {
    this.status = 'running';
    console.log(`\n[${this.name}] Starting task: "${task.description}"`);
    console.log(`[${this.name}] Role: ${this.role}`);

    this.status = 'completed';
    console.log(`[${this.name}] Task completed`);

    return { taskId: task.id, agentId: this.id, result: 'Task executed' };
  }

  getStatus() {
    return {
      id: this.id,
      name: this.name,
      role: this.role,
      status: this.status
    };
  }
}
