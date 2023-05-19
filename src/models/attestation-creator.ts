import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { signer } from '../provider';
import 'dotenv/config';
import { SEPOLIA_EAS_ADDRESS } from "../contracts";
import {ethers} from "ethers";

/**
 * Example Usage:
 *
 *  const attestationData: AttestationData[] = [
 *     { name: "borrower", value: "0x02d53D2C706252814D7264edb7FAf15686939702", type: "string" },
 *     { name: "auditor", value: "0x02d53D2C706252814D7264edb7FAf15686939706", type: "string" },
 *  ];
 *
 *  const attestationRecipient = "0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165"
 *
 *  const attestationCreator = new AttestationCreator()
 *  const txId = await attestationCreator.createAttestation(attestationData, attestationRecipient, signer)
 *
 */

interface AttestationInputData {
    name: string;
    value: string;
    type: string;
}

interface AttestationTxData {
    txId: string;
    attestationUID: string;
}

export class AttestationCreator {
    private eas: EAS;
    private readonly schema: string;

    constructor(
        attestationData: AttestationInputData[],
        attestationRecipient: string,
        signer: ethers.Signer
    ) {
        this.eas = new EAS(SEPOLIA_EAS_ADDRESS);
        this.eas.connect(signer);

        this.schema = this.getSchemaString();
    }

    private getSchemaString(): string {
        // TODO: Import schema string or fetch it from an external source
        // For demonstration purposes, manually returning the schema string
        return "string borrower, string auditor";
    }

    private async createAttestation(
        attestationData: AttestationInputData[],
        attestationRecipient: string,
    ): Promise<AttestationTxData> {
        const schemaEncoder = new SchemaEncoder(this.schema);
        const encodedData = schemaEncoder.encodeData(attestationData);

        const tx = await this.eas.attest({
            schema: process.env.SCHEMA_UID!,
            data: {
                recipient: attestationRecipient,
                expirationTime: 0,
                revocable: false,
                data: encodedData,
            },
        });

        const newAttestationUID = await tx.wait();

        return {
            txId: tx.tx.hash,
            attestationUID: newAttestationUID
        }
    }
}