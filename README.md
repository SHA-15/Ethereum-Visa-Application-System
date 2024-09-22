# Ethereum Smart Contracts - Visa Application & Document Verification System
🚀 The application is a decentralized visa application and document verification system aimed at migrating away from paper-centric and centralized visa operations at consular missions across countries.

## 💡 Motivation
Visa applications, particularly for countries in the lower spectrum of the Henley Passport Index, face degrading processes that require extensive collection of documentation that span financial, personl and educational spectrums. These documents are then required to be attested prior to dispersal either in-person or online to the embassy operations for visa processing. For applicants, the continuous deliberation of such activities poses risks to how their personal data is at risk of exposure as they stored in centralized servers for each individual embassy they have applied to. Secondly, they pose a risk in the damage, loss or theft of such critical documents, that may pose a significant impact on their living, working or financial conditions. 

Blockchain technology provides a way for users to control how and what data is transmitted to other entities and also define the actions that other entities can perform with the data provided. Using blockchain as a document storage, document verification and visa application mechanism provides a foundation to achieve complete decentrality in governance-based processes.

## 🔧 Pre-requisites
To be able to run the application on your system, the following items are required:
1. `MetaMask` extension in the web browser - preferrably Google Chrome
2. `NPM` version: `10.8.1`
3. `Node.js` version: `20.16.0`
4. `vite` version: `^5.4.1`
5. `hardhat` version: `^2.22.10`
6. `react` version: `^18.3.1`

These dependencies can also be directly accessed through the `package.json` and `package-lock.json` files within the project directory.

## 👷 Setup & Installation

### Clone the repository

```zsh
git clone https://github.com/SHA-15/Decentralized-Visa-Application-System.git
```

### Install the required Dependencies
```
npm install 
```

## Running the application on the Local Node
To be able to interact with the hardhat local blockchain node and integrate metamask successfully, the following steps are to be taken:

### 1. Running the Hardhat local node

```zsh
npx hardhat clean
```
```zsh
npx hardhat compike
```
```zsh
npx hardhat node
```
### 2. Connecting with Metamask.
To successfully connect with your application, we will utilise the hardhat localhost rpc provider and chainId along with the accounts provided by the hardhat application.

1. Open Metamask extension
2. Go to `settings` > `Networks` > `Add Network`
3. Select the `Add a network manually` option at the bottom of the list of available networks.
4. Insert the following details to use accounts on your metamask
   a. Network Name: `Hardhat`
   b. New RPC URL: `http://127.0.0.1:8545` OR copy the address where npx hardhat node is launched
   c. Chain ID: 31337
   d. Currency Symbol: ETH
5. After confirming all the changes, select switch to Hardhat popup option on MetaMask


### 3. deploying the Agents, Consulates and UsersFactroy.sol contracts
On your terminal, run the following commands in order to deploy the Agents.sol, Consulates.sol and UsersFactory.sol smart contracts on the hardhat node. By convention, out of the 20 accounts provided by the local hardhat node:

1. Accounts 0-6 are connected to the Agents.sol contract
2. Accounts 7-14 are connected to the Consulates.sol contract
3. Account 15-19 are reserved for User interaction (used by you)

This is done to mimic the interaction of uses to the application system as each user will have complete ownership of their own smart contract, and thus their entire application, verification and document management history.

```zsh
npx hardhat run scripts/setupAgents.cjs --network localhost
```
```zsh
npx hardhat run scripts/setupConsulates.cjs --network localhost
```

```zsh
npx hardhat run scripts/setupUsers.cjs --network localhost
```

### 4. Connecting the Users, Agents and Consulates account on the application
To view how each entity interacts in the blockchain, copy the private keys shared when the local hardhat node is spun:
1. Move on to Meta Mask, click on the top dropdown symbol, where "Account" is mentioned and select, "Add Account".
2. Select "Import Account" and copy the private key from the local hardhat node.


### 5. Running the application
Open a new terminal, and run 
```zsh
npm run dev
```
This launches the React + Vite server where the application is setup. The application will prompt you to connect with your metamask wallet with your account on the CURRENT NETWORK SELECTED. (Make Sure Hardhat network is selected)

## 🧰 Troubleshooting
In case if there are issues in running the code, the following steps can be taken to resolve issues with network or application connectivity with Metamask
1. Clear the cache and artifacts data
```zsh
npx hardhat clean
rm -rf cache artifacts
```
This command clears the previous compilation of the contracts and updates to the most recent contract setup. Once done, close all terminal sessions and restart the hardhat node.
2. In case of issues with Metamask accounts
Sometimes when accounts and development servers restart nodes, the cache of Metamask stores transaction data at a higher nonce than the hardhat server that was just restarted. This can be resolved by going to `settings`, `Advanced` > Clear `nonce and activity data`.
3. If the issue still persists, clear the nonce from metamask, delete the network and account and re-insert them to metamask to reset the wallet's cache permanently. 
