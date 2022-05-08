import { mintNFT } from './script-rc';
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import {
    getProgramAccounts,
    loadCandyProgramV2,
    loadWalletKey,
    AccountAndPubkey,
    deriveCandyMachineV2ProgramAddress,
    getCollectionPDA,
} from './helpers/accounts';
async function main() {

//inputs
    const keypair = loadWalletKey('/wallet/dev-rc.json');

  const env = 'devnet';
  let orig_sig = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
  let UserWallet = "3btVre38gtUQ8GXGNfePZEpeBqUy8z5cuwD5xpP2avoh";
  let collection_verify = "FeEFHu5Pbkied7zTtDYzQVyw6RAFFZVNKXjX3keC4XAG";
  let treasuryWallet = new PublicKey("7osbA4vs7gKtSf7JyNUgVJtTQz4SRg5gHgVvWnkMKnqn");
  let url_json = "https://xxxxxxx";

 //await mintNFT(url_json,keypair,env,orig_sig,UserWallet,collection_verify,treasuryWallet);



}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);