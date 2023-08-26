import { Client, Account, Databases, ID, Permission, Query, Role } from "appwrite";
import APPWRITE_SERVER from "./server";

const AW_API = {
  init() {
    return new Client()
      .setEndpoint(APPWRITE_SERVER.endpoint)
      .setProject(APPWRITE_SERVER.projectId);
  },

  createAccount() {
    return new Account(this.init()).createOAuth2Session("google", 'http://localhost:5173/dashboard/home', 'http://localhost:5173/login');
  },

  getAccount() {
    return new Account(this.init()).get();
  },

  createDaredevilAccount(username: string, email: string, password: string) {
    return new Account(this.init()).create(
      ID.unique(),
      email,
      password,
      username
    );
  },

  loginDaredevilAccount(email: string, password: string) {
    return new Account(this.init()).createEmailSession(email, password);
  },

  createJourney(journey: any) {
    return new Databases(this.init()).createDocument(
      APPWRITE_SERVER.databaseId,
      APPWRITE_SERVER.journeysCollectionId,
      ID.unique(),
      journey,
      [
        Permission.read(Role.any()), // Anyone can view this document
        Permission.write(Role.any()), // Anyone can view this document
      ]
    );
  },

  createSessionAnonymous() {
    return new Account(this.init()).createAnonymousSession();
  },

  createDare(dare: any) {
    return new Databases(this.init()).createDocument(
      APPWRITE_SERVER.databaseId,
      APPWRITE_SERVER.darepoolCollectionId,
      ID.unique(),
      dare,
      [Permission.read(Role.any()), Permission.write(Role.any()), Permission.update(Role.any())]
    );
  },


  getUserJourneys(userId: string) {
    return new Databases(this.init()).listDocuments(
      APPWRITE_SERVER.databaseId,
      APPWRITE_SERVER.journeysCollectionId,
      [Query.equal("userId", userId)]
    );
  },


};

export default AW_API;
