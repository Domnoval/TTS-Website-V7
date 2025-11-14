// TTS WEBSITE V7 - Contact Page

$w.onReady(function () {
    console.log('📧 Contact page loaded');

    // Simple fade-in animation
    try {
        $w('#contactContent').hide();
        $w('#contactContent').show('fade', { duration: 600 });
    } catch (e) {
        // Element doesn't exist
    }

    // Setup contact form if it exists
    setupContactForm();
});

/**
 * Setup contact form submission
 */
function setupContactForm() {
    const submitBtn = $w('#submitContact');
    if (submitBtn) {
        submitBtn.onClick(() => {
            handleContactSubmit();
        });
    }
}

/**
 * Handle contact form submission
 */
async function handleContactSubmit() {
    // Get form values
    const name = $w('#nameInput').value;
    const email = $w('#emailInput').value;
    const message = $w('#messageInput').value;

    console.log('Contact form submitted:', { name, email, message });

    // TODO: Send email or save to database

    // Show success message
    $w('#successMessage').expand();
}
