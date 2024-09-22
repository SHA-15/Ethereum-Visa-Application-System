import { Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NavbarButton(props) {
    
    const {id, name, route} = props;
    
    return(
        <Stack
        key={id}
        direction="row"
        component={Link}
        to={route}
        alignItems="center"
        spacing={0.2}
        sx={{
            cursor: "pointer",
            color: "text.primary",
            textDecoration: "none",
            transition: "color 0.3s ease, transform 0.3s ease",
            "&:hover": {
                color: "rgba(139, 69, 209, 1)",
                transform: "scale(1.1)"
            }
        }}
        >
            <Typography variant="h5">{name}</Typography>
        </Stack>
    )
}