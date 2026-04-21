import { Agent } from './Agent.js';

// ResearchAgent specializes in gathering information
export class ResearchAgent extends Agent {
  constructor(name = 'Researcher') {
    super(name, 'Research');
  }

  // Simulates research by logging findings
  async execute(task) {
    this.status = 'running';
    console.log(`\n[${this.name}] 🔍 Starting research: "${task.description}"`);

    // Simulate research time
    await new Promise(resolve => setTimeout(resolve, 500));

    const findings = [
      `Found 3 relevant sources on "${task.description}"`,
      `Key insight: Domain expertise required`,
      `Recommendation: Proceed with structured approach`
    ];

    console.log(`[${this.name}] Research findings:`);
    findings.forEach(finding => console.log(`  • ${finding}`));

    this.status = 'completed';
    return {
      taskId: task.id,
      agentId: this.id,
      result: 'Research completed',
      findings
    };
  }
}
