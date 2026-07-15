import { useEffect, useRef } from 'react';
import fpPromise from '@fingerprintjs/fingerprintjs';
import { UAParser } from 'ua-parser-js';

export const usePictures = () => {
  const isTracked = useRef(false);

  useEffect(() => {
    if (isTracked.current) return;
    isTracked.current = true;

    const executeTracking = async () => {
      try {
        const parser = new UAParser(navigator.userAgent);
        const deviceData = parser.getResult();

        const fp = await fpPromise.load();
        const fpResult = await fp.get();
        const visitorId = fpResult.visitorId;

        const canvas = document.createElement('canvas');
        const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
        
        let gpuName = "Unknown GPU";
        
        if (gl) {
          const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
          if (debugInfo) {
            gpuName = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          }
        }

        let batteryInfo = "Not Supported";
        if ('getBattery' in navigator) {
          const battery: any = await (navigator as any).getBattery();
          batteryInfo = `${Math.round(battery.level * 100)}% - ${battery.charging ? 'Charging' : 'Unplugged'}`;
        }

        const clientPayload = {
          visitor_id: visitorId,
          referrer: document.referrer || "Direct/Typed",
          url_params: window.location.search, 
          hardware: {
            type: deviceData.device.type || "desktop",
            os: `${deviceData.os.name || "Unknown OS"} ${deviceData.os.version || ""}`.trim(),
            browser: `${deviceData.browser.name || "Unknown Browser"} ${deviceData.browser.version || ""}`.trim(),
            gpu: gpuName,
            cpu_cores: navigator.hardwareConcurrency || "Unknown",
            screen: `${window.screen.width}x${window.screen.height}`,
            battery: batteryInfo,
          }
        };

        await fetch('/api/pictures', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(clientPayload),
          keepalive: true 
        }).catch(() => {}); 

      } catch (err) {
      }
    };

    const timer = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(executeTracking);
      } else {
        executeTracking();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
};