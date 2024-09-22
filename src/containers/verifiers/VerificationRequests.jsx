import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { fetchVerificationStatus, fetchDocumentType, enumerateVerificationStatus } from '../../utils/enumerables/enumConversion';
import { useAppContext } from '../../context/context';
import { Container, IconButton, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import VerifiersContract from '../../../artifacts/contracts/Agents.sol/Agents.json';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function VerificationRequests({ handleCertificateFetch, certificateRefresh }) {

    // Attaining the Provider and Signer Objects from the Context
    const { provider, signer, vContractAddress } = useAppContext();

    // useStates variables to store documents sent to verifiers
    const [receivedCertificateDetails, setReceivedCertificateDetails] = useState([]);

    // useEffect to force verification requests view upon mount and context
    useEffect(() => {
        fetchCertificates();
    }, [provider, signer, certificateRefresh]);

    const fetchCertificates = async () => {

        if (provider) {
            // Access the Agents.sol Contract and the agent to access the received documents
            const vContract = new ethers.Contract(vContractAddress, VerifiersContract.abi, provider);
            const agent = await signer.getAddress();

            const certificates = await vContract.retrieveDocumentsFromVerifier(agent);

            // Map the certificates received to save in the useState variable array
            const certificatesMap = certificates.map(
                (certificate) => {
                    return ({
                        name: certificate.name,
                        status: fetchVerificationStatus(certificate.status),
                        certificateType: fetchDocumentType(certificate.certificateType),
                        certificateHash: certificate.certificateHash,
                        user: certificate.userContractAddress
                    });
                }
            );

            console.log("Certificates Mapped and Set in UseState, Test Result:", certificatesMap[0]);
            setReceivedCertificateDetails(certificatesMap);

        }
    }

    // Call the function to change status of received certificates
    const handleStatus = async (e, i) => {
        const certificate = receivedCertificateDetails[i];
        const status = enumerateVerificationStatus(e.target.value);
        console.log("certificate", certificate);
        const {name, certificateHash, user} = certificate;

        console.log("Here are the certificate details:", name, status, certificateHash, user);

        try {
            const vContractExecute = new ethers.Contract(vContractAddress, VerifiersContract.abi, signer);
            const verification = await vContractExecute.verifyCertificate(user, name, certificateHash, status);
            await verification.wait();

            handleCertificateFetch();

        } catch (err) {
            console.error("There was an issue in executing the Agents.sol verifyDocument function");
        }
    };

    const certificatePreview = (ipfsHash) => {
        window.open(`https://ipfs.io/ipfs/${ipfsHash}`, "_blank");
    }

    return (
        <>
            <Container
                sx={{
                    marginTop: "20px"
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        marginY: "50px",
                        textAlign: "center"
                    }}
                >
                    Verification Requests
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontSize: "1.2rem" }} >Certificate</TableCell>
                                <TableCell sx={{ fontSize: "1.2rem" }} >User</TableCell>
                                <TableCell sx={{ fontSize: "1.2rem" }} >Type</TableCell>
                                <TableCell sx={{ fontSize: "1.2rem" }} >Status</TableCell>
                                <TableCell sx={{ fontSize: "1.2rem" }} >Preview</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {receivedCertificateDetails.map((cert, i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell>{cert.name}</TableCell>
                                        <TableCell>{cert.user}</TableCell>
                                        <TableCell>{cert.certificateType}</TableCell>
                                        <TableCell>
                                            {(cert.status === "Processing" || cert.status === "Unverified") ?
                                                <Select
                                                    value={cert.status}
                                                    onChange={
                                                        (e) => handleStatus(e, i)
                                                    }>
                                                    <MenuItem value="Processing" disabled>Processing</MenuItem>
                                                    <MenuItem value="Verified">Verified</MenuItem>
                                                    <MenuItem value="Rejected">Rejected</MenuItem>
                                                </Select>
                                                :
                                                <Typography>{cert.status}</Typography>
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                color="primary"
                                                onClick={() => certificatePreview(cert.certificateHash)}>
                                                <VisibilityIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    )

}