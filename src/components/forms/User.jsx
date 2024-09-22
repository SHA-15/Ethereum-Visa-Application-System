import { Button, FormControl, Input, InputLabel, TextField, Typography } from '@mui/material';

export default function User(props) {
    return (
        <form onSubmit={props.handleSubmit} style={{maxWidth: "600px"}}>
            <Typography>User Profile Form</Typography>
            <TextField 
            fullWidth
            margin="normal"
            label="First Name"
            name="fName" value={props.fName}
            onChange={props.handleInput} required
            />
            <TextField 
            fullWidth
            margin="normal"
            label="Last Name"
            name="lName" value={props.lName}
            onChange={props.handleInput} required
            />
            <TextField 
            fullWidth
            margin="normal"
            label="Email"
            name="email" value={props.email}
            onChange={props.handleInput} required
            />
            <TextField 
            fullWidth
            margin="normal"
            label="Phone Number"
            name="cNumber" value={props.cNumber}
            onChange={props.handleInput} required
            />
            <FormControl fullWidth margin="normal">
                <InputLabel shrink>Profile Image</InputLabel>
                <Input type="file" accept="image/*" onChange={props.handleFile} sx={{ marginTop: "10px"}} />
            </FormControl>
            <Button type="submit" variant="contained" color="primary">Submit</Button>
        </form>
    )
}