<script lang="ts">
	import FileUpload from '$lib/FileUpload.svelte';
	import Button from '../lib/Button/Button.svelte';
	import Passport from '../lib/Passport.svelte';
	import html2canvas from 'html2canvas';
	import '../app.css';
	import { remove_bg } from '$lib/remove_bg';
	import Checkbox from '$lib/Checkbox.svelte';

	let src: string = 's',
		count = 4,
		top = 0,
		left = 0,
		fit_w = false,
		color = '#334155',
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
				e.shiftKey ? w++ : h++;
				break;
			case '-':
			case 'NumpadSubtract':
				e.shiftKey ? w-- : h--;
				break;
		}
	}}
/>

<div class="p-4 flex flex-col gap-3">
	<div class="print:hidden flex flex-col gap-3">
		<FileUpload
			on:change={async ({ detail }) => {
				src = URL.createObjectURL(new Blob([await remove_bg(detail[0])], { type: 'image/png' }));
			}}
		/>

		{#if src}
			<Button text="remove one" on:click={() => count--} />
			<Button text="add one" on:click={() => count++} />
			<input class="hidden" id="color" type="color" bind:value={color} />
            <label style="background-color: {color};" for="color" class="border-[1px] border-zinc-100 inline-flex gap-x-2 items-center justify-center transition-colors focus-visible:outline-none disabled:pointer-events-none w-full max-w-full disabled:opacity-50 hover:bg-primary/90 px-4 py-2 rounded-full min-h-fit h-full">background color</label>

			<!-- <Button text="Download" on:click={download} /> -->
		{/if}
	</div>

	{#if src}
		<div class="flex flex-col gap-3">
			<div
				bind:this={el}
				class=" flex flex-wrap justify-between w-[385.512px] h-[574.488px] items-center bg-slate-700"
			>
				{#each Array(count) as _}
					<div
						style="background-color: {color};"
						class="w-[132.283px] h-[170.079px] border-[1px] border-solid border-slate-100 relative flex justify-center items-center overflow-hidden"
					>
						<div style=" top: {top}px; left: {left}px" class="relative w-fit h-fit">
							<div style="width: {w}px; height: {h}px" class="flex justify-center items-center">
								<img
									alt="passport with removed background"
									class="{fit_w ? 'w' : 'h'}-full object-cover"
									{src}
								/>
							</div>
						</div>
					</div>
					<!-- <Passport {position} {src} /> -->
				{/each}
			</div>

			<div class="print:hidden flex flex-col items-center gap-1">
				<w-min><Button text="shift up" on:click={() => top--} /></w-min>
				<div class="flex gap-1 items-stretch">
					<div><Button text="shift left" on:click={() => left--} /></div>
					<div><Button text="shift down" on:click={() => top++} /></div>
					<div><Button text="shift right" on:click={() => left++} /></div>
				</div>
			</div>

			<div class="flex gap-1">
				<Button text="increase width" on:click={() => w++} />
				<Button text="reduce width" on:click={() => w--} />
			</div>

			<div class="flex gap-1">
				<Button text="increase height" on:click={() => h++} />
				<Button text="reduce height" on:click={() => h--} />
			</div>

			<Checkbox id="fit_w" label="fit width" bind:checked={fit_w} />
		</div>
	{/if}
</div>
