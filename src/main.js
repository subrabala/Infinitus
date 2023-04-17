const outputElement = document.getElementById("info");

const smallDevice = window.matchMedia("(max-width: 1000px)");

smallDevice.addEventListener(handleDeviceChange);

function handleDeviceChange(e) {
  if (e.matches) {
    alert("Please view on a larger platform");
  }
}

// Run it initially
handleDeviceChange(smallDevice);
