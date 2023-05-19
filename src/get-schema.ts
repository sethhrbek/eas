import { provider } from './provider'
import 'dotenv/config'
import {SEPOLIA_REGISTRY_ADDRESS} from "./contracts";

import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";

const schemaRegistry = new SchemaRegistry(SEPOLIA_REGISTRY_ADDRESS);
schemaRegistry.connect(provider);

const schemaUID = process.env.SCHEMA_UID;

const schemaRecord = await schemaRegistry.getSchema({ uid: schemaUID! });

console.log(schemaRecord);