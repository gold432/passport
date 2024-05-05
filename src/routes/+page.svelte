<script lang="ts">
	import FileUpload from '$lib/FileUpload.svelte';
	import Teal from '../lib/Button/Teal.svelte';
	import Passport from '../lib/Passport.svelte';
	import html2canvas from 'html2canvas';
	import '../app.css';
	import { remove_bg } from '$lib/remove_bg';

	let src: string = 's',
		count = 4,
		top = 0,
		left = 0,
		s = true,
		color = '#c32222',
		w = 132.283,
		h = 170.079,
		el: HTMLDivElement;

	// $: position = `${left}px ${top}px`;
	$: console.log(w);

	const download = () => {
		// Create a canvas and set its dimensions to the element's dimensions
		const canvas = document.createElement('canvas');
		canvas.width = el.offsetWidth;
		canvas.height = el.offsetHeight;

		// Use html2canvas to render the element on the canvas
		html2canvas(el, { canvas });

		// Get the canvas data as a base64-encoded string
		const imageData = canvas.toDataURL();

		// Create a link to download the image
		const link = document.createElement('a');
		link.href = imageData;
		link.download = 'image.png';
		link.click();
	};

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

<svelte:window
	on:keydown={(e) => {
		switch (e.key) {
			case 'ArrowUp':
				top--;
				break;
			case 'ArrowDown':
				top++;
				break;
			case 'ArrowLeft':
				left--;
				break;
			case 'ArrowRight':
				left++;
				break;
			case '+':
			case 'NumpadAdd':
				w++
				break;
			case '-':
			case 'NumpadSubtract':
				w--
				break;
		}
	}}
/>

<div class="print:hidden">
	<FileUpload
		on:change={async ({ detail }) => {
			src = await file_to_base64(detail[0]);
			// src = URL.createObjectURL(new Blob([await remove_bg(detail[0])], { type: 'image/png' }));
		}}
	/>

	{#if src}
		<Teal text="remove one" on:click={() => count--} />
		<Teal text="add one" on:click={() => count++} />
		<input type="color" bind:value={color} />

		<!-- <Teal text="Download" on:click={download} /> -->
	{/if}
</div>

{#if src}
	<div class="flex flex-col gap-1">
		<div
			bind:this={el}
			class=" flex flex-wrap justify-between w-[385.512px] h-[574.488px] items-center bg-slate-500"
		>
			{#each Array(count) as _}
				<div
					class="w-[132.283px] h-[170.079px] border-[1px] border-solid border-red-400 relative flex justify-center items-center overflow-hidden"
				>
					<div style=" top: {top}px; left: {left}px" class="relative w-fit h-fit">
						<div style="width: {w}px; height: {h}px" class="flex justify-center items-center">
							<img alt="passport with removed background" class="w-full h-auto" {src} />
						</div>
					</div>
				</div>
				<!-- <Passport {position} {src} /> -->
			{/each}
		</div>

		<div class="print:hidden flex flex-col items-center">
			<Teal text="shift up" on:click={() => top--} />
			<div class="flex gap-1">
				<Teal text="shift left" on:click={() => left--} />
				<Teal text="shift down" on:click={() => top++} />
				<Teal text="shift right" on:click={() => left++} />
			</div>
		</div>

		<div class="flex gap-1">
			<Teal text="increase width" on:click={() => w++} />
			<Teal text="reduce width" on:click={() => w--} />
		</div>

		<radio>
			<radiobutton>sf</radiobutton>
		</radio>

		<label for="s">full width</label>
		<input type="checkbox" name="s" bind:checked={s} />
	</div>
{/if}
