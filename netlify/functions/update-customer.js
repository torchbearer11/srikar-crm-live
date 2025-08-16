const admin = require('firebase-admin');
const crypto = require('crypto');
const origCreateHash = crypto.createHash;
crypto.createHash = (alg, opts) => { return origCreateHash(alg === 'md5' ? 'md4' : alg, opts); };
const serviceAccount = {type:process.env.FIREBASE_TYPE,project_id:process.env.FIREBASE_PROJECT_ID,private_key_id:process.env.FIREBASE_PRIVATE_KEY_ID,private_key:process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g,'\n'),client_email:process.env.FIREBASE_CLIENT_EMAIL,client_id:process.env.FIREBASE_CLIENT_ID,auth_uri:process.env.FIREBASE_AUTH_URI,token_uri:process.env.FIREBASE_TOKEN_URI,auth_provider_x509_cert_url:process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,client_x509_cert_url:process.env.FIREBASE_CLIENT_X509_CERT_URL};
if(!admin.apps.length){admin.initializeApp({credential:admin.credential.cert(serviceAccount)})}
const db=admin.firestore();exports.handler=async function(e,t){if("POST"!==e.httpMethod)return{statusCode:405,body:"Method Not Allowed"};try{const{id:t,data:r}=JSON.parse(e.body);if(!t||!r)throw new Error("Missing ID or data");return await db.collection("customers").doc(t).update(r),{statusCode:200,body:JSON.stringify({message:"Customer updated"})}}catch(e){return console.error(e),{statusCode:500,body:JSON.stringify({error:"Failed to update customer"})}}};
