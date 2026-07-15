import { MongoClient } from 'mongodb';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Tối ưu hóa: Khai báo client bên ngoài handler để tái sử dụng connection (Connection Pooling) trên Vercel
let cachedClient: MongoClient | null = null;

async function connectToDatabase(uri: string) {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return res.status(500).json({ error: "Server Configuration Error: MONGODB_URI missing" });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  const clientData = req.body;

  let clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || "";
  if (clientIp.includes(',')) {
    clientIp = clientIp.split(',')[0].trim();
  }

  try {
    // Lưu ý: Bản free của ip-api.com chỉ hỗ trợ http, gọi https sẽ bị từ chối
    const geoRes = await fetch(`http://ip-api.com/json/${clientIp}`);
    const ipData = await geoRes.json();

    const ultimatePayload = {
      ...clientData, 
      ip: clientIp,
      location: {
        // ĐÃ FIX: Lấy đúng cấu trúc của ip-api.com
        city: ipData?.city || "Unknown",
        country: ipData?.country || "Unknown",
        isp: ipData?.isp || "Unknown"
      },
      visited_at: new Date()
    };

    const client = await connectToDatabase(uri);
    const db = client.db("portfolio"); 
    const collection = db.collection("visitors"); 

    const result = await collection.insertOne(ultimatePayload);

    return res.status(200).json({ success: true, id: result.insertedId });

  } catch (dbError) {
    console.error("LỖI:", dbError);
    return res.status(500).json({ error: "Không thể lưu vào database", details: dbError });
  }
  // Không đóng client (client.close) ở đây để Vercel tái sử dụng kết nối cho các request sau
}