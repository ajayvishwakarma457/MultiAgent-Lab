import { Agent } from './agents/Agent.js';
import { ResearchAgent } from './agents/ResearchAgent.js';
import { WriterAgent } from './agents/WriterAgent.js';
import { TaskQueue } from './utils/TaskQueue.js';

// Main demonstration of the multi-agent system
async function main() {
  console.log('='.repeat(60));
  console.log('Multi-Agent System Demo');
  console.log('='.repeat(60));

  // Initialize the task queue
  const queue = new TaskQueue();

  // Create agents
  const researcher = new ResearchAgent('Alice');
  const writer = new WriterAgent('Bob');
  const generalAgent = new Agent('Charlie', 'General');

  // Register agents with the queue
  queue.registerAgent(researcher);
  queue.registerAgent(writer);
  queue.registerAgent(generalAgent);

  console.log(`\n✅ Created 3 agents:`);
  console.log(`   • ${researcher.name} (${researcher.role})`);
  console.log(`   • ${writer.name} (${writer.role})`);
  console.log(`   • ${generalAgent.name} (${generalAgent.role})`);

  // Add tasks to the queue
  const tasks = [
    'Analyze machine learning trends in 2026',
    'Write a comprehensive guide on Node.js best practices',
    'Research multi-agent system architectures',
    'Write documentation for the TaskQueue API',
    'Investigate distributed system patterns'
  ];

  console.log(`\n📋 Adding ${tasks.length} tasks to queue:`);
  tasks.forEach((taskDesc, i) => {
    queue.addTask(taskDesc);
    console.log(`   ${i + 1}. ${taskDesc}`);
  });

  console.log('\n' + '-'.repeat(60));
  console.log('Processing tasks...');
  console.log('-'.repeat(60));

  // Process all tasks
  await queue.processQueue();

  // Display results
  console.log('\n' + '='.repeat(60));
  console.log('Task Processing Summary');
  console.log('='.repeat(60));

  const stats = queue.getStats();
  console.log(`\n📊 Queue Statistics:`);
  console.log(`   Total tasks: ${stats.total}`);
  console.log(`   Completed: ${stats.completed}`);
  console.log(`   Pending: ${stats.pending}`);
  console.log(`   Running: ${stats.running}`);
  console.log(`   Active agents: ${stats.agents}`);

  console.log(`\n📝 Task Details:`);
  const allTasks = queue.getAllTasks();
  allTasks.forEach((task, i) => {
    console.log(`\n   Task ${i + 1}: ${task.description}`);
    console.log(`   Status: ${task.status}`);
    if (task.result) {
      console.log(`   Agent: ${task.result.agentId.substring(0, 8)}...`);
    }
  });

  console.log('\n' + '='.repeat(60));
  console.log('Demo Complete');
  console.log('='.repeat(60));
}

// Run the demonstration
main().catch(console.error);
