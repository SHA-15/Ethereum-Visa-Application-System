// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

contract Enumerables {
    enum verificationStatus { Processing, Verified, Unverified, Rejected }
    enum visaStatus { Draft, Submitted, Approved, Rejected }
    enum Sex { Male, Female, Other }
    enum documentType { Educational, Financial, Personal }
    enum visaType { Tourist, Business, Work, Student, Transit }
    enum country { USA, AUS, NZ, BEL, UAE, UK, ESP, FR }
}