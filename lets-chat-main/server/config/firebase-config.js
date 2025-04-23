import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

import fs from 'fs';

const serviceAccountKey = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf-8'));


const app = initializeApp({
  credential: cert(serviceAccountKey),
});

const auth = getAuth(app);
export default auth;
