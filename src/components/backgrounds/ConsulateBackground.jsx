import { Box } from '@mui/material';
import ConsulateBG from '../../assets/consulate';
// import { ConsulateBG } from "../../assets/consulate/index";

export default function ConsulateBackground() {
    return (
        <Box
            sx={{
                position: "fixed",
                zIndex: -99,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                opacity: 0.6,
                "&::after": {
                    content: '""',
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(60, 30, 90, 0.8)",
                    zIndex: 1
                }
            }}>
            <img src={ConsulateBG} style={{ width: "100%" }} alt="Main BG" />
        </Box>
    )
}