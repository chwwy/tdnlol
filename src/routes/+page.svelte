<script lang="ts">
	import { readable, writable } from "svelte/store";
	import Page1 from "./components/page1.svelte";
    import Page2 from "./components/page2.svelte";
    import { switchToNextTab } from "./lib/util.js";
    import Falling from "./components/Falling.svelte";
    import { onMount } from 'svelte';
    import { submitComment } from './lib/submit.js';
    
    let commentInput: HTMLInputElement;
    let comment = '';

    onMount(() => {
        commentInput = document.getElementById('comment') as HTMLInputElement;
    });

    async function handleSubmit(event: Event): Promise<void> {

        console.log('Form submitted!');
        event.preventDefault(); 

        comment = commentInput.value;

        if (!comment) {
            alert('All fields are required.');
            return;
        }

        try {
            await submitComment(comment);
            console.log('Comment is submitted successfully');
            commentInput.value = ''; // Clear the textarea
            commentInput.placeholder = 'Sent!'; // Update the placeholder
        } catch (error) {
            console.error('Error submitting comment:', error);
            commentInput.placeholder = 'Submission failed, try again!';
        }
    }
    
</script>

<body data-sveltekit-preload-data="hover" class="bg-black overflow-hidden">
    <div class="flex items-center justify-center h-screen">
        <Falling />
        <div id="main-container" class="flex flex-col text-pink-100/80 text-base text-center items-center justify-center p-10 rounded-lg sm:w-1/5 w-2/3 h-auto bg-pink-100/5 border-2 border-pink-100/30 backdrop-blur-xl overflow-auto">
            🐇 hi! i'm nao.
            <br>
            here are my belongings:
            
            <div id="page-1">
                <Page1 />
            </div>
            <div id="page-2" class="hidden">
                <Page2 />
            </div>
            <div id="page-3" class="hidden">
                <form action="" on:submit={handleSubmit}>
                    <label class="form-control flex flex-wrap flex-row text-pink-100/80 text-base pt-5 w-full h-max">
                        <div class="label w-full">
                          <span class="label-text text-pink-100/80 ">Send a message</span>
                          <span class="label-text-alt text-pink-100/80 "><svg  xmlns="http://www.w3.org/2000/svg"  width="15"  height="15"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.5"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-mail"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" /><path d="M3 7l9 6l9 -6" /></svg></span>
                        </div>
                        <textarea id="comment" class="textarea bg-pink-100/5 border-2 border-pink-100/30 text-pink-100/80 h-24 w-full" placeholder="Send an anonymous comment..."></textarea>
                        <div class="label w-full flex justify-between items-center">
                          <span class="label-text-alt text-pink-100/80 ">It'll be 100% anonymous.</span>
                          <button id="submit" type="submit" class="btn btn-sm bg-pink-100/5 border-2 border-pink-100/30 text-pink-100/75 hover:bg-pink-100/10 hover:border-pink-100/40">Submit</button>
                        </div>
                      </label>
                </form>
                <div class="flex align-middle sm:p-12 sm:-mt-5 mt-10 opacity-70 z-10">
                    <img src="/discord.gif" alt="">
                </div>
            </div>

            <div id="navi-button" class="relative text-sm text-pink-100/80">
                <button class="hover:underline duration-200 mx-1 pt-5 z-50" on:click|preventDefault={switchToNextTab}>- next -</button>
            </div>
        </div>


    </div>
</body>