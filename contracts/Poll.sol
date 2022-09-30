pragma solidity ^0.5.16;

contract Poll{
    // Store candidate
    // Read candidate
    string public candidate;
    // Constructor
    constructor () public {
        candidate = "Candidate 1";
    }
}