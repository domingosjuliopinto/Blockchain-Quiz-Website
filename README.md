# Blockchain-Quiz-Website
This is a blockchain quiz website made by using HTML, JS, CSS and Blockchain technologies such as Solidity and Truffle.

## This Readme Contains
* [Introduction](#introduction)
* [Technologies used](#technologies-used)
* [Steps to Run](#steps-to-run)
* [Activity Diagram](#activity-diagram)
* [Screenshots](#screenshots)
* [References](#references)

## Introduction
The ability to take the quiz anytime and anywhere is provided by our quiz application. The user doesn't have to wait for the result since it's displayed once he/she answers one question thus time is saved. All users/students get the correct answer after he/she has answered. We have created a blockchain-based solution that enables students to complete online quiz without worrying about their privacy or security. HTML and CSS are used to construct user interfaces, and JavaScript and Solidity are used to execute and deploy smart contracts. The user can see how many have chosen which answer without knowing who chose what. Once the user answers a question, he/she cannot answer it again. The score of correct answers is displayed at the end. 

## Technologies Used: 
- NodeJs 
- Solidity
- Truffle
- HTML
- CSS
- Javascript 
- Ganache (For testing ethers)
- Metamask

## Steps to Run
* We first install all the prerequisites ie. NodeJs, Metamask, Truffle (Note: Truffle has to be downloaded by running the command 'npm install -g truffle' in the terminal)
* Open ganache. It gives us ten accounts for development purposes. 
* Connect Metamask to Ganache Network (Note: If first time then click on the add network option and then click add a new network manually. RPC Server Id will be in Ganache. Chain id should be 1337. currency will be ETH). 
* Then import account in metamask from ganache (Note: Click on the key icon besides the account to get the private key).
* In the terminal type 'truffle migrate --reset' 
(Note: If for this step you are getting error 'cannot be loaded because running scripts is disabled on this system.' then 
1. Open PowerShell as an administrator. Right-click on the PowerShell icon and select "Run as administrator."

2. In the PowerShell window, run the following command to check the current execution policy:

   Get-ExecutionPolicy
   
3. If the execution policy is set to "Restricted" or "AllSigned," it means that PowerShell scripts are blocked by default. To change the execution policy, run the following command:

   Set-ExecutionPolicy Unrestricted

4. You will be prompted to confirm the change. Type Y and press Enter.

5. After changing the execution policy, try running the script again.)

* Then type 'npm run dev' to run it
* Check metamask and see whether the account is connected to the website. If it's not connected, connect it by clicking on the 'connect site manually' option and then refresh

## Activity Diagram
![](diagram/Picture1.png)

## Screenshots
![Capture0](https://user-images.githubusercontent.com/71319075/199651813-e4e4fff9-85b0-4eed-8ecd-8fea51bd70e2.PNG)
![Capture1](https://user-images.githubusercontent.com/71319075/199651864-633bada7-5160-450d-9aef-bfcb8dc6ae65.PNG)
![Capture2](https://user-images.githubusercontent.com/71319075/199651936-1f1b8257-4e45-484e-b6c4-e99111b11df4.PNG)
![Capture3](https://user-images.githubusercontent.com/71319075/199652090-da5d15f3-e5a6-40db-b609-7f22ad140cb3.PNG)
![Capture4](https://user-images.githubusercontent.com/71319075/199652200-eb252579-aa67-46bc-9ee5-5d38e6ad255a.PNG)
![Capture5](https://user-images.githubusercontent.com/71319075/199652251-8ed5a2e2-6520-4718-9aca-fd8dffab4337.PNG)
![Capture6](https://user-images.githubusercontent.com/71319075/199652260-02bad6b4-b98a-4290-82c7-eec894822b6c.PNG)
![Capture7](https://user-images.githubusercontent.com/71319075/199652267-c747eaec-75ee-4997-aff7-87ce13df2b05.PNG)

## References
* <a href='https://youtu.be/3681ZYbDSSk'>https://youtu.be/3681ZYbDSSk</a>
* <a href='https://ethereum.stackexchange.com/questions/66202/undefined-results-for-web3-eth-accounts-in-truffle-console'>https://ethereum.stackexchange.com/questions/66202/undefined-results-for-web3-eth-accounts-in-truffle-console</a>
* <a href='https://www.sharepointdiary.com/2014/03/fix-for-powershell-script-cannot-be-loaded-because-running-scripts-is-disabled-on-this-system.html'>https://www.sharepointdiary.com/2014/03/fix-for-powershell-script-cannot-be-loaded-because-running-scripts-is-disabled-on-this-system.html</a>