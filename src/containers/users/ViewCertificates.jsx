import { useEffect } from 'react';
import { ethers } from 'ethers';
import { useAppContext } from '../../context/context';
import { fetchDocumentType, fetchVerificationStatus } from '../../utils/enumerables/enumConversion';
import { Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import UsersContract from '../../../artifacts/contracts/Users.sol/Users.json';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function ViewCertificates({userView}) {

    const { provider, uContractAddress, allCertificates, setAllCertificates} = useAppContext();


    const fetchCertificates = async () => {
        if (provider) {
            const uContract = new ethers.Contract(uContractAddress, UsersContract.abi, provider);

            const allCerts = await uContract.returnAllCertificates();

            const allCertsMap = allCerts.map((certificate) => {
                return ({
                    name: certificate.name,
                    status: fetchVerificationStatus(certificate.status),
                    cType: fetchDocumentType(certificate.certificateType),
                    cHash: certificate.certificateHash
                });
            });

            setAllCertificates(allCertsMap);
        }
    };

    const certPreview = (certHash) => {
        window.open(`https://ipfs.io/ipfs/${certHash}`, "_blank");
    }

    useEffect(() => {
        fetchCertificates();
    }, [provider, uContractAddress, userView]);

    return(
        <Container sx={{ marginTop: "20px", marginBottom: "100px"}}>
            <Typography variant="h3" sx={{ marginBottom: "50px", textAlign: "center"}} gutterBottom>
                Certificates Repository
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Certificate</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Preview</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {allCertificates.map((certificate, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell>{certificate.name}</TableCell>
                                    <TableCell>{certificate.cType}</TableCell>
                                    <TableCell>{certificate.status}</TableCell>
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => certPreview(certificate.cHash)}>
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
    )
}