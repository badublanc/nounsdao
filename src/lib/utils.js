import { ethers } from 'ethers';

const provider = ethers.getDefaultProvider();

export const shortenAddress = (_address) => {
	if (!_address) return null;
	return _address.substring(0, 6) + '...' + _address.substring(_address.length - 4);
};

export const checkForENS = async (_address) => {
	if (!_address) return null;
	return await provider.lookupAddress(_address);
};

export const getTreasuryBalance = async () => {
	return ethers.utils.formatEther(
		await provider.getBalance('0x0BC3807Ec262cB779b38D65b38158acC3bfedE10')
	);
};
