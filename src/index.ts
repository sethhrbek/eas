import { EAS, Offchain, SchemaEncoder, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from 'ethers';
import 'dotenv/config'

// TODO
// Create Schema contract address
// Schema:
// - public wallet address

export const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26

// Initialize the sdk with the address of the EAS Schema contract address
const eas = new EAS(EASContractAddress);

// Gets a default provider (in production use something else like infura/alchemy)
console.log(process.env.SEPOLIA_INFURA_PROVIDER)
const provider = new ethers.providers.InfuraProvider(
    'sepolia',
    process.env.INFURA_API_KEY
);

// Connects an ethers style provider/signingProvider to perform read/write functions.
// MUST be a signer to do write operations!
eas.connect(provider);

const uid = "0x5134f511e0533f997e569dac711952dde21daf14b316f3cce23835defc82c065";

const attestation = await eas.getAttestation(uid);

console.log(attestation);