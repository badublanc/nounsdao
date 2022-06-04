export const get = async () => {
	const res = await fetch('http://localhost:8787/v1/nounsdao');
	const data = await res.json();

	return {
		body: {
			daonouns: data.data
		}
	};
};
