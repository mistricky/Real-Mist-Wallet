import { Injectable } from "@wizardoc/injector";
import { Account as ETHAccount } from "web3-core";

@Injectable()
export class Account {
  private _ETHAccount: ETHAccount | undefined;
  private _password: string | undefined;
  private _keyStore: any;

  private get ETHAccount() {
    if (!this._ETHAccount) {
      throw new Error("The ETHAccount has not register yet");
    }

    return this._ETHAccount;
  }

  // input account information
  initETHAccount(ETHAccount: ETHAccount, password: string) {
    this._ETHAccount = ETHAccount;
    this._password = password;
    this._keyStore = ETHAccount.encrypt(password);
  }

  get password() {
    return this._password;
  }

  get address() {
    return this.ETHAccount.address;
  }

  get keyStore() {
    return this._keyStore;
  }
}
