<script lang="ts">
	import FileUpload from '$lib/FileUpload.svelte';
	import Teal from '../lib/Button/Teal.svelte';
	import Passport from '../lib/Passport.svelte';

	let src: string;
	let count = 8;

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

<FileUpload on:change={async ({ details }) => (src = (await file_to_base64(details[0]) as string))} />
<Teal text="-1" on:click={() => count--} />
<Teal text="+1" on:click={() => count++} />

<div class="flex flex-wrap space-around w-[148] h-[210]">
    {#each Array(count) as e}
        <Passport {src} />
    {/each}
</div>
