import { config as conf } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Always load backend/.env, no matter which folder the server is started from
const __dirname = path.dirname(fileURLToPath(import.meta.url));
conf({ path: path.resolve(__dirname, "../../.env") });

const _config = {
  mongoString: process.env.MONGO_STRING,
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  // Comma-separated list of allowed frontend origins, e.g. https://agriconnect.vercel.app
  clientUrls: (process.env.CLIENT_URL || "http://localhost:5173")
    .split(",")
    .map((u) => u.trim().replace(/\/$/, ""))
    .filter(Boolean),
  // Public URL of this backend (used for payment redirects)
  backendUrl: (process.env.BACKEND_URL || "http://localhost:5000").replace(/\/$/, ""),
  phonepeMerchantId: process.env.PHONEPE_MERCHANT_ID || "PGTESTPAYUAT86",
  phonepeMerchantKey:
    process.env.PHONEPE_MERCHANT_KEY || "96434309-7796-489d-8924-ab56988a6076",
  phonepeBaseUrl:
    process.env.PHONEPE_BASE_URL || "https://api-preprod.phonepe.com/apis/pg-sandbox",
};

export const config = Object.freeze(_config);
