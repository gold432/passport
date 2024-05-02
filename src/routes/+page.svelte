<script lang="ts">
	import FileUpload from '$lib/FileUpload.svelte';
	import Teal from '../lib/Button/Teal.svelte';
	import Passport from '../lib/Passport.svelte';
	import '../app.css';

	let src: string;
	let count = 4;

	const file_to_base64 = (file: File): Promise<string | ArrayBuffer | null> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();

			reader.onloadend = () => {
				resolve(reader.result);
			};

			reader.onerror = reject;

			reader.readAsDataURL(file);
		});
	};
</script>

<FileUpload on:change={async ({ detail }) => src = await file_to_base64(detail[0])} />
<Teal text="-1" on:click={() => count--} />
<Teal text="+1" on:click={() => count++} />

<div class="flex flex-wrap justify-between w-[385.512px] h-[574.488px] items-center bg-slate-500">
    {#each Array(count) as e}
        <Passport {src} />
    {/each}
</div>
