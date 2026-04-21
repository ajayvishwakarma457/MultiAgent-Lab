import { Agent } from './Agent.js';

// WriterAgent specializes in creating content
export class WriterAgent extends Agent {
  constructor(name = 'Writer') {
    super(name, 'Writing');
  }

  // Simulates writing by logging created content
  async execute(task) {
    this.status = 'running';
    console.log(`\n[${this.name}] ✍️  Starting to write: "${task.description}"`);

    // Simulate writing time
    await new Promise(resolve => setTimeout(resolve, 600));

    const contentSections = [
      'Introduction: Setting context',
      'Body: Detailed exploration',
      'Conclusion: Key takeaways',
      'References: Source citations'
    ];

    console.log(`[${this.name}] Content created with sections:`);
    contentSections.forEach(section => console.log(`  • ${section}`));

    this.status = 'completed';
    return {
      taskId: task.id,
      agentId: this.id,
      result: 'Content written',
      contentLength: Math.floor(Math.random() * 3000) + 1000,
      sections: contentSections
    };
  }
}
