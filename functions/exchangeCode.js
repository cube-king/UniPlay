const fetch = require("node-fetch");

exports.handler = async (event) => {
  const { code, code_verifier } = JSON.parse(event.body);

  const client_id = process.env.CLIENT_ID;
  const redirect_uri = process.env.REDIRECT_URI;

  const params = new URLSearchParams({
    code,
    client_id,
    code_verifier,
    redirect_uri,
    grant_type: "authorization_code"
  });

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString()
  });

  const data = await res.json();
  return {
    statusCode: res.ok ? 200 : 400,
    body: JSON.stringify(data)
  };
};