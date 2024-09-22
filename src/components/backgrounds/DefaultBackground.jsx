import { Box } from "@mui/material";
import { MainBG } from "../../assets/home";

export default function DefaultBackground() {
    return(
        <Box
            sx={{
                position: "fixed",
                zIndex: -99,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            }}>
                <img src={MainBG} style={{ width: "100%" }} alt="Main BG" />
            </Box>
    )
}