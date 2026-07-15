import { useEffect, useRef } from 'react';
import fpPromise from '@fingerprintjs/fingerprintjs';
import { UAParser } from 'ua-parser-js';

export const usePictures = () => {
  const isTracked = useRef(false);

  useEffect(() => {
    // Ngăn React StrictMode chạy 2 lần ở môi trường Dev
    if (isTracked.current) return;
    isTracked.current = true;

    const executeTracking = async () => {
      try {
        // 1. Phân tích Browser & OS (Sử dụng ua-parser-js)
        const parser = new UAParser(navigator.userAgent);
        const deviceData = parser.getResult();

        // 2. Lấy Dấu vân tay định danh (FingerprintJS)
        const fp = await fpPromise.load();
        const fpResult = await fp.get();
        const visitorId = fpResult.visitorId;

        // 3. Khai thác sức mạnh phần cứng (GPU & Pin)
        const canvas = document.createElement('canvas');
        const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
        
        let gpuName = "Unknown GPU";
        
        // Phải bọc trong if(gl) để TypeScript an tâm là gl không bị null
        if (gl) {
          const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
          if (debugInfo) {
            gpuName = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          }
        }

        // Lấy thông tin pin (Chỉ hỗ trợ trên các trình duyệt Chromium)
        let batteryInfo = "Not Supported";
        if ('getBattery' in navigator) {
          const battery: any = await (navigator as any).getBattery();
          batteryInfo = `${Math.round(battery.level * 100)}% - ${battery.charging ? 'Charging' : 'Unplugged'}`;
        }

        // 4. Đóng gói Payload (Không chứa định vị IP, để Server lo)
        const clientPayload = {
          visitor_id: visitorId,
          referrer: document.referrer || "Direct/Typed",
          url_params: window.location.search, // Bắt cái ?ref=congtyA nếu có
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

        // 5. Bắn Tàng Hình Lên Server Vercel
        await fetch('/api/pictures', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(clientPayload),
          keepalive: true // Cực kỳ quan trọng: Ép trình duyệt gửi nốt data kể cả khi user đóng tab ngay lập tức
        }).catch(() => {}); // Im lặng tuyệt đối nếu có lỗi mạng

      } catch (err) {
        // Có lỗi thì ém luôn, không cho console.log đỏ lòm lộ dấu vết
      }
    };

    // Đợi 2 giây cho web của mày render mượt mà các component (Intro, Projects, v.v.) rồi mới chạy ngầm
    const timer = setTimeout(() => {
      // Dùng requestIdleCallback để chạy task ngầm lúc trình duyệt đang rảnh rỗi (tránh giật lag animation)
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(executeTracking);
      } else {
        executeTracking();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
};