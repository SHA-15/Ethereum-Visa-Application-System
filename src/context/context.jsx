import { createContext, useContext, useState } from 'react';

const Context = createContext();

export const AppContextProvider = ({ children }) => {
    // Constant Terms throughout the entirety of the application
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [connectedAccount, setConnectedAccount] = useState(null);
    const [accountFunds, setAccountFunds] = useState(null);
    const [editStatus, setEditStatus] = useState(true);
    const [accountProfile, setAccountProfile] = useState({
        fName: "",
        lName: "",
        email: "",
        cNumber: "",
        imageHash: ""
    });
    const [allCertificates, setAllCertificates] = useState([]);

    // individual user's smart contract address
    const [uContractAddress, setUContractAddress] = useState(null);
    
    // UsersFactory smart contract address
    const uContractFactoryAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
    
    // Verifiers smart contract address
    const vContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    // Consulates smart contract address
    const cContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";


    return (
        <Context.Provider value = {{ provider, setProvider, 
                                     signer, setSigner, 
                                     connectedAccount, setConnectedAccount,
                                     accountFunds, setAccountFunds,
                                     editStatus, setEditStatus,
                                     accountProfile, setAccountProfile,
                                     allCertificates, setAllCertificates,
                                     uContractAddress, setUContractAddress,
                                     uContractFactoryAddress,
                                     vContractAddress,
                                     cContractAddress }}>
            {children}
        </Context.Provider>
    );
}


export function useAppContext() {
    return useContext(Context);
}