import { useState } from 'react';
import { ethers } from 'ethers';
import UsersContract from '../../artifacts/contracts/Users.sol/Users.json';
import { useAppContext } from '../context/context';
import { useConsulate } from './UseConsulate';
import { consulateKeys, enumerateSex, enumerateCountry, enumerateVisaType } from '../utils/enumerables/enumConversion';


export const useVisaApplicationForm = () => {
    const { signer, uContractAddress, cContractAddress } = useAppContext();

    // Use the useConsulates hook to get consulate data
    const { consulateArray, consulateToAddresses } = useConsulate();
    
    const [formInfo, setFormInfo] = useState({
        visaType: '',
        country: '',
        firstName: '',
        lastName: '',
        sex: '',
        dob: '',
        placeOfBirth: '',
        nationality: '',
        passportNumber: '',
        passportIssueDate: '',
        passportExpiry: '',
        travelPurpose: '',
        travelDate: '',
        contactNumber: '',
        emailAddress: ''
    });

    // Handle form input changes
    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormInfo((prevData) => ({
            ...prevData, [name]: value
        }));
    };

    // Submit the form to the user contract
    const submitApplication = async () => {
        const contract = new ethers.Contract(uContractAddress, UsersContract.abi, signer);
        const createApplicationTx = await contract.createApplication();
        await createApplicationTx.wait();

        const applicationCountVar = await contract.appCount();

        const personalInfoTx = await contract.addPersonDetails(
            applicationCountVar,
            enumerateSex(formInfo.sex),
            formInfo.dob,
            formInfo.placeOfBirth,
            formInfo.nationality
        );
        await personalInfoTx.wait();

        const passportInfoTx = await contract.addPassportDetails(
            applicationCountVar,
            formInfo.passportNumber,
            formInfo.passportIssueDate,
            formInfo.passportExpiry
        );
        await passportInfoTx.wait();

        const travelInfoTx = await contract.addTravelDetails(
            applicationCountVar,
            enumerateCountry(formInfo.country),
            enumerateVisaType(formInfo.visaType),
            formInfo.travelPurpose,
            formInfo.travelDate
        );
        await travelInfoTx.wait();

        const consulateAddress = consulateToAddresses[formInfo.country];
        const submitApplicationTx = await contract.applicationSubmission(
            applicationCountVar,
            consulateAddress,
            cContractAddress
        );
        await submitApplicationTx.wait();

        return applicationCountVar;
    };

    return {
        formInfo,
        consulateArray, // Return consulate data for the form to render
        handleFormChange,
        submitApplication
    };
};
