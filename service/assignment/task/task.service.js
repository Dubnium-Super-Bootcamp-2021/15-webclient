const Busboy = require('busboy');
const url = require('url');
const { Writable } = require('stream');
const {
  registerTask,
  doneTask,
  cancelTask,
  listTask,
  ERROR_REGISTER_TASK_INVALID,
  ERROR_TASK_NOT_FOUND,
} = require('./task');
const { publisher } = require('../lib/nats');
const { storeObject } = require('../lib/objectStorage');
// eslint-disable-next-line no-unused-vars

/**
 * service to register new worker
 */
function registerTaskService(req, res) {
  const busboy = new Busboy({ headers: req.headers });

  const data = {
    job: '',
    attachment: '',
    assignee: '',
  };

  function abort() {
    req.unpipe(busboy);
    if (!req.aborted) {
      res.statusCode = 413;
      res.end();
    }
  }

  busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
    switch (fieldname) {
      case 'attachment':
        file.on('error', abort);
        const attachment = storeObject('attachment', file, mimetype);
        data.attachment = attachment;
        break;
      default: {
        const noop = new Writable({
          write(chunk, encding, callback) {
            setImmediate(callback);
          },
        });
        file.pipe(noop);
      }
    }
  });

  busboy.on('field', (fieldname, val) => {
    if (['job', 'attachment', 'assignee'].includes(fieldname)) {
      data[fieldname] = val;
    }
  });

  busboy.on('finish', async () => {
    const task = await registerTask(data);
    res.setHeader('content-type', 'application/json');
    const message = JSON.stringify(task);
    res.write(message);
    res.end();

    publisher('task.added', 'task');
  });

  req.on('aborted', abort);
  busboy.on('error', abort);

  req.pipe(busboy);
}

/**
 * service to get list of workers
 */
async function listTaskService(req, res) {
  try {
    const task = await listTask();
    res.setHeader('content-type', 'application/json');
    const message = JSON.stringify(task);
    res.write(message);
    res.end();
  } catch (err) {
    res.statusCode = 500;
    res.end();
    return;
  }
}

/**
 * service to remove a worker by it's id
 */
async function doneTaskService(req, res) {
  const uri = url.parse(req.url, true);
  const id = uri.query['id'];
  if (!id) {
    res.statusCode = 401;
    res.write('parameter id tidak ditemukan');
    res.end();
    return;
  }
  try {
    const task = await doneTask(id);
    res.setHeader('content-type', 'application/json');
    res.statusCode = 200;
    publisher('task.done', 'done');
    const message = JSON.stringify(task);
    res.write(message);
    res.end();
  } catch (err) {
    if (err === ERROR_TASK_NOT_FOUND) {
      res.statusCode = 404;
      res.write(err);
      res.end();
      return;
    }
    res.statusCode = 500;
    res.end();
    return;
  }
}
async function cancelTaskService(req, res) {
  const uri = url.parse(req.url, true);
  const id = uri.query['id'];
  if (!id) {
    res.statusCode = 401;
    res.write('parameter id tidak ditemukan');
    res.end();
    return;
  }
  try {
    const task = await cancelTask(id);
    res.setHeader('content-type', 'application/json');
    res.statusCode = 200;
    const message = JSON.stringify(task);
    publisher('task.cancel', 'cancel');
    res.write(message);
    res.end();
  } catch (err) {
    if (err === ERROR_TASK_NOT_FOUND) {
      res.statusCode = 404;
      res.write(err);
      res.end();
      return;
    }
    res.statusCode = 500;
    res.end();
    return;
  }
}
module.exports = {
  listTaskService,
  registerTaskService,
  doneTaskService,
  cancelTaskService,
};
