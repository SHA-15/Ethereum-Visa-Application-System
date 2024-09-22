import { useAppContext } from "../../context/context";
import { useEffect, useState } from "react";
import { ethers } from 'ethers';
import { fetchCountry, fetchVisaType, fetchVisaStatus } from "../../utils/enumerables/enumConversion";
import UsersContract from '../../../artifacts/contracts/Users.sol/Users.json';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

export default function ViewVisas({ handleUserView, userView }) {

    const { provider, signer, uContractAddress } = useAppContext();
    const [visasApplied, setVisasApplied] = useState([]);

    const loadVisas = async () => {
        if (provider && uContractAddress) {
            const uContract = new ethers.Contract(uContractAddress, UsersContract.abi, provider);
            
            const apps = await uContract.retrieveAllApplications();

            const appData = apps.map(app => ({
                userAppId: Number(app.memberApplicationId),
                country: fetchCountry(app.travelDetails.country),
                visaType: fetchVisaType(app.travelDetails.visaType),
                submission: app.submission,
                intendedTravelDate: app.travelDetails.dateOfTravel,
                status: fetchVisaStatus(app.status)
            }));

            setVisasApplied(appData);
        }
    };

    useEffect(() => {
        loadVisas();
    }, [provider, signer, uContractAddress]);

    return (
        <>
            <Typography variant="h3" sx={{ width: "80vw", textAlign: "center", marginX: "auto", marginY: "50px"}} gutterBottom>
                Visa Applications
            </Typography>
            <TableContainer
            component={Paper}
            sx={{
                width: "80vw",
                marginX: "auto",
                marginBottom: "100px"
            }}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Visa Application Id</TableCell>
                            <TableCell>Visa Type</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell>Intended Travel Date</TableCell>
                            <TableCell>Visa Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visasApplied.map((data, i) => {
                            return (
                                <TableRow 
                                key={i}
                                sx={{"&:last-child td, &:last-child th": {border: 0} }}>
                                    <TableCell>{data.userAppId}</TableCell>
                                    <TableCell>{data.visaType}</TableCell>
                                    <TableCell>{data.country}</TableCell>
                                    <TableCell>{data.intendedTravelDate}</TableCell>
                                    <TableCell>{data.status}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}