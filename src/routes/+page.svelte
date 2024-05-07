<script lang="ts">
	import FileUpload from '$lib/FileUpload.svelte';
	import Button from '../lib/Button/Button.svelte';
	import Passport from '../lib/Passport.svelte';
	import '../app.css';
	import { remove_bg } from '$lib/remove_bg';
	import Toggle from '$lib/Toggle.svelte';
	import html2canvas from 'html2canvas';
	import ColorInput from '$lib/ColorInput.svelte';

	let src: string = '',
		count = 4,
		top = 0,
		left = 0,
		fit_w = false,
		color = '#334155',
		w = 132.283,
		h = 170.079,
		el: HTMLDivElement;

	// $: position = `${left}px ${top}px`;
	// $: console.log(w);

	const download = () => {
		html2canvas(el).then((canvas) => {
			canvas.toBlob(function (blob) {
				const link = document.createElement('a');
				link.href = URL.createObjectURL(blob);
				link.download = 'image.png';
				link.click();
			});
		});
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
			label={src ? 'change image' : 'add image'}
			on:change={async ({ detail }) => {
				src = URL.createObjectURL(new Blob([await remove_bg(detail[0])], { type: 'image/png' }));
			}}
		/>

		{#if src}
			<Button text="remove one" on:click={() => count--} />
			<Button text="add one" on:click={() => count++} />
			<ColorInput bind:color id="color" label="set background color" />

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

			<div class="print:hidden">
				<div class="print:hidden flex flex-col items-center gap-1">
					<w-min><Button text="shift up" on:click={() => top--} /></w-min>
					<div class="flex gap-1 items-stretch">
						<div><Button text="shift left" on:click={() => left--} /></div>
						<div><Button text="shift down" on:click={() => top++} /></div>
						<div><Button text="shift right" on:click={() => left++} /></div>
					</div>
				</div>
				<div class="flex gap-1">
					<Button text="reduce" on:click={() => (fit_w ? w-- : h--)} />
					<Button text="increase" on:click={() => (fit_w ? w++ : h++)} />
				</div>
				<Toggle id="fit_w" label="fit width" bind:checked={fit_w} />
				<Button on:click={download} text="download" />
			</div>
		</div>
	{/if}
</div>
