/**
 * Usage:
 * $ endo make --UNSAFE src/cosmosFetch.js -n cosmos-fetch
 * Object [Alleged: CosmosFetch] {}
 * $ endo make test/net-akash-deployment.js -n local -p cosmos-fetch
 * { lcd: Object [Alleged: LCD] {}, rpc: Object [Alleged: RpcClient] {} }
 */
import { E } from '@endo/far';

export const make = async net =>
  harden({
    lcd: await E(net).makeLCDClient('http://provider.akash-palmito.org:31156'),
    rpc: await E(net).makeRPCClient('http://provider.akash-palmito.org:30958'),
  });
