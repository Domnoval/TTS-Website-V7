// TTS WEBSITE V7 - AI Manipulation Modal
// The alchemical chamber where transformation happens
// This is where users channel AI energy through selected paintings

import wixWindow from 'wix-window';
import wixData from 'wix-data';

// Modal state
let modalData = null;
let currentMode = 'manipulate'; // 'manipulate' or 'blend'
let selectedPaintings = [];
let userPrompt = '';
let generatedVariations = [];
let isGenerating = false;
let currentLoadingMessage = 0;

// Loading messages that cycle during AI generation
const LOADING_MESSAGES = [
    'The AI is dreaming...',
    'Consulting neural pathways...',
    'Channeling cosmic algorithms...',
    'Weaving digital consciousness...',
    'Manifesting your vision...',
    'The oracle is processing...',
];

// Preset transformation prompts
const PRESET_PROMPTS = {
    cosmic: 'Transform with cosmic nebula colors, star fields, and galaxy spirals',
    sacred: 'Infuse with sacred geometry, golden ratio, mandala patterns',
    ethereal: 'Make ethereal and dreamlike with soft glows and mist',
    dark: 'Darken with deep shadows, mystery, occult symbols',
    neon: 'Electrify with neon colors, cyberpunk energy, glowing edges',
    organic: 'Blend with organic forms, natural fractals, flowing shapes',
};

// Rotating placeholder text for the prompt input
const PLACEHOLDER_TEXTS = [
    'Describe your vision...',
    'What transformation do you seek?',
    'Channel your intent into words...',
    'How should the AI reshape this energy?',
];

$w.onReady(function () {
    console.log('🔮 AI Manipulation Modal Loading...');

    // Get data passed from Gallery page
    modalData = wixWindow.lightbox.getContext();
    console.log('📦 Received data:', modalData);

    // Initialize modal
    initializeModal();

    // Setup event handlers
    setupEventHandlers();

    // Setup animations
    setupAnimations();

    // Show entrance animation
    playEntranceAnimation();
});

/**
 * Initialize the modal with received data
 */
function initializeModal() {
    try {
        // Determine mode
        currentMode = modalData.mode || 'manipulate';

        // Get selected paintings
        if (currentMode === 'manipulate' && modalData.painting) {
            selectedPaintings = [modalData.painting];
        } else if (currentMode === 'blend' && modalData.paintings) {
            selectedPaintings = modalData.paintings;
        }

        console.log(`🎯 Mode: ${currentMode}, Paintings: ${selectedPaintings.length}`);

        // Set modal header text
        updateModalHeader();

        // Display selected painting(s) preview
        displayPaintingPreviews();

        // Setup prompt input
        setupPromptInput();

        // Hide results initially
        hideResults();

        // Hide error state
        hideError();

        console.log('✨ Modal initialized');

    } catch (error) {
        console.error('❌ Error initializing modal:', error);
        showError('The portal needs recalibration... Please try again.');
    }
}

/**
 * Update modal header based on mode
 */
function updateModalHeader() {
    const header = findElement($w, ['#modalHeader', '#header', '#title']);

    if (header) {
        const headerText = currentMode === 'manipulate'
            ? 'Channel AI Through This Vision'
            : `Fuse These ${selectedPaintings.length} Frequencies`;

        header.text = headerText;
    }
}

/**
 * Display preview of selected painting(s)
 */
function displayPaintingPreviews() {
    const previewContainer = findElement($w, [
        '#previewContainer',
        '#paintingPreview',
        '#selectedPaintings'
    ]);

    if (!previewContainer) {
        console.warn('Preview container not found');
        return;
    }

    if (currentMode === 'manipulate' && selectedPaintings.length === 1) {
        // Single painting mode
        displaySinglePainting(selectedPaintings[0]);
    } else if (currentMode === 'blend' && selectedPaintings.length >= 2) {
        // Multiple paintings mode
        displayMultiplePaintings(selectedPaintings);
    }
}

/**
 * Display single painting preview
 */
function displaySinglePainting(painting) {
    const singleImage = findElement($w, ['#singlePaintingImage', '#paintingImage', '#image']);
    const singleTitle = findElement($w, ['#singlePaintingTitle', '#paintingTitle', '#title']);
    const multiContainer = findElement($w, ['#multiPaintingContainer', '#blendContainer']);

    if (singleImage && painting.image) {
        singleImage.src = painting.image;
        singleImage.expand();
    }

    if (singleTitle) {
        singleTitle.text = painting.title || 'Untitled';
        singleTitle.expand();
    }

    // Hide multi-painting container
    if (multiContainer) {
        multiContainer.collapse();
    }

    console.log('🖼️ Displaying single painting:', painting.title);
}

/**
 * Display multiple paintings preview (for blending)
 */
function displayMultiplePaintings(paintings) {
    const singleImage = findElement($w, ['#singlePaintingImage', '#paintingImage', '#image']);
    const singleTitle = findElement($w, ['#singlePaintingTitle', '#paintingTitle', '#title']);
    const multiContainer = findElement($w, ['#multiPaintingContainer', '#blendContainer']);
    const blendRepeater = findElement($w, ['#blendRepeater', '#paintingsRepeater']);

    // Hide single painting elements
    if (singleImage) {
        singleImage.collapse();
    }
    if (singleTitle) {
        singleTitle.collapse();
    }

    // Show multi-painting container
    if (multiContainer) {
        multiContainer.expand();
    }

    // Setup repeater with paintings
    if (blendRepeater) {
        blendRepeater.data = paintings.map((p, index) => ({
            ...p,
            index: index + 1,
        }));

        blendRepeater.onItemReady(($item, itemData, index) => {
            const img = findElement($item, ['#blendImage', '#image']);
            const title = findElement($item, ['#blendTitle', '#title']);

            if (img && itemData.image) {
                img.src = itemData.image;
            }

            if (title) {
                title.text = itemData.title || `Painting ${itemData.index}`;
            }
        });
    }

    console.log(`🔀 Displaying ${paintings.length} paintings for blending`);
}

/**
 * Setup prompt input field with rotating placeholder
 */
function setupPromptInput() {
    const promptInput = findElement($w, ['#promptInput', '#prompt', '#aiPrompt']);

    if (!promptInput) {
        console.warn('Prompt input not found');
        return;
    }

    // Set initial placeholder
    promptInput.placeholder = PLACEHOLDER_TEXTS[0];

    // Rotate placeholder on focus
    let placeholderIndex = 0;
    promptInput.onFocus(() => {
        placeholderIndex = (placeholderIndex + 1) % PLACEHOLDER_TEXTS.length;
        promptInput.placeholder = PLACEHOLDER_TEXTS[placeholderIndex];
    });

    // Track prompt changes
    promptInput.onInput(() => {
        userPrompt = promptInput.value || '';
    });
}

/**
 * Setup event handlers for all interactive elements
 */
function setupEventHandlers() {
    // Close button
    const closeBtn = findElement($w, ['#closeButton', '#closeBtn', '#close']);
    if (closeBtn) {
        closeBtn.onClick(() => {
            closeModal(null);
        });
    }

    // Generate button
    const generateBtn = findElement($w, ['#generateButton', '#generate', '#channelBtn']);
    if (generateBtn) {
        generateBtn.onClick(() => {
            handleGenerate();
        });
    }

    // Preset buttons
    setupPresetButtons();

    // Close on overlay click (optional)
    const overlay = findElement($w, ['#modalOverlay', '#overlay', '#backdrop']);
    if (overlay) {
        overlay.onClick(() => {
            // Optionally close when clicking outside modal
            // closeModal(null);
        });
    }

    console.log('🎮 Event handlers setup complete');
}

/**
 * Setup preset transformation buttons
 */
function setupPresetButtons() {
    const presets = ['cosmic', 'sacred', 'ethereal', 'dark', 'neon', 'organic'];

    presets.forEach(preset => {
        const btn = findElement($w, [
            `#preset${preset.charAt(0).toUpperCase() + preset.slice(1)}`,
            `#${preset}Preset`,
            `#${preset}Btn`
        ]);

        if (btn) {
            btn.onClick(() => {
                applyPreset(preset);
            });
        }
    });
}

/**
 * Apply preset prompt to input field
 */
function applyPreset(presetName) {
    const promptInput = findElement($w, ['#promptInput', '#prompt', '#aiPrompt']);

    if (promptInput && PRESET_PROMPTS[presetName]) {
        promptInput.value = PRESET_PROMPTS[presetName];
        userPrompt = PRESET_PROMPTS[presetName];

        // Visual feedback
        showNotification(`✨ Applied ${presetName.toUpperCase()} transformation preset`, 'info');

        console.log(`🎨 Applied preset: ${presetName}`);
    }
}

/**
 * Handle AI generation button click
 */
async function handleGenerate() {
    console.log('🤖 Generate button clicked');

    // Validate prompt
    if (!userPrompt || userPrompt.trim().length === 0) {
        showError('The energy signature was incomplete... Please describe your vision.');
        return;
    }

    if (userPrompt.trim().length < 10) {
        showError('The prompt must be more specific... Add more details to your vision.');
        return;
    }

    // Hide any previous errors
    hideError();

    // Start generation
    await generateAIVariations();
}

/**
 * Generate AI variations (main AI generation flow)
 */
async function generateAIVariations() {
    try {
        console.log('🌀 Starting AI generation...');
        console.log('📝 Prompt:', userPrompt);
        console.log('🎨 Paintings:', selectedPaintings.map(p => p.title));

        // Set loading state
        setLoadingState(true);

        // Hide previous results
        hideResults();

        // Start loading message rotation
        startLoadingMessages();

        // TODO: Call backend AI API
        // For now, simulate API call with timeout
        await simulateAIGeneration();

        // Stop loading
        setLoadingState(false);
        stopLoadingMessages();

        // Show results
        displayResults();

        console.log('✨ AI generation complete!');

    } catch (error) {
        console.error('❌ AI generation failed:', error);

        setLoadingState(false);
        stopLoadingMessages();

        showError('The oracle is overwhelmed... Please try again in a moment.');
    }
}

/**
 * Simulate AI generation (placeholder for actual API call)
 */
async function simulateAIGeneration() {
    return new Promise((resolve) => {
        // Simulate 5 second generation time
        setTimeout(() => {
            // Generate mock variations
            generatedVariations = [
                {
                    id: 'var-1',
                    imageUrl: 'https://picsum.photos/600/800?random=100',
                    prompt: userPrompt,
                    price: 299.99,
                },
                {
                    id: 'var-2',
                    imageUrl: 'https://picsum.photos/600/800?random=101',
                    prompt: userPrompt,
                    price: 299.99,
                },
                {
                    id: 'var-3',
                    imageUrl: 'https://picsum.photos/600/800?random=102',
                    prompt: userPrompt,
                    price: 299.99,
                },
                {
                    id: 'var-4',
                    imageUrl: 'https://picsum.photos/600/800?random=103',
                    prompt: userPrompt,
                    price: 299.99,
                },
            ];

            console.log('🎨 Generated variations (mock):', generatedVariations.length);
            resolve();
        }, 5000);
    });
}

/**
 * Set loading state for generate button
 */
function setLoadingState(loading) {
    isGenerating = loading;

    const generateBtn = findElement($w, ['#generateButton', '#generate', '#channelBtn']);
    const loadingSpinner = findElement($w, ['#loadingSpinner', '#spinner']);
    const loadingText = findElement($w, ['#loadingText', '#loadingMessage']);

    if (!generateBtn) return;

    if (loading) {
        // Disable button
        generateBtn.disable();

        // Show spinner
        if (loadingSpinner) {
            loadingSpinner.expand();
        }

        // Show loading text
        if (loadingText) {
            loadingText.text = LOADING_MESSAGES[0];
            loadingText.expand();
        }

        // Hide button text
        const btnText = findElement($w, ['#generateButtonText', '#btnText']);
        if (btnText) {
            btnText.collapse();
        }

        console.log('⏳ Loading state: ON');

    } else {
        // Enable button
        generateBtn.enable();

        // Hide spinner
        if (loadingSpinner) {
            loadingSpinner.collapse();
        }

        // Hide loading text
        if (loadingText) {
            loadingText.collapse();
        }

        // Show button text
        const btnText = findElement($w, ['#generateButtonText', '#btnText']);
        if (btnText) {
            btnText.expand();
        }

        console.log('✅ Loading state: OFF');
    }
}

/**
 * Start rotating loading messages
 */
function startLoadingMessages() {
    const loadingText = findElement($w, ['#loadingText', '#loadingMessage']);

    if (!loadingText) return;

    currentLoadingMessage = 0;

    // Rotate messages every 2 seconds
    const interval = setInterval(() => {
        if (!isGenerating) {
            clearInterval(interval);
            return;
        }

        currentLoadingMessage = (currentLoadingMessage + 1) % LOADING_MESSAGES.length;
        loadingText.text = LOADING_MESSAGES[currentLoadingMessage];
    }, 2000);
}

/**
 * Stop loading messages rotation
 */
function stopLoadingMessages() {
    currentLoadingMessage = 0;
}

/**
 * Display generated results
 */
function displayResults() {
    const resultsContainer = findElement($w, ['#resultsContainer', '#results', '#variations']);
    const resultsRepeater = findElement($w, ['#resultsRepeater', '#variationsRepeater']);
    const successMessage = findElement($w, ['#successMessage', '#success']);

    // Show results container
    if (resultsContainer) {
        resultsContainer.expand();

        // Scroll to results
        resultsContainer.scrollTo();
    }

    // Show success message
    if (successMessage) {
        successMessage.text = '✨ Your vision has manifested';
        successMessage.expand();
    }

    // Setup results repeater
    if (resultsRepeater) {
        resultsRepeater.data = generatedVariations.map((variation, index) => ({
            ...variation,
            index: index + 1,
        }));

        resultsRepeater.onItemReady(($item, itemData, index) => {
            setupResultItem($item, itemData, index);
        });
    }

    console.log('🎊 Results displayed');
}

/**
 * Setup individual result item
 */
function setupResultItem($item, itemData, index) {
    const image = findElement($item, ['#variationImage', '#image', '#resultImage']);
    const selectBtn = findElement($item, ['#selectButton', '#select', '#purchase']);
    const priceText = findElement($item, ['#priceText', '#price']);

    // Set image
    if (image && itemData.imageUrl) {
        image.src = itemData.imageUrl;
    }

    // Set price
    if (priceText) {
        priceText.text = `$${itemData.price.toFixed(2)}`;
    }

    // Setup select button
    if (selectBtn) {
        selectBtn.onClick(() => {
            handleSelectVariation(itemData);
        });
    }

    console.log(`📸 Result ${index + 1} setup complete`);
}

/**
 * Handle variation selection (for purchase)
 */
function handleSelectVariation(variation) {
    console.log('🛒 Variation selected:', variation.id);

    showNotification('✨ Artifact secured! Redirecting to checkout...', 'success');

    // Close modal and return result
    setTimeout(() => {
        closeModal({
            success: true,
            data: {
                variation: variation,
                selectedPaintings: selectedPaintings,
                prompt: userPrompt,
            },
        });
    }, 1500);
}

/**
 * Hide results section
 */
function hideResults() {
    const resultsContainer = findElement($w, ['#resultsContainer', '#results', '#variations']);
    const successMessage = findElement($w, ['#successMessage', '#success']);

    if (resultsContainer) {
        resultsContainer.collapse();
    }

    if (successMessage) {
        successMessage.collapse();
    }
}

/**
 * Show error message
 */
function showError(message) {
    const errorContainer = findElement($w, ['#errorContainer', '#error', '#errorMessage']);
    const errorText = findElement($w, ['#errorText', '#errorMsg']);

    if (errorContainer) {
        errorContainer.expand();
    }

    if (errorText) {
        errorText.text = message;
    }

    console.error('❌ Error shown:', message);
}

/**
 * Hide error message
 */
function hideError() {
    const errorContainer = findElement($w, ['#errorContainer', '#error', '#errorMessage']);

    if (errorContainer) {
        errorContainer.collapse();
    }
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
    console.log(`[${type.toUpperCase()}] ${message}`);

    // Try to show in UI if notification element exists
    const notification = findElement($w, ['#notification', '#notificationBar', '#toast']);
    const notificationText = findElement($w, ['#notificationText', '#toastText']);

    if (notification && notificationText) {
        notificationText.text = message;
        notification.expand();

        // Auto-hide after 3 seconds
        setTimeout(() => {
            notification.collapse();
        }, 3000);
    }
}

/**
 * Setup entrance/exit animations
 */
function setupAnimations() {
    // Animations will be handled by CSS/Wix animation system
    // This function can be extended for custom animations
    console.log('🎭 Animations ready');
}

/**
 * Play entrance animation
 */
function playEntranceAnimation() {
    const modal = findElement($w, ['#modalBox', '#modal', '#container']);
    const overlay = findElement($w, ['#modalOverlay', '#overlay', '#backdrop']);

    if (overlay) {
        overlay.show('fade', { duration: 400 });
    }

    if (modal) {
        // Scale in with bounce
        modal.hide();
        setTimeout(() => {
            modal.show('bounce', { duration: 600 });
        }, 100);
    }

    console.log('🌀 Entrance animation played');
}

/**
 * Play exit animation
 */
function playExitAnimation() {
    const modal = findElement($w, ['#modalBox', '#modal', '#container']);
    const overlay = findElement($w, ['#modalOverlay', '#overlay', '#backdrop']);

    return new Promise((resolve) => {
        if (modal) {
            modal.hide('fade', { duration: 400 });
        }

        if (overlay) {
            overlay.hide('fade', { duration: 400 });
        }

        setTimeout(() => {
            resolve();
        }, 500);
    });
}

/**
 * Close modal with optional result data
 */
async function closeModal(result) {
    console.log('🚪 Closing modal...', result ? 'with result' : 'cancelled');

    // Play exit animation
    await playExitAnimation();

    // Close lightbox with result
    wixWindow.lightbox.close(result);
}

/**
 * Utility: Find element by multiple possible IDs
 */
function findElement(context, ids) {
    for (const id of ids) {
        try {
            const element = context(id);
            if (element) return element;
        } catch (e) {
            continue;
        }
    }
    return null;
}

// Export functions for testing
export function getModalData() {
    return modalData;
}

export function getCurrentMode() {
    return currentMode;
}

export function getUserPrompt() {
    return userPrompt;
}

export function getGeneratedVariations() {
    return generatedVariations;
}
