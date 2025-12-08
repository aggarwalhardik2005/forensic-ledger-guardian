interface EthereumProvider {
  isMetaMask?: boolean;
  chainId?: string;
  networkVersion?: string;
  selectedAddress?: string;
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on: (event: string, callback: (...args: unknown[]) => void) => void;
  removeListener: (
    event: string,
    callback: (...args: unknown[]) => void,
  ) => void;
  removeAllListeners: (event?: string) => void;
  enable: () => Promise<string[]>;
  isConnected: () => boolean;
}

interface Window {
  ethereum?: EthereumProvider;
}
