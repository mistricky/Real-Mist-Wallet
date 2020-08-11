import { Injectable } from "@wizardoc/injector";

export enum NetWorks {
  Main = "mainnet",
  Repsten = "repsten",
  Kovan = "kovan",
  Rinkeby = "rinkeby",
}

@Injectable()
export class Network {
  private _currentNetwork = NetWorks.Kovan;

  private genRPCAddr(network: NetWorks) {
    // TODO: separate the addr string
    return `https://${network}.infura.io/v3/c4b5e337673b4b4eb08ab9a0cf19e0b1`;
  }

  checkoutNetwork(network: NetWorks) {
    this._currentNetwork = network;

    return this.genRPCAddr(network);
  }

  get addr() {
    return this.genRPCAddr(this._currentNetwork);
  }

  get currentNetwork() {
    return this._currentNetwork;
  }
}
