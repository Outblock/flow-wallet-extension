import { config } from "@onflow/fcl"
import { send as httpSend } from "@onflow/transport-http"

config()
  .put("accessNode.api", "https://rest-testnet.onflow.org")
  .put("sdk.transport", httpSend)
  .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")
