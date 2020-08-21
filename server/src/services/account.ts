import { Account as ETHAccount } from "web3-core";
import { extract } from "@wizardoc/injector";
import { DB } from "../db/connections";
import { User } from "../models/user.model";
import { Eth } from "web3-eth";
import { HTTPResponseError } from "../response/error";
import Web3 from "web3";
import * as BIP39 from "bip39";
import * as BIP32 from "bip32";

export class Account {
  private _ETHAccount?: ETHAccount;
  private _RPC?: Eth;
  private _keyStore: any;
  private passwordPromptInfo = "";
  private _mnemonic?: string;

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

  get mnemonic() {
    return this._mnemonic;
  }

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

  get privateKey() {
    return this.ETHAccount.privateKey;
  }

  setPasswordPromptInfo(info: string) {
    this.passwordPromptInfo = info;
  }

  // restore identity
  async restore(RPC: Eth, mnemonic: string) {
    const seed = await BIP39.mnemonicToSeed(mnemonic);

    this._ETHAccount = RPC.accounts.privateKeyToAccount(
      BIP32.fromSeed(seed)
        .derivePath("m/44'/60'/0'/0/0")
        .privateKey!.toString("hex")
    );

    this._mnemonic = mnemonic;
    this._keyStore = this._ETHAccount.encrypt(this.password);
    this._RPC = RPC;

    return this;
  }

  // create a new account
  create(RPC: Eth) {
    const mnemonic = BIP39.generateMnemonic();

    return this.restore(RPC, mnemonic);
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
    this._keyStore = users[0].keyStore;

    try {
      this._ETHAccount = RPC.accounts.decrypt(
        JSON.parse(this._keyStore),
        this.password
      );
    } catch (e) {
      throw new HTTPResponseError(`Password mistake`);
    }

    return this;
  }

  save() {
    const user = new User();

    console.info(this._userName, this._keyStore, this.passwordPromptInfo);

    user.userName = this._userName;
    user.keyStore = this._keyStore;
    user.passwordPromptInfo = this.passwordPromptInfo;

    return this.registry.save(user);
  }
}
