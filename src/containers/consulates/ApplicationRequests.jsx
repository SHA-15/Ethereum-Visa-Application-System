import { useAppContext } from '../../context/context';
import { fetchCountry, fetchSex, fetchVisaType, fetchVisaStatus } from '../../utils/enumerables/enumConversion';
import { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, Container, Grid2, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ConsulatesContract from '../../../artifacts/contracts/Consulates.sol/Consulates.json';
import { ethers } from 'ethers';

export default function ApplicationRequests({ handleVisaView, visaRefresh }) {

    // The Context variables
    const { provider, signer, connectedAccount, cContractAddress } = useAppContext();

    // visa Applications state variable
    const [receivedVisaApplications, setReceivedVisaApplications] = useState([]);

    useEffect(() => {
        loadVisaApplications();
    }, [provider, signer, visaRefresh]);

    // function to display all the applications
    const loadVisaApplications = async () => {
        if (provider) {
            const cContract = new ethers.Contract(cContractAddress, ConsulatesContract.abi, provider);
            const visaApps = await cContract.retrieveAllApplications(connectedAccount);
            console.log("The Visa Apps", visaApps);
            const visaAppsMap = visaApps.map((app) => {
                return {
                    user: app[0],
                    userAppId: app[1],
                    personalDetails: {
                        fName: app[2][0],
                        lName: app[2][1],
                        email: app[2][2],
                        contactNumber: app[2][3],
                        imageHash: app[2][4],
                        sex: fetchSex(app[3][0]),
                        dob: app[3][1],
                        placeOfBirth: app[3][2],
                        citizenship: app[3][3]
                    },
                    passportDetails:{
                        passportNum: app[4][0],
                        passportIssue: app[4][1],
                        passportExpiry: app[4][2],
                    },
                    travelDetails: {
                        country: fetchCountry(app[5][0]),
                        visaType: fetchVisaType(app[5][1]),
                        travelPurpose: app[5][2],
                        dateOfTravel: app[5][3]
                    },
                    visaStatus: fetchVisaStatus(app[6]),
                    submission: app[7],
                    certificateNames: app[9],
                    certificateHashes: app[10] 
                }
            });

            console.log("Visa Applications received, produced results:", visaAppsMap[0]);

            setReceivedVisaApplications(visaAppsMap);
        } else {

            console.log("The Provider was not captured, due to which the function was not called");
        } 
    } 

    const handleStatus = async (appId, nStatus, uContractAddress) => {
        if (signer) {
            const cContract = new ethers.Contract(cContractAddress, ConsulatesContract.abi, signer);

            console.log(connectedAccount);
            console.log(appId);
            console.log(nStatus);

            const reviewApp = await cContract.updateAppStatus(connectedAccount, appId, nStatus, uContractAddress);
            await reviewApp.wait();

            console.log(`Application Status Updated for: ${appId}`);

            handleVisaView();
        } else {
            console.log("signer was not fetched for the status update");
        }
    }

    const certificatePreview = (certHash) => {
        window.open(`https://ipfs.io/ipfs/${certHash}`, "_blank");
    }

    return(
        <>
            <Typography 
            variant="h2"
            sx={{
                textAlign: "center",
                marginY: "50px"
            }}>
                Applications
            </Typography>

            <Grid2
            container
            spacing={2}
            sx={{
                minHeight: "100px",
                width: "90vw",
                marginX: "auto"
            }}>
                {receivedVisaApplications.map((app, i) => (
                    <Grid2 size={6} key={i}>
                        <Accordion sx={{ marginBottom: "100px" }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Grid2
                                container
                                direction="column"
                                spacing={2}>
                                    <Grid2 size={6}>
                                        <strong>Applicant: {app.user}</strong>
                                    </Grid2>
                                    <Grid2 size={3}>
                                        <strong>Visa Type: {app.travelDetails.visaType}</strong>
                                    </Grid2>
                                    <Grid2 size={3}>
                                        <strong>Status: {app.visaStatus}</strong>
                                    </Grid2>
                                </Grid2>
                            </AccordionSummary>

                            <AccordionDetails>
                                <TableContainer
                                container={Paper}
                                sx={{overflow: "hidden"}}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Field</TableCell>
                                                <TableCell>Details</TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            <TableRow>
                                                <TableCell>Personal Details</TableCell>
                                                <TableCell>
                                                    Name: {app.personalDetails.fName} {app.personalDetails.lName}<br />
                                                    Contact: {app.personalDetails.contactNumber}<br />
                                                    Email: {app.personalDetails.email}<br />
                                                    Sex: {app.personalDetails.sex}<br />
                                                    Date of Birth: {app.personalDetails.dob}<br />
                                                    Place of Birth: {app.personalDetails.placeOfBirth}<br />
                                                    Nationality: {app.personalDetails.citizenship}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Passport Details</TableCell>
                                                <TableCell>
                                                    Passport Number: {app.passportDetails.passportNum}<br />
                                                    Passport Issue Date: {app.passportDetails.passportIssue}<br />
                                                    Passport Expiry Date: {app.passportDetails.passportExpiry}<br />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Travel Details</TableCell>
                                                <TableCell>
                                                    Destination Country: {app.travelDetails.country}<br />
                                                    Visa Type: {app.travelDetails.visaType}<br />
                                                    Purpose of Travel: {app.travelDetails.travelPurpose}<br />
                                                    Date of Travel: {app.travelDetails.dateOfTravel}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Visa Status</TableCell>
                                                <TableCell>
                                                    {app.visaStatus}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell sx={{fontSize: "1.1rem"}}>Supporting Documents</TableCell>
                                                {app.certificateNames.map((certName, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>
                                                            <IconButton color="primary" onClick={() => certificatePreview(app.certificateHashes[index])}>
                                                                <VisibilityIcon />
                                                            </IconButton>
                                                        </TableCell>
                                                        <TableCell>
                                                            {certName}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                {app.visaStatus === "Submitted" && (
                                    <>
                                        <Button variant="contained" color="primary" onClick={() => handleStatus(app.userAppId, 2, app.user)} sx={{ marginTop: "20px"}}>
                                            Accept Application
                                        </Button>
                                        <Button variant="outlined" color="primary" onClick={() => handleStatus(app.userAppId, 3, app.user)} sx={{ marginTop: "20px", marginLeft: "20px"}}>
                                            Reject Application
                                        </Button>
                                    </>
                                )}
                            </AccordionDetails>
                        </Accordion>
                    </Grid2>
                ))}
            </Grid2>
        </>
    )
}