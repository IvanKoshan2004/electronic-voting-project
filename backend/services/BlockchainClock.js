import { electionFactoryService } from "./electionService.js";

class BlockchainClock {
  constructor() {
    this.syncedTimestamp = null;
  }
  async syncTime() {
    const { timestampSecond } = await electionFactoryService.getCurrentBlockchainTimestampSecond();
    this.syncedTimestamp = timestampSecond * 1000;
    this.relativeTimestamp = Date.now();
  }
  getTimestamp() {
    if (this.syncedTimestamp == null) throw new Error("No synced time");
    return this.syncedTimestamp + (Date.now() - this.relativeTimestamp);
  }
}

export const blockchainClock = new BlockchainClock();
