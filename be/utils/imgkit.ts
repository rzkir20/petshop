import dotenv from "dotenv";
import ImageKit from "imagekit";

dotenv.config({ path: ".env" });

const imagekitInstance = new ImageKit({
  publicKey: process.env.IMGKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMGKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.IMGKIT_URL_ENDPOINT || "",
});

export default imagekitInstance;
