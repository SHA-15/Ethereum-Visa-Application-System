import { useState } from 'react';
import { ConnectWallet, Navbar, ApplicationRequests } from '../containers';
import { ConsulateBackground } from '../components/backgrounds';



export default function Consulates() {

    const [visaRefresh, setVisaRefresh] = useState(false);

    const handleVisaView = () => {
        setVisaRefresh(b => !b);
        console.log("Refreshing View upon Interaction");
    }

    return (
        <>
            <ConsulateBackground />
            <Navbar names={["Home", "About"]} routes={["/", "/about"]} />
            <ConnectWallet />
            <ApplicationRequests handleVisaView={handleVisaView} visaRefresh={visaRefresh} />
        </>
    )
}