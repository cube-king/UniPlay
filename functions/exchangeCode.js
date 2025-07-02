const fetch = require("node-fetch");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405 };

  const { code } = JSON.parse(event.body);
  if (!code) return { statusCode: 400, body: JSON.stringify({ error: "Missing code" }) };

  const params = new URLSearchParams({
    code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI,
    grant_type: "authorization_code"
  });

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: params
  });

  const data = await res.json();
  return { statusCode: res.ok ? 200 : res.status, body: JSON.stringify(data) };
};