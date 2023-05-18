import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { signer } from './provider'
import 'dotenv/config'
import {SEPOLIA_RESOLVER_ADDRESS} from "./contracts";
export const schema = "string borrower, string auditor";

const schemaRegistry = new SchemaRegistry(SEPOLIA_RESOLVER_ADDRESS);
schemaRegistry.connect(signer);

const transaction = await schemaRegistry.register({
    schema,
    resolverAddress: "0x0000000000000000000000000000000000000000",
    revocable: false,
});

// Wait for transaction to be validated
const schemaUID = await transaction.wait();

console.log('Schema UID', JSON.stringify(schemaUID))