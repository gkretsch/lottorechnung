const { Client, logger } = require('camunda-external-task-client-js');

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
//  - 'asyncResponseTimeout': long polling timeout (then a new request will be issued)
const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger, asyncResponseTimeout: 10000 };

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'charge-card'
client.subscribe('rechnung', async function({ task, taskService }) {
  // Put your business logic here

  // Get a process variable
  const x = task.variables.get('Kreditorennummer');
  const y = task.variables.get('Rechnungsdatum');

  console.log(`Rechnung vom ${y} für Kreditor: ${x} wird gebucht`);

  // Complete the task
  await taskService.complete(task);
});
