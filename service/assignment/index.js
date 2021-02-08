const { connect } = require('./lib/orm');
const kv = require('./lib/kv');
const nats = require('./lib/nats');
// const { TaskSchema } = require('./tasks/task.model');
const { WorkerSchema } = require('./worker/worker.model');
const { TaskSchema } = require('./task/task.model');
const { initServer, stop } = require('./server');

/**
 * intiate database and other stroage dependency
 */
async function init() {
  try {
    console.log('connect to KV service...');
    await kv.connect();
    console.log('KV connected');
    console.log('connect to orm....');
    await connect([WorkerSchema, TaskSchema], {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345',
      database: 'dubnium',
    });
    console.log('database connected');
    console.log('connect to nats...');
    await nats.connect();
    console.log('nats connected');
  } catch (err) {
    console.error('database connection failed');
    return;
  }
}

/**
 * main routine
 */
async function main() {
  await init();
  initServer();
}

main();
