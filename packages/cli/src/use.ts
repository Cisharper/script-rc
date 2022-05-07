import { mintNFT } from './script-rc';
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
async function main() {

//inputs
  let eth_str_json = '{	"name": "Royal Crow #503",	"description": "The Royal Crows Club has just thrown its grand opening party, with way too much champagne and confetti. It will be revealed soon!",	"image": "ipfs://QmcCBYuWNoobxUchnRAhanRpaK1XbvJP5YjqfMDQpCLrMJ/1.jpg",	"external_url": "",	"tokenId": 2,	"edition": 2,	"attributes": [{		"trait_type": "unrevealed",		"value": "unrevealed"}]}';
  const keypair = '/wallet/dev-rc.json';
  const env = 'devnet';
  let orig_sig = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
  let UserWallet = "3btVre38gtUQ8GXGNfePZEpeBqUy8z5cuwD5xpP2avoh";
  let collection_verify = "FeEFHu5Pbkied7zTtDYzQVyw6RAFFZVNKXjX3keC4XAG";
  let treasuryWallet = new PublicKey("7osbA4vs7gKtSf7JyNUgVJtTQz4SRg5gHgVvWnkMKnqn");


 await mintNFT(eth_str_json,keypair,env,orig_sig,UserWallet,collection_verify,treasuryWallet);



}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);