const { read, save } = require('../lib/kv');

/**
 * logic to add workers
 */
async function addKv(keyName, subject) {
  await save(keyName, subject);
  return subject;
}


/**
 * logic to get workers
 */
async function getKv(keyName) {
  let workers = await read(keyName);
  if (!workers) {
    workers = 0;
  }
  return workers;
}

module.exports = {
  addKv,
  getKv,
};
