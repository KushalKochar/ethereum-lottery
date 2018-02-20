import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-lottery-details',
  templateUrl: './lottery-details.component.html',
  styleUrls: ['./lottery-details.component.css']
})
export class LotteryDetailsComponent implements OnInit {

  public participantsNo: number;
  public potAmount: number;
  public minStake: number;
  public winner: string;
  public adminAddress: string;
  public isGameClosed: boolean;


  constructor(public appObject : AppService) {
    setTimeout(this.getLotteryDetails(), 10000000);
    // this.getLotteryDetails();
   }
  ngOnInit() {
    
  }

  async getLotteryDetails(){
    console.log("eher");



    const deployedLottery = await this.appObject.web3ServiceInstance.Lottery.deployed();
    
    this.participantsNo = await deployedLottery.getNrOfParticipants.call({from: this.appObject.web3ServiceInstance.selectedKeyPair.publicKey});    
    this.potAmount = await deployedLottery.getPot.call({from: this.appObject.web3ServiceInstance.selectedKeyPair.publicKey});    
    this.minStake = await deployedLottery.getMinimumStakeInWei.call({from: this.appObject.web3ServiceInstance.selectedKeyPair.publicKey});    
    this.winner = await deployedLottery.getWinner.call({from: this.appObject.web3ServiceInstance.selectedKeyPair.publicKey});    
    // this.adminAddress = await deployedLottery.isGameClosed.call({from: this.appObject.web3ServiceInstance.selectedKeyPair.publicKey});    
    this.isGameClosed = await deployedLottery.isGameClosed.call({from: this.appObject.web3ServiceInstance.selectedKeyPair.publicKey});    




  }

}
