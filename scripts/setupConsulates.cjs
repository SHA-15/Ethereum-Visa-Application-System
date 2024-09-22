const { ethers } = require("hardhat");

async function consulates() {
    const signers = await ethers.getSigners();

    const embassies = [
        {name: "USA", location: "Suite 600 22569 Lorie Burg, Luettgenfort, NJ 03529", number: "1-213-329-7332", email: "queries@embassy.us"},
        {name: "Australia", location: "894 Rohan Island, Port Iraville, WA 96998-8111", number: "341.752.2062 x683", email: "queries@embassy.au"},
        {name: "New Zealand", location: "600 First St., Christchurch, CH 77888", number: "527.358.4683", email: "queries@embassy.nz"},
        {name: "Belgium", location: "Stiphoutlaan 527, Oost Begemanngeest, UT 9217 UX", number: "1-213-329-7332", email: "queries@embassy.us"},
        {name: "UAE", location: "7th Al-Hambra Street, Palm Jumeirah, PJ 554276", number: "0800-559733-2", email: "queries@embassy.ae"},
        {name: "United Kingdom", location: "73 Seely Street, Tooting, SW17 8QF", number: "0800-7711001", email: "queries@embassy.ac.uk"},
        {name: "Spain", location: "Salida Santiago Alcala, 11 Esc. 934, Alcorcón, Cat 23165", number: "0800-542-7722", email: "queries@embassy.esp"},
        {name: "France", location: "Apt. 266, 55 Avenue De la Cote des Amandiers, 50217 Saint-Quentin", number: "0800-998855-1", email: "queries@embassy.fr"}
    ]

    const Embassy = await ethers.getContractFactory("Consulates");
    const embassyContract = await Embassy.deploy();
    await embassyContract.waitForDeployment();
    console.log(`Embassy Smart Contract deployed to: ${embassyContract.target}`);

    for (let id = 0; id < embassies.length; id++) {
        const emb = embassies[id];
        const signer = signers[id + 7];

        const transaction = await embassyContract.connect(signer).setupEmbassy(emb.name, emb.location, emb.number, emb.email);
        await transaction.wait();
        console.log(`${emb.name} Embassy created, location: ${emb.location}, email: ${emb.email}`);
    }
}

consulates().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})