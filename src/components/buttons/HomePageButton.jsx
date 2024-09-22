import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';

export default function HomePageButton(props) {
    const handleIconDisplay = () => {
        if (props.buttonName.includes("Users")) {
            return <AccountCircleIcon sx={{ fontSize: 22, marginRight: 2 }} />
        } else if (props.buttonName.includes("Verifiers")) {
            return <VerifiedUserIcon sx={{ fontSize: 22, marginRight: 2 }} />
        } else {
            return <AssuredWorkloadIcon sx={{ fontSize: 22, marginRight: 2 }} />
        }
    }

    return (
        <Button 
        component={Link} 
        to={props.routeTo} 
        variant="outlined"
        sx={{
            borderRadius: 4,
            height: 75,
            width: 200,
            paddingX: 3,
            color: "text.primary",
            borderColor: "text.primary",
            transition: "all 0.4s ease",
            "&:hover": {
                color: "primary.main",
                borderColor: "primary.main",
                scale: "1.15"
            }
        }}>
            {handleIconDisplay()}
            {props.buttonName}
        </Button>
    );
}
