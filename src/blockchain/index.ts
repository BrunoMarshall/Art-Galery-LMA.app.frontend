const { Harmony } = require('@harmony-js/core');
const { ChainID, ChainType } = require('@harmony-js/utils');

export const EXPLORER_URL = 'https://explorer.harmony.one/#';

const GAS_LIMIT = 103802;
const GAS_PRICE = 1000000000;

const hmy = new Harmony('https://api.s0.t.hmny.io', {
  chainType: ChainType.Harmony,
  chainId: ChainID.HmyMainnet,
});

const contractJson = require('./SoccerPlayers.json');
// const contractAddrTestnet = '0x0Fc3269F1ED6807aD96C62b66fAfdE2C02f9a76b';
const contractAddr = '0xAA557003A04e75626dAcA70d8A70E717F8F987fc';

const soccerPlayers = hmy.contracts.createContract(
  contractJson.abi,
  contractAddr,
);

const a = soccerPlayers.wallet.createAccount();

// soccerPlayers.wallet.signTransaction = () => { console.log('SIGN') }

const options = {
  gasPrice: GAS_PRICE,
  gasLimit: GAS_LIMIT,
};

const instance = soccerPlayers.methods;

export const getList = async () => {
  let total = await instance.totalSupply().call(options);

  const cards = [];

  for (let i = 0; i < total; i++) {
    let res = await instance.getPlayer(i).call(options);
    cards.push(res);
  }

  return cards;
};

export const getPlayerById = async id => {
  const res = await instance.getPlayer(id).call(options);

  return res;
};

export const getTotalPlayers = async () => {
  const res = await instance.totalSupply().call(options);

  return res;
};

export const buyPlayerById = (params: {
  id: string;
  price: string;
  signer: string;
}): Promise<{ status: string; transaction: { id: string } }> => {
  return new Promise(async (resolve, reject) => {
    try {
      soccerPlayers.wallet.defaultSigner = params.signer;

      soccerPlayers.wallet.signTransaction = async tx => {
        try {
          tx.from = params.signer;
          // @ts-ignore
          const signTx = await window.onewallet.signTransaction(tx);

          // const [sentTx, txHash] = await signTx.sendTransaction();

          // await sentTx.confirm(txHash);

          // resolve(txHash);
          return signTx;
        } catch (e) {
          console.error(e);
          reject(e);
        }

        return null;
      };

      const res = await soccerPlayers.methods
        .purchase(params.id)
        .send({ ...options, value: params.price });

      resolve(res);
    } catch (e) {
      console.error(e);

      reject(e);
    }
  });
};

export const getBech32Address = address =>
  hmy.crypto.getAddress(address).bech32;

export const getBalance = address => {
  return hmy.blockchain.getBalance({ address });
};
