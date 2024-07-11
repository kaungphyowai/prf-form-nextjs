import AWS from 'aws-sdk';

const ssm = new AWS.SSM({
  region: 'us-east-1', // e.g., 'us-west-2'
});

async function getParameter(name) {
  const params = {
    Name: name,
    WithDecryption: true,
  };

  try {
    const data = await ssm.getParameter(params).promise();
    return data.Parameter.Value;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to retrieve parameter from Parameter Store');
  }
}

async function getDatabaseCredentials() {
  const host = await getParameter('/amplify/shared/d2wrc7p0en7axv/database_host');
  const username = await getParameter('/amplify/shared/d2wrc7p0en7axv/database_user');
  const password = await getParameter('/amplify/shared/d2wrc7p0en7axv/database_password');
  const database = await getParameter('/amplify/shared/d2wrc7p0en7axv/database_default');
  const port = await getParameter('/amplify/shared/d2wrc7p0en7axv/database_port');

  return {
    host,
    username,
    password,
    database,
    port: parseInt(port, 10),
  };
}

export default getDatabaseCredentials;
