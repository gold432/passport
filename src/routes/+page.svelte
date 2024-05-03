<script lang="ts">
	import FileUpload from '$lib/FileUpload.svelte';
	import Teal from '../lib/Button/Teal.svelte';
	import Passport from '../lib/Passport.svelte';
    import html2canvas from 'html2canvas';
	import '../app.css';

	let src: string, count = 4, top = 50, left = 50, el: HTMLDivElement;


    $: position = `${left}% ${top}%`
    $: console.log(position)

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
    }

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

<svelte:window on:keydown={(e) => {
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
  }
}} />

<div class="print:hidden">
    <FileUpload on:change={async ({ detail }) => src = await file_to_base64(detail[0])} />


    
    {#if src}
    <Teal text="remove one" on:click={() => count--} />
        <Teal text="add one" on:click={() => count++} />
    
            <br />
            <Teal text="shift left" on:click={() => left--} />
                <Teal text="shift right" on:click={() => left++} />
                    <Teal text="shift down" on:click={() => top++} />
                        <Teal text="shift up" on:click={() => top--} />
        <!-- <Teal text="Download" on:click={download} /> -->
    {/if}
</div>

{#if src}
    <div bind:this={el} class="flex flex-wrap justify-between w-[385.512px] h-[574.488px] items-center bg-slate-500">
        {#each Array(count) as e}
    <img style="object-position: {position}" class=" border-2 border-solid border-red-400 max-w-[132.283px] max-h-[170.079px] w-[132.283px] h-[170.079px] object-cover" {src} />
    <!-- <Passport {position} {src} /> -->
        {/each}
    </div>
{/if}