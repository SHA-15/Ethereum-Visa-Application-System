import { Button, Typography } from '@mui/material';
import MetaMaskIcon from '../../assets/walletConnect/metamask-icon.png';

export default function ConnectButton({ connectToMetaMask }) {
    return(
        <Button
        variant="outlined"
        sx={{
            marginTop: 3,
            borderRadius: 4,
            height: 55,
            paddingX: 3,
            color: "text.primary",
            backgroundColor: "primary.main",
            borderColor: "text.primary",
            transition: "all 0.5s ease",
            "&:hover": {
                backgroundColor: "text.primary",
                color: "primary.main",
                borderColor: "primary.main"
            }
        }}
        onClick={connectToMetaMask}
        >
            <Typography
            variant="body1"
            sx={{
                paddingRight: 2
            }}
            >
                Connect To Metamask
            </Typography>

            <img src={MetaMaskIcon} style={{ height: 30, width: 30, marginLeft: 10 }} />

        </Button>
    )
}