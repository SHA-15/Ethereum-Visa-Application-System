import { AppBar, Container, Stack } from '@mui/material';
import { NavbarButton } from '../../components/buttons';
import ScrollPosition from '../../hook/ScrollPosition';
import Chainlink from '/chainlink.png';


export default function Navbar({ names, routes }) {

    const scrollPosition = ScrollPosition();

    return(
        <AppBar
        elevation={2}
        sx={{
            paddingY: 1,
            height: "72px",
            backgroundColor: scrollPosition > 10 ? "rgba(7, 7, 16, 0.01)" : "transparent",
            backdropFilter: scrollPosition > 10 ? "blur(10px)" : "none",
            boxShadow: scrollPosition > 10 ? "0 4px 12px rgba(0, 0, 0, 0.05)" : "none",
            backgroundImage: scrollPosition > 10 ? "linear-gradient(45deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 30%)" : "none",
            borderBottom: scrollPosition > 10 ? "0.5px solid rgba(255, 255, 255, 0.1)" : "none",
            transition: "all 0.3s ease-in-out"
        }}
        >
            <Container>
                <Stack
                    direction="row" 
                    alignItems="center"
                    justifyContent="space-between"
                    gap="10%"
                >
                    <img 
                    src={Chainlink} 
                    style={{
                        height: "50px",
                        width: "auto",
                        objectFit: "contain"
                    }}
                    alt="Logo"
                    />
                    <Stack
                    direction="row" 
                    alignItems="center"
                    justifyContent="center"
                    spacing={12}
                    sx={{ flex: 1 }}
                    >
                        {names.map((name, i) => (
                            <NavbarButton key={i} name={name} route={routes[i]}/>
                        ))}
                    </Stack>
                </Stack>
            </Container>
        </AppBar>
    )
}