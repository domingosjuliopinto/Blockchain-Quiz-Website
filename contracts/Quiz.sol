pragma solidity ^0.5.16;

contract Quiz {
    // Model 5 Questions
    struct answer1 {
        uint id;
        string name;
        uint voteCount;
    }

    struct answer2 {
        uint id;
        string name;
        uint voteCount;
    }

    struct answer3 {
        uint id;
        string name;
        uint voteCount;
    }

    struct answer4 {
        uint id;
        string name;
        uint voteCount;
    }

    struct answer5 {
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
    
    // Fetch answer
    mapping(uint => answer1) public answers1;
    mapping(uint => answer2) public answers2;
    mapping(uint => answer3) public answers3;
    mapping(uint => answer4) public answers4;
    mapping(uint => answer5) public answers5;
    
    // Store answers Count
    uint public answersCount;
    
    //Storing and Fetching scores
    mapping(address => Score) public scores;

    // Store number of scores
    uint public NoOfScores;

    //voted event
    event votedEvent(
        uint indexed _answerId
    );

    constructor() public {
        addanswer1("Centralized");
        addanswer1("Decentralized");
        addanswer2("Immutable");
        addanswer2("Mutable");
        addanswer3("Block 0");
        addanswer3("Block 1");
        addanswer4("Bitcoin");
        addanswer4("Hyperledger");
        addanswer5("Ethereum");
        addanswer5("Bitcoin");
    }

    function addanswer1 (string memory _name) private {
        answersCount ++;
        answers1[answersCount] = answer1(answersCount, _name, 0);
    }

    function addanswer2 (string memory _name) private {
        answersCount ++;
        answers2[answersCount] = answer2(answersCount, _name, 0);
    }
    
    function addanswer3 (string memory _name) private {
        answersCount ++;
        answers3[answersCount] = answer3(answersCount, _name, 0);
    }

    function addanswer4 (string memory _name) private {
        answersCount ++;
        answers4[answersCount] = answer4(answersCount, _name, 0);
    }

    function addanswer5 (string memory _name) private {
        answersCount ++;
        answers5[answersCount] = answer5(answersCount, _name, 0);
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

    function vote1(uint _answerId) public {
        // require that they haven't voted before
        require(!voters1[msg.sender]);

        // require a valid answer
        require(_answerId > 0 && _answerId <= answersCount);

        // record that voter has voted
        voters1[msg.sender] = true;

        // update answer vote Count
        answers1[_answerId].voteCount ++;

        //add quiz score
        if(_answerId == 2){
            addScore(1,msg.sender);
        }else{
            addScore(0,msg.sender);
        }

        // trigger voted event
        emit votedEvent(_answerId);
    }

    function vote2(uint _answerId) public {
        // require that they haven't voted before
        require(!voters2[msg.sender]);

        // require a valid answer
        require(_answerId > 0 && _answerId <= answersCount);

        // record that voter has voted
        voters2[msg.sender] = true;

        // update answer vote Count
        answers2[_answerId].voteCount ++;

        //add quiz score
        if(_answerId == 3){
            addScore(1,msg.sender);
        }else{
            addScore(0,msg.sender);
        }

        // trigger voted event
        emit votedEvent(_answerId);
    }

    function vote3(uint _answerId) public {
        // require that they haven't voted before
        require(!voters3[msg.sender]);

        // require a valid answer
        require(_answerId > 0 && _answerId <= answersCount);

        // record that voter has voted
        voters3[msg.sender] = true;

        // update answer vote Count
        answers3[_answerId].voteCount ++;

        //add quiz score
        if(_answerId == 5){
            addScore(1,msg.sender);
        }else{
            addScore(0,msg.sender);
        }

        // trigger voted event
        emit votedEvent(_answerId);
    }

    function vote4(uint _answerId) public {
        // require that they haven't voted before
        require(!voters4[msg.sender]);

        // require a valid answer
        require(_answerId > 0 && _answerId <= answersCount);

        // record that voter has voted
        voters4[msg.sender] = true;

        // update answer vote Count
        answers4[_answerId].voteCount ++;

        //add quiz score
        if(_answerId == 8){
            addScore(1,msg.sender);
        }else{
            addScore(0,msg.sender);
        }

        // trigger voted event
        emit votedEvent(_answerId);
    }

    function vote5(uint _answerId) public {
        // require that they haven't voted before
        require(!voters5[msg.sender]);

        // require a valid answer
        require(_answerId > 0 && _answerId <= answersCount);

        // record that voter has voted
        voters5[msg.sender] = true;

        // update answer vote Count
        answers5[_answerId].voteCount ++;

        //add quiz score
        if(_answerId == 9){
            addScore(1,msg.sender);
        }else{
            addScore(0,msg.sender);
        }

        // trigger voted event
        emit votedEvent(_answerId);
    }
}
