pragma solidity ^0.5.16;

contract Quiz {
    // Model 5 Questions
    struct Candidate1 {
        uint id;
        string name;
        uint voteCount;
    }

    struct Candidate2 {
        uint id;
        string name;
        uint voteCount;
    }

    struct Candidate3 {
        uint id;
        string name;
        uint voteCount;
    }

    struct Candidate4 {
        uint id;
        string name;
        uint voteCount;
    }

    struct Candidate5 {
        uint id;
        string name;
        uint voteCount;
    }

    //Saving Scores 
    struct Score{
        uint uid;
        address account;
        uint scoreCount;
    }

    //Store accounts that have voted
    mapping(address => bool) public voters1;
    mapping(address => bool) public voters2;
    mapping(address => bool) public voters3;
    mapping(address => bool) public voters4;
    mapping(address => bool) public voters5;
    
    // Fetch Candidate
    mapping(uint => Candidate1) public candidates1;
    mapping(uint => Candidate2) public candidates2;
    mapping(uint => Candidate3) public candidates3;
    mapping(uint => Candidate4) public candidates4;
    mapping(uint => Candidate5) public candidates5;
    
    // Store Candidates Count
    uint public candidatesCount;
    
    //Storing and Fetching scores
    mapping(address => Score) public scores;

    // Store number of scores
    uint public NoOfScores;

    //voted event
    event votedEvent(
        uint indexed _candidateId
    );

    constructor() public {
        addCandidate1("Candidate 1");
        addCandidate1("Candidate 2");
        addCandidate2("Candidate 1");
        addCandidate2("Candidate 2");
        addCandidate3("Candidate 1");
        addCandidate3("Candidate 2");
        addCandidate4("Candidate 1");
        addCandidate4("Candidate 2");
        addCandidate5("Candidate 1");
        addCandidate5("Candidate 2");
    }

    function addCandidate1 (string memory _name) private {
        candidatesCount ++;
        candidates1[candidatesCount] = Candidate1(candidatesCount, _name, 0);
    }

    function addCandidate2 (string memory _name) private {
        candidatesCount ++;
        candidates2[candidatesCount] = Candidate2(candidatesCount, _name, 0);
    }
    
    function addCandidate3 (string memory _name) private {
        candidatesCount ++;
        candidates3[candidatesCount] = Candidate3(candidatesCount, _name, 0);
    }

    function addCandidate4 (string memory _name) private {
        candidatesCount ++;
        candidates4[candidatesCount] = Candidate4(candidatesCount, _name, 0);
    }

    function addCandidate5 (string memory _name) private {
        candidatesCount ++;
        candidates5[candidatesCount] = Candidate5(candidatesCount, _name, 0);
    }

    function addScore (uint _addmark, address _account) public {
        if(NoOfScores == 0){
            NoOfScores++;
            scores[_account] = Score(NoOfScores, _account,_addmark);
        }else{
            if (scores[_account].uid > 0){
                scores[_account].scoreCount = scores[_account].scoreCount + _addmark;
            }else{
                NoOfScores++;
                scores[_account] = Score(NoOfScores, _account,_addmark);
            }
        }
    }

    function vote1(uint _candidateId) public {
        // require that they haven't voted before
        require(!voters1[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that voter has voted
        voters1[msg.sender] = true;

        // update candidate vote Count
        candidates1[_candidateId].voteCount ++;

        //add quiz score
        if(_candidateId == 1){
            addScore(1,msg.sender);
        }else{
            addScore(0,msg.sender);
        }

        // trigger voted event
        emit votedEvent(_candidateId);
    }

    function vote2(uint _candidateId) public {
        // require that they haven't voted before
        require(!voters2[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that voter has voted
        voters2[msg.sender] = true;

        // update candidate vote Count
        candidates2[_candidateId].voteCount ++;

        //add quiz score
        if(_candidateId == 3){
            addScore(1,msg.sender);
        }else{
            addScore(0,msg.sender);
        }

        // trigger voted event
        emit votedEvent(_candidateId);
    }

    function vote3(uint _candidateId) public {
        // require that they haven't voted before
        require(!voters3[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that voter has voted
        voters3[msg.sender] = true;

        // update candidate vote Count
        candidates3[_candidateId].voteCount ++;

        //add quiz score
        if(_candidateId == 5){
            addScore(1,msg.sender);
        }else{
            addScore(0,msg.sender);
        }

        // trigger voted event
        emit votedEvent(_candidateId);
    }

    function vote4(uint _candidateId) public {
        // require that they haven't voted before
        require(!voters4[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that voter has voted
        voters4[msg.sender] = true;

        // update candidate vote Count
        candidates4[_candidateId].voteCount ++;

        //add quiz score
        if(_candidateId == 7){
            addScore(1,msg.sender);
        }else{
            addScore(0,msg.sender);
        }

        // trigger voted event
        emit votedEvent(_candidateId);
    }

    function vote5(uint _candidateId) public {
        // require that they haven't voted before
        require(!voters5[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that voter has voted
        voters5[msg.sender] = true;

        // update candidate vote Count
        candidates5[_candidateId].voteCount ++;

        //add quiz score
        if(_candidateId == 9){
            addScore(1,msg.sender);
        }else{
            addScore(0,msg.sender);
        }

        // trigger voted event
        emit votedEvent(_candidateId);
    }
}
