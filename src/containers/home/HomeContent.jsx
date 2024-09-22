import { Container, Stack, Typography } from "@mui/material";
import { HomePageButton } from "../../components/buttons";

export default function HomeContent() {
    return(
        <Container sx={{ height: "100vh" }}>
            <Stack  sx={{ height: "inherit" }} justifyContent="center">
                <Typography variant="h1" sx={{ marginBottom: 2 }}>
                    Welcome To EVA
                </Typography>
                <Typography variant="h3" sx={{ marginBottom: 5 }}>
                    Ethereum blockchain-based Visa Application System
                </Typography>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={4}>
                    <HomePageButton routeTo="/users" buttonName="Users" />
                    <HomePageButton routeTo="/verifiers" buttonName="Verifiers" />
                    <HomePageButton routeTo="/consulates" buttonName="Consulates" />
                </Stack>
            </Stack>
        </Container>
    )
}