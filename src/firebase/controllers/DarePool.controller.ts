import {
  getFirestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  startAfter,
} from "firebase/firestore";
import { Darepool, Dare } from "../../types/FreakPoolType";
import { firebaseApp } from "../config/firebase";
import { QueryFunction } from "react-query";


const db = getFirestore(firebaseApp);

const darepoolCollection = collection(db, "dares");

// Controller methods
export const darepoolController = () => {
  // Get all dares in the darepool


  // Update the signature of getAllDares function
  const getAllDares: QueryFunction<Darepool, ["dares"]> = async (context) => {
    const lastDocumentId = context.pageParam; // Access the last document ID from context

    // Modify your query logic based on lastDocumentId

    // Example query logic:
    var darepoolQuery = query(darepoolCollection);

    if (lastDocumentId) {
      const lastDocument = doc(darepoolCollection, lastDocumentId);
      darepoolQuery = query(darepoolCollection, startAfter(lastDocument));
    }

    const darepoolSnapshot = await getDocs(darepoolQuery);
    const darepool: Darepool = [];
    darepoolSnapshot.forEach((doc) => {
      const dareData = doc.data() as Dare;
      darepool.push(dareData);
    });

    return darepool;
  };


  // Get a specific dare by ID
  const getDareById = async (dareId: string): Promise<Dare | null> => {
    try {
      const dareRef = doc(darepoolCollection, dareId);
      const dareDoc = await getDoc(dareRef);
      if (dareDoc.exists()) {
        const dareData = dareDoc.data() as Dare;
        return dareData;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error getting dare:", error);
      return null;
    }
  };

  // Create a new dare
  const createDare = async (dareData: Dare): Promise<void> => {
    try {
      await addDoc(darepoolCollection, dareData);
      console.log("Dare added successfully");
    } catch (error) {
      console.error("Error adding dare:", error);
      // Handle the error appropriately
    }
  };

  // Update a dare's information
  const updateDare = async (dareId: string, updatedData: Partial<Dare>): Promise<void> => {
    const dareRef = doc(darepoolCollection, dareId);
    await updateDoc(dareRef, updatedData);
  };

  return {
    getAllDares,
    getDareById,
    createDare,
    updateDare,
  };
};
