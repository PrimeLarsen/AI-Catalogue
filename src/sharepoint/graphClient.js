// src/sharepoint/graphClient.js
// Reusable Microsoft Graph API client for SharePoint file upload (M365)
import { PublicClientApplication } from '@azure/msal-browser';

// TODO: Replace with your Azure AD app registration values
const msalConfig = {
  auth: {
    clientId: 'YOUR_CLIENT_ID', // <-- Replace this
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: window.location.origin,
  },
};

const loginRequest = {
  scopes: [
    'Files.ReadWrite.All', // For SharePoint file upload
    'Sites.ReadWrite.All',
    'User.Read',
  ],
};

const msalInstance = new PublicClientApplication(msalConfig);

export async function login() {
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) return accounts[0];
  const result = await msalInstance.loginPopup(loginRequest);
  return result.account;
}

export async function getAccessToken() {
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length === 0) throw new Error('No user logged in');
  const result = await msalInstance.acquireTokenSilent({ ...loginRequest, account: accounts[0] });
  return result.accessToken;
}

// Upload a file to a SharePoint document library
// siteUrl: e.g. 'https://yourtenant.sharepoint.com/sites/yoursite'
// library: e.g. 'Shared Documents'
// folderPath: e.g. 'SupplierDocs' (optional)
export async function uploadFileToSharePoint({ siteUrl, library, file, folderPath = '' }) {
  const accessToken = await getAccessToken();
  // Get site ID
  const siteRes = await fetch(`https://graph.microsoft.com/v1.0/sites/${encodeURIComponent(siteUrl)}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const site = await siteRes.json();
  // Upload file
  const uploadUrl = `https://graph.microsoft.com/v1.0/sites/${site.id}/drives?$filter=name eq '${library}'`;
  const drivesRes = await fetch(uploadUrl, { headers: { Authorization: `Bearer ${accessToken}` } });
  const drives = await drivesRes.json();
  const driveId = drives.value[0]?.id;
  if (!driveId) throw new Error('Drive not found');
  const uploadPath = folderPath ? `${folderPath}/${file.name}` : file.name;
  const uploadRes = await fetch(`https://graph.microsoft.com/v1.0/drives/${driveId}/root:/${uploadPath}:/content`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: file,
  });
  if (!uploadRes.ok) throw new Error('Upload failed');
  return await uploadRes.json(); // Returns file metadata
}
