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
              // from: "0x661157A9148F400973517b609d4436DEC9C54C82"
            },
            ropsten: {
              provider: function() {
              },
              network_id: 3,
              gas: 4000000
              // from: "0x661157A9148F400973517b609d4436DEC9C54C82"
            }  
       }
};
