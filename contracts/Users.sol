// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { Enumerables } from "./Enumerables.sol";

interface ConsulatesInterface {
    function acceptApplication(
        Users.Application memory _app, 
        address _embassyAccount, 
        address _usersContractAddress, 
        string[] memory _applicationDocs, 
        string[] memory _docHashes) 
        external;
}

error NotOwner();

contract Users is Enumerables {

    address private immutable i_owner;

    /// @notice Modifier to ensure onlyOwner can perform the function to which it is applied
    modifier onlyOwner() {
        if(msg.sender != i_owner) { 
            revert NotOwner();
        }
        _;
    }

    // The User Profile struct of the contract owner
    struct Member {
        string fName;
        string lName;
        string email;
        string contactNumber;
        string imageHash;
    }

    // Instantiating the Member struct as part of Blockchain data
    Member public member;

    /// @notice constructor to setup profile of the smart contract as the contract is created
    /// @param _f first Name
    /// @param _l last Name
    /// @param _e email
    /// @param _cNumber contactNumber
    /// @param _iHash imageHash
    /// @param _mAccount owner of the Users.sol contract
    constructor(
        string memory _f,
        string memory _l, 
        string memory _e, 
        string memory _cNumber, 
        string memory _iHash, 
        address _mAccount) {

        i_owner = _mAccount;

        member = Member({
            fName: _f,
            lName: _l,
            email: _e,
            contactNumber: _cNumber,
            imageHash: _iHash 
        });
    }

    /// @notice function to update the Member Profile Details
    /// @param _f first Name
    /// @param _l last Name
    /// @param _e email
    /// @param _cNumber contactNumber
    /// @param _iHash imageHash
    function updateMember(
        string memory _f,
        string memory _l,
        string memory _e,
        string memory _cNumber,
        string memory _iHash) public onlyOwner {
            member.fName = _f;
            member.lName = _l;
            member.email = _e;
            member.contactNumber = _cNumber;
            if(bytes(_iHash).length > 0) {
                member.imageHash = _iHash;
            }
    }

    // The struct representing the document provided
    struct Certificate {
        string name;
        verificationStatus status;
        documentType certificateType;
        string certificateHash;
    }

    // Mapping and Array to link certificate name to the certificate struct and array of certificate names
    mapping(string => Certificate) public certificates;
    string[] certificateNames;

    /// @notice function to add a certicate to the Blockchain
    /// @param _n name of Certificate
    /// @param _t document Type
    /// @param _cHash certificate IPFS Hash
    function addCertificate (
        string memory _n, 
        uint8 _t, 
        string memory _cHash
    ) public onlyOwner {
        certificates[_n] = Certificate({
            name: _n,
            status: verificationStatus.Unverified,
            certificateType: documentType(_t),
            certificateHash: _cHash
        });

        certificateNames.push(_n);
    }

    /// @notice function to produce all certificates added to the members contract
    /// @return allCertificates of Certificate Structs for all documents added
    function returnAllCertificates() public view returns(Certificate[] memory) {
        Certificate[] memory allCertificates = new Certificate[](certificateNames.length);

        for (uint256 id=0; id < certificateNames.length; id++) {
            allCertificates[id] = certificates[certificateNames[id]];
        }

        return allCertificates;
    }

    /// @notice function to update the verificationStatus of the Certificate from a verifier
    /// @param _n name of Certificate
    /// @param _s status for the certificate
    function updateCertificateVerification(
        string memory _n, 
        uint8 _s
    ) external {
        certificates[_n].status = verificationStatus(_s);
    }

    // To create the application, 3 divided structs for personal info, passport info and travel info
    struct ApplicantPersonalDetails {
        Sex sex;
        string dateOfBirth;
        string placeOfBirth;
        string citizenship;
    }

    struct ApplicantPassportDetails {
        string passportNum;
        string passportIssue;
        string passportExpiry;
    }

    struct ApplicantTravelDetails {
        country country;
        visaType visaType;
        string travelPurpose;
        string dateOfTravel;
    }

    struct Application {
        uint256 memberApplicationId;
        Member memberDetails;
        ApplicantPersonalDetails personalDetails;
        ApplicantPassportDetails passportDetails;
        ApplicantTravelDetails travelDetails;
        bool submission;
        visaStatus status;
    }

    // mapping to store applications by applicationId
    mapping(uint256 => Application) public visaApplications;
    uint256 public appCount;

    /// @notice function to setup an application and store in smart contract
    function createApplication(
    ) public onlyOwner {
        appCount++;

        visaApplications[appCount].memberApplicationId = appCount;
        visaApplications[appCount].memberDetails = member;
        visaApplications[appCount].submission = false;
        visaApplications[appCount].status = visaStatus.Draft;
    }

    /// @notice function to additional personal details for the application
    /// @param _appId Application Id
    /// @param _s Sex enumerable integer
    /// @param _dob dateOfBirth,
    /// @param _pob placeOfBirth
    /// @param _citizenship Citizenship of the applicant
    function addPersonDetails(
        uint256 _appId,
        uint8 _s,
        string memory _dob,
        string memory _pob,
        string memory _citizenship
    ) public onlyOwner {
        visaApplications[_appId].personalDetails = ApplicantPersonalDetails({
            sex: Sex(_s),
            dateOfBirth: _dob,
            placeOfBirth: _pob,
            citizenship: _citizenship
        });
    }

    /// @notice function to additional passport details for the application
    /// @param _appId Application Id
    /// @param _passNumber passport Number
    /// @param _passIssue passport Issue Date,
    /// @param _passExpiry passport Expiry Date
    function addPassportDetails(
        uint256 _appId,
        string memory _passNumber,
        string memory _passIssue,
        string memory _passExpiry
    ) public onlyOwner {
        visaApplications[_appId].passportDetails = ApplicantPassportDetails({
            passportNum: _passNumber,
            passportIssue: _passIssue,
            passportExpiry: _passExpiry
        });
    }

    /// @notice function to additional travel details for the application
    /// @param _appId Application Id
    /// @param _country country enumerable
    /// @param _visaType visa Type enumerable
    /// @param _travelPurpose Purpose of Travel
    /// @param _travelDate Date of Travel
    function addTravelDetails(
        uint256 _appId,
        uint8 _country,
        uint8 _visaType,
        string memory _travelPurpose,
        string memory _travelDate
    ) public onlyOwner {
        visaApplications[_appId].travelDetails = ApplicantTravelDetails({
            country: country(_country),
            visaType: visaType(_visaType),
            travelPurpose: _travelPurpose,
            dateOfTravel: _travelDate
        });
    }

    /// @notice function to update the status of the application on the user application state
    /// @param _appId application Id
    /// @param _status visa Status enumerable
    function visaStatusUpdate(
        uint256 _appId,
        uint8 _status
    ) public {
        visaApplications[_appId].status = visaStatus(_status);
    }

    /// @notice function to submit the application to the Consulates.sol contract to the selected consular
    /// @param _appId application Id
    /// @param _consulateAccount account of the Consulate
    /// @param _consulateContractAddress access the smart contract of the consulate
    function applicationSubmission(
        uint256 _appId, 
        address _consulateAccount, 
        address _consulateContractAddress
    ) public onlyOwner {
        // Update the visa status to submitted for the user visibility
        visaStatusUpdate(_appId, 1);

        // Select the application to be submitted
        Application memory applicationForm = visaApplications[_appId];

        // Value of verified Certificates
        uint256 verifiedCerts = 0;
        for (uint256 id = 0; id < certificateNames.length; id++) {
            if (certificates[certificateNames[id]].status == verificationStatus.Verified) {
                verifiedCerts++;
            }
        } 

        // Array used to store the name and ipfs Hashes of Certificates
        string[] memory verfiCertNames = new string[](verifiedCerts);
        string[] memory verfiCertHashes = new string[](verifiedCerts);

        // Populate the arrays with the filtered certificates
        uint256 counter = 0;
        for (uint256 id=0; id < certificateNames.length; id++) {
            if(certificates[certificateNames[id]].status == verificationStatus.Verified) {
                verfiCertNames[counter] = certificateNames[id];
                verfiCertHashes[counter] = certificates[certificateNames[id]].certificateHash;
                counter++;
            }
        }

        // Interact with the Consulates.sol and submit the application data to the Consulate
        ConsulatesInterface consularOffice = ConsulatesInterface(_consulateContractAddress);

        consularOffice.acceptApplication(
            applicationForm,
            _consulateAccount,
            address(this),
            verfiCertNames,
            verfiCertHashes
        );

        visaApplications[_appId].submission = true;
    }

    /// @notice function to display all the applications sent by the member
    /// @return allApps The Array of Application Structs
    function retrieveAllApplications() public view returns(Application[] memory) {
        Application[] memory allApps = new Application[](appCount);
        for (uint256 id=1; id <= appCount; id++) {
            allApps[id-1] = visaApplications[id];
        }

        return allApps;
    }

}

