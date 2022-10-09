var Quiz = artifacts.require("./Quiz.sol");

contract("Quiz", function(accounts) {
  var QuizInstance;

  it("initializes with two answers", function() {
    return Quiz.deployed().then(function(instance) {
      return instance.answersCount();
    }).then(function(count) {
      assert.equal(count, 10);
    });
  });

  it("it initializes the answers with the correct values", function() {
    return Quiz.deployed().then(function(instance) {
      QuizInstance = instance;
      return QuizInstance.answers1(1);
    }).then(function(answer) {
      assert.equal(answer[0], 1, "contains the correct id");
      assert.equal(answer[1], "Centralized", "contains the correct name");
      assert.equal(answer[2], 0, "contains the correct votes count");
      return QuizInstance.answers1(2);
    }).then(function(answer) {
      assert.equal(answer[0], 2, "contains the correct id");
      assert.equal(answer[1], "Decentralized", "contains the correct name");
      assert.equal(answer[2], 0, "contains the correct votes count");
    });
  });

  it("allows a voter to cast a vote", function() {
    return Quiz.deployed().then(function(instance) {
      QuizInstance = instance;
      answerId = 1;
      return QuizInstance.vote1(answerId, { from: accounts[0] });
    }).then(function(receipt) {
      assert.equal(receipt.logs.length, 1, "an event was triggered");
      assert.equal(receipt.logs[0].event, "votedEvent", "the event type is correct");
      assert.equal(receipt.logs[0].args._answerId.toNumber(), answerId, "the answer id is correct");
      return QuizInstance.voters1(accounts[0]);
    }).then(function(voted) {
      assert(voted, "the voter was marked as voted");
      return QuizInstance.answers1(answerId);
    }).then(function(answer) {
      var voteCount = answer[2];
      assert.equal(voteCount, 1, "increments the answer's vote count");
    })
  });

  it("throws an exception for invalid answers", function() {
    return Quiz.deployed().then(function(instance) {
      QuizInstance = instance;
      return QuizInstance.vote1(99, { from: accounts[1] })
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
      return QuizInstance.answers1(1);
    }).then(function(answer1) {
      var voteCount = answer1[2];
      assert.equal(voteCount, 1, "answer 1 did not receive any votes");
      return QuizInstance.answers1(2);
    }).then(function(answer2) {
      var voteCount = answer2[2];
      assert.equal(voteCount, 0, "answer 2 did not receive any votes");
    });
  });

  it("throws an exception for double voting", function() {
    return Quiz.deployed().then(function(instance) {
      QuizInstance = instance;
      answerId = 2;
      QuizInstance.vote1(answerId, { from: accounts[1] });
      return QuizInstance.answers1(answerId);
    }).then(function(answer) {
      var voteCount = answer[2];
      assert.equal(voteCount, 1, "accepts first vote");
      // Try to vote again
      return QuizInstance.vote1(answerId, { from: accounts[1] });
    }).then(assert.fail).catch(function(error) {
      assert(error.message, "error message must contain revert");
      return QuizInstance.answers1(1);
    }).then(function(answer1) {
      var voteCount = answer1[2];
      assert.equal(voteCount, 1, "answer 1 did not receive any votes");
      return QuizInstance.answers1(2);
    }).then(function(answer2) {
      var voteCount = answer2[2];
      assert.equal(voteCount, 0, "answer 2 did not receive any votes");
    });
  });
});