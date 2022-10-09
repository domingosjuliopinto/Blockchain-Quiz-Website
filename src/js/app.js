App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasVoted: false,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Quiz.json", function(Quiz) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Quiz = TruffleContract(Quiz);
      // Connect provider to interact with contract
      App.contracts.Quiz.setProvider(App.web3Provider);

      App.listenForEvents();

      return App.render();
    });
  },

  // Listen for events emitted from the contract
  listenForEvents: function() {
    App.contracts.Quiz.deployed().then(function(instance) {
      // Restart Chrome if you are unable to receive this event
      // This is a known issue with Metamask
      // https://github.com/MetaMask/metamask-extension/issues/2393
      instance.votedEvent({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event triggered", event)
        // Reload when a new vote is recorded
        App.render();
      });
    });
  },

  render: function() {
    var QuizInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    arr = [];
    scoreflag = 1;
    // Load contract data
    App.contracts.Quiz.deployed().then(function(instance) {
      QuizInstance = instance;
      return QuizInstance.answersCount();
    }).then(function(answersCount) {
      var answersResults1 = $("#answersResults1");
      answersResults1.empty();

      var answersSelect1 = $('#answersSelect1');
      answersSelect1.empty();

      var answersResults2 = $("#answersResults2");
      answersResults2.empty();

      var answersSelect2 = $('#answersSelect2');
      answersSelect2.empty();

      var answersResults3 = $("#answersResults3");
      answersResults3.empty();

      var answersSelect3 = $('#answersSelect3');
      answersSelect3.empty();

      var answersResults4 = $("#answersResults4");
      answersResults4.empty();

      var answersSelect4 = $('#answersSelect4');
      answersSelect4.empty();

      var answersResults5 = $("#answersResults5");
      answersResults5.empty();

      var answersSelect5 = $('#answersSelect5');
      answersSelect5.empty();

      var userScore = $('#userScore');
      userScore.empty();

      var Message = $('#Message');
      Message.empty()

      for (var i = 1; i <= answersCount; i++) {
        var flag = 0; 
        for(var j=0;j<arr.length;j++)
        {
            if(i == arr[j]){
              flag = 1;
            }
        }
        if (flag==0){
          if(i==1 || i ==2){
            QuizInstance.answers1(i).then(function(answer) {
              var id = answer[0];
              var name = answer[1];
              var voteCount = answer[2];
    
              // Render answer Result
              var answerTemplate = "<tr><td><b>" + name + "</b></td><td><b>" + voteCount + "</b></td></tr>"
              answersResults1.append(answerTemplate);
    
              // Render answer ballot option
              var answerOption = "<input type='radio' name='Quiz_option1' value='"+ id +"'><label><-- "+name+"</label></input>"
              answersSelect1.append(answerOption);
            });
          }
          if(i==3 || i ==4){
            QuizInstance.answers2(i).then(function(answer) {
              var id = answer[0];
              var name = answer[1];
              var voteCount = answer[2];
    
              // Render answer Result
              var answerTemplate = "<tr><td><b>" + name + "</b></td><td><b>" + voteCount + "</b></td></tr>"
              answersResults2.append(answerTemplate);
    
              // Render answer ballot option
              var answerOption = "<input type='radio' name='Quiz_option2' value='"+ id +"'><label><-- "+name+"</label></input>"
              answersSelect2.append(answerOption);
            });
          }
          if(i==5 || i ==6){
            QuizInstance.answers3(i).then(function(answer) {
              var id = answer[0];
              var name = answer[1];
              var voteCount = answer[2];
    
              // Render answer Result
              var answerTemplate = "<tr><td><b>" + name + "</b></td><td><b>" + voteCount + "</b></td></tr>"
              answersResults3.append(answerTemplate);
    
              // Render answer ballot option
              var answerOption = "<input type='radio' name='Quiz_option3' value='"+ id +"'><label><-- "+name+"</label></input>"
              answersSelect3.append(answerOption);
            });
          }
          if(i==7 || i ==8){
            QuizInstance.answers4(i).then(function(answer) {
              var id = answer[0];
              var name = answer[1];
              var voteCount = answer[2];
    
              // Render answer Result
              var answerTemplate = "<tr><td><b>" + name + "</b></td><td><b>" + voteCount + "</b></td></tr>"
              answersResults4.append(answerTemplate);
    
              // Render answer ballot option
              var answerOption = "<input type='radio' name='Quiz_option4' value='"+ id +"'><label><-- "+name+"</label></input>"
              answersSelect4.append(answerOption);
            });
          }
          if(i==9 || i ==10){
            QuizInstance.answers5(i).then(function(answer) {
              var id = answer[0];
              var name = answer[1];
              var voteCount = answer[2];
    
              // Render answer Result
              var answerTemplate = "<tr><td><b>" + name + "</b></td><td><b>" + voteCount + "</b></td></tr>"
              answersResults5.append(answerTemplate);
    
              // Render answer ballot option
              var answerOption = "<input type='radio' name='Quiz_option5' value='"+ id +"'><label><-- "+name+"</label></input>"
              answersSelect5.append(answerOption);
            });
          }
          arr.push(i)
        }
      }
      return QuizInstance.voters1(App.account);
    }).then(function(hasVoted) {
      $('#table1').hide();
      // Do not allow a user to vote
      if(hasVoted) {
        $('#form1').hide();
        $('#table1').show();
      }
      loader.hide();
      content.show();
      return QuizInstance.voters2(App.account);
    }).then(function(hasVoted) {
      $('#table2').hide();
      // Do not allow a user to vote
      if(hasVoted) {
        $('#form2').hide();
        $('#table2').show();
      }
      loader.hide();
      content.show();
      return QuizInstance.voters3(App.account);
    }).then(function(hasVoted) {
      $('#table3').hide();
      // Do not allow a user to vote
      if(hasVoted) {
        $('#form3').hide();
        $('#table3').show();
      }
      loader.hide();
      content.show();
      return QuizInstance.voters4(App.account);
    }).then(function(hasVoted) {
      $('#table4').hide();
      // Do not allow a user to vote
      if(hasVoted) {
        $('#form4').hide();
        $('#table4').show();
      }
      loader.hide();
      content.show();
      return QuizInstance.voters5(App.account);
    }).then(function(hasVoted) {
      $('#table5').hide();
      // Do not allow a user to vote
      if(hasVoted) {
        $('#form5').hide();
        $('#table5').show();
      }
      loader.hide();
      content.show();
      return QuizInstance.scores(App.account);
    }).then(function(yourscores) {
      var yourmark = yourscores[2];
      if(scoreflag == 1 ){
        userScore.append(yourmark);
        scoreflag = 0;
        if(yourmark == 0){
          Message.append("Did you even study for the quiz?")
        }
        if(yourmark == 1){
          Message.append("Disappointing")
        }
        if(yourmark == 2){
          Message.append("You need to study more")
        }
        if(yourmark == 3){
          Message.append("Good. You can do better")
        }
        if(yourmark == 4){
          Message.append("Great. Keep it up")
        }
        if(yourmark == 5){
          Message.append("You are The Special One")
        }
      }
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },

  castVote1: function() {
    var answerId = $('input:radio[name=Quiz_option1]:checked').val();
    App.contracts.Quiz.deployed().then(function(instance) {
      return instance.vote1(answerId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

  castVote2: function() {
    var answerId = $('input:radio[name=Quiz_option2]:checked').val();
    App.contracts.Quiz.deployed().then(function(instance) {
      return instance.vote2(answerId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

  castVote3: function() {
    var answerId = $('input:radio[name=Quiz_option3]:checked').val();
    App.contracts.Quiz.deployed().then(function(instance) {
      return instance.vote3(answerId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

  castVote4: function() {
    var answerId = $('input:radio[name=Quiz_option4]:checked').val();
    App.contracts.Quiz.deployed().then(function(instance) {
      return instance.vote4(answerId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

  castVote5: function() {
    var answerId = $('input:radio[name=Quiz_option5]:checked').val();
    App.contracts.Quiz.deployed().then(function(instance) {
      return instance.vote5(answerId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
