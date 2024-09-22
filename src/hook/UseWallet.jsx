import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import UsersFactoryContract from '../../artifacts/contracts/UsersFactory.sol/UsersFactory.json';
import { useAppContext } from '../context/context';

// Custom hook to manage MetaMask wallet connection
export const useWallet = () => {
    const { setSigner, setProvider, setEditStatus, setAccountProfile, connectedAccount, setConnectedAccount, setUContractAddress, accountFunds, setAccountFunds, uContractFactoryAddress } = useAppContext();

    const [blockNumber, setBlockNumber] = useState(null);

    // Function to check if the user's contract exists in UsersFactory
    const checkUserContract = async (provider, accAddress) => {
        try {
            const contractFactory = new ethers.Contract(uContractFactoryAddress, UsersFactoryContract.abi, provider);
            const userContract = await contractFactory.retrieveUserContract(accAddress);

            if (userContract !== ethers.ZeroAddress) {
                setUContractAddress(userContract);
                setEditStatus(false);
            } else {
                setUContractAddress(null);
                setEditStatus(true);
            }
        } catch (error) {
            console.error("Error finding user contract in Users Factory", error);
        }
    };

    // Function to connect to MetaMask
    const connectToMetaMask = async () => {
        if (typeof window.ethereum !== "undefined") {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                setProvider(provider);

                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                const accAddress = await signer.getAddress();
                setSigner(signer);
                setConnectedAccount(accAddress);

                const latestBlock = await provider.getBlockNumber();
                setBlockNumber(latestBlock);

                const balance = await provider.getBalance(accAddress, latestBlock);
                const formattedBalance = ethers.formatEther(balance);
                setAccountFunds(formattedBalance);

                await checkUserContract(provider, accAddress);

            } catch (err) {
                console.error("Unable to Connect to Metamask", err);
            }
        } else {
            console.log("Please install MetaMask to continue");
        }
    };

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", async (accounts) => {
                const accountAddress = accounts[0];
                setConnectedAccount(accountAddress);

                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                setSigner(signer);

                const latestBlock = await provider.getBlockNumber();
                const balance = await provider.getBalance(accountAddress, latestBlock);
                const formattedBalance = ethers.formatEther(balance);
                setAccountFunds(formattedBalance);

                await checkUserContract(provider, accountAddress);

                setAccountProfile({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    profilePhoto: ''
                });
            });
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener("accountsChanged", () => { });
            }
        };
    }, []);

    return { accountFunds, connectedAccount, blockNumber, connectToMetaMask };
};
