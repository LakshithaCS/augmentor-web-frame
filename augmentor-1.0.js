window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  const category = params.get("c");
  const model = params.get("m");
  const parameters = params.get("p");
  // hard code base url
  const augmentor_base_url = "https://augmentor-web.vercel.app";
  const iframe_url =
    augmentor_base_url +
    "/augmentor/" +
    category +
    "/" +
    model +
    "?p=" +
    parameters;

  function generateLaunchUrl(inputUrl) {
    // Check if the URL already has a query string
    if (inputUrl.includes("?p=b")) {
      // If it does, add '&redirect=Y' at the end
      inputUrl += "r";
    } else {
      // Otherwise, add '?redirect=Y'
      inputUrl += "?p=r";
    }

    const encodedUrl = encodeURIComponent(inputUrl);
    console.log(inputUrl);
    console.log(encodedUrl);
    return `https://launchar.app/launch/ar-5?url=${encodedUrl}`;
  }

  function getDeviceType() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Apple mobile devices
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "apple-mobile";
    }

    // Android mobile devices
    if (/android/i.test(userAgent)) {
      return "android-mobile";
    }

    // Assume desktop otherwise
    return "desktop";
  }

  if (getDeviceType() == "apple-mobile") {
    const launch_url = generateLaunchUrl(iframe_url);
    window.location.href = launch_url;
  } else {
    const iframe = document.getElementById("augmentor-iframe");
    iframe.src = iframe_url;
  }
});
