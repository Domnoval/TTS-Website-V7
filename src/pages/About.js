// TTS WEBSITE V7 - About Page

$w.onReady(function () {
    console.log('ℹ️ About page loaded');

    // Simple fade-in animation
    try {
        $w('#aboutContent').hide();
        $w('#aboutContent').show('fade', { duration: 600 });
    } catch (e) {
        // Element doesn't exist
    }
});
