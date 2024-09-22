const { ethers } = require("hardhat");

async function users() {
    const UsersFactory = await ethers.getContractFactory("UsersFactory");
    const UsersFactoryContract = await UsersFactory.deploy();
    await UsersFactoryContract.waitForDeployment();

    console.log("Users Factory Contract deployed to:", UsersFactoryContract.target);
}

users().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})