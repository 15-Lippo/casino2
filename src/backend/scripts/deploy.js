async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  
  const Lisprocoin = await ethers.getContractFactory("Lisprocoin");
  const lisprocoin = await Lisprocoin.deploy()

  // Save copies of each contracts abi and address to the frontend.
  saveFrontendFiles(lisprocoin, "Lisprocoin");
}

function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../backend/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}
npx hardhat run src/backend/scripts/deploy.js --network polygon

Deploying contracts with the account: https://bscscan.com/token/0xe62a9bc6ede534e18dd2793dcaf5a2b6df112180
Account balance: 19999999999999999999999999999999999999999999999999999999000
Token address: 0xE62A9bc6eDe534E18Dd2793Dcaf5A2B6df112180
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
