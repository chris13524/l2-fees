import { CryptoStatsSDK } from '@cryptostats/sdk';

const sdk = new CryptoStatsSDK({
  etherscanKey: process.env.ETHERSCAN_KEY,
  mongoConnectionString: process.env.MONGO_CONNECTION_STRING,
  redisConnectionString: process.env.REDIS_URL,
  executionTimeout: process.env.EXECUTION_TIMEOUT ? parseInt(process.env.EXECUTION_TIMEOUT) : 60,
});

sdk
  .getCollection('rollup-l1-fees')
  .setCacheKeyResolver((_id: string, query: string, params: string[]) =>
    query === 'oneDayFeesPaidUSD' ? params[0] : null
  );

sdk
  .getCollection('fees')
  .setCacheKeyResolver((_id: string, query: string, params: string[]) =>
    query === 'oneDayTotalFees' ? params[0] : null
  );

sdk.ethers.addProvider('arbitrum-one', 'https://arb1.arbitrum.io/rpc');
sdk.ethers.addProvider('optimism', 'https://mainnet.optimism.io');

export default sdk;
