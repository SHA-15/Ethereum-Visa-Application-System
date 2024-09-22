import { useRef, useState } from 'react';
import { ethers } from 'ethers';
import { useAppContext } from '../../context/context';
import { enumerateDocumentType, fetchDocumentType } from '../../utils/enumerables/enumConversion';
import { Button, Container, Grid2, MenuItem, TextField, Typography } from '@mui/material';
import UsersContract from '../../../artifacts/contracts/Users.sol/Users.json';
import pinata from '../../utils/config';

export default function StoreCertificates({ handleUserView }) {

    const { provider, signer, uContractAddress} = useAppContext();

    const [certificate, setCertificate] = useState(null);
    const [certName, setCertName] = useState("");
    const [certType, setCertType] = useState(0);

    const certUploadRef = useRef(null);

    const handleCertChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCertName(file.name);
            setCertificate(file);
        }
    }

    const handleCertNameChange = (e) => {
        setCertName(e.target.value);
    }

    const handleTypeSelection = (e) => {
        const typeValue = e.target.value;
        setCertType(enumerateDocumentType(typeValue));
    }

    const handleSubmit = async (e) => {

        const fileData = new FormData();
        fileData.append("file", certificate);
        const upload = await pinata.upload.file(certificate);
        console.log(`Uploaded Document ${certName}: ${upload.IpfsHash}`);

        if(provider && signer) {
            try {
                const uContract = new ethers.Contract(uContractAddress, UsersContract.abi, signer);
                console.log("Contract Address", uContractAddress);
                console.log("Signer", signer);
                console.log("certificate Name", certName);
                console.log("certificate Type:", certType);
                console.log("IPFS", upload.IpfsHash);

                const uploadCertificate = await uContract.addCertificate(certName, certType, upload.IpfsHash);

                await uploadCertificate.wait();

                handleUserView();
            } catch(err) {
                console.error("The Contract was not able to execute the functional call", err);
            }
        }

        setCertificate(null);
        setCertName("");
        setCertType(null);

        if (certUploadRef.current) {
            certUploadRef.current.value = "";
        }

    }

    return(
        <Container sx={{ width: "900px", marginY: "50px"}}>
            <Typography variant="h3" sx={{ textAlign: "center" }}>Upload Certificates</Typography>
            <Grid2 container 
            spacing={2} 
            sx={{
                marginTop: "20px"
            }}>
                <Grid2 size={6}>
                    <TextField
                        label="Certificate Name"
                        fullWidth
                        margin="normal"
                        placeholder="Certificate Name"
                        value={certName}
                        onChange={handleCertNameChange}
                    />

                    <input ref={certUploadRef} type="file" onChange={handleCertChange} />
                </Grid2>
                <Grid2 size={6}>
                    <TextField select label="Certificate Type" name="certificateType" value={fetchDocumentType(certType)} onChange={handleTypeSelection} fullWidth variant="outlined" margin="normal">
                        <MenuItem value="Educational">Educational</MenuItem>
                        <MenuItem value="Financial">Financial</MenuItem>
                        <MenuItem value="Personal">Personal</MenuItem>
                    </TextField>  
                </Grid2>         
            </Grid2>
            <Button variant="contained" color="primary" sx={{ marginTop: "20px", }} onClick={handleSubmit}>
                Upload Certificate
            </Button>
        </Container>
    )
}