// TTS WEBSITE V7 - Master Page (Global site code)

import wixWindow from 'wix-window';
import wixLocation from 'wix-location';

$w.onReady(function () {
    console.log('🌐 TTS Site Loaded');

    // Initialize global features
    initializeSite();

    // Setup navigation
    setupGlobalNavigation();
});

/**
 * Initialize global site features
 */
function initializeSite() {
    // Add any global initialization
    // Analytics, tracking, etc.

    console.log('✨ Global site initialized');
}

/**
 * Setup global navigation
 */
function setupGlobalNavigation() {
    // This runs on every page
    // Handle any global navigation logic
}

/**
 * Navigate to a page programmatically
 */
export function navigateToPage(pageId) {
    wixLocation.to(pageId);
}

/**
 * Show a notification
 */
export function showNotification(message, type = 'info') {
    console.log(`[${type.toUpperCase()}] ${message}`);
    // Could use wixWindow.openLightbox for custom notifications
}
