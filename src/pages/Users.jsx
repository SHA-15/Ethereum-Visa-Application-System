import { useState } from 'react';
import { DefaultBackground } from '../components/backgrounds';
import { ConnectWallet, Profile, ViewCertificates, Navbar, StoreCertificates, ViewVisas } from '../containers';

export default function Users() {

    const [userView, setUserView] = useState(false);

    const handleUserView = () => {
        setUserView(b => !b);
        console.log("User View Updated, Refreshing View...");
    }

    return (
        <>
            <Navbar names={["Home", "About", "Verify Documents", "Apply for Visa"]} routes={["/", "/about", "/verify-documents", "/visa-application"]} />
            <DefaultBackground />
            <ConnectWallet />
            <Profile />
            <StoreCertificates handleUserView={handleUserView} />
            <ViewCertificates userView={userView}/>
            <ViewVisas userView={userView} handleUserView={handleUserView} />
        </>
    )
}