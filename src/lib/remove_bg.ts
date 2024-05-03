import axios from 'axios';

export const remove_bg = async (f) => {
	const formData = new FormData();
	formData.append('size', 'auto');
	formData.append('image_file', fs.createReadStream(inputPath), path.basename(inputPath));
	return (
		await axios('https://api.remove.bg/v1.0/removebg', {
			method: 'post',
			data: formData,
			responseType: 'arraybuffer',
			headers: {
				'X-Api-Key': 'INSERT_YOUR_API_KEY_HERE'
			}
		})
	).data;
};
