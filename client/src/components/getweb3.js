import Web3 from 'web3';

const getWeb3 = async () => {
  try {
    // Check if window is loaded and there is a provider already available (e.g. Metamask)
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      return web3;
    }
    // If no provider is found, use a local provider such as Ganache
    const providerUrl = 'http://localhost:7545';
    const web3 = new Web3(providerUrl);
    return web3;
  } catch (error) {
    throw new Error(`Unable to get Web3 instance: ${error}`);
  }
};

export default getWeb3;
