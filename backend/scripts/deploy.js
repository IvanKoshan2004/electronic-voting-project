import { exec, spawn } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

function deployContract(retryCount) {
  return new Promise((resolve, reject) => {
    console.log("Trying to deploy contract");
    exec("npm run blockchain:redeploy", async (error, stdout, stderr) => {
      console.log(stdout);
      if (error) {
        console.log(
          "Can't parse the contract address, It's probable that blockchain is not running yet. Retry in 3s. Retries left ",
          retryCount,
        );
        if (retryCount === 0) reject();
        return resolve(await deployContract(retryCount - 1));
      }

      // Split the stdout into lines
      const lines = stdout.trim().split("\n");

      // Get the last line
      const lastLine = lines[lines.length - 1];
      const lastLineSplit = lastLine.split(" - ");
      if (lastLineSplit.length === 0) {
        console.log(
          "Can't parse the contract address, It's probable that blockchain is not running yet. Retries left ",
          retryCount,
        );
        if (retryCount === 0) reject();
        return resolve(await deployContract(retryCount - 1));
      }
      const contractAddress = lastLine.split(" - ")[1];
      console.log(`Contract Address = "${contractAddress}"`);
      return resolve(contractAddress);
    });
  });
}
function modifyEnvFile(key, value) {
  // Get the path to the .env file in the current directory
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const envFilePath = resolve(__dirname, "../.env");
  console.log("Modifying env file at path: ", envFilePath);
  try {
    let data = readFileSync(envFilePath, "utf8");

    const envData = Object.fromEntries(
      data
        .split("\n")
        .map(line => line.trim())
        .filter(line => line !== "")
        .map(line => {
          const split = line.split("=");
          return [split[0], split.slice(1).join("=")];
        }),
    );

    envData[key] = value;
    console.log(`Updated ${key}: ${value}`);

    const modifiedEnvContent = Object.entries(envData)
      .map(([key, value]) => `${key}=${value}`)
      .join("\n");

    writeFileSync(envFilePath, modifiedEnvContent, "utf8");

    console.log(".env file updated successfully");
  } catch (err) {
    console.error("Error:", err);
  }
}

async function deploy() {
  // const hardhatNodeProcess = spawn("npm", ["run", "start:network"]);
  exec("npx hardhat node", (error, stdout, stderr) => {
    if (error) console.log("error happened", stdout);
  });
  try {
    const address = await deployContract(3);

    modifyEnvFile("ELECTION_FACTORY_CONTRACT_ADDRESS", address);

    if (process.argv.length > 2) {
      if (process.argv.slice(2)[0] == "seed") {
        setTimeout(async () => {
          console.log("Running seeds");
          const { seed } = await import("./seed.js");
          await seed(100, 1, 0.1);
          console.log("The blockchain is running in the background, don't stop this command");
        }, 1000);
      }
    } else {
      console.log("The blockchain is running in the background, don't stop this command");
    }
  } catch (e) {
    console.log(e);
  }
}

deploy();
