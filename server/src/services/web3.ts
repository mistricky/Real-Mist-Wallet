import Web3 from "web3";
import { Injectable } from "@wizardoc/injector";
import { Network, NetWorks } from "./network";

@Injectable()
export class WEB3 {
  private _instance: Web3;

  constructor(private network: Network) {
    this._instance = this.genInstance(this.network.addr);
  }

  private genInstance(addr: string) {
    return new Web3(new Web3.providers.HttpProvider(addr));
  }

  checkoutNetwork(network: NetWorks) {
    this._instance = this.genInstance(this.network.checkoutNetwork(network));
  }

  get instance() {
    return this._instance;
  }
}
