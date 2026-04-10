import dotenv from "dotenv";
import ImageKit from "imagekit";

dotenv.config({ path: ".env" });

const publicKey = process.env.IMGEKIT_PUBLIC_KEY as string;
const privateKey = process.env.IMGEKIT_PRIVATE_KEY as string;
const urlEndpoint = process.env.IMGEKIT_URL_ENDPOINT as string;

export const isImageKitConfigured = Boolean(
  publicKey && privateKey && urlEndpoint,
);

const imagekitInstance = isImageKitConfigured
  ? new ImageKit({
    publicKey,
    privateKey,
    urlEndpoint,
  })
  : null;

export default imagekitInstance;
