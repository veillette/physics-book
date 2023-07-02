if (navigator.serviceWorker.controller) {
    console.log("Active service worker found");
} else if ("serviceWorker" in navigator) {
    // declaring scope manually
    navigator.serviceWorker.register("serviceWorker.js", {scope: "/physics-book/"}).then(
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
