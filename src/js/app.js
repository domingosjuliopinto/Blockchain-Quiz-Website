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
    // Load contract data
    App.contracts.Quiz.deployed().then(function(instance) {
      QuizInstance = instance;
      return QuizInstance.candidatesCount();
    }).then(function(candidatesCount) {
      var candidatesResults1 = $("#candidatesResults1");
      candidatesResults1.empty();

      var candidatesSelect1 = $('#candidatesSelect1');
      candidatesSelect1.empty();

      var candidatesResults2 = $("#candidatesResults2");
      candidatesResults2.empty();

      var candidatesSelect2 = $('#candidatesSelect2');
      candidatesSelect2.empty();

      var candidatesResults3 = $("#candidatesResults3");
      candidatesResults3.empty();

      var candidatesSelect3 = $('#candidatesSelect3');
      candidatesSelect3.empty();

      var candidatesResults4 = $("#candidatesResults4");
      candidatesResults4.empty();

      var candidatesSelect4 = $('#candidatesSelect4');
      candidatesSelect4.empty();

      var candidatesResults5 = $("#candidatesResults5");
      candidatesResults5.empty();

      var candidatesSelect5 = $('#candidatesSelect5');
      candidatesSelect5.empty();

      for (var i = 1; i <= candidatesCount; i++) {
        var flag = 0; 
        for(var j=0;j<arr.length;j++)
        {
            if(i == arr[j]){
              flag = 1;
            }
        }
        if (flag==0){
          if(i==1 || i ==2){
            QuizInstance.candidates1(i).then(function(candidate) {
              var id = candidate[0];
              var name = candidate[1];
              var voteCount = candidate[2];
    
              // Render candidate Result
              var candidateTemplate = "<tr><td><b>" + name + "</b></td><td><b>" + voteCount + "</b></td></tr>"
              candidatesResults1.append(candidateTemplate);
    
              // Render candidate ballot option
              var candidateOption = "<input type='radio' name='Quiz_option1' value='"+ id +"'><label><-- "+name+"</label></input>"
              candidatesSelect1.append(candidateOption);
            });
          }
          if(i==3 || i ==4){
            QuizInstance.candidates2(i).then(function(candidate) {
              var id = candidate[0];
              var name = candidate[1];
              var voteCount = candidate[2];
    
              // Render candidate Result
              var candidateTemplate = "<tr><td><b>" + name + "</b></td><td><b>" + voteCount + "</b></td></tr>"
              candidatesResults2.append(candidateTemplate);
    
              // Render candidate ballot option
              var candidateOption = "<input type='radio' name='Quiz_option2' value='"+ id +"'><label><-- "+name+"</label></input>"
              candidatesSelect2.append(candidateOption);
            });
          }
          if(i==5 || i ==6){
            QuizInstance.candidates3(i).then(function(candidate) {
              var id = candidate[0];
              var name = candidate[1];
              var voteCount = candidate[2];
    
              // Render candidate Result
              var candidateTemplate = "<tr><td><b>" + name + "</b></td><td><b>" + voteCount + "</b></td></tr>"
              candidatesResults3.append(candidateTemplate);
    
              // Render candidate ballot option
              var candidateOption = "<input type='radio' name='Quiz_option3' value='"+ id +"'><label><-- "+name+"</label></input>"
              candidatesSelect3.append(candidateOption);
            });
          }
          if(i==7 || i ==8){
            QuizInstance.candidates4(i).then(function(candidate) {
              var id = candidate[0];
              var name = candidate[1];
              var voteCount = candidate[2];
    
              // Render candidate Result
              var candidateTemplate = "<tr><td><b>" + name + "</b></td><td><b>" + voteCount + "</b></td></tr>"
              candidatesResults4.append(candidateTemplate);
    
              // Render candidate ballot option
              var candidateOption = "<input type='radio' name='Quiz_option4' value='"+ id +"'><label><-- "+name+"</label></input>"
              candidatesSelect4.append(candidateOption);
            });
          }
          if(i==9 || i ==10){
            QuizInstance.candidates5(i).then(function(candidate) {
              var id = candidate[0];
              var name = candidate[1];
              var voteCount = candidate[2];
    
              // Render candidate Result
              var candidateTemplate = "<tr><td><b>" + name + "</b></td><td><b>" + voteCount + "</b></td></tr>"
              candidatesResults5.append(candidateTemplate);
    
              // Render candidate ballot option
              var candidateOption = "<input type='radio' name='Quiz_option5' value='"+ id +"'><label><-- "+name+"</label></input>"
              candidatesSelect5.append(candidateOption);
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
    }).catch(function(error) {
      console.warn(error);
    });
  },

  castVote1: function() {
    var candidateId = $('input:radio[name=Quiz_option1]:checked').val();
    App.contracts.Quiz.deployed().then(function(instance) {
      return instance.vote1(candidateId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

  castVote2: function() {
    var candidateId = $('input:radio[name=Quiz_option2]:checked').val();
    App.contracts.Quiz.deployed().then(function(instance) {
      return instance.vote2(candidateId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

  castVote3: function() {
    var candidateId = $('input:radio[name=Quiz_option3]:checked').val();
    App.contracts.Quiz.deployed().then(function(instance) {
      return instance.vote3(candidateId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

  castVote4: function() {
    var candidateId = $('input:radio[name=Quiz_option4]:checked').val();
    App.contracts.Quiz.deployed().then(function(instance) {
      return instance.vote4(candidateId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

  castVote5: function() {
    var candidateId = $('input:radio[name=Quiz_option5]:checked').val();
    App.contracts.Quiz.deployed().then(function(instance) {
      return instance.vote5(candidateId, { from: App.account });
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
