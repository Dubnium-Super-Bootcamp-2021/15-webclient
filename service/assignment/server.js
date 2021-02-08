const { createServer } = require('http');
const url = require('url');
const { stdout } = require('process');
const {
  listService,
  registerService,
  removeService,
} = require('./worker/worker.service');
const {
  registerTaskService,
//   getTaskService,
//   upTaskService,
//   softDeleteTaskService
} = require('./task/task.service');
// const {
  // storeTaskService,
  // getTaskService,
  // upTaskService,
  // softDeleteTaskService
// } = require('./peformance/peformance.service');
// const { init } = require('../database/typeorm/main');
// const { getConnection } = require('typeorm');

function initServer () {
  const server = createServer((req, res) => {
    let method = req.method;
    // route service
    let message = 'tidak ditemukan data';
    let statusCode = 200;
    const uri = url.parse(req.url, true);

    const respond = () => {
      res.statusCode = statusCode;
      res.write(message);
      res.end();
    };

    switch (true) {
      case uri.pathname === '/store':
        if (method === 'POST') {
          registerService(req, res);
        } else {
          message = 'Method tidak tersedia';
          respond();
        }
        break;
      case uri.pathname === '/getallworker':
        if (method === 'GET') {
          listService(req, res);
        } else {
          message = 'Method tidak tersedia';
          respond();
        }
        break;
      case uri.pathname === '/find':
        if (method === 'GET') {
          // getWorkerByIdService(req, res);
        } else {
          message = 'Method tidak tersedia';
          respond();
        }
        break;
      case uri.pathname === '/del':
        if (method === 'DELETE') {
          removeService(req, res);
        } else {
          message = 'Method tidak tersedia';
          respond();
        }
        break;
      case uri.pathname === '/task':
        if (method === 'POST') {
          registerTaskService(req, res);
        } else {
          message = 'Method tidak tersedia';
          respond();
        }
        break;
      case uri.pathname === '/getalltask':
        if (method === 'GET') {
          // getTaskService(req, res);
        } else {
          message = 'Method tidak tersedia';
          respond();
        }
        break;
      case uri.pathname === '/updatetask':
        if (method === 'PUT') {
          // upTaskService(req, res);
        } else {
          message = 'Method tidak tersedia';
          respond();
        }
        break;
      case uri.pathname === '/deletetask':
        if (method === 'DELETE') {
          // softDeleteTaskService(req, res);
        } else {
          message = 'Method tidak tersedia';
          respond();
        }
        break;
      default:
        statusCode = 404;
        respond();
    }
  });

  const PORT = 9999;
  server.listen(PORT, () => {
    stdout.write(`server listening on port ${PORT}\n`);
  });
}

function stop() {
  if (server) {
    server.close();
  }
}

module.exports = {
  initServer,
  stop,
};
