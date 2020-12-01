const nodePort = {
  testing: {
    test: 9242,
    test2: 9254,
    test3: 9282,
    test4: 9397,
    // test5: ,
  },
  development: 3080,
};

const NODE_ENV = process.env.NODE_ENV;
const RELEASE_ENV = process.env.RELEASE_ENV;



const isEnvTesting = NODE_ENV === 'testing' || (RELEASE_ENV && RELEASE_ENV.indexOf('test') === 0);

const NODE_PORT = {
  development: nodePort.development,
  testing: isEnvTesting ? nodePort.testing[RELEASE_ENV] : undefined,
};

console.log(NODE_PORT, NODE_ENV, RELEASE_ENV)

module.exports = {
  NODE_PORT,
};
