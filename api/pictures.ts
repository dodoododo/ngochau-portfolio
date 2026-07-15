// api/track.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  // 2. Nhận data từ React gửi lên (Fingerprint, GPU, thiết bị...)
  const clientData = req.body;

  // 3. Lấy IP người dùng một cách bí mật từ Headers của Vercel
  // Vercel tự động bắt IP của thằng gọi API và nhét vào header này
  // Sửa đoạn lấy IP của mày thành như thế này:
    let clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || "";
    // Nếu nó là một list IP (cách nhau bởi dấu phẩy), lấy cái đầu tiên
    if (clientIp.includes(',')) {
        clientIp = clientIp.split(',')[0].trim();
    }

  try {
    // 4. GỌI MAXMIND TỪ SERVER (Giấu Key an toàn 100%)
    const authHeader = `Basic ${Buffer.from(`${process.env.MAXMIND_ACCOUNT_ID}:${process.env.MAXMIND_LICENSE_KEY}`).toString('base64')}`;
    
    // Lưu ý: Lúc này truyền clientIp vào URL thay vì '/me'
    const maxmindRes = await fetch(`https://geoip.maxmind.com/geoip/v2.1/city/${clientIp}`, {
      headers: {
        'Authorization': authHeader,
        'Accept': 'application/json'
      }
    });
    const ipData = await maxmindRes.json();

    // 5. GOM DATA VÀ BẮN LÊN MONGODB TỪ SERVER
    const ultimatePayload = {
      ...clientData, // Data (Browser, OS, GPU, Visitor ID) React gửi lên
      ip: clientIp,
      location: {
        city: ipData?.city?.names?.en || "Unknown",
        country: ipData?.country?.names?.en || "Unknown",
        isp: ipData?.traits?.isp || "Unknown"
      },
      visited_at: new Date()
    };

    await fetch("YOUR_MONGODB_DATA_API_ENDPOINT/action/insertOne", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.MONGODB_API_KEY || "", // Giấu luôn Key MongoDB
      },
      body: JSON.stringify({
        dataSource: "Cluster0",
        database: "portfolio",
        collection: "visitors",
        document: ultimatePayload
      })
    });

    // 6. Trả về cho React biết là thành công
    return res.status(200).json({ success: true });

  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}