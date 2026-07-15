// api/track.ts
import { MongoClient } from 'mongodb';
import type { VercelRequest, VercelResponse } from '@vercel/node';


export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Lấy URI bên trong hàm (đã có ở đây rồi, tốt!)
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI bị rỗng!");
    return res.status(500).json({ error: "Server Configuration Error: MONGODB_URI missing" });
  }

  // Khởi tạo client ở trong hàm luôn
  const client = new MongoClient(uri);
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
    // const maxmindRes = await fetch(`https://geoip.maxmind.com/geoip/v2.1/city/${clientIp}`, {
    //   headers: {
    //     'Authorization': authHeader,
    //     'Accept': 'application/json'
    //   }
    // });
    // const ipData = await maxmindRes.json();
    const geoRes = await fetch(`https://ip-api.com/json/${clientIp}`);
    const ipData = await geoRes.json();

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
        // Kết nối tới DB (Mày nên để client.connect() bên ngoài handler nếu có thể để tối ưu)
        await client.connect();
        const db = client.db("portfolio"); // Thay "portfolio" bằng tên DB của mày
        const collection = db.collection("visitors"); // Thay "visitors" bằng tên Collection của mày

        // Bắn thẳng vào MongoDB
        const result = await collection.insertOne(ultimatePayload);

        console.log("Đã lưu thành công với ID:", result.insertedId);
        return res.status(200).json({ success: true, id: result.insertedId });

    } catch (dbError) {
        console.error("LỖI MONGODB:", dbError);
    return res.status(500).json({ error: "Không thể lưu vào database", details: dbError });
    } finally {
        await client.close();
    }
}