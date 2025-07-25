const AuthnService = {
  f_type: "Service",
  f_vsn: "1.0.0",
  type: "authn",
  uid: "uniqueDedupeKey",
  endpoint: "ext:0x1234",
  method: "EXT/RPC",
  id: "xxxxxxxx-xxxx",
  identity: {
    address: "0x1234",
  },
  provider: {
    address: "0x1234",
    name: "Flow Wallet",
    icon: "https://raw.githubusercontent.com/Outblock/Assets/refs/heads/main/ft/flow/logo.png",
    description: "Flow Non-Custodial Wallet Extension for Chrome",
  },
};

// Inject into window.fcl_extensions as per FCL Discovery documentation
if (!Array.isArray(window.fcl_extensions)) {
  window.fcl_extensions = [];
}
window.fcl_extensions.push(AuthnService);
