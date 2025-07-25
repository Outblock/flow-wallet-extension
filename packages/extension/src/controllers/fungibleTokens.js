import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

/*
    TODO
    These are hardcoded to testnet right now, should be replaced by
    non-hardcoded cadence scripts in the future, using cadencetojson
    or cadut
    
*/

const getFlowCode = `
access(all) fun main(account: Address): UFix64 {
    let vaultRef = getAccount(account)
    return vaultRef.availableBalance
}
`;

export const getTokenBalance = async (currency, address) => {
  let result;
  const CODE = getFlowCode;
  try {
    result = await fcl
      .send([
        fcl.script(CODE),
        fcl.args([fcl.arg(address, t.Address)]),
        fcl.limit(9999),
      ])
      .then(fcl.decode);
  } catch (e) {
    console.error(e);
    return 0.0;
  }
  return parseFloat(result);
};
