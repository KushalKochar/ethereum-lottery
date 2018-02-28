const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
    networks: {
         development: {
              // host: "localhost",
              // port: 9545,
              // network_id: "*" // Match any network id
              provider: function() {
              },
              network_id: 3,
              gas: 4000000
            },
            ropsten: {
              provider: function() {
              },
              network_id: 3,
              gas: 4000000
            }  
       }
};
