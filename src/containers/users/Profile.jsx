import { useAppContext } from '../../context/context';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { User } from '../../components/forms';
import { UserProfile } from '../../components/cards';
import { Box, Container, Typography } from '@mui/material';
import UsersContract from '../../../artifacts/contracts/Users.sol/Users.json';
import UsersContractFactory from '../../../artifacts/contracts/UsersFactory.sol/UsersFactory.json';
import pinata from '../../utils/config';

export default function Profile() {

    // access the context variables
    const { provider, signer, connectedAccount, uContractAddress, setUContractAddress, accountProfile, setAccountProfile, editStatus, setEditStatus, uContractFactoryAddress } = useAppContext();

    // state to request the edit of the profile
    const [requestChange, setRequestChange] = useState(false);

    // state to store the profile picture and store the CID preview
    const [file, setFile] = useState(null);
    const [picPreview, setPicPreview] = useState(null);

    useEffect(() => {
        fetchUser();
    },[uContractAddress, provider]);

    useEffect(() => {
        if (accountProfile.imageHash) {
            setPicPreview(`https://ipfs.io/ipfs/${accountProfile.imageHash}`);
        }
    }, [accountProfile.imageHash]);

    // function to fetch the User Profile for the exisintng contract address
    const fetchUser = async () => {
        if (uContractAddress && provider) {
            try {
                const uContract = new ethers.Contract(uContractAddress, UsersContract.abi, provider);
                const pData = await uContract.member();

                console.log("The Accessed Member profile Data", pData);
                setAccountProfile({
                    fName: pData.fName,
                    lName: pData.lName,
                    email: pData.email,
                    cNumber: pData.contactNumber,
                    imageHash: pData.imageHash
                })
            } catch(err) {
                console.error("Unable fetching the user profile from the existing contract", err);
            }
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setAccountProfile({
            ...accountProfile,
            [name]: value
        });
    };

    const handleFile = (e) => {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPicPreview(reader.result);
        }
        reader.readAsDataURL(uploadedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setEditStatus(false);

        try {
            if(typeof window.ethereum !== "undefined") {
                const network = await provider.getNetwork();
                console.log("Network Information", network);

                // default profile Image
                let initialHash = accountProfile.imageHash;
                console.log("Profile Photo on Initialization", initialHash);

                if (file) {
                    const fileData = new FormData();
                    fileData.append("file", file);
                    const upload = await pinata.upload.file(file);
                    console.log("The profile image object being uploaded", upload);
    
                    initialHash = upload.IpfsHash;
    
                    setAccountProfile({...accountProfile, imageHash: initialHash});
                    console.log("The Uploaded picture IPFS Hash", initialHash);
                }

                if (uContractAddress) {
                    const eUContract = new ethers.Contract(uContractAddress, UsersContract.abi, signer);
                    
                    const updateProfileTx = await eUContract.updateMember(
                        accountProfile.fName,
                        accountProfile.lName,
                        accountProfile.email,
                        accountProfile.cNumber,
                        initialHash
                    );

                    const updateProfileTxReceipt = await updateProfileTx.wait();
                    console.log("Profile Update Successfully", updateProfileTxReceipt);
                } else {
                    // as the uContractAddress is empty, we will create a completely new contract
                    const uContractFactory = new ethers.Contract(uContractFactoryAddress, UsersContractFactory.abi, signer);

                    uContractFactory.once("ContractDeployed", (member, contractAddress, event) => {
                        console.log("User Account", member);
                        console.log("Contract Address", contractAddress);
                        if(!uContractAddress) {
                            setUContractAddress(contractAddress);
                        }
                    });

                    const contractInstantiation = await uContractFactory.deployContract(
                        accountProfile.fName,
                        accountProfile.lName,
                        accountProfile.email,
                        accountProfile.cNumber,
                        initialHash,

                    );

                    const instantiatedReceipt = await contractInstantiation.wait();
                    console.log("New Contract Instantiated", instantiatedReceipt);
                }

            }
        } catch(err) {
            console.error("The Contract was not setup and the file was not uploaded", err);
        }
    };

    const handleEdit = () => {
        setEditStatus(true);
        setRequestChange(true);
    }

    return(
        <Container sx={{ marginTop: "30px"}}>
            <Typography variant="h3" sx={{ textAlign: "center"}}>User Profile</Typography>
            <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginY: "25px",
            }}>
                {editStatus && (uContractAddress == null || requestChange) ?
                    <User handleInput={handleInput} handleFile={handleFile} handleSubmit={handleSubmit} fName={accountProfile.fName} lName={accountProfile.lName} email={accountProfile.email} cNumber={accountProfile.cNumber} />
                    :
                    <UserProfile picPreview={picPreview} imageHash={accountProfile.imageHash} fName={accountProfile.fName} lName={accountProfile.lName} email={accountProfile.email} cNumber={accountProfile.cNumber} handleEdit={handleEdit} />
                }
            </Box>
        </Container>
    )

}