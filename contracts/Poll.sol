pragma solidity ^0.5.16;

contract Poll {
    // Model a Candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    //Model a Question
    struct Question{
        uint id;
        string question;
    }

    //Store accounts that have voted
    mapping(address => bool) public voters;
    // Store Candidates
    // Fetch Candidate
    mapping(uint => Candidate) public candidates;
    // Store Candidates Count
    uint public candidatesCount;

    // Fetch Questions
    mapping(uint => Question) public questions;
    // Store Questions Count
    uint public questionsCount;

    //voted event
    event votedEvent(
        uint indexed _candidateId
    );

    constructor() public {
        addQuestion("Which candidate should win ?");
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

    function addCandidate (string memory _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function addQuestion (string memory _ques) private {
        questionsCount ++;
        questions[questionsCount] = Question(questionsCount, _ques);
    }

    function vote(uint _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount ++;

        // trigger voted event
        emit votedEvent(_candidateId);
    }
}
