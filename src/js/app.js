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
    $.getJSON("Poll.json", function(Poll) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Poll = TruffleContract(Poll);
      // Connect provider to interact with contract
      App.contracts.Poll.setProvider(App.web3Provider);

      App.listenForEvents();

      return App.render();
    });
  },

  // Listen for events emitted from the contract
  listenForEvents: function() {
    App.contracts.Poll.deployed().then(function(instance) {
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
    var PollInstance;
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
    qarr = [];
    // Load contract data
    App.contracts.Poll.deployed().then(function(instance) {
      PollInstance = instance;
      return PollInstance.questionsCount();
    }).then(function(questionsCount){
      var questionSelect = $("#questionSelect");
      questionSelect.empty()

      for(var i=1; i <= questionsCount; i++){
        var flag = 0; 
        for(var j=0;j<qarr.length;j++)
        {
            if(i == qarr[j]){
              flag = 1;
            }
        }
        if (flag==0){
          PollInstance.questions(i).then(function(question) {
            var id = question[0];
            var ques = question[1];
  
            // Render candidate ballot option
            var questionNumber = "<p>Q."+id+" "+ques+"</p>";
            questionSelect.append(questionNumber);
          });
          qarr.push(i)
        }
      }return PollInstance.candidatesCount();
    }).then(function(candidatesCount) {
      var candidatesResults = $("#candidatesResults");
      candidatesResults.empty();

      var candidatesSelect = $('#candidatesSelect');
      candidatesSelect.empty();

      for (var i = 1; i <= candidatesCount; i++) {
        var flag = 0; 
        for(var j=0;j<arr.length;j++)
        {
            if(i == arr[j]){
              flag = 1;
            }
        }
        if (flag==0){
          PollInstance.candidates(i).then(function(candidate) {
            var id = candidate[0];
            var name = candidate[1];
            var voteCount = candidate[2];
  
            // Render candidate Result
            var candidateTemplate = "<tr><td><b>" + name + "</b></td><td><b>" + voteCount + "</b></td></tr>"
            candidatesResults.append(candidateTemplate);
  
            // Render candidate ballot option
            var candidateOption = "<input type='radio' name='poll_option' value='"+ id +"'><label><-- "+name+"</label></input>"
            candidatesSelect.append(candidateOption);
          });
          arr.push(i)
        }
      }
      return PollInstance.voters(App.account);
    }).then(function(hasVoted) {
      $('table').hide();
      // Do not allow a user to vote
      if(hasVoted) {
        $('form').hide();
        $('table').show();
      }
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },

  castVote: function() {
    var candidateId = $('input:radio[name=poll_option]:checked').val();
    App.contracts.Poll.deployed().then(function(instance) {
      return instance.vote(candidateId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
