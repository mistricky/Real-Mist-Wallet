import { Account as ETHAccount } from "web3-core";
import { extract } from "@wizardoc/injector";
import { DB } from "../db/connections";
import { User } from "../models/user.model";
import { Eth } from "web3-eth";
import { HTTPResponseError } from "../response/error";
import Web3 from "web3";

export class Account {
  private _ETHAccount: ETHAccount | undefined;
  private _RPC: Eth | undefined;
  private _keyStore: any;
  private passwordPromptInfo = "";

  private registry = extract(DB).conn.getRepository(User);

  private get RPC() {
    if (!this._RPC) {
      throw new Error("The RPC is undefined.");
    }

    return this._RPC;
  }

  private get ETHAccount() {
    if (!this._ETHAccount) {
      throw new Error("The Eth account is undefined.");
    }

    return this._ETHAccount;
  }

  // input account information
  constructor(private _userName: string, private _password: string) {}

  get userName() {
    return this._userName;
  }

  get password() {
    return this._password;
  }

  async getBalance() {
    const balance = await this.RPC.getBalance(this.address);

    return Web3.utils.fromWei(balance);
  }

  get address() {
    return this.ETHAccount.address;
  }

  get keyStore() {
    return this._keyStore;
  }

  setPasswordPromptInfo(info: string) {
    this.passwordPromptInfo = info;
  }

  // create a new account
  create(RPC: Eth) {
    this._ETHAccount = RPC.accounts.create(this.password);
    this._keyStore = this._ETHAccount.encrypt(this.password);
    this._RPC = RPC;

    return this.ETHAccount;
  }

  // unlock the account by keyStore
  async unlock(RPC: Eth) {
    const users = await this.registry.find({ userName: this._userName });

    if (!users.length) {
      throw new HTTPResponseError(
        `Cannot find the user which userName is ${this._userName}`
      );
    }

    this._RPC = RPC;

    try {
      this._ETHAccount = RPC.accounts.decrypt(
        JSON.parse(users[0].keyStore),
        this.password
      );
    } catch (e) {
      throw new HTTPResponseError(`Password mistake`);
    }

    return this;
  }

  save() {
    const user = new User();

    user.userName = this._userName;
    user.keyStore = this._keyStore;
    user.passwordPromptInfo = this.passwordPromptInfo;

    return this.registry.save(user);
  }
}
