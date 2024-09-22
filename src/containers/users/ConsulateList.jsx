import { Typography } from '@mui/material';
import './ConsulateList.css'; // Updated file name
import Flag from 'react-world-flags';
import { useConsulate } from '../../hook/UseConsulate';


const flagCodes = ["US", "AU", "NZ", "BE", "AE", "GB", "ES", "FR"];

export default function ConsulateList() { // Updated component name
    const { consulateArray } = useConsulate();

    const handleApplicationFormView = () => {
        const element = document.getElementById("application-form");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="main-grid">
            {consulateArray.map((consulate, index) => (
                <div className="container" key={index} onClick={handleApplicationFormView}>
                    <div className="title">
                        <Typography variant="h4" sx={{ textAlign: "center" }}>{consulate.name}</Typography>
                    </div>
                    <div className="media-store">
                        <Flag code={flagCodes[index]} height="100" />
                    </div>
                    <div className="description">
                        <Typography>Location: {consulate.location}</Typography>
                        <Typography>Contact Number: {consulate.contactNumber}</Typography>
                        <Typography>Email: {consulate.email}</Typography>
                    </div>
                </div>
            ))}
        </div>
    );
}
