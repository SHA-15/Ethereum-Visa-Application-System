import { useState } from 'react';
import { DefaultBackground } from '../components/backgrounds';
import { ConnectWallet, Navbar, VerificationRequests } from '../containers';



export default function Verifiers() {
    
    const [certificateRefresh, setCertificateRefresh] = useState(false);

    const handleCertificateFetch = () => {
        setCertificateRefresh(b => !b);
        console.log("Refreshing View upon Interaction");
    }
    
    return(
        <>
            <Navbar names={["Home", "About"]} routes={["/", "/about"]} />
            <DefaultBackground />
            <ConnectWallet />
            <VerificationRequests handleCertificateFetch={handleCertificateFetch} certificateRefresh={certificateRefresh} />
        </>
    )
}