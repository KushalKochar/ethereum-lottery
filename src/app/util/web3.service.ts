import {Injectable} from '@angular/core';
import Web3 from 'web3';
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
  private web3: Web3;
  private accounts: string[];
  public ready = false;
  public Lottery: any;
  public accountsObservable = new Subject<string[]>();
  public publicAndPrivateKeys: KeyPair[];
  public selectedKeyPair : KeyPair;
  public isAdmin: boolean;
  public loader: boolean;

  constructor() {
    this.publicAndPrivateKeys = [
      {publicKey: '0x627306090abab3a6e1400e9345bc60c78a8bef57',privateKey: 'c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3', name: 'User1'},
      {publicKey: '0xf17f52151ebef6c7334fad080c5704d77216b732',privateKey: 'ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f', name: 'User2'},
      {publicKey: '0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef',privateKey: '0dbbe8e4ae425a6d2687f1a7e3ba17bc98c673636790f1b8ad91193c05875ef1', name: 'User3'},
      {publicKey: '0x821aea9a577a9b44299b9c15c88cf3087f3b5544',privateKey: 'c88b703fb08cbea894b6aeff5a544fb92e78a18e19814cd85da83b71f772aa6c', name: 'User4'},
      {publicKey: '0x0d1d4e623d10f9fba5db95830f7d3839406c6af2',privateKey: '388c684f0ba1ef5017716adb5d21a053ea8e90277d0868337519f97bede61418', name: 'User5'},
      {publicKey: '0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e',privateKey: '659cbb0e2411a44db63778987b1e22153c086a95eb6b18bdf89de078917abc63', name: 'User6'}
    ];
    this.selectedKeyPair = this.publicAndPrivateKeys[0];
    this.isAdmin = true;
    this.loader = true;
    
    window.addEventListener('load', (event) => {
      this.bootstrapWeb3();
    });
  }

  

  public bootstrapWeb3() {
    // // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    // console.log("this is window.web3 : ", window.web3);
    // if (typeof window.web3 !== 'undefined') {
    //   // Use Mist/MetaMask's provider
    //   this.web3 = new Web3(window.web3.currentProvider);
    // } else {
    //   console.log('No web3? You should consider trying MetaMask!');

    //   // Hack to provide backwards compatibility for Truffle, which uses web3js 0.20.x
    //   Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
    //   // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    //   this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));
    // }

    

    this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));


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
    return contractAbstraction;

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
