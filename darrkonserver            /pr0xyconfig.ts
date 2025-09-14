// proxyConfig.ts

// Define a type for individual proxy configuration
interface ProxyConfig {
  id: string; // Unique identifier for the proxy (e.g., 'framevault', 'ultraviolet')
  name: string; // User-friendly name for the proxy
  description: string; // Brief description of the proxy's purpose or strengths
  // Optional: Base URL if constructing URLs dynamically
  // baseUrl?: string; 
}

// Define a type for the collection of available proxies
interface ProxyList {
  [key: string]: ProxyConfig; // Key is the proxy ID, value is its config
}

// 1. Define your available proxies with their configurations
const PROXIES: ProxyList = {
  framevault: {
    id: 'framevault',
    name: 'Darrkon FrameVault',
    description: 'Advanced iframe loading, for shady sites like Bloxd.io or Github...'
    // baseUrl: 'https://your-framevault-base-url.com/'
  },
  rammerhead: {
    id: 'rammerhead',
    name: 'Rammerhead',
    description: 'Good for Discord/GFN.'
    // baseUrl: 'https://your-rammerhead-base-url.com/'
  },
  ultraviolet: {
    id: 'ultraviolet',
    name: 'Ultraviolet',
    description: 'Fast loading for Crazygames/ChatGPT.'
    // baseUrl: 'https://your-ultraviolet-base-url.com/'
  },
  helios: {
    id: 'helios',
    name: 'Helios',
    description: 'CORS proxy method.'
    // baseUrl: 'https://your-helios-base-url.com/'
  },
  shadow: {
    id: 'shadow',
    name: 'AmplifyUV',
    description: 'Space Browser. Helios, but UV, and better!'
    // baseUrl: 'https://your-shadow-base-url.com/'
  },
  wombatserver: {
    id: 'wombatserver',
    name: 'WOMGNIX',
    description: 'Wombatserver + NGINX mix.'
    // baseUrl: 'https://your-wombatserver-base-url.com/'
  }
};

// 2. Function to get the currently selected proxy ID
// This would typically retrieve the value from local storage or user selection state
function getSelectedProxyId(): string | null {
  // Example: Retrieve from localStorage (as in your JS)
  // In a real TS app, you might use a state management library or pass it as an argument
  return localStorage.getItem('selectedProxy') || 'framevault'; // Default to 'framevault'
}

// 3. Function to get the full configuration object for the selected proxy
function getSelectedProxyConfig(): ProxyConfig | undefined {
  const selectedId = getSelectedProxyId();
  if (selectedId && PROXIES[selectedId]) {
    return PROXIES[selectedId];
  }
  // Return undefined or a default config if not found
  console.warn(`Proxy configuration for ID '${selectedId}' not found.`);
  return undefined;
}

// 4. Function to set the selected proxy ID (e.g., saving to localStorage)
function setSelectedProxyId(proxyId: string): void {
  if (PROXIES[proxyId]) {
    localStorage.setItem('selectedProxy', proxyId);
    console.log(`Proxy set to: ${proxyId}`);
  } else {
    console.error(`Invalid proxy ID: ${proxyId}`);
  }
}

// 5. Example usage function (like launchProxy but just determining the URL)
function determineProxyUrl(userInput: string): string | null {
  const selectedProxy = getSelectedProxyConfig();
  if (!selectedProxy) {
    console.error("No valid proxy selected.");
    return null;
  }

  const input = userInput.trim();
  let targetUrl: string;

  // Logic similar to your buildFramevaultUrl function
  if (/^https?:\/\//i.test(input)) {
    targetUrl = input; // Full URL already
  } else if (input.includes('.') && !input.includes(' ')) {
    targetUrl = 'https://' + input; // Treat as domain
  } else {
    // Treat as search query (you'd need your search engine logic here too)
    const currentSearchEngineUrl = 'https://swisscows.com/en?query='; // Example default
    targetUrl = currentSearchEngineUrl + encodeURIComponent(input);
  }

  // Construct the final URL based on the selected proxy
  // This part depends heavily on how your specific proxies work
  switch (selectedProxy.id) {
    case 'framevault':
      // Example: FrameVault might just load the target URL directly in an iframe
      // Or it might have its own service URL that takes the target as a parameter
      // return `https://framevault-service.com/proxy?url=${encodeURIComponent(targetUrl)}`;
      // For simplicity, assuming direct iframe load like your JS:
      return targetUrl; 
    case 'rammerhead':
      // Rammerhead typically has a specific path
      return 'https://darrkonpr0xy.vercel.app/rammerheadshark.html';
    case 'ultraviolet':
      return 'https://darrkonpr0xy.vercel.app/ultraviolet%20rays.html';
    case 'helios':
      return 'https://helios-browser.vercel.app/';
    case 'shadow':
      return 'https://darrkonpr0xy.vercel.app/space%20exploration.html';
    case 'wombatserver':
      return 'https://womginx.arph.org/';
    default:
      console.warn(`URL construction logic not defined for proxy: ${selectedProxy.id}`);
      return null; // Or a default/error URL
  }
}

// --- Example Usage ---
// setSelectedProxyId('ultraviolet'); // Simulate user selecting Ultraviolet
// const urlToLoad = determineProxyUrl("https://example.com");
// console.log("Determined URL for proxy:", urlToLoad);

// Export types and functions if using modules
// export { ProxyConfig, ProxyList, PROXIES, getSelectedProxyId, getSelectedProxyConfig, setSelectedProxyId, determineProxyUrl };
