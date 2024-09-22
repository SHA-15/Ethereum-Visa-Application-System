import { Box } from "@mui/material";
import { MainBG, ShootingStars, Trees, CliffSide } from "../../assets/home";


export default function HomeBackground() {
    return (
        <Box>
            {/* Main Background Image */}
            <Box
            sx={{
                position: "fixed",
                zIndex: -99,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            }}
            >
                <img src={MainBG} style={{ width: "100%" }} alt="Main Background" />
            </Box>
            {/* Supporting Background Elements */}
            <Box
            sx={{
                position: "absolute", 
                width: "100%",
                zIndex: -10,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            }}
            >
                <img src={ShootingStars} style={{ position: "fixed", top: "5%", right: "8%", width: "600px" }} alt="Stars" />

                <img src={Trees} style={{ position: "fixed", bottom: 0, left: 0, right: 0, width: "99%", height: "80%" }} alt="Trees" />

                <img src={CliffSide} style={{ position:"fixed", bottom: 0, right: 0, backgroundSize: "cover", height: "80%" }} alt="Cliffs" />
            </Box>
        </Box>
    )
}