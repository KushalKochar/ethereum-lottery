import {Injectable} from '@angular/core';
import { default as Web3} from 'web3';
import {default as contract} from 'truffle-contract';
import {Subject} from 'rxjs/Rx';
import lottery_artifacts from '../../../build/contracts/Lottery.json';

declare let window: any;

export class KeyPair{
  publicKey: string;
  privateKey: string;
  name: string;
}

@Injectable()
export class Web3Service {
  public web3: Web3;
  private accounts: string[];
  public account: string;
  public defaultAccount: string;
  public ready = false;
  public Lottery: any;
  public accountsObservable = new Subject<string[]>();
  public publicAndPrivateKeys: KeyPair[];
  public selectedKeyPair : KeyPair;
  public isAdmin: boolean;
  public loader: boolean;

  constructor() {
    this.publicAndPrivateKeys = [
      {publicKey: '0x28Da796Ac6B3b6C228a0fbf74C6CE37614Acc289',privateKey: 'NOT_REQUIRED', name: 'User1'}
    ];
    this.selectedKeyPair = this.publicAndPrivateKeys[0];
    this.isAdmin = false;
    this.loader = true;
    this.defaultAccount = "0x28Da796Ac6B3b6C228a0fbf74C6CE37614Acc289";
    // this.bootstrapWeb3();
    
    // window.addEventListener('load', (event) => {
    //   this.bootstrapWeb3();
    // });
  }

  

  public bootstrapWeb3() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    console.log("this is window.web3 : ", window.web3);
    if (typeof window.web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);

    } else {
      console.log('No web3? You should consider trying MetaMask!');

      // Hack to provide backwards compatibility for Truffle, which uses web3js 0.20.x
      Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
      // this.web3.eth.defaultAccount = window.web3.eth.accounts[0];
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));
    }
    

    // this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));

    console.log("this.web is : ", this.web3);


    this.artifactsToContract(lottery_artifacts)
    .then((LotteryAbstraction) => {
      console.log("lotter abst : ",LotteryAbstraction );
      this.Lottery = LotteryAbstraction;
      this.loader = false;
    });

    // setInterval(() => this.refreshAccounts(), 10000);
  }


  public async artifactsToContract(artifacts) {
    if (!this.web3) {
      const delay = new Promise(resolve => setTimeout(resolve, 100));
      await delay;
      return await this.artifactsToContract(artifacts);
    }

    console.log('current provider is :', this.web3.currentProvider);

    const contractAbstraction = contract(artifacts);
    contractAbstraction.setProvider(this.web3.currentProvider);

    if (typeof contractAbstraction.currentProvider.sendAsync !== "function") {
      contractAbstraction.currentProvider.sendAsync = function() {
        return contractAbstraction.currentProvider.send.apply(
          contractAbstraction.currentProvider, arguments
        );
      };
    }

    console.log('contractAbstraction is :', contractAbstraction);


    contractAbstraction.setProvider(this.web3.currentProvider);
    contractAbstraction.at("0x00984bbb64d84f8fcbad9d8d8bb5663c3cbb1b92");

    // Get the initial account balance so it can be displayed.
    this.web3.eth.getAccounts((err, accs) => {
      if (err != null) {
        alert('There was an error fetching your accounts.');
        return;
      }

      if (accs.length === 0) {
        alert(
          'Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.'
        );
        return;
      }
      this.accounts = accs;
      console.log("accounts are : ", this.accounts);
      this.account = this.accounts[0];
      console.log("this account is : ", this.account);
      this.isAdminOrNot();
    });

    return contractAbstraction;

  }

  private isAdminOrNot(){
    if( this.account.toLowerCase() === "0x661157a9148f400973517b609d4436dec9c54c82"){
      this.isAdmin = true;
      console.log("inside true");
    }else{
      console.log("inside false");
      this.isAdmin = false;
    }

  }

  private refreshAccounts() {
    console.log("this is the web3 eth : ", this.web3.eth);
    this.web3.eth.getAccounts((err, accs) => {
      console.log('Refreshing accounts');
      if (err != null) {
        console.warn('There was an error fetching your accounts.');
        return;
      }

      // Get the initial account balance so it can be displayed.
      if (accs.length === 0) {
        console.warn('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
        return;
      }

      console.log("this is the accounts : ", accs);

      if (!this.accounts || this.accounts.length !== accs.length || this.accounts[0] !== accs[0]) {
        console.log('Observed new accounts');

        this.accountsObservable.next(accs);
        this.accounts = accs;
        
      }

      this.ready = true;
    });
  }
}
