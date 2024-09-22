// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { Enumerables } from "./Enumerables.sol";
import { Users } from "./Users.sol";

interface UsersInterface {
    function visaStatusUpdate(uint256 _appId, uint8 _status) external;
}

contract Consulates is Enumerables {

    // The consulate struct, outlining all details
    struct Embassy {
        address account;
        string embassyName;
        string embassyAddress;
        string embassyNumber;
        string embassyEmail;
    }

    // The mapping to store consulates by their address & array
    mapping(address => Embassy) public embassies;
    address[] embassyAccounts;

    // Embassy receives application and their documents from the Users.sol contract will be stored in a struct
    struct Application {
        address memberContractAddress;
        uint256 userApplicantId;
        Users.Member memberDetails;
        Users.ApplicantPersonalDetails personalDetails;
        Users.ApplicantPassportDetails passportDetails;
        Users.ApplicantTravelDetails travelDetails;
        visaStatus status;
        bool submission;
        address embassyAccount;
        string[] certificateNames;
        string[] certificateHashes;
    }

    // Mapping to place the application to embassy's id and consulate its set to
    mapping(address => mapping(uint256 => Application)) public applications;

    // Mapping to store consulate accounts to applications received
    mapping(address => uint256) public applicationsReceivedCount;

    /// @notice function to setup a embassy in the smart contract
    /// @param _eName name of Embassy
    /// @param _eLocation location where Embassy is situated
    /// @param _eNum contact Number of the Embassy
    /// @param _eEmail email address of the Embassy
    function setupEmbassy(
        string memory _eName,
        string memory _eLocation,
        string memory _eNum,
        string memory _eEmail
    ) external {
        embassies[msg.sender] = Embassy({
            account: msg.sender,
            embassyName: _eName,
            embassyAddress: _eLocation,
            embassyNumber: _eNum,
            embassyEmail: _eEmail 
        });

        embassyAccounts.push(msg.sender);

    }

    /// @notice function to display all consulates present in the smart contract
    /// @return allEmbassies array of Embassy structs
    function retrieveAllEmbassies() public view returns(Embassy[] memory) {
        Embassy[] memory allEmbassies = new Embassy[](embassyAccounts.length);

        for (uint256 id = 0; id < embassyAccounts.length; id++) {
            allEmbassies[id] = embassies[embassyAccounts[id]];
        }

        return allEmbassies;
    }

    function acceptApplication(
        Users.Application memory _app, 
        address _embassyAccount, 
        address _usersContractAddress, 
        string[] memory _applicationDocs, 
        string[] memory _docHashes
        ) external {

            uint256 embassyAppCount = applicationsReceivedCount[_embassyAccount];
            embassyAppCount++;

            applications[_embassyAccount][embassyAppCount] = Application({
                memberContractAddress: _usersContractAddress,
                userApplicantId: _app.memberApplicationId,
                memberDetails: _app.memberDetails,
                personalDetails: _app.personalDetails,
                passportDetails: _app.passportDetails,
                travelDetails: _app.travelDetails,
                status: _app.status,
                submission: true,
                embassyAccount: _embassyAccount,
                certificateNames: _applicationDocs,
                certificateHashes: _docHashes
            });

            applicationsReceivedCount[_embassyAccount] = embassyAppCount;
        }

        // Initializing the Users.sol interface
        UsersInterface public member;

        /// @notice consulate to accept or reject applications received
        /// @param _embassyAccount account address of the consulate which selects the application to change status
        /// @param _appId the application Id of the consulate side application received
        /// @param _status the enumerable value to update the visa Status as per consulate instruction
        function updateAppStatus (
            address _embassyAccount,
            uint256 _appId,
            uint8 _status,
            address _uContractAddress
        ) external {

            // Change the visa application status on the embassy side
            applications[_embassyAccount][_appId].status = visaStatus(_status);

            // Change the visa Status on the Users.sol side
            // address memberAddress = applications[_embassyAccount][_appId].memberContractAddress;
            address memberAddress = _uContractAddress;
            uint256 applicationIdentifier = applications[_embassyAccount][_appId].userApplicantId;
            member = UsersInterface(memberAddress);

            member.visaStatusUpdate(applicationIdentifier, _status);

        }

        /// @notice display all applications received by each consulate
        /// @param _embassyAccount address of consulate account
        /// @return allApplications array of application structs
        function retrieveAllApplications(
            address _embassyAccount
        ) public view returns(Application[] memory) {

            uint256 appCount = applicationsReceivedCount[_embassyAccount];
            Application[] memory allApplications = new Application[](appCount);

            for (uint256 id = 0; id < appCount; id++) {
                allApplications[id] = applications[_embassyAccount][id+1];
            }

            return allApplications;
        }

}