import {ethers} from "ethers";
import 'dotenv/config'

export const provider = new ethers.providers.InfuraProvider(
    'sepolia',
    process.env.INFURA_API_KEY
);

export const signer = new ethers.Wallet(process.env.SEPOLIA_PK!, provider)