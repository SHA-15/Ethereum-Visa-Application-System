import { Navbar, ApplicationForm, ConsulateList } from '../containers';
import { ConsulateBackground } from '../components/backgrounds';


export default function VisaApplication() {
    return(
        <>
            <ConsulateBackground />
            <Navbar names={["Home", "Profile", "About"]} routes={["/", "/users", "/about"]}/>
            <ConsulateList />
            <ApplicationForm />
        </>
    )
}