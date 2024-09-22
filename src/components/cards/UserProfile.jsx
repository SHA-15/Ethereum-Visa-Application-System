import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";


export default function UserProfile(props) {

    return(
        <Card
        sx={{
            width: 700,
            display: "flex",
            borderRadius: "25px",
            padding: 2,
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
        }}
        >
            <CardMedia
            component="img"
            sx={{
                width: 240,
                height: 240,
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: 3
            }}
            image={props.picPreview || `https://ipfs.io/ipfs/${props.imageHash}`}
            alt="Profile Photo"
            />
            <Box
            sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <CardContent
                sx={{ 
                    flexGrow: 1,
                    textAlign: "left"
                }}>
                    <Typography variant="h4" component="div" gutterBottom>{props.fName} {props.lName}</Typography>
                    <Typography variant="h6">Email: {props.email}</Typography>
                    <Typography variant="h6" marginBottom={2}>Phone Number: {props.cNumber}</Typography>
                    <Button variant="contained" color="primary" onClick={props.handleEdit} sx={{ marginTop: "auto"}}>
                        Edit
                    </Button>
                </CardContent>
            </Box>
        </Card>
    )
}