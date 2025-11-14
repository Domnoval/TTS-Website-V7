// TTS WEBSITE V7 - Homepage with Portal Loading Screen

import wixLocation from 'wix-location';
import wixWindow from 'wix-window';

let portalAnimationPlayed = false;

$w.onReady(function () {
    console.log('🌀 TTS Homepage Loading...');

    // Check if we should show portal animation
    if (!portalAnimationPlayed) {
        showPortalLoadingScreen();
    } else {
        initializeHomePage();
    }

    // Setup navigation
    setupNavigation();
});

/**
 * Show epic portal loading screen
 */
async function showPortalLoadingScreen() {
    console.log('🌀 Portal opening...');

    // TODO: Add epic portal animation
    // For now, simple fade-in
    try {
        const loadingScreen = $w('#portalLoadingScreen');
        if (loadingScreen) {
            loadingScreen.expand();

            // Simulate portal animation
            setTimeout(() => {
                loadingScreen.collapse();
                portalAnimationPlayed = true;
                initializeHomePage();
            }, 2000);
        } else {
            initializeHomePage();
        }
    } catch (e) {
        console.log('No loading screen found, proceeding...');
        initializeHomePage();
    }
}

/**
 * Initialize homepage content
 */
function initializeHomePage() {
    console.log('✨ Homepage initialized');

    // Fade in main content
    try {
        $w('#mainContent').hide();
        $w('#mainContent').show('fade', { duration: 800 });
    } catch (e) {
        // Element doesn't exist
    }

    // Setup hero section
    setupHeroSection();
}

/**
 * Setup hero section
 */
function setupHeroSection() {
    // Hero CTA button
    const heroCTA = findElement(['#heroCTA', '#exploreGallery', '#ctaButton']);
    if (heroCTA) {
        heroCTA.onClick(() => {
            wixLocation.to('/gallery');
        });
    }

    // TODO: Add parallax scroll effects
    // TODO: Add animated text reveals
}

/**
 * Setup navigation buttons
 */
function setupNavigation() {
    // Gallery button
    const galleryBtn = findElement(['#galleryNav', '#navGallery', '#toGallery']);
    if (galleryBtn) {
        galleryBtn.onClick(() => {
            wixLocation.to('/gallery');
        });
    }

    // Store button
    const storeBtn = findElement(['#storeNav', '#navStore', '#toStore']);
    if (storeBtn) {
        storeBtn.onClick(() => {
            wixLocation.to('/store');
        });
    }

    // About button
    const aboutBtn = findElement(['#aboutNav', '#navAbout', '#toAbout']);
    if (aboutBtn) {
        aboutBtn.onClick(() => {
            wixLocation.to('/about');
        });
    }

    // Contact button
    const contactBtn = findElement(['#contactNav', '#navContact', '#toContact']);
    if (contactBtn) {
        contactBtn.onClick(() => {
            wixLocation.to('/contact');
        });
    }
}

/**
 * Utility: Find element by multiple possible IDs
 */
function findElement(ids) {
    for (const id of ids) {
        try {
            const element = $w(id);
            if (element) return element;
        } catch (e) {
            continue;
        }
    }
    return null;
}
