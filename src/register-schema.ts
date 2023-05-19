import { signer } from './provider'
import {SEPOLIA_REGISTRY_ADDRESS} from "./contracts";
import {SchemaRegistrar} from "./models/schema-registrar";

const schemaRegistrar = new SchemaRegistrar(SEPOLIA_REGISTRY_ADDRESS, signer);

const schema = "string borrower, string auditor";
const schemaUID = await schemaRegistrar.registerSchema(schema);

console.log('Schema created with UID:', schemaUID)