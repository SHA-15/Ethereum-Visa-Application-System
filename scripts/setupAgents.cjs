const { ethers } = require("hardhat");

async function agents() {

    const signers = await ethers.getSigners();

    const verifiers = [
        {fName: "Justin", lName: "Andrews", ipfsHash: "QmZD4ZQUPocPBiF24epXEvZeHHmwLutNyJx8QZeKBUnCTH", agentFee: ethers.parseEther("0.005")},
        {fName: "Athello", lName: "Michaels", ipfsHash: "QmZD4ZQUPocPBiF24epXEvZeHHmwLutNyJx8QZeKBUnCTH", agentFee: ethers.parseEther("0.006")},
        {fName: "Broderick", lName: "McManaman", ipfsHash: "QmZD4ZQUPocPBiF24epXEvZeHHmwLutNyJx8QZeKBUnCTH", agentFee: ethers.parseEther("0.007")},
        {fName: "Alexander", lName: "Patricks", ipfsHash: "QmZD4ZQUPocPBiF24epXEvZeHHmwLutNyJx8QZeKBUnCTH", agentFee: ethers.parseEther("0.005")},
        {fName: "Olajuwan", lName: "Karim", ipfsHash: "QmZD4ZQUPocPBiF24epXEvZeHHmwLutNyJx8QZeKBUnCTH", agentFee: ethers.parseEther("0.006")},
        {fName: "Arthur", lName: "Jeffries", ipfsHash: "QmZD4ZQUPocPBiF24epXEvZeHHmwLutNyJx8QZeKBUnCTH", agentFee: ethers.parseEther("0.008")}
    ];

    const Verifiers = await ethers.getContractFactory("Agents");
    const verifiersContract = await Verifiers.deploy();
    await verifiersContract.waitForDeployment();
    console.log("Agents Contract deployed to:", verifiersContract.target);

    for (let id = 0; id < verifiers.length; id++) {
        const agent = verifiers[id];
        const signer = signers[id+1];

        const transaction = await verifiersContract.connect(signer).addVerificationAgent(agent.fName, agent.lName, agent.ipfsHash, agent.agentFee);
        await transaction.wait();
        console.log(`${id+1}. ${agent.fName} ${agent.lName}`);
    }
}

agents().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});