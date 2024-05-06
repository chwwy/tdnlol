import { writable } from "svelte/store";
import { onMount } from "svelte";

export const isBrowser = writable(false);

if (typeof window !== "undefined") {
  isBrowser.set(true);
}
let currentTab = 'page-1';

let currentTabIndex = 0;
const tabs = ['page-1', 'page-2', 'page-3'];

export function switchToNextTab() {
    // Hide current tab
    const currentTabElement = document.getElementById(tabs[currentTabIndex]);
    if (currentTabElement) {
        currentTabElement.classList.add('hidden');
    }

    // Calculate index of next tab
    currentTabIndex = (currentTabIndex + 1) % tabs.length;

    // Show next tab
    const nextTabElement = document.getElementById(tabs[currentTabIndex]);
    if (nextTabElement) {
        nextTabElement.classList.remove('hidden');
    } else {
        // If next tab is not found, reset to the first tab (tab-default)
        currentTabIndex = 0;
        const firstTabElement = document.getElementById(tabs[currentTabIndex]);
        if (firstTabElement) {
            firstTabElement.classList.remove('hidden');
        }
    }
}

export function switchToPreviousTab() {
    // Hide current tab
    const currentTabElement = document.getElementById(tabs[currentTabIndex]);
    if (currentTabElement) {
        currentTabElement.classList.add('hidden');
    }

    // Calculate index of previous tab
    currentTabIndex = (currentTabIndex - 1 + tabs.length) % tabs.length;

    // Show previous tab
    const previousTabElement = document.getElementById(tabs[currentTabIndex]);
    if (previousTabElement) {
        previousTabElement.classList.remove('hidden');
    }
}