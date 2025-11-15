// TTS WEBSITE V7 - Homepage with Portal Loading Screen

import wixLocation from 'wix-location';
import wixWindow from 'wix-window';
import { local } from 'wix-storage';

// Portal animation state
let portalAnimationPlayed = false;
let loadingMessageInterval = null;
let progressInterval = null;

// Mystical loading messages that rotate
const LOADING_MESSAGES = [
    "Opening the portal...",
    "Channeling cosmic energy...",
    "Aligning dimensions...",
    "Preparing the experience...",
    "Initializing consciousness interface..."
];

$w.onReady(function () {
    console.log('🌀 TTS Homepage Loading...');

    // Check localStorage to see if user has visited before
    const hasVisited = local.getItem('portalShown');

    // Show portal on first visit or if explicitly reset
    if (!hasVisited || hasVisited !== 'true') {
        showPortalLoadingScreen();
    } else {
        portalAnimationPlayed = true;
        initializeHomePage();
    }

    // Setup navigation
    setupNavigation();
});

/**
 * Show epic portal loading screen with sacred geometry and cosmic effects
 */
async function showPortalLoadingScreen() {
    console.log('🌀 Portal opening...');

    try {
        const portalContainer = $w('#portalLoadingScreen');
        const loadingText = $w('#portalLoadingText');
        const progressRing = $w('#portalProgressRing');
        const sacredGeometry = $w('#sacredGeometry');

        if (!portalContainer) {
            console.log('Portal container not found, skipping animation');
            initializeHomePage();
            return;
        }

        // Show the portal container
        portalContainer.show();

        // Add custom CSS classes for animations
        if (sacredGeometry) {
            sacredGeometry.show();
        }

        // Start rotating loading messages
        let messageIndex = 0;
        if (loadingText) {
            loadingText.text = LOADING_MESSAGES[0];
            loadingMessageInterval = setInterval(() => {
                messageIndex = (messageIndex + 1) % LOADING_MESSAGES.length;
                loadingText.text = LOADING_MESSAGES[messageIndex];

                // Fade effect for message change
                loadingText.hide('fade', { duration: 300 });
                setTimeout(() => {
                    loadingText.text = LOADING_MESSAGES[messageIndex];
                    loadingText.show('fade', { duration: 300 });
                }, 300);
            }, 2000);
        }

        // Animate progress ring (simulated progress)
        let progress = 0;
        if (progressRing) {
            progressInterval = setInterval(() => {
                progress += 2;
                if (progress <= 100) {
                    // Update progress ring rotation (simulates circular progress)
                    // Note: In Wix, we might need to use opacity or scale as proxy
                    progressRing.style.opacity = (progress / 100).toString();
                }
            }, 50);
        }

        // Minimum portal display time: 3 seconds (let the moment breathe)
        const minDisplayTime = 3000;
        const startTime = Date.now();

        // Sacred geometry animation sequence (4 seconds)
        // This relies on CSS animations defined in the stylesheet
        setTimeout(() => {
            if (sacredGeometry) {
                // Trigger expansion phase
                sacredGeometry.collapse();
            }
        }, 4000);

        // Calculate remaining time to meet minimum display
        setTimeout(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, minDisplayTime - elapsed);

            setTimeout(() => {
                exitPortalAnimation(portalContainer, loadingText, progressRing, sacredGeometry);
            }, remaining);
        }, 4000); // Wait for sacred geometry animation

    } catch (e) {
        console.error('Portal animation error:', e);
        cleanupPortalAnimation();
        initializeHomePage();
    }
}

/**
 * Exit portal animation with epic expanding effect
 */
function exitPortalAnimation(portalContainer, loadingText, progressRing, sacredGeometry) {
    console.log('🌀 Portal fully opened, transitioning...');

    // Clear intervals
    cleanupPortalAnimation();

    // Exit animation sequence
    if (loadingText) {
        loadingText.text = "Portal aligned ✨";
        setTimeout(() => {
            loadingText.hide('fade', { duration: 500 });
        }, 500);
    }

    if (progressRing) {
        progressRing.hide('fade', { duration: 500 });
    }

    if (sacredGeometry) {
        sacredGeometry.hide('fade', { duration: 800 });
    }

    // Main portal exit: expand and fade
    setTimeout(() => {
        portalContainer.hide('fade', { duration: 1000 });

        // Mark portal as shown in localStorage
        local.setItem('portalShown', 'true');
        portalAnimationPlayed = true;

        // Initialize homepage content
        setTimeout(() => {
            initializeHomePage();
        }, 500);
    }, 1000);
}

/**
 * Cleanup portal animation intervals
 */
function cleanupPortalAnimation() {
    if (loadingMessageInterval) {
        clearInterval(loadingMessageInterval);
        loadingMessageInterval = null;
    }
    if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
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
