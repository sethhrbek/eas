import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { signer } from './provider'
import 'dotenv/config'
import {SEPOLIA_EAS_ADDRESS} from "./contracts";

// Setup attestation Data
const ATTESTATION_DATA = [
    { name: "borrower", value: "0x02d53D2C706252814D7264edb7FAf15686939702", type: "string" },
    { name: "auditor", value: "0x02d53D2C706252814D7264edb7FAf15686939706", type: "string" },
]

const ATTESTATION_RECIPIENT = "0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165"

// Create Attestation
const eas = new EAS(SEPOLIA_EAS_ADDRESS);
eas.connect(signer);

// TODO -- attempted to import schema string, but this is failing, have to manually enter the schema string
const schemaEncoder = new SchemaEncoder("string borrower, string auditor");
const encodedData = schemaEncoder.encodeData(ATTESTATION_DATA);

const tx = await eas.attest({
    schema: process.env.SCHEMA_UID!,
    data: {
        recipient: ATTESTATION_RECIPIENT,
        expirationTime: 0,
        revocable: false,
        data: encodedData,
    },
});

const newAttestationUID = await tx.wait();

console.log("New attestation UID:", newAttestationUID);