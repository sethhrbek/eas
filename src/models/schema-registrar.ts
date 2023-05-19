import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import 'dotenv/config';
import {ethers} from "ethers";

/**
 * See https://docs.attest.sh/docs/getting--started/getting-started
 *  for registry addresses
 *
 * Usage:
 *  const schemaRegistrar = new SchemaRegistrar(SEPOLIA_REGISTRY_ADDRESS, signer);
 *
 *  const schema = "string borrower, string auditor";
 *  const schemaUID = await schemaRegistrar.registerSchema(schema);
 */
export class SchemaRegistrar {
    private schemaRegistry: SchemaRegistry;

    constructor(registryAddress: string, signer: ethers.Signer) {
        this.schemaRegistry = new SchemaRegistry(registryAddress);
        this.schemaRegistry.connect(signer);
    }

    async registerSchema(schema: string): Promise<string> {
        const transaction = await this.schemaRegistry.register({
            schema: "string borrower, string auditor",
            resolverAddress: "0x0000000000000000000000000000000000000000",
            revocable: false,
        });

        // Wait for transaction to be validated
        const schemaUID = await transaction.wait();
        return schemaUID;
    }
}