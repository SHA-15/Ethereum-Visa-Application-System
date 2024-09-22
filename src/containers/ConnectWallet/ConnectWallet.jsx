import React from 'react';
import { Box, Typography } from '@mui/material';
import { useWallet } from '../../hook/UseWallet'; // Use the custom hook
import WalletCard from '../../assets/walletConnect/WalletCard.svg';
import { ConnectButton } from '../../components/buttons';

export default function ConnectWallet({ children, title }) {
    const { accountFunds, connectedAccount, connectToMetaMask } = useWallet();

    return (
        <Box sx={{
            height: "400px",
            width: "750px",
            backgroundImage: `url(${WalletCard})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "750px 400px",
            backgroundPosition: "center",
            marginTop: "100px",
            marginX: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            gap: "5px"
        }}>
            <Typography sx={{ paddingBottom: "20px" }} variant="h5">
                {title || "Connect Your Metamask Wallet to Get Started"}
            </Typography>

            {children ? children : (
                <>
                    <Typography sx={{
                        background: "linear-gradient(45deg, #FF6F61, #6B5B95)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        padding: "20px",
                        borderRadius: "25px",
                        fontSize: "1.5rem"
                    }} variant="body1">
                        Account: {connectedAccount || "Not connected"}
                    </Typography>

                    <Typography sx={{
                        background: "linear-gradient(45deg, #FF6F61, #6B5B95)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        padding: "20px",
                        borderRadius: "25px",
                        fontSize: "1.5rem"
                    }} variant="body1">
                        Current ETH available: {accountFunds || "0.00"} ETH
                    </Typography>
                </>
            )}

            <ConnectButton connectToMetaMask={connectToMetaMask} />
        </Box>
    );
}

