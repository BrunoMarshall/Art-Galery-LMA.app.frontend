import { action, observable } from 'mobx';
import { IStores } from 'stores';
import { statusFetching } from '../constants';
import * as blockchain from '../blockchain';

const defaults = {};

export class UserStoreEx {
  public stores: IStores;
  @observable public isAuthorized: boolean;
  public status: statusFetching;
  redirectUrl: string;

  private mathwallet: any;
  @observable public isMathWallet = false;

  @observable public sessionType: 'mathwallet' | 'ledger' | 'wallet';
  @observable public address: string;
  @observable public balance: string = '0';

  constructor() {
    setInterval(async () => {
      // @ts-ignore
      this.isMathWallet = !!window.onewallet;
      // @ts-ignore
      this.mathwallet = window.onewallet;

      if (this.address) {
        const res = await blockchain.getBalance(this.address);
        this.balance = res && res.result;
      }
    }, 3000);

    // @ts-ignore
    this.isMathWallet = !!window.onewallet;
    // @ts-ignore
    this.mathwallet = window.onewallet;

    const session = localStorage.getItem('harmony_session');

    const sessionObj = JSON.parse(session);

    if (sessionObj && sessionObj.address) {
      this.address = sessionObj.address;
      this.sessionType = sessionObj.sessionType;
      this.isAuthorized = true;

      blockchain
        .getBalance(this.address)
        .then(res => (this.balance = res && res.result));
    }
  }

  @action public signIn() {
    return this.mathwallet.getAccount().then(account => {
      this.sessionType = `mathwallet`;
      this.address = account.address;
      this.isAuthorized = true;

      this.syncLocalStorage();

      blockchain
        .getBalance(this.address)
        .then(res => (this.balance = res && res.result));

      return Promise.resolve();
    });
  }

  @action public signOut() {
    if (this.sessionType === 'mathwallet' && this.isMathWallet) {
      return this.mathwallet
        .forgetIdentity()
        .then(() => {
          this.sessionType = null;
          this.address = null;
          this.isAuthorized = false;
          this.balance = '0';

          this.syncLocalStorage();

          return Promise.resolve();
        })
        .catch(err => {
          console.error(err.message);
        });
    }
  }

  private syncLocalStorage() {
    localStorage.setItem(
      'harmony_session',
      JSON.stringify({
        address: this.address,
        sessionType: this.sessionType,
      }),
    );
  }

  @action public signTransaction(txn: any) {
    if (this.sessionType === 'mathwallet' && this.isMathWallet) {
      return this.mathwallet.signTransaction(txn);
    }
  }

  public saveRedirectUrl(url: string) {
    if (!this.isAuthorized && url) {
      this.redirectUrl = url;
    }
  }

  @action public reset() {
    Object.assign(this, defaults);
  }
}
