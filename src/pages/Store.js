// TTS WEBSITE V7 - E-commerce Store (Printify/Printful)

import wixLocation from 'wix-location';
import wixData from 'wix-data';

$w.onReady(function () {
    console.log('🛍️ TTS Store Loading...');

    // Initialize store
    initializeStore();

    // Load products
    loadProducts();
});

/**
 * Initialize store page
 */
function initializeStore() {
    // Fade in animation
    try {
        $w('#storeContainer').hide();
        $w('#storeContainer').show('fade', { duration: 600 });
    } catch (e) {
        console.log('Store container animation skipped');
    }
}

/**
 * Load products from Wix Stores or database
 */
async function loadProducts() {
    try {
        console.log('Loading products...');

        // Query products collection
        // This will connect to Wix Stores + Printify/Printful
        const result = await wixData.query('Stores/Products')
            .find();

        console.log(`📦 Loaded ${result.items.length} products`);

        // Setup product repeater
        const productRepeater = $w('#productRepeater');
        if (productRepeater) {
            productRepeater.data = result.items;
            productRepeater.onItemReady(($item, itemData) => {
                setupProductItem($item, itemData);
            });
        }

    } catch (error) {
        console.error('Error loading products:', error);
        showSampleProducts();
    }
}

/**
 * Setup individual product item
 */
function setupProductItem($item, itemData) {
    const productImage = $item('#productImage');
    const productName = $item('#productName');
    const productPrice = $item('#productPrice');
    const addToCartBtn = $item('#addToCart');

    // Set product data
    if (productImage && itemData.mainMedia) {
        productImage.src = itemData.mainMedia;
    }

    if (productName) {
        productName.text = itemData.name;
    }

    if (productPrice) {
        productPrice.text = `$${itemData.price}`;
    }

    // Add to cart button
    if (addToCartBtn) {
        addToCartBtn.onClick(() => {
            // This will use Wix Stores built-in cart
            console.log('Adding to cart:', itemData.name);
            wixLocation.to(`/product-page/${itemData._id}`);
        });
    }

    // Click on image to view details
    if (productImage) {
        productImage.onClick(() => {
            wixLocation.to(`/product-page/${itemData._id}`);
        });
    }
}

/**
 * Show sample products for testing
 */
function showSampleProducts() {
    console.log('📝 Loading sample store products...');

    const sampleProducts = [
        { _id: '1', name: 'TTS Art T-Shirt', price: 29.99, mainMedia: 'https://picsum.photos/400/400?random=10' },
        { _id: '2', name: 'TTS Art Hoodie', price: 49.99, mainMedia: 'https://picsum.photos/400/400?random=11' },
        { _id: '3', name: 'TTS Art Sweatshirt', price: 39.99, mainMedia: 'https://picsum.photos/400/400?random=12' },
        { _id: '4', name: 'TTS Art Poster', price: 19.99, mainMedia: 'https://picsum.photos/400/400?random=13' }
    ];

    const productRepeater = $w('#productRepeater');
    if (productRepeater) {
        productRepeater.data = sampleProducts;
        productRepeater.onItemReady(($item, itemData) => {
            setupProductItem($item, itemData);
        });
    }
}
