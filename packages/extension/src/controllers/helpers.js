import { Buffer } from "buffer";
export const toHex = (str) => Buffer.from(str, "utf8").toString("hex");

export const fromHex = (str) => Buffer.from(str, "hex").toString("utf8");

export const prependUserDomainTag = (msg) => USER_DOMAIN_TAG + msg;

// UserDomainTag is the prefix of all signed user space payloads.
// A domain tag is encoded as UTF-8 bytes, right padded to a total length of 32 bytes.
const rightPaddedHexBuffer = (value, pad) =>
  Buffer.from(value.padEnd(pad * 2, "0"), "hex");
const USER_DOMAIN_TAG = rightPaddedHexBuffer(
  Buffer.from("FLOW-V0.0-user").toString("hex"),
  32
).toString("hex");

/**
 * Safely close the extension popup without showing browser warnings
 * Uses Chrome extension API when available, falls back to window.close()
 */
export const closePopup = () => {
  if (chrome.windows && chrome.windows.getCurrent) {
    chrome.windows.getCurrent((window) => {
      chrome.windows.remove(window.id);
    });
  } else {
    window.close();
  }
};
