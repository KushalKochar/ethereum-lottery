import { Injectable } from '@angular/core';
import {Web3Service} from '../app/util/web3.service'

@Injectable()
export class AppService {

  public web3ServiceInstance : Web3Service;

  constructor(private web3Service: Web3Service) {
    // this.web3ServiceInstance = null;
    console.log('Constructor: ' + web3Service);
    this.web3ServiceInstance = web3Service;
  }

}
