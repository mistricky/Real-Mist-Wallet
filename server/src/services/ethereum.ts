import { Injectable } from "@wizardoc/injector";
import { WEB3 } from "./web3";
import { Transaction } from "ethereumjs-tx";
import { Eth } from "web3-eth";
import { Account } from "./account";
import Web3 from "web3";
import { BN } from "ethereumjs-util";
import { Network } from "./network";

export interface TransferPayload {
  addr: string;
  gas: string;
  gasPrice: string;
  data: string;
  password: string;
  balance: string;
}

@Injectable()
export class Ethereum {
  private RPC: Eth;

  constructor(web3: WEB3, private network: Network) {
    this.RPC = web3.instance.eth;
  }

  restoreAccount(userName: string, password: string, mnemonic: string) {
    return new Account(userName, password).restore(this.RPC, mnemonic);
  }

  createAccount(userName: string, password: string) {
    return new Account(userName, password).create(this.RPC);
  }

  unlockAccount(userName: string, password: string) {
    return new Account(userName, password).unlock(this.RPC);
  }

  async sendTX(
    idName: string,
    { password, gasPrice, data, addr, gas, balance }: TransferPayload
  ) {
    const account = await this.unlockAccount(idName, password);
    const toHex = (stuff: number | string | BN) => Web3.utils.toHex(stuff);
    const count = await this.RPC.getTransactionCount(account.address);

    console.info(account.address);

    // (rawTX as any).gasLimit = toHex(await this.RPC.estimateGas(rawTX));

    console.info(Web3.utils.toHex(Web3.utils.toWei("0.1", "ether")));

    const tx = new Transaction(
      {
        nonce: count,
        gasPrice: toHex(Web3.utils.toWei(gasPrice, "gwei")),
        data: toHex(data),
        to: addr,
        value: Web3.utils.toHex(Web3.utils.toWei(balance, "ether")),
        gasLimit: toHex(gas),
      },
      { chain: this.network.currentNetwork }
    );

    tx.sign(Buffer.from(account.privateKey.slice(2), "hex"));

    return this.RPC.sendSignedTransaction(
      "0x" + tx.serialize().toString("hex")
    );
  }
}
