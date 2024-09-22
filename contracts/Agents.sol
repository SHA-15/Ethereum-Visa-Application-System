// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { Enumerables } from "./Enumerables.sol";

interface UsersInterface {
    function updateCertificateVerification(
        string memory _n, 
        uint8 _s
    ) external;
}

error VerifierPresent();

contract Agents is Enumerables {

    modifier AlreadyVerifier() {
        if ( agents[msg.sender].isActive == false) { revert VerifierPresent();}
        _;
    }

    // The struct to store Verification Agent Details
    struct Verifier {
        address agent;
        string fName;
        string lName;
        string imageHash;
        uint256 agentFee;
        bool isActive;
    }

    // Mapping that links verifier structs to the address account
    mapping(address => Verifier) public agents;
    address[] public agentAddresses;

    // Setup the User Contract Interface
    UsersInterface public contractUser;

    // Struct to store Document Data transferred from the user
    struct Certificate {
        string name;
        verificationStatus status;
        documentType certificateType;
        string certificateHash;
        address userContractAddress;
    }

    // mapping to store the certificates to the agent
    mapping(address => Certificate[]) public agentDocuments;

    /// @notice function to add a new Agent in the smart contract
    /// @param _f first Name
    /// @param _l last Name
    /// @param _iHash ipfs Hash of the image
    /// @param _fee fees for document verification 
    function addVerificationAgent(
        string memory _f,
        string memory _l,
        string memory _iHash,
        uint256 _fee
    ) public {
        agents[msg.sender] = Verifier({
            agent: msg.sender,
            fName: _f,
            lName: _l,
            imageHash: _iHash,
            agentFee: _fee,
            isActive: true
        });

        agentAddresses.push(msg.sender);
    }

    /// @notice function to display all agents part of the smart contract
    /// @return displayAgents array of Verifier structs
    function retrieveAllAgents() public view returns(Verifier[] memory) {
        Verifier[] memory displayAgents = new Verifier[](agentAddresses.length);

        for (uint256 id = 0; id < agentAddresses.length; id++) {
            displayAgents[id] = agents[agentAddresses[id]];
        }

        return displayAgents;
    }

    /// @notice function for given verifier agent to receive user documents
    /// @param _agent address of the verifier account
    /// @param _name name of the certificate
    /// @param _iHash ipfsHash of the document
    /// @param _type type of document received
    function receiveDocuments(
        address _agent,
        string memory _name,
        string memory _iHash,
        uint8 _type,
        address _memberAddress
    ) external {
        Certificate memory newCertificate = Certificate({
            name: _name,
            status: verificationStatus.Processing,
            certificateType: documentType(_type),
            certificateHash: _iHash,
            userContractAddress: _memberAddress
        });

        agentDocuments[_agent].push(newCertificate);

        contractUser = UsersInterface(_memberAddress);

        contractUser.updateCertificateVerification(_name, 0);
    }

    /// @notice display documents that have been received by a Verifier
    /// @param _agent account address of the verifier
    /// @return Certificate[] array of document structs received 
    function retrieveDocumentsFromVerifier(
        address _agent
    ) external view returns(Certificate[] memory) {
        return agentDocuments[_agent];
    }

    /// @notice update the document status both in the verifier and in the Users contract
    /// @param _userContract contract address of the User
    /// @param _name name of document being verified
    /// @param _iHash ipfsHash of the document to be viewed
    /// @param _status the status of the document being updated
    function verifyCertificate(
        address _userContract,
        string memory _name,
        string memory _iHash,
        uint8 _status
    ) public {
        // Use the interface for the specific contract and interact with it
        contractUser = UsersInterface(_userContract);

        contractUser.updateCertificateVerification(_name, _status);

        for (uint256 id=0; id < agentDocuments[msg.sender].length; id++) {
            if (keccak256(abi.encodePacked(agentDocuments[msg.sender][id].certificateHash)) == keccak256(abi.encodePacked(_iHash))) {
                agentDocuments[msg.sender][id].status = verificationStatus(_status);
            }
        }
    }

}
