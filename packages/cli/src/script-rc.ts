#!/usr/bin/env ts-node
import * as fs from 'fs';
import * as path from 'path';
import { InvalidArgumentError, program } from 'commander';
import * as anchor from '@project-serum/anchor';
import { BN } from '@project-serum/anchor';
import {
  chunks,
  fromUTF8Array,
  getCandyMachineV2Config,
  parseCollectionMintPubkey,
  parsePrice,
} from './helpers/various';
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import {
  CACHE_PATH,
  CONFIG_LINE_SIZE_V2,
  EXTENSION_JSON,
  CANDY_MACHINE_PROGRAM_V2_ID,
  CONFIG_ARRAY_START_V2,
} from './helpers/constants';
import {
  getProgramAccounts,
  loadCandyProgramV2,
  loadWalletKey,
  AccountAndPubkey,
  deriveCandyMachineV2ProgramAddress,
  getCollectionPDA,
} from './helpers/accounts';

import { uploadV2 } from './commands/upload';
import { verifyTokenMetadata } from './commands/verifyTokenMetadata';
import { loadCache, saveCache } from './helpers/cache';
import { mintV2 } from './commands/mint';
import { signMetadata } from './commands/sign';
import {
  getAddressesByCreatorAddress,
  signAllMetadataFromCandyMachine,
} from './commands/signAll';
import { getOwnersByMintAddresses } from './commands/owners';
import log from 'loglevel';
import { withdrawV2 } from './commands/withdraw';
import { updateFromCache } from './commands/updateFromCache';
import { StorageType } from './helpers/storage-type';
import { getType } from 'mime';
import { removeCollection } from './commands/remove-collection';
import { setCollection } from './commands/set-collection';
import { withdrawBundlr } from './helpers/upload/arweave-bundle';
import { CollectionData } from './types';

program.version('0.0.2');
const supportedImageTypes = {
  'image/png': 1,
  'image/gif': 1,
  'image/jpeg': 1,
};
const supportedAnimationTypes = {
  'video/mp4': 1,
  'video/quicktime': 1,
  'audio/mpeg': 1,
  'audio/x-flac': 1,
  'audio/wav': 1,
  'model/gltf-binary': 1,
  'text/html': 1,
};

if (!fs.existsSync(CACHE_PATH)) {
  fs.mkdirSync(CACHE_PATH);
}
log.setLevel(log.levels.INFO);

// From commander examples
function myParseInt(value) {
  // parseInt takes a string and a radix
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new InvalidArgumentError('Not a number.');
  }
  return parsedValue;
}

export type MintResult = {
  metadataAccount: PublicKey;
  mint: PublicKey;
  sig: string;
};


export const mintNFT = async (
  url_json: string,
  keypair: string,
  env: "mainnet-beta" | "devnet",
  orig_sig: string,
  UserWallet: string,
  collection_verify: string,
    treasuryWallet: PublicKey,
    cache_path: string,
): Promise<MintResult | void> => {




 //inputs
 // let eth_str_json = '{	"name": "Royal Crow #2",	"description": "The Royal Crows Club has just thrown its grand opening party, with way too much champagne and confetti. It will be revealed soon!",	"image": "ipfs://QmcCBYuWNoobxUchnRAhanRpaK1XbvJP5YjqfMDQpCLrMJ/1.jpg",	"external_url": "",	"tokenId": 2,	"edition": 2,	"attributes": [{		"trait_type": "unrevealed",		"value": "unrevealed"}]}';
 // const keypair = '/wallet/dev-test-candy-v2.json';
 // const env = 'devnet';
 // let orig_sig = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
 // let UserWallet = "7DVhDtnzja38fHLk5g2ECmgcWFLwkqutTaArykmymup4";
 // let collection_verify = "E8iMhUTdRPX1C6cGGv4nocSs2b6Zk21ew1WGHos24Xh1";
 // let treasuryWallet = new PublicKey("7osbA4vs7gKtSf7JyNUgVJtTQz4SRg5gHgVvWnkMKnqn");








 // let eth_obj_json = JSON.parse(eth_str_json);
 // log.info(eth_obj_json);
 // let sol_str_json = '{    "name": "Royal Crow #2300",    "symbol": "RC",    "description": "RC unrevealed",    "attributes": [      {        "trait_type": "unrevealed",        "value": "unrevealed"       }    ],    "collection": {       "name": "RC name",       "family": "RC family"     },    "seller_fee_basis_points": 500,    "image": "image.png",    "properties": {      "creators": [        {         "address": "7osbA4vs7gKtSf7JyNUgVJtTQz4SRg5gHgVvWnkMKnqn",          "share": 100}      ],"files": [{ "uri": "image.jpg", "type": "image/jpg" }]}  }';
 // let sol_obj_json = JSON.parse(sol_str_json);
 // sol_obj_json.name = eth_obj_json.name;
//  sol_obj_json.description = eth_obj_json.description;
 // sol_obj_json.attributes = eth_obj_json.attributes;
 // sol_obj_json.image = eth_obj_json.image;
  //sol_obj_json.url = eth_obj_json.image;
 // log.info(sol_obj_json);
  

 

 
   // fs.writeFile(cache_path+"/0.json", JSON.stringify(sol_obj_json), function (err) {
   // if (err) {
   //   console.log(err);
   // }
 // });


  

  const cacheName = 'dev-test192392';
  const configPath = '/metaplex/config.json';
  const rpcUrl = '';
  const rateLimit = 0;
  let collectionMint;
  const setCollectionMint = false;

    const path_json = cache_path;

  let files = fs.readdirSync(`${path_json}`).map(file => path.join(path_json, file));

    const walletKeyPair = keypair;
  const anchorProgram = await loadCandyProgramV2(walletKeyPair, env, rpcUrl);


  


  let storage = StorageType.Arweave;

  let nftStorageKey;
  let nftStorageGateway;
  let ipfsInfuraProjectId;
  let number = 1;
  let ipfsInfuraSecret;
  let pinataJwt;
  let pinataGateway;
  let arweaveJwk;
  let awsS3Bucket;
  let retainAuthority;
  let mutable;
  let batchSize;
  let price = new BN('1');
  let splToken;
  
  let gatekeeper;
  let endSettings;
  let hiddenSettings;
  let whitelistMintSettings;
  let goLiveDate;
  let uuid;
  

  

  if (!Object.values(StorageType).includes(storage)) {
    throw new Error(
      `Storage option must either be ${Object.values(StorageType).join(
        ', ',
      )}. Got: ${storage}`,
    );
  }
  const ipfsCredentials = {
    projectId: ipfsInfuraProjectId,
    secretKey: ipfsInfuraSecret,
  };

  let imageFileCount = 0;
  let animationFileCount = 0;
  let jsonFileCount = 0;

  // Filter out any non-supported file types and find the JSON vs Image file count
  const supportedFiles = files.filter(it => {
    if (supportedImageTypes[getType(it)]) {
      imageFileCount++;
    } else if (supportedAnimationTypes[getType(it)]) {
      animationFileCount++;
    } else if (it.endsWith(EXTENSION_JSON)) {
      jsonFileCount++;
    } else {
      log.warn(`WARNING: Skipping unsupported file type ${it}`);
      return false;
    }

    return true;
  });

  if (animationFileCount !== 0 && storage === StorageType.Arweave) {
    throw new Error(
      'The "arweave" storage option is incompatible with animation files. Please try again with another storage option using `--storage <option>`.',
    );
  }

 // if (animationFileCount !== 0 && animationFileCount !== jsonFileCount) {
   // throw new Error(
   //   `number of animation files (${animationFileCount}) is different than the number of json files (${jsonFileCount})`,
  //  );
 // } else if (imageFileCount !== jsonFileCount) {
  //  throw new Error(
  //    `number of img files (${imageFileCount}) is different than the number of json files (${jsonFileCount})`,
   // );
 // }

  const elemCount = number ? number : imageFileCount;
  if (elemCount < imageFileCount) {
    throw new Error(
      `max number (${elemCount}) cannot be smaller than the number of images in the source folder (${imageFileCount})`,
    );
  }

  if (animationFileCount === 0) {
    log.info(`Beginning the upload for ${elemCount} (img+json) pairs`);
  } else {
    log.info(
      `Beginning the upload for ${elemCount} (img+animation+json) sets`,
    );
  }

  const collectionMintPubkey = await parseCollectionMintPubkey(
    collectionMint,
    anchorProgram.provider.connection,
    walletKeyPair,
  );

  const startMs = Date.now();
  log.info('started at: ' + startMs.toString());
  try {
 
      let res = await uploadV2({
          url_json,
      orig_sig,
      UserWallet,
      collection_verify,
      files: supportedFiles,
      cacheName,
      env,
      totalNFTs: elemCount,
      gatekeeper,
      storage,
      retainAuthority,
      mutable,
      nftStorageKey,
      nftStorageGateway,
      ipfsCredentials,
      pinataJwt,
      pinataGateway,
      awsS3Bucket,
      batchSize,
      price,
      treasuryWallet,
      anchorProgram,
      walletKeyPair,
      splToken,
      endSettings,
      hiddenSettings,
      whitelistMintSettings,
      goLiveDate,
      uuid,
      arweaveJwk,
      rateLimit,
      collectionMintPubkey,
      setCollectionMint,
      rpcUrl,
    });
    return res;
  } catch (err) {
    log.warn('upload was not successful, please re-run.', err);
    return;
  }
 


}





