require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
const GOERLI_PRIVATE_KEY = "e08c241035fe1e0c7760cb6db3723beedd16132edad7c4e5b26a19583987d8ed";
const ALCHEMY_API_KEY = "tPYDeB1MYkYvbDr53103Yg42D2o0dNWc";
module.exports = {
  solidity: "0.8.17",
  networks:{
    goerli:{
      url : `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${GOERLI_PRIVATE_KEY}`],
    }

  },
};


//proj1 : Contract address -> 0xe5A4E9104820C1E17f029dbbbc1fBAE1188E9BDA
