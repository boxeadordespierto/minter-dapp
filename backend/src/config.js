require('dotenv').config();
const basePath = process.cwd();
const fs = require("fs");
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "METABOXERS® by Alfonso Gomez- North America Male Edition";
const description = "METABOXERS®, diseñado y creado por el Campeon de Boxeo Alfonso Gomez, es la primer Coleccion de NFTs por un Campeon de Boxeo reconocido Mundialmente en la era de decentralizacion. Todos los METABOXERS® son Tokens de NFT para acceso y governanza; y tienen rasgos unicos como pelo, ojos, piel y nacionalidad para representarte en el primer DAO de Boxeo en la historia, METABOXERS® DAO. Solo hay un NFT de METABOXERS® que se parece a ti, pero hay miles de personas que se parecen al unico NFT de METABOXERS® que se parece a ti.  Apurale, mintealo tu antes de que otro lo haga.  METABOXERS®, designed and created by Boxing Champion Alfonso Gomez, are the first ever NFT Collections by a World reknown boxing champion in the decentralization era. All METABOXERS® are NFTs Tokens for access and governance; and they come with unique traits such as hair, eyes, skin and nationality to represent you in the first Boxing DAO in history, METABOXERS® DAO.  There's only one METABOXERS® NFT that looks like you, however, there are thousands of people that look like the only METABOXERS® NFT that looks like you.  Hurry, mint it before someone else does";
const baseUri = "ipfs://NewUriToReplace"; // This will be replaced automatically

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  {
    growEditionSizeTo: 2208,
    layersOrder: [
      { name: "Fondo Background" },
      { name: "Piel Skin" },
      { name: "Ojos Eyes" },
      { name: "Barba Beard" },
      { name: "Pelo Hair" },
      { name: "Pais Country" },
    ],
  },
];

const shuffleLayerConfigurations = true;

const debugLogs = false;

const format = {
  width: 1960,
  height: 3000,
  smoothing: false,
};

const extraMetadata = {
  external_url: "https://METABOXERS.x", // Replace with your website or remove this line if you do not have one.
};

// NFTPort Info

// ** REQUIRED **
const AUTH = process.env.NFTPORT_API_KEY; // Set this in the .env file to prevent exposing your API key when pushing to Github
const LIMIT = 2; // Your API key rate limit
const CHAIN = 'rinkeby'; // only rinkeby or polygon

// REQUIRED CONTRACT DETAILS THAT CANNOT BE UPDATED LATER!
const CONTRACT_NAME = 'METABOXERS® by Alfonso Gomez - North America Male Edition';
const CONTRACT_SYMBOL = 'MTBXR$';
const METADATA_UPDATABLE = true; // set to false if you don't want to allow metadata updates after minting
const OWNER_ADDRESS = '0x7C96070Cd28467bE322918C8FFaAB2a452765406';
const TREASURY_ADDRESS = '0x7C96070Cd28467bE322918C8FFaAB2a452765406';
const MAX_SUPPLY = 2208; // The maximum number of NFTs that can be minted. CANNOT BE UPDATED!
const MINT_PRICE = 0.001; // Minting price per NFT. Rinkeby = ETH, Polygon = MATIC. CANNOT BE UPDATED!
const TOKENS_PER_MINT = 10; // maximum number of NFTs a user can mint in a single transaction. CANNOT BE UPDATED!

// REQUIRED CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PUBLIC_MINT_START_DATE = "2022-05-07T19:00:00+00:00"; // This is required. Eg: 2022-02-08T11:30:48+00:00

// OPTIONAL CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PRESALE_MINT_START_DATE = "2022-04-15T19:00:00+00:00"; // Optional. Eg: 2022-02-08T11:30:48+00:00
const ROYALTY_SHARE = 1000; // Percentage of the token price that goes to the royalty address. 100 bps = 1%
const ROYALTY_ADDRESS = "0x7C96070Cd28467bE322918C8FFaAB2a452765406"; // Address that will receive the royalty
const BASE_URI = null; // only update if you want to manually set the base uri
const PREREVEAL_TOKEN_URI = null; // only update if you want to manually set the prereveal token uri
const PRESALE_WHITELISTED_ADDRESSES = ["0x7C96070Cd28467bE322918C8FFaAB2a452765406","0xb0996645d0350f9b53b69d623d18594abdacc9a0"]; // only update if you want to manually set the whitelisted addresses

// ** OPTIONAL **
let CONTRACT_ADDRESS = "YOUR CONTRACT ADDRESS"; // If you want to manually include it

// Generic Metadata is optional if you want to reveal your NFTs
const GENERIC = true; // Set to true if you want to upload generic metas and reveal the real NFTs in the future
const GENERIC_TITLE = CONTRACT_NAME; // Replace with what you want the generic titles to say if you want it to be different from the contract name.
const GENERIC_DESCRIPTION = "METABOXERS® by Alfonso Gomez will be REVEALED during PUBLIC SALE on May 7th to mint for 0.1 ETH. Join our Discord to get Whitelisted and mint your METABOXERS® for 0.05 ETH before THE REVEAL/PUBLIC SALE.  METABOXERS® por Alfonso Gomez seran REVELADOS durante la VENTA PUBLICA, Mayo 7, 2022 para ser minteados por 0.1 ETH. Unete a nuestro Discord para ser Whitelisted y minetear tus METABOXERS® por 0.05 ETH antes de LA REVELACION/VENTA PUBLICA."; // Replace with what you want the generic descriptions to say.
const GENERIC_IMAGE = "https://ipfs.io/ipfs/bafybeiatdrsdw6zilewyedjtovgtfnp36sih2la3maznselnc6aa4fske4"; // Replace with your generic image that will display for all NFTs pre-reveal.

// Automatically set contract address if deployed using the deployContract.js script
try {
  const rawContractData = fs.readFileSync(
    `${basePath}/build/contract/_contract.json`
  );
  const contractData = JSON.parse(rawContractData);
  if (contractData.response === "OK" && contractData.error === null) {
    CONTRACT_ADDRESS = contractData.contract_address;
  }
} catch (error) {
  // Do nothing, falling back to manual contract address
}
// END NFTPort Info

const solanaMetadata = {
  symbol: "MTBXR$",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://METABOXERS.x",
  creators: [
    {
      address: "3yHiJt9Cw5mKSRaxYE6nvNz9SQnWQ8hWo8PDEhBYCPM6",
      share: 100,
    },
  ],
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
  AUTH,
  LIMIT,
  CONTRACT_ADDRESS,
  OWNER_ADDRESS,
  TREASURY_ADDRESS,
  CHAIN,
  GENERIC,
  GENERIC_TITLE,
  GENERIC_DESCRIPTION,
  GENERIC_IMAGE,
  CONTRACT_NAME,
  CONTRACT_SYMBOL,
  METADATA_UPDATABLE,
  ROYALTY_SHARE,
  ROYALTY_ADDRESS,
  MAX_SUPPLY,
  MINT_PRICE,
  TOKENS_PER_MINT,
  PRESALE_MINT_START_DATE,
  PUBLIC_MINT_START_DATE,
  BASE_URI,
  PREREVEAL_TOKEN_URI,
  PRESALE_WHITELISTED_ADDRESSES
};
