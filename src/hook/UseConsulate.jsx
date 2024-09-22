import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import ConsulatesContract from '../../artifacts/contracts/Consulates.sol/Consulates.json';
import { useAppContext } from '../context/context';
import { consulateKeys } from '../utils/enumerables/enumConversion';

// Custom hook for loading consulates
export const useConsulate = () => {
    const { provider, cContractAddress } = useAppContext(); // Get provider from the context

    const [consulateArray, setConsulateArray] = useState([]);
    const [consulateToAddresses, setConsulateToAddresses] = useState({});

    // Function to retrieve all consulates from the contract
    const loadConsulates = async () => {
        try {
            const contract = new ethers.Contract(cContractAddress, ConsulatesContract.abi, provider);

            console.log("connected to Consulates contract");
            const registeredConsulates = await contract.retrieveAllEmbassies();

            console.log(registeredConsulates);

            const formattedConsulates = registeredConsulates.map(consulate => ({
                address: consulate.account,
                name: consulate.embassyName,
                location: consulate.embassyAddress,
                contactNumber: consulate.embassyNumber,
                email: consulate.embassyEmail,
            }));

            setConsulateArray(formattedConsulates);

            for (let i = 0; i < consulateKeys.length; i++) {
                setConsulateToAddresses(constAddress => ({
                    ...constAddress, [consulateKeys[i]]: formattedConsulates[i].address
                }))
            }

        } catch (error) {
            console.error("Error loading consulates:", error);
        }
    };

    useEffect(() => {
        loadConsulates();
    }, [provider, cContractAddress]);

    return { consulateArray, loadConsulates, consulateToAddresses };
};
