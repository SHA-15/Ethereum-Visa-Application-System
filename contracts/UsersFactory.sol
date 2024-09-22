// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import {Users} from "./Users.sol";

error NotUser();

contract UsersFactory {
    // mapping that records to link a user account to a user address
    mapping(address => address) public userContracts;

    modifier ExistingUser() {
        if (userContracts[msg.sender] != address(0)) {
            revert NotUser();
        }
        _;
    }

    // event for when a new contract is launched
    event ContractDeployed(address indexed member, address contractAddress);

    /// @notice function deploying their own Users.sol contract
    /// @param _f first Name
    /// @param _l last Name
    /// @param _e email
    /// @param _cNumber contactNumber
    /// @param _iHash imageHash
    function deployContract(
        string memory _f,
        string memory _l,
        string memory _e,
        string memory _cNumber,
        string memory _iHash
    ) public ExistingUser {
        // Deploying the Users.sol contract instance
        Users newContract = new Users(_f, _l, _e, _cNumber, _iHash, msg.sender);
        userContracts[msg.sender] = address(newContract);

        emit ContractDeployed(msg.sender, address(newContract));
    }

    /// @notice function to retrieve the user Contract address linked to the user's account
    /// @return address address of Users.sol contract
    function retrieveUserContract(address _user) public view returns (address) {
        return userContracts[_user];
    }
}
