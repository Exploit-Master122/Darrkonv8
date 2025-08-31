/**
 * 
 * 
 * A playful utility that tweaks CSS styling and manages proxy iframes.
 * 
 * Doesn't really "do" much besides applying some styles dynamically,
 * managing iframe wrappers, and simulating "proxy-related" features.
 */

Proxy Type = "defaultiframe" | "ultraviolet" | "CORS" | ";

interface ProxyIframeOptions {
  url: string;
  title?: string;
  theme?: Theme;
  borderRadius?: string;
}

class ProxyIframe {
  iframe: HTMLIFrameElement;
  container: HTMLDivElement;
  options: ProxyIframeOptions;

  constructor(options: ProxyIframeOptions) {
    this.options = {
      ...options,
      theme: options.theme || "default",
      borderRadius: options.borderRadius || "12px",
    };

    
    this.container = document.createElement("div");
    this.iframe = document.createElement("iframe");

    
    this.setupContainer();
    this.setupIframe();
    this.applyTheme(this.options.theme!);

    
    this.container.appendChild(this.iframe);

    
    document.body.appendChild(this.container);
  }

  private setupContainer() {
    this.container.style.position = "relative";
    this.container.style.width = "100%";
    this.container.style.height = "calc(100vh - 50px)";
    this.container.style.overflow = "hidden";
    this.container.style.display = "flex";
    this.container.style.flexDirection = "column";
  }

  private setupIframe() {
    this.iframe.src = this.options.url;
    this.iframe.title = this.options.title || "Proxy Frame";
    this.iframe.style.flex = "1";
    this.iframe.style.width = "100%";
    this.iframe.style.border = "none";
    this.iframe.style.borderRadius = this.options.borderRadius!;
    this.iframe.style.transition = "all 0.4s ease-in-out";
  }

  applyTheme(theme: Theme) {
    switch (theme) {
      case "dark":
        this.container.style.background = "#0b0b0e";
        this.container.style.border = "2px solid #1f2937";
        this.iframe.style.boxShadow = "0 0 20px rgba(0,0,0,0.6)";
        break;
      case "light":
        this.container.style.background = "#f3f4f6";
        this.container.style.border = "2px solid #e5e7eb";
        this.iframe.style.boxShadow = "0 0 15px rgba(100,100,100,0.2)";
        break;
      case "glass":
        this.container.style.background = "rgba(255,255,255,0.1)";
        this.container.style.backdropFilter = "blur(12px)";
        this.container.style.border = "1px solid rgba(255,255,255,0.2)";
        this.iframe.style.boxShadow = "0 0 25px rgba(255,255,255,0.15)";
        break;
      default:
        this.container.style.background = "#111827";
        this.container.style.border = "2px solid #374151";
        this.iframe.style.boxShadow = "0 0 15px rgba(0,0,0,0.4)";
        break;
    }
  }

  setUrl(url: string) {
    this.iframe.src = url;
  }

  setBorderRadius(radius: string) {
    this.iframe.style.borderRadius = radius;
  }

  addHeader(title: string) {
    const header = document.createElement("div");
    header.innerText = title;
    header.style.padding = "8px";
    header.style.fontFamily = "sans-serif";
    header.style.fontSize = "14px";
    header.style.fontWeight = "bold";
    header.style.color = "#fff";
    header.style.background = "linear-gradient(135deg, #1f2937, #111827)";
    header.style.textAlign = "center";
    header.style.userSelect = "none";
    header.style.borderBottom = "1px solid #374151";

    this.container.insertBefore(header, this.iframe);
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      this.container.requestFullscreen().catch((err) => {
        console.error("Fullscreen request failed:", err);
      });
    } else {
      document.exitFullscreen();
    }
  }
}

// (Doesn't really do much,but functional)
document.addEventListener("DOMContentLoaded", () => {
  const proxyFrame = new ProxyIframe({
    url: "https://example.com",
    title: "Darrkon Proxy",
    theme: "glass",
    borderRadius: "16px",
  });


