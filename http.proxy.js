module.exports = [
  {
    context: [
      '/api/Authors',
      'graphql'
    ],
    target:'http://localhost:5002',
    logLevel: 'debug',
    secure: false
  }
];
