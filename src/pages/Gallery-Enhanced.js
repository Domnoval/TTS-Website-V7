// TTS WEBSITE V7 - ULTIMATE BAROQUE CYBERPUNK GALLERY
// Futuristic nostalgia meets madness:
// - 3D Rotating Tesseract background
// - Particle system
// - Holographic effects
// - VHS glitch transitions
// - Baroque ornate frames
// - Neon cyberpunk accents

import wixLocation from 'wix-location';
import wixData from 'wix-data';
import wixWindow from 'wix-window';

// Gallery state
let selectedPaintings = [];
let allPaintings = [];
let selectionMode = 'single'; // 'single' or 'multi'

// Animation state
let particles = [];
let tesseractWireframe = null;
let isLowPowerMode = false;

$w.onReady(function () {
    console.log('🌀 TTS ULTIMATE CYBERPUNK GALLERY Loading...');

    // Detect performance mode
    detectPerformanceMode();

    // Initialize epic effects
    if (!isLowPowerMode) {
        initializeParticleSystem();
        initializeTesseractWireframe();
    }

    // Initialize gallery
    initializeEpicGallery();

    // Load paintings
    loadPaintings();

    // Setup AI controls
    setupAIControls();

    // Setup mode toggles
    setupModeToggles();

    // Add glitch effects on page transitions
    setupGlitchTransitions();
});

/**
 * Detect if we should use low-power mode
 */
function detectPerformanceMode() {
    // Check for mobile
    const isMobile = wixWindow.formFactor === 'Mobile';

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    isLowPowerMode = isMobile || prefersReducedMotion;

    console.log(`⚡ Performance Mode: ${isLowPowerMode ? 'Low Power' : 'Full Effects'}`);
}

/**
 * Initialize cosmic particle system
 */
function initializeParticleSystem() {
    console.log('✨ Initializing particle system...');

    // Create particle container
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.id = 'particleContainer';

    // Add to page
    try {
        const galleryElement = document.querySelector('#galleryContainer') ||
                             document.querySelector('.gallery-container') ||
                             document.body;

        galleryElement.appendChild(particleContainer);
    } catch (e) {
        console.warn('Could not add particle container to page');
        return;
    }

    // Generate particles
    const particleCount = isLowPowerMode ? 20 : 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particleContainer);
    }

    console.log(`💫 Created ${particleCount} particles`);
}

/**
 * Create a single particle
 */
function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random position and animation
    const startX = Math.random() * 100;
    const endX = startX + (Math.random() - 0.5) * 50;
    const duration = 5 + Math.random() * 10;
    const delay = Math.random() * 5;

    particle.style.left = startX + '%';
    particle.style.setProperty('--tx', endX + 'vw');
    particle.style.animationDuration = duration + 's';
    particle.style.animationDelay = delay + 's';

    container.appendChild(particle);
    particles.push(particle);
}

/**
 * Initialize 3D tesseract wireframe overlay
 */
function initializeTesseractWireframe() {
    console.log('🔮 Initializing tesseract wireframe...');

    // Create SVG tesseract wireframe
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');

    svg.setAttribute('id', 'tesseractWireframe');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.position = 'fixed';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.pointerEvents = 'none';
    svg.style.zIndex = '1';
    svg.style.opacity = '0.1';

    // Create hypercube wireframe (8 vertices projected to 2D)
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const size = 200;

    // Tesseract vertices (simplified 3D projection)
    const vertices = [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
    ];

    // Draw edges
    const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0], // Front face
        [4, 5], [5, 6], [6, 7], [7, 4], // Back face
        [0, 4], [1, 5], [2, 6], [3, 7]  // Connecting edges
    ];

    edges.forEach(([start, end]) => {
        const line = document.createElementNS(svgNS, 'line');

        const [x1, y1] = project3D(vertices[start], size, centerX, centerY);
        const [x2, y2] = project3D(vertices[end], size, centerX, centerY);

        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', '#00f0ff');
        line.setAttribute('stroke-width', '2');
        line.style.filter = 'drop-shadow(0 0 5px #00f0ff)';

        svg.appendChild(line);
    });

    // Add to page
    try {
        document.body.appendChild(svg);
        tesseractWireframe = svg;

        // Animate rotation
        animateTesseract(svg, vertices, edges, size, centerX, centerY);
    } catch (e) {
        console.warn('Could not add tesseract wireframe');
    }
}

/**
 * Project 3D point to 2D
 */
function project3D([x, y, z], scale, centerX, centerY) {
    const perspective = 500;
    const factor = perspective / (perspective + z * scale);

    return [
        centerX + x * scale * factor,
        centerY + y * scale * factor
    ];
}

/**
 * Animate tesseract rotation
 */
function animateTesseract(svg, vertices, edges, size, centerX, centerY) {
    let angle = 0;

    function rotate() {
        if (isLowPowerMode) return;

        angle += 0.005;

        // Rotate vertices
        const rotated = vertices.map(([x, y, z]) => {
            // Rotate around Y and X axes
            const cosY = Math.cos(angle);
            const sinY = Math.sin(angle);
            const cosX = Math.cos(angle * 0.7);
            const sinX = Math.sin(angle * 0.7);

            // Y rotation
            let newX = x * cosY - z * sinY;
            let newZ = x * sinY + z * cosY;

            // X rotation
            let newY = y * cosX - newZ * sinX;
            newZ = y * sinX + newZ * cosX;

            return [newX, newY, newZ];
        });

        // Update lines
        const lines = svg.querySelectorAll('line');
        edges.forEach(([start, end], index) => {
            const line = lines[index];
            const [x1, y1] = project3D(rotated[start], size, centerX, centerY);
            const [x2, y2] = project3D(rotated[end], size, centerX, centerY);

            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
        });

        requestAnimationFrame(rotate);
    }

    rotate();
}

/**
 * Setup glitch transitions
 */
function setupGlitchTransitions() {
    // Add glitch effect to page transitions
    let glitchInterval = null;

    // Trigger glitch on navigation
    wixLocation.onChange(() => {
        triggerGlitch();
    });

    // Random glitches (rare)
    setInterval(() => {
        if (Math.random() < 0.05) { // 5% chance every 10 seconds
            triggerGlitch();
        }
    }, 10000);
}

/**
 * Trigger VHS glitch effect
 */
function triggerGlitch() {
    try {
        const gallery = $w('#galleryContainer');
        gallery.style.animation = 'glitchRGB 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

        setTimeout(() => {
            gallery.style.animation = '';
        }, 300);

        console.log('⚡ GLITCH!');
    } catch (e) {
        // Gallery container not found
    }
}

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

    // Add energy field elements dynamically
    addEnergyFields();

    console.log('✨ Gallery initialized with ULTIMATE EFFECTS');
}

/**
 * Add energy field containers to painting items
 */
function addEnergyFields() {
    // This would be done when items are created
    // We'll add the energy-field class dynamically on selection
}

/**
 * Load paintings from database
 */
async function loadPaintings() {
    try {
        console.log('Loading paintings...');

        // Query your portfolio/paintings collection
        const result = await wixData.query('Portfolio')
            .eq('status', 'published')
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
 * Setup individual painting item with EPIC interactions
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

    // Add baroque/cyberpunk classes
    if (container) {
        container.className = (container.className || '') + ' painting-item fade-in-up';

        // Staggered animation
        if (container.style) {
            container.style.animationDelay = (index * 0.05) + 's';
        }
    }

    // Make the painting selectable
    if (container || image) {
        const clickTarget = container || image;

        // Click handler for selection
        clickTarget.onClick(() => {
            togglePaintingSelection(itemData, $item, container);
        });

        // Epic hover effects
        clickTarget.onMouseIn(() => {
            if (selectOverlay) {
                selectOverlay.expand();
            }

            // Add holographic shimmer
            if (container && !isLowPowerMode) {
                container.className = (container.className || '') + ' holographic-active';
            }
        });

        clickTarget.onMouseOut(() => {
            const isSelected = selectedPaintings.some(p => p._id === itemData._id);
            if (!isSelected && selectOverlay) {
                selectOverlay.collapse();
            }

            // Remove holographic shimmer
            if (container) {
                container.className = (container.className || '').replace(' holographic-active', '');
            }
        });
    }

    // Initialize selection state
    updatePaintingSelectionUI($item, container, false);
}

/**
 * Toggle painting selection with EPIC EFFECTS
 */
function togglePaintingSelection(painting, $item, container) {
    const isSelected = selectedPaintings.some(p => p._id === painting._id);

    if (isSelected) {
        // Deselect
        selectedPaintings = selectedPaintings.filter(p => p._id !== painting._id);
        updatePaintingSelectionUI($item, container, false);
        console.log(`🖼️ Deselected: ${painting.title || 'Untitled'}`);

        // Remove energy field
        removeEnergyField(container);
    } else {
        // Select
        if (selectionMode === 'single') {
            // Clear previous selections in single mode
            clearAllSelections();
            selectedPaintings = [painting];
        } else {
            // Add to selection in multi mode (max 4 paintings for blending)
            if (selectedPaintings.length >= 4) {
                showNotification('⚠️ MAXIMUM 4 PAINTINGS FOR BLENDING', 'warning');
                triggerGlitch(); // Glitch effect for error
                return;
            }
            selectedPaintings.push(painting);
        }

        updatePaintingSelectionUI($item, container, true);
        console.log(`🎨 Selected: ${painting.title || 'Untitled'}`);

        // Add energy field
        addEnergyField(container);

        // Play selection sound effect (if audio enabled)
        playSelectionSound();
    }

    // Update controls based on selection
    updateAIControls();
}

/**
 * Add energy field effect to container
 */
function addEnergyField(container) {
    if (!container || isLowPowerMode) return;

    try {
        // Add selected class
        container.setAttribute('data-selected', 'true');
        container.className = (container.className || '') + ' selected';

        // Create energy field div
        const energyField = document.createElement('div');
        energyField.className = 'energy-field';
        container.appendChild(energyField);
    } catch (e) {
        console.warn('Could not add energy field');
    }
}

/**
 * Remove energy field effect
 */
function removeEnergyField(container) {
    if (!container) return;

    try {
        container.setAttribute('data-selected', 'false');
        container.className = (container.className || '').replace(' selected', '');

        // Remove energy field div
        const energyField = container.querySelector('.energy-field');
        if (energyField) {
            energyField.remove();
        }
    } catch (e) {
        console.warn('Could not remove energy field');
    }
}

/**
 * Play selection sound effect (cyberpunk beep)
 */
function playSelectionSound() {
    // Would integrate with Web Audio API for custom sounds
    // For now, just log
    console.log('🔊 *cyberpunk beep*');
}

/**
 * Update painting selection UI with EPIC STYLING
 */
function updatePaintingSelectionUI($item, container, isSelected) {
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
            const container = findElement($item, ['#itemContainer', '#container', '#paintingContainer']);
            updatePaintingSelectionUI($item, container, false);
            removeEnergyField(container);
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
            triggerGlitch(); // Glitch transition
            openAIManipulationModal();
        });
    }

    // Blend button (for multiple paintings)
    const blendBtn = findElement($w, ['#blendButton', '#aiBlendBtn', '#blendBtn']);
    if (blendBtn) {
        blendBtn.onClick(() => {
            triggerGlitch(); // Glitch transition
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

    // Update button states
    const singleModeBtn = findElement($w, ['#singleModeButton', '#singleMode']);
    const multiModeBtn = findElement($w, ['#multiModeButton', '#multiMode']);

    if (singleModeBtn && multiModeBtn) {
        if (mode === 'single') {
            singleModeBtn.className = (singleModeBtn.className || '') + ' active';
            multiModeBtn.className = (multiModeBtn.className || '').replace(' active', '');
        } else {
            multiModeBtn.className = (multiModeBtn.className || '') + ' active';
            singleModeBtn.className = (singleModeBtn.className || '').replace(' active', '');
        }
    }

    console.log(`🎯 Selection mode: ${mode}`);
    showNotification(
        mode === 'single'
            ? '🎨 SINGLE MODE: MANIPULATE ONE PAINTING'
            : '🔀 BLEND MODE: FUSE MULTIPLE REALITIES',
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
        // Show controls with animation
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
        showNotification('⚠️ SELECT EXACTLY ONE PAINTING', 'error');
        return;
    }

    console.log('🤖 Opening AI Manipulation Portal...');

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
        showNotification('⚠️ SELECT AT LEAST 2 PAINTINGS TO FUSE', 'error');
        return;
    }

    console.log('🔀 Opening Reality Fusion Portal...');

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

    // Epic success animation
    triggerSuccessAnimation();

    // Show success message
    showNotification('🌀 YOUR VISION HAS MANIFESTED', 'success');

    // Clear selections
    clearAllSelections();

    // TODO: Navigate to purchase page or show order modal
}

/**
 * Trigger epic success animation
 */
function triggerSuccessAnimation() {
    // Flash the screen with neon colors
    if (isLowPowerMode) return;

    try {
        const gallery = $w('#galleryContainer');
        const originalBg = gallery.style.background;

        gallery.style.background = 'radial-gradient(circle, rgba(0,240,255,0.3), transparent)';

        setTimeout(() => {
            gallery.style.background = originalBg;
        }, 500);
    } catch (e) {
        console.warn('Success animation skipped');
    }
}

/**
 * Update gallery statistics
 */
function updateGalleryStats() {
    const totalCount = findElement($w, ['#totalPaintings', '#paintingCount']);
    const selectedCount = findElement($w, ['#selectedCount', '#selectionCount']);

    if (totalCount) {
        totalCount.text = `${allPaintings.length} ARTWORKS`;
    }

    if (selectedCount) {
        selectedCount.text = selectedPaintings.length > 0
            ? `${selectedPaintings.length} SELECTED`
            : '';
    }
}

/**
 * Show sample paintings for testing (when database is empty)
 */
function showSamplePaintings() {
    console.log('📝 Loading sample cyberpunk art...');

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
 * Show notification to user with CYBERPUNK STYLING
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

export function getParticleCount() {
    return particles.length;
}

export function isInLowPowerMode() {
    return isLowPowerMode;
}
