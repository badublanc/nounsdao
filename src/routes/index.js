export const get = async () => {
	const res = await fetch('https://beta.noun-api.com/nounsdao?format=b64');
	const data = await res.json();

	return {
		body: {
			daonouns: data.data
		}
	};
};
