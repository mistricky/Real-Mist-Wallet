import { Injectable } from "@wizardoc/injector";
import { WEB3 } from "./web3";
import { Eth } from "web3-eth";
import { Account } from "./account";

@Injectable()
export class Ethereum {
  private RPC: Eth;

  constructor(web3: WEB3) {
    this.RPC = web3.instance.eth;
  }

  createAccount(userName: string, password: string) {
    const account = new Account(userName, password);

    account.create(this.RPC);

    return account;
  }

  unlockAccount(userName: string, password: string) {
    return new Account(userName, password).unlock(this.RPC);
  }
}
