import { Typography, TextField, MenuItem, Button, Grid2, Box } from '@mui/material';
import { useVisaApplicationForm } from '../../hook/UseVisaApplicationForm';
import { useAppContext } from '../../context/context';
import { consulateKeys } from '../../utils/enumerables/enumConversion';

export default function ApplicationForm() {

    const { accountProfile } = useAppContext();

    const {
        formInfo, consulateArray, handleFormChange, submitApplication
    } = useVisaApplicationForm();

    const handleSubmit = async (event) => {
        event.preventDefault();
        await submitApplication();
    };

    return (
        <Box width="80vw" margin="auto" sx={{ mt: "50px", padding: "20px", backgroundColor: "rgba(0, 0, 0, 0.5)", borderRadius: "25px" }}>
            <form onSubmit={handleSubmit} style={{ margin: "20px" }} id="application-form">
                <Typography variant="h2" textAlign="center" sx={{ marginBottom: "10px" }}>Application Form</Typography>
                <Box sx={{ display: "flex", gap: "20px" }}>
                    {/* Visa Type */}
                    <TextField select label="Visa Type" name="visaType" value={formInfo.visaType} onChange={handleFormChange} fullWidth variant="outlined" margin="normal">
                        <MenuItem value="Tourist">Tourist</MenuItem>
                        <MenuItem value="Business">Business</MenuItem>
                        <MenuItem value="Work">Work</MenuItem>
                        <MenuItem value="Student">Student</MenuItem>
                        <MenuItem value="Transit">Transit</MenuItem>
                    </TextField>
                    {/* Country */}
                    <TextField select label="By Country" name="country" value={formInfo.country} onChange={handleFormChange} fullWidth variant="outlined" margin="normal">
                        {consulateArray.map((consulate, index) => (
                            <MenuItem key={index} value={consulateKeys[index]}>
                                {consulate.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
                {/* Personal Information */}
                <Grid2 container spacing={2}>
                    <Grid2 size={6}>
                        <TextField label="First Name" name="firstName" value={accountProfile.fName} onChange={handleFormChange} fullWidth variant="filled" margin="normal" disabled />
                    </Grid2>
                    <Grid2 size={6}>
                        <TextField label="Last Name" name="lastName" value={accountProfile.lName} onChange={handleFormChange} fullWidth variant="filled" margin="normal" disabled />
                    </Grid2>
                    <Grid2 size={6}>
                        <TextField select label="Sex" name="sex" value={formInfo.sex} onChange={handleFormChange} fullWidth variant="outlined" margin="normal">
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </TextField>
                    </Grid2>
                    <Grid2 size={6}>
                        <TextField label="Date of Birth" name="dob" type="date" value={formInfo.dob} onChange={handleFormChange} fullWidth variant="outlined" margin="normal" slotProps={{ inputLabel: { shrink: true } }} />
                    </Grid2>
                    <Grid2 size={6}>
                        <TextField label="Place of Birth" name="placeOfBirth" value={formInfo.placeOfBirth} onChange={handleFormChange} fullWidth variant="outlined" margin="normal" />
                    </Grid2>
                    <Grid2 size={6}>
                        <TextField label="Nationality" name="nationality" value={formInfo.nationality} onChange={handleFormChange} fullWidth variant="outlined" margin="normal" />
                    </Grid2>
                </Grid2>

                {/* Passport Information */}
                <Grid2 container spacing={2}>
                    <Grid2 size={4}>
                        <TextField label="Passport Number" name="passportNumber" value={formInfo.passportNumber} onChange={handleFormChange} fullWidth variant="outlined" margin="normal" />
                    </Grid2>
                    <Grid2 size={4}>
                        <TextField label="Passport Issue Date" name="passportIssueDate" type="date" value={formInfo.passportIssueDate} onChange={handleFormChange} fullWidth variant="outlined" margin="normal" slotProps={{ inputLabel: { shrink: true } }} />
                    </Grid2>
                    <Grid2 size={4}>
                        <TextField label="Passport Expiry Date" name="passportExpiry" type="date" value={formInfo.passportExpiry} onChange={handleFormChange} fullWidth variant="outlined" margin="normal" slotProps={{ inputLabel: { shrink: true } }} />
                    </Grid2>
                </Grid2>

                {/* Passport Information */}
                <Grid2 container spacing={2}>
                    <Grid2 size={6}>
                        <TextField label="Purpose of Travel" name="travelPurpose"  value={formInfo.travelPurpose} onChange={handleFormChange} fullWidth variant="outlined" margin="normal" />
                    </Grid2>
                    <Grid2 size={6}>
                        <TextField label="Intended Travel Date" name="travelDate" type="date" value={formInfo.travelDate} onChange={handleFormChange} fullWidth variant="outlined" margin="normal" slotProps={{ inputLabel: {shrink: true}}} />
                    </Grid2>
                </Grid2>

                <Grid2 container spacing={2}>
                    <Grid2 size={6}>
                        <TextField label="Contact Number" name="contactNumber" value={accountProfile.cNumber} onChange={handleFormChange} fullWidth variant="filled" margin="normal" disabled />
                    </Grid2>
                    <Grid2 size={6}>
                        <TextField label="Email Address" name="emailAddress" value={accountProfile.email} onChange={handleFormChange} fullWidth variant="filled" margin="normal" disabled /> 
                    </Grid2>
                </Grid2>
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>Submit Application</Button>
            </form>
        </Box>
    );
}
