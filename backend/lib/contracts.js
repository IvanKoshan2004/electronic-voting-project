import { ethers } from "ethers";
import env from "../lib/env.cjs";
import { importJson } from "./importJson.js";

const { abi } = importJson("./artifacts/contracts/ElectionFactory.sol/ElectionFactory.json");

// Local development environment
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const signer = new ethers.Wallet(env.PRIVATE_KEY, provider);

export const ElectionFactoryContract = new ethers.Contract(env.ELECTION_FACTORY_CONTRACT_ADDRESS, abi, signer);
