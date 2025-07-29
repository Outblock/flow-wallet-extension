# Flow Wallet - EVM Integration Challenge

## Overview

This is a technical interview challenge designed to test your ability to extend an existing Flow wallet browser extension with Ethereum Virtual Machine (EVM) support. You'll be working with Chrome extension APIs, cryptographic operations, and Web3 integration patterns.

**Note**: You are encouraged to use any AI tools (like Cursor, Claude Code, ChatGPT, etc.) and online resources to help you complete this challenge. This reflects real-world development practices where developers leverage available tools and resources to solve problems efficiently.

## Challenge Description

The Flow Wallet Extension currently supports Flow blockchain operations. Your task is to extend it to support Flow EVM testnet, allowing users to:

1. Generate and display EOA (Externally Owned Account) addresses from existing secp256k1 private keys
2. Make the extension EIP-6963 compatible for Web3 library detection
3. Implement EVM connection flow similar to how Flow and FCL work
4. **(Bonus)** Add support for signing EVM personal messages and transactions

## Starting Point

- **Branch to start from**: `master`
- **Time estimate**: 1.5-2 hours
- **Tech stack**: React, Chrome Extension APIs, ethers.js, cryptography
- **Allowed tools**: AI assistants (Cursor, Claude Code, ChatGPT, etc.), online documentation, Stack Overflow, GitHub, and any other development resources

## Prerequisites

- Understanding of Chrome extension architecture (background scripts, content scripts, popups)
- Knowledge of Ethereum/EVM concepts (addresses, private keys, RPC methods)
- Familiarity with Web3 standards (EIP-1193, EIP-6963)
- Experience with React and JavaScript/TypeScript

## Flow EVM Testnet Configuration

```javascript
const FLOW_EVM_TESTNET = {
  chainId: "0x221", // 545 in decimal
  chainName: "Flow EVM Testnet",
  rpcUrl: "https://testnet.evm.nodes.onflow.org",
  blockExplorerUrl: "https://evm-testnet.flowscan.io",
};
```

### Setup Test Environment

1. Build and load the extension in Chrome
2. Set up a test dApp with harness
3. Test the connection flow end-to-end

## Architecture Reference

The Flow wallet uses a three-layer architecture:

1. **Content Script Layer**: Injects providers and relays messages
2. **Background Script Layer**: Routes messages and handles simple operations
3. **UI Layer**: Handles complex operations and user interactions

Study the existing Flow implementation to understand:

- How messages flow between layers
- How popups are triggered and managed
- How state is maintained across contexts
- How security is handled

## Resources

- [EIP-6963: Multi Injected Provider Discovery](https://eips.ethereum.org/EIPS/eip-6963)
- [EIP-1193: Ethereum Provider JavaScript API](https://eips.ethereum.org/EIPS/eip-1193)
- [Chrome Extension Manifest V3](https://developer.chrome.com/docs/extensions/mv3/)
- [ethers.js Documentation](https://docs.ethers.org/)
- [Flow EVM Documentation](https://developers.flow.com/evm/about)

## Submission

When you're done:

1. Ensure your code builds without errors
2. Test the complete flow with a sample dApp
3. Document any assumptions or design decisions
4. **(Optional)** Mention any AI tools or resources you found particularly helpful

Good luck! This challenge tests real-world wallet extension development skills that are highly valuable in the Web3 ecosystem. Remember, using AI tools and online resources is not only allowed but encouraged as it reflects modern development practices.

## Questions or Issues?

If you encounter any setup issues or have questions about requirements, don't hesitate to ask. The goal is to evaluate your problem-solving and implementation skills, not to frustrate you with unclear requirements.
