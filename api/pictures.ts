import { MongoClient } from 'mongodb';
import type { VercelRequest, VercelResponse } from '@vercel/node';


export default async function handler(req: VercelRequest, res: VercelResponse) {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI bị rỗng!");
    return res.status(500).json({ error: "Server Configuration Error: MONGODB_URI missing" });
  }

  const client = new MongoClient(uri);
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  const clientData = req.body;

    let clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || "";
    if (clientIp.includes(',')) {
        clientIp = clientIp.split(',')[0].trim();
    }

  try {
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

    const ultimatePayload = {
      ...clientData, 
      ip: clientIp,
      location: {
        city: ipData?.city?.names?.en || "Unknown",
        country: ipData?.country?.names?.en || "Unknown",
        isp: ipData?.traits?.isp || "Unknown"
      },
      visited_at: new Date()
    };
        await client.connect();
        const db = client.db("portfolio"); 
        const collection = db.collection("visitors"); 

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