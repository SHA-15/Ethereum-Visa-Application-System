import { DefaultBackground } from '../components/backgrounds';
import { Navbar, RequestVerification } from '../containers';

export default function VerifyDocuments() {
    return(
        <>
            <DefaultBackground />
            <Navbar names={["Home", "Profile", "About"]} routes={["/", "/users", "/about"]}/>
            <RequestVerification />
        </>
    )
}