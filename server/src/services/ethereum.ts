import { Injectable } from "@wizardoc/injector";
import { WEB3 } from "./web3";
import { Eth } from "web3-eth";
import Crypto from "crypto";
import { Account } from "./account";

@Injectable()
export class Ethereum {
  private RPC: Eth;

  constructor(web3: WEB3, private account: Account) {
    this.RPC = web3.instance.eth;
  }

  createAccount(password: string) {
    this.account.initETHAccount(this.RPC.accounts.create(password), password);
  }
}
