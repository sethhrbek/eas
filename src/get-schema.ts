import { provider } from './provider'
import 'dotenv/config'
import {SEPOLIA_RESOLVER_ADDRESS} from "./contracts";

import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";

const schemaRegistry = new SchemaRegistry(SEPOLIA_RESOLVER_ADDRESS);
schemaRegistry.connect(provider);

const schemaUID = process.env.SCHEMA_UID;

const schemaRecord = await schemaRegistry.getSchema({ uid: schemaUID! });

console.log(schemaRecord);