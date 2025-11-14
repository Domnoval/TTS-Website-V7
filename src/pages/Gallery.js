// TTS WEBSITE V7 - Epic Interactive AI Gallery
// Where art meets AI - customers can manipulate and blend paintings

import wixLocation from 'wix-location';
import wixData from 'wix-data';
import wixWindow from 'wix-window';

// Gallery state
let selectedPaintings = [];
let allPaintings = [];
let selectionMode = 'single'; // 'single' or 'multi'

$w.onReady(function () {
    console.log('🎨 TTS Gallery Loading...');

    // Initialize epic gallery
    initializeEpicGallery();

    // Load paintings
    loadPaintings();

    // Setup AI controls
    setupAIControls();

    // Setup mode toggles
    setupModeToggles();
});

/**
 * Initialize the epic gallery experience
 */
function initializeEpicGallery() {
    // Add fade-in animation
    try {
        $w('#galleryContainer').hide();
        $w('#galleryContainer').show('fade', { duration: 800 });
    } catch (e) {
        console.log('Gallery container animation skipped');
    }

    // Hide AI controls initially
    hideAIControls();

    console.log('✨ Gallery initialized');
}

/**
 * Load paintings from database
 */
async function loadPaintings() {
    try {
        console.log('Loading paintings...');

        // Query your portfolio/paintings collection
        const result = await wixData.query('Portfolio')
            .limit(100)
            .find();

        allPaintings = result.items;
        console.log(`📸 Loaded ${allPaintings.length} paintings`);

        // Setup the repeater
        const repeater = $w('#portfolioRepeater');
        if (repeater) {
            repeater.data = allPaintings;
            repeater.onItemReady(($item, itemData, index) => {
                setupPaintingItem($item, itemData, index);
            });
        }

        updateGalleryStats();

    } catch (error) {
        console.error('Error loading paintings:', error);

        // Show sample data for testing
        showSamplePaintings();
    }
}

/**
 * Setup individual painting item with interactions
 */
function setupPaintingItem($item, itemData, index) {
    // Get elements
    const image = findElement($item, ['#portfolioImage', '#image', '#img', '#paintingImage']);
    const title = findElement($item, ['#portfolioTitle', '#title', '#name', '#paintingTitle']);
    const container = findElement($item, ['#itemContainer', '#container', '#paintingContainer']);
    const selectOverlay = findElement($item, ['#selectOverlay', '#overlay', '#selectionOverlay']);
    const selectCheckbox = findElement($item, ['#selectCheckbox', '#checkbox', '#selected']);

    // Set basic data
    if (image && itemData.image) {
        image.src = itemData.image;
    }

    if (title) {
        title.text = itemData.title || itemData.name || 'Untitled';
    }

    // Make the painting selectable
    if (container || image) {
        const clickTarget = container || image;

        // Click handler for selection
        clickTarget.onClick(() => {
            togglePaintingSelection(itemData, $item);
        });

        // Hover effects
        clickTarget.onMouseIn(() => {
            if (selectOverlay) {
                selectOverlay.expand();
            }
        });

        clickTarget.onMouseOut(() => {
            const isSelected = selectedPaintings.some(p => p._id === itemData._id);
            if (!isSelected && selectOverlay) {
                selectOverlay.collapse();
            }
        });
    }

    // Initialize selection state
    updatePaintingSelectionUI($item, false);
}

/**
 * Toggle painting selection
 */
function togglePaintingSelection(painting, $item) {
    const isSelected = selectedPaintings.some(p => p._id === painting._id);

    if (isSelected) {
        // Deselect
        selectedPaintings = selectedPaintings.filter(p => p._id !== painting._id);
        updatePaintingSelectionUI($item, false);
        console.log(`🖼️ Deselected: ${painting.title || 'Untitled'}`);
    } else {
        // Select
        if (selectionMode === 'single') {
            // Clear previous selections in single mode
            clearAllSelections();
            selectedPaintings = [painting];
        } else {
            // Add to selection in multi mode (max 4 paintings for blending)
            if (selectedPaintings.length >= 4) {
                showNotification('Maximum 4 paintings can be blended together', 'warning');
                return;
            }
            selectedPaintings.push(painting);
        }
        updatePaintingSelectionUI($item, true);
        console.log(`🎨 Selected: ${painting.title || 'Untitled'}`);
    }

    // Update controls based on selection
    updateAIControls();
}

/**
 * Update painting selection UI
 */
function updatePaintingSelectionUI($item, isSelected) {
    const selectOverlay = findElement($item, ['#selectOverlay', '#overlay', '#selectionOverlay']);
    const selectCheckbox = findElement($item, ['#selectCheckbox', '#checkbox', '#selected']);

    if (isSelected) {
        if (selectOverlay) {
            selectOverlay.expand();
        }
        if (selectCheckbox) {
            selectCheckbox.checked = true;
            selectCheckbox.expand();
        }
    } else {
        if (selectOverlay) {
            selectOverlay.collapse();
        }
        if (selectCheckbox) {
            selectCheckbox.checked = false;
            selectCheckbox.collapse();
        }
    }
}

/**
 * Clear all selections
 */
function clearAllSelections() {
    selectedPaintings = [];

    // Reset all UI
    const repeater = $w('#portfolioRepeater');
    if (repeater) {
        repeater.forEachItem(($item, itemData, index) => {
            updatePaintingSelectionUI($item, false);
        });
    }

    hideAIControls();
    console.log('🔄 Cleared all selections');
}

/**
 * Setup AI control buttons
 */
function setupAIControls() {
    // Manipulate button (for single painting + prompt)
    const manipulateBtn = findElement($w, ['#manipulateButton', '#aiManipulateBtn', '#manipulateBtn']);
    if (manipulateBtn) {
        manipulateBtn.onClick(() => {
            openAIManipulationModal();
        });
    }

    // Blend button (for multiple paintings)
    const blendBtn = findElement($w, ['#blendButton', '#aiBlendBtn', '#blendBtn']);
    if (blendBtn) {
        blendBtn.onClick(() => {
            openAIBlendModal();
        });
    }

    // Clear selection button
    const clearBtn = findElement($w, ['#clearSelectionButton', '#clearBtn', '#clearSelection']);
    if (clearBtn) {
        clearBtn.onClick(() => {
            clearAllSelections();
        });
    }
}

/**
 * Setup mode toggle buttons
 */
function setupModeToggles() {
    // Single select mode
    const singleModeBtn = findElement($w, ['#singleModeButton', '#singleMode']);
    if (singleModeBtn) {
        singleModeBtn.onClick(() => {
            setSelectionMode('single');
        });
    }

    // Multi select mode
    const multiModeBtn = findElement($w, ['#multiModeButton', '#multiMode']);
    if (multiModeBtn) {
        multiModeBtn.onClick(() => {
            setSelectionMode('multi');
        });
    }
}

/**
 * Set selection mode
 */
function setSelectionMode(mode) {
    selectionMode = mode;
    clearAllSelections();

    console.log(`🎯 Selection mode: ${mode}`);
    showNotification(
        mode === 'single'
            ? '🎨 Single Mode: Click a painting to manipulate it with AI'
            : '🔀 Blend Mode: Select multiple paintings to blend together',
        'info'
    );
}

/**
 * Update AI control buttons based on selection
 */
function updateAIControls() {
    const manipulateBtn = findElement($w, ['#manipulateButton', '#aiManipulateBtn', '#manipulateBtn']);
    const blendBtn = findElement($w, ['#blendButton', '#aiBlendBtn', '#blendBtn']);
    const clearBtn = findElement($w, ['#clearSelectionButton', '#clearBtn', '#clearSelection']);
    const aiControlPanel = findElement($w, ['#aiControlPanel', '#aiControls']);

    if (selectedPaintings.length === 0) {
        hideAIControls();
    } else {
        // Show controls
        if (aiControlPanel) {
            aiControlPanel.expand();
        }
        if (clearBtn) {
            clearBtn.expand();
        }

        // Show/hide appropriate buttons
        if (selectedPaintings.length === 1) {
            if (manipulateBtn) {
                manipulateBtn.expand();
                manipulateBtn.enable();
            }
            if (blendBtn) {
                blendBtn.collapse();
            }
        } else if (selectedPaintings.length >= 2) {
            if (manipulateBtn) {
                manipulateBtn.collapse();
            }
            if (blendBtn) {
                blendBtn.expand();
                blendBtn.enable();
            }
        }
    }

    updateGalleryStats();
}

/**
 * Hide AI controls
 */
function hideAIControls() {
    const elements = [
        '#aiControlPanel', '#aiControls',
        '#manipulateButton', '#aiManipulateBtn', '#manipulateBtn',
        '#blendButton', '#aiBlendBtn', '#blendBtn',
        '#clearSelectionButton', '#clearBtn', '#clearSelection'
    ];

    elements.forEach(id => {
        try {
            $w(id).collapse();
        } catch (e) {
            // Element doesn't exist
        }
    });
}

/**
 * Open AI Manipulation Modal (single painting + prompt)
 */
function openAIManipulationModal() {
    if (selectedPaintings.length !== 1) {
        showNotification('Please select exactly one painting', 'error');
        return;
    }

    console.log('🤖 Opening AI Manipulation Modal...');

    // Open lightbox with painting data
    wixWindow.openLightbox('AIManipulation', {
        painting: selectedPaintings[0],
        mode: 'manipulate'
    }).then((result) => {
        if (result && result.success) {
            handleAIResult(result);
        }
    });
}

/**
 * Open AI Blend Modal (multiple paintings)
 */
function openAIBlendModal() {
    if (selectedPaintings.length < 2) {
        showNotification('Please select at least 2 paintings to blend', 'error');
        return;
    }

    console.log('🔀 Opening AI Blend Modal...');

    // Open lightbox with paintings data
    wixWindow.openLightbox('AIManipulation', {
        paintings: selectedPaintings,
        mode: 'blend'
    }).then((result) => {
        if (result && result.success) {
            handleAIResult(result);
        }
    });
}

/**
 * Handle AI generation result
 */
function handleAIResult(result) {
    console.log('✨ AI Generation Complete!', result);

    // Show success message
    showNotification('🎨 Your custom art has been created!', 'success');

    // Clear selections
    clearAllSelections();

    // TODO: Navigate to purchase page or show order modal
}

/**
 * Update gallery statistics
 */
function updateGalleryStats() {
    const totalCount = findElement($w, ['#totalPaintings', '#paintingCount']);
    const selectedCount = findElement($w, ['#selectedCount', '#selectionCount']);

    if (totalCount) {
        totalCount.text = `${allPaintings.length} Paintings`;
    }

    if (selectedCount) {
        selectedCount.text = selectedPaintings.length > 0
            ? `${selectedPaintings.length} Selected`
            : '';
    }
}

/**
 * Show sample paintings for testing (when database is empty)
 */
function showSamplePaintings() {
    console.log('📝 Loading sample data for testing...');

    const sampleData = [
        { _id: '1', title: 'Cosmic Dreams', image: 'https://picsum.photos/400/600?random=1', description: 'Abstract cosmic art' },
        { _id: '2', title: 'Urban Chaos', image: 'https://picsum.photos/400/600?random=2', description: 'City energy captured' },
        { _id: '3', title: 'Nature\'s Whisper', image: 'https://picsum.photos/400/600?random=3', description: 'Organic forms' },
        { _id: '4', title: 'Digital Realm', image: 'https://picsum.photos/400/600?random=4', description: 'Tech-inspired' },
        { _id: '5', title: 'Emotion Waves', image: 'https://picsum.photos/400/600?random=5', description: 'Feeling through color' },
        { _id: '6', title: 'Time Fragments', image: 'https://picsum.photos/400/600?random=6', description: 'Moments captured' }
    ];

    allPaintings = sampleData;

    const repeater = $w('#portfolioRepeater');
    if (repeater) {
        repeater.data = sampleData;
        repeater.onItemReady(($item, itemData, index) => {
            setupPaintingItem($item, itemData, index);
        });
    }

    updateGalleryStats();
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

/**
 * Show notification to user
 */
function showNotification(message, type = 'info') {
    console.log(`[${type.toUpperCase()}] ${message}`);

    // Try to show in UI if notification element exists
    const notification = findElement($w, ['#notification', '#notificationBar', '#messageBar']);
    if (notification) {
        notification.text = message;
        notification.expand();

        // Auto-hide after 3 seconds
        setTimeout(() => {
            notification.collapse();
        }, 3000);
    }
}

// Export functions for testing
export function getSelectedPaintings() {
    return selectedPaintings;
}

export function getSelectionMode() {
    return selectionMode;
}
