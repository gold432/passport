import { PUBLIC_KALEIDO } from '$env/static/public';
import axios from 'axios';

export const remove_bg = async (f: File) => {
	const formData = new FormData();
	formData.append('size', 'auto');
	formData.append('image_file', f);
	return (
		await axios('https://api.remove.bg/v1.0/removebg', {
			method: 'post',
			data: formData,
			responseType: 'arraybuffer',
			headers: {
				'X-Api-Key': PUBLIC_KALEIDO
			}
		})
	).data;
};
