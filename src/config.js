
const {resolve} = require('path'); const PATH = resolve('.');
const Conf = require('conf');

const config = new Conf({
    cwd: PATH,
    configName: 'config.json',
    fileExtension: '',
});

module.exports = config;
