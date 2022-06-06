export const get = async () => {
	const res = await fetch('https://api.cloudnouns.com/v1/nounsdao');
	const data = await res.json();

	return {
		body: {
			daonouns: data.data
		}
	};
};
