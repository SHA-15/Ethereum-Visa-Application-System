import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/context';
import { ethers } from 'ethers';
import { enumerateDocumentType } from '../../utils/enumerables/enumConversion';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import AgentsContract from '../../../artifacts/contracts/Agents.sol/Agents.json';
import './RequestVerification.css';


export default function RequestVerification() {

    const {provider, signer, ownerAddress, allCertificates, setAllCertificates, uContractAddress, vContractAddress} = useAppContext();

    const [chosenCerts, setChosenCerts] = useState([]);
    const [verifierArray, setVerifierArray] = useState([]);
    const [chosenVerifier, setChosenVerifier] = useState(null);
    
    useEffect(() => {
        loadVerifiers();
    }, []);

    const loadVerifiers = async () => {
        const aContract = new ethers.Contract(vContractAddress, AgentsContract.abi, provider);

        const agents = await aContract.retrieveAllAgents();

        const agentsArray = agents.map(verifier => ({
            fName: verifier.fName,
            lName: verifier.lName,
            imageHash: verifier.imageHash,
            agentFee: ethers.formatEther(verifier.agentFee) + " ETH",
            account: verifier.agent
        }));

        setVerifierArray(agentsArray);
    }

    const handleVerifierChoice = async (verifier) => {
        setChosenVerifier(verifier);
        const el = document.getElementById("verify-certificate");

        if (el) {
            el.scrollIntoView({behavior: "smooth"});
        }
    }

    const handleCertSelection = (e) => {
        for (let certificate of allCertificates) {
            if(certificate.name == e.target.value) {
                setChosenCerts(certificate);
            }
        }
    }
    
    const handleSubmit = async () => {
        const aContract = new ethers.Contract(vContractAddress, AgentsContract.abi, signer);
        
        console.log("chosen Address", chosenVerifier.account);
        console.log("chosen Doc Details: ", chosenCerts.name, chosenCerts.cHash);
        console.log("The User", uContractAddress);

        const submitCert = await aContract.receiveDocuments(
            chosenVerifier.account,
            chosenCerts.name,
            chosenCerts.cHash,
            enumerateDocumentType(chosenCerts.cType),
            uContractAddress
        );

        const submissionReceipt = await submitCert.wait();
        console.log("Document Submitted for Verification!", submissionReceipt);

        setAllCertificates(c => c.filter(cert => cert.name !== chosenCerts.name));

        setChosenCerts({});
    }

    return(
        <Box
        sx= {{
            marginTop: "80px",
            padding: 0
        }}>
            <Typography variant="h2" sx={{ textAlign: "center"}}>Choose a Verifier</Typography>
            <div className="main-grid">
                {verifierArray.map((ver, i) => (
                    <div className="card" key={i} onClick={() => handleVerifierChoice(ver)}>
                        <img className="veri-image" src={`https://ipfs.io/ipfs/${ver.imageHash}`} alt="Profile Image"/>
                        <Typography variant="h4">{ver.fName} {ver.lName}</Typography>
                        <p className="veri-address">{ver.account}</p>
                        <p className="veri-fee">{ver.agentFee}</p>
                    </div>
                ))}
            </div>

            {chosenVerifier && (
                <div className="form-section" id="verify-certificate">
                    <Typography variant="h4" sx={{ textAlign: "center"}}>Submit Certificates To: {chosenVerifier.fName} {chosenVerifier.lName}</Typography>
                    <FormControl fullWidth>
                        <InputLabel margin="dense" variant="filled">Select Certificate</InputLabel>
                        <Select value={chosenCerts.name || ""} onChange={handleCertSelection}>
                            {allCertificates.map((cer, i) => (
                                <MenuItem key={i} value={cer.name}>{cer.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" sx={{ width: "50%", margin: "auto" }} onClick={handleSubmit}>
                        Submit For Verification
                    </Button>
                </div>
            )}
        </Box>
    )
}