if (navigator.serviceWorker.controller) {
    console.log("Active service worker found");
} else if ("serviceWorker" in navigator) {
    // declaring scope manually
    // Adjust the path based on where the service worker is located
    const basePath = location.pathname.includes('/physics-book/') ? '/physics-book/' : '/';
    navigator.serviceWorker.register(`${basePath}serviceWorker.js`, {scope: basePath}).then(
        (registration) => {
            console.log("Service worker registration succeeded:", registration);
        },
        (error) => {
            console.error(`Service worker registration failed: ${error}`);
        }
    );
} else {
    console.error("Service workers are not supported.");
}
