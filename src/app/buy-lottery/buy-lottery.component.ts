import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service'
import {KeyPair } from '../util/web3.service'
import { default as Web3} from 'web3';

@Component({
  selector: 'app-buy-lottery',
  templateUrl: './buy-lottery.component.html',
  styleUrls: ['./buy-lottery.component.css']
})
export class BuyLotteryComponent implements OnInit {

  public selectedAmount : number;


  public participantsNo: number;
  public potAmount: number;
  public minStake: number;
  public winner: string;
  public adminAddress: string;
  public isGameClosed: boolean;
  

  constructor(public appObject : AppService) {
    this.selectedAmount = 1000000000000 ;
    console.log("the appobject is :", this.appObject);
    // while(this.appObject.web3ServiceInstance.loader){
      
    // }

    setTimeout(() => {
      console.log("timeout");
    },50000)
    this.getLotteryDetails();
    
   }

  ngOnInit() {
    
  }



  // getLotteryDetails1(){

  //   this.appObject.web3ServiceInstance.Lottery.then(function(temp1){
      
  //     temp1.deployed().then(function(instance) {
  //     this.participantsNo = instance.getNrOfParticipants.call({from: this.appObject.web3ServiceInstance.defaultAccount});    
  //     this.potAmount = instance.getPot.call({from: this.appObject.web3ServiceInstance.defaultAccount});    
  //     this.minStake = instance.getMinimumStakeInWei.call({from: this.appObject.web3ServiceInstance.defaultAccount});    
  //     this.winner = instance.getWinner.call({from: this.appObject.web3ServiceInstance.defaultAccount});    
  //     // this.adminAddress = await deployedLottery.isGameClosed.call({from: this.appObject.web3ServiceInstance.selectedKeyPair.publicKey});    
  //     this.isGameClosed = instance.isGameClosed.call({from: this.appObject.web3ServiceInstance.defaultAccount});    
  //   });
  // }); 
    

  // }

  async getLotteryDetails(){
    const deployedLottery = await this.appObject.web3ServiceInstance.Lottery.deployed();
    
    this.participantsNo = await deployedLottery.getNrOfParticipants.call({from: this.appObject.web3ServiceInstance.selectedKeyPair.publicKey});    
    this.potAmount = await deployedLottery.getPot.call({from: this.appObject.web3ServiceInstance.selectedKeyPair.publicKey});    
    this.minStake = await deployedLottery.getMinimumStakeInWei.call({from: this.appObject.web3ServiceInstance.selectedKeyPair.publicKey});    
    this.winner = await deployedLottery.getWinner.call({from: this.appObject.web3ServiceInstance.selectedKeyPair.publicKey});    

    // this.winner = this.appObject.web3ServiceInstance.publicAndPrivateKeys.find(a => a.publicKey==winnerAddress)? this.appObject.web3ServiceInstance.publicAndPrivateKeys.find(a => a.publicKey==winnerAddress).name : "None";

    // this.adminAddress = await deployedLottery.isGameClosed.call({from: this.appObject.web3ServiceInstance.selectedKeyPair.publicKey});    
    this.isGameClosed = await deployedLottery.isGameClosed.call({from: this.appObject.web3ServiceInstance.selectedKeyPair.publicKey});    
  }

  async endLottery(){

    console.log("inside endLottery : ", this.appObject );

    const deployedLottery = await this.appObject.web3ServiceInstance.Lottery.deployed();
    console.log("deployedMetaCoin", deployedLottery);
    const transaction = await deployedLottery.endLottery.sendTransaction({from: this.appObject.web3ServiceInstance.account});    

    
    console.log("transaction", transaction);
    this.getLotteryDetails();

  }

  async resetLottery(){

    console.log("inside endLottery : ", this.appObject );

    const deployedLottery = await this.appObject.web3ServiceInstance.Lottery.deployed();
    console.log("deployedMetaCoin", deployedLottery);
    const transaction = await deployedLottery.resetLottery(1000000000000,{from: this.appObject.web3ServiceInstance.account, value: 0});

    
    console.log("transaction", transaction);
    this.getLotteryDetails();

  }

  async rescueInitialAmountIfNobodyPlayed(){

    console.log("inside endLottery : ", this.appObject );

    const deployedLottery = await this.appObject.web3ServiceInstance.Lottery.deployed();
    console.log("deployedMetaCoin", deployedLottery);
    const transaction = await deployedLottery.rescueInitialAmountIfNobodyPlayed({from: this.appObject.web3ServiceInstance.selectedKeyPair.publicKey, value: 1000000000000});

    
    console.log("transaction", transaction);
    this.getLotteryDetails();

  }

  async initiateLottery(){

    console.log("inside initiatelottery : ", this.appObject );

    const deployedLottery = await this.appObject.web3ServiceInstance.Lottery.deployed();
    console.log("deployedMetaCoin", deployedLottery);
    const transaction = await deployedLottery.isGameClosed.call({from: this.appObject.web3ServiceInstance.selectedKeyPair.publicKey});    

    
    console.log("transaction", transaction);

  }
  async noOfParticipants(){
    const deployedLottery = await this.appObject.web3ServiceInstance.Lottery.deployed();
    console.log("deployedMetaCoin", deployedLottery);
    const transaction = await deployedLottery.getParticipants.call({from: this.appObject.web3ServiceInstance.selectedKeyPair.publicKey});    

    
    console.log("transaction", transaction);
  }

  async buyLottery(){
    console.log("inside buyLottery : ", this.appObject );

    const deployedLottery = await this.appObject.web3ServiceInstance.Lottery.deployed();
    console.log("deployedMetaCoin", deployedLottery);
    const transaction = await deployedLottery.placeBets.sendTransaction({from: this.appObject.web3ServiceInstance.account, value: this.selectedAmount});    

    
    console.log("transaction", transaction);
    this.getLotteryDetails();
  }

  selectedKeyPairChange(){
    if(this.appObject.web3ServiceInstance.selectedKeyPair == this.appObject.web3ServiceInstance.publicAndPrivateKeys[0]){
      this.appObject.web3ServiceInstance.isAdmin = true;
      console.log("inside true");
    }else{
      console.log("inside false");
      this.appObject.web3ServiceInstance.isAdmin = false;
    }
    
    console.log("seleccted key pair is : ", this.appObject.web3ServiceInstance.selectedKeyPair);
    this.getLotteryDetails();
  }

}
