const APPWRITE_SERVER = {
  endpoint: import.meta.env.VITE_APP_ENDPOINT,
  projectId: import.meta.env.VITE_APP_PROJECT,
  databaseId: import.meta.env.VITE_APP_DATABASE_ID,
  darepoolCollectionId: import.meta.env.VITE_APP_DAREPOOL_COLLECTION_ID,
  journeysCollectionId: import.meta.env.VITE_APP_JOURNEYS_COLLECTION_ID,
};

export default APPWRITE_SERVER;
