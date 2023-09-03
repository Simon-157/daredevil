import { firebaseApp } from "../config/firebase";
import { getFirestore, collection, doc, addDoc, getDoc, updateDoc, getDocs, query, where, DocumentReference } from "firebase/firestore";
import { Journey } from "../../types/UserType";

const db = getFirestore(firebaseApp);

const journeyCollection = collection(db, 'journeys');

// Controller methods
export const journeyController = () => {

    // Check if a user has at least one journey
    const hasJourneys = async (userId: string): Promise<boolean> => {
        try {
            const userJourneysQuery = query(journeyCollection, where('created_by', '==', userId));
            const userJourneysSnapshot = await getDocs(userJourneysQuery);
            return !userJourneysSnapshot.empty;
        } catch (error) {
            console.error("Error checking user journeys:", error);
            return false;
        }
    };

    // Get all journeys created by a particular user
    const getJourneysByUser = async (userId: string): Promise<Journey[]> => {
        try {
            const userJourneysQuery = query(journeyCollection, where('created_by', '==', userId));
            const userJourneysSnapshot = await getDocs(userJourneysQuery);
            const userJourneys: Journey[] = [];
            userJourneysSnapshot.forEach((doc) => {
                const journeyData = doc.data() as Journey;
                journeyData.id = doc.id;
                userJourneys.push(journeyData);
            });

            return userJourneys;
        } catch (error) {
            console.error("Error getting user journeys:", error);
            return [];
        }
    };

    // Create a new journey
    const createJourney = async (journeyData: Journey): Promise<void> => {
        try {
            await addDoc(journeyCollection, journeyData);
            console.log('Journey added successfully');
        } catch (error) {
            console.error('Error adding journey:', error);
            // Handle the error appropriately
        }
    };


    // Update a journey's milestone
    const updateJourneyMilestone = async (
        journeyId: string,
        newMilestone: string
    ): Promise<void> => {
        const journeyRef = doc(journeyCollection, journeyId);
        await updateDoc(journeyRef, { milestone: newMilestone });
    };




    // Method to mark a dare as done by a user
    const updateJourneyDares = async (
        journeyId: string,
        journeyDareId: string,
        key: string
    ): Promise<Boolean> => {
        if (!journeyId || !journeyDareId) {
            console.error("Invalid journeyId or journeyDareId");
            return false;
        }
        const journeyRef = doc(journeyCollection, journeyId);
        try {
            // Get the current journey document data
            const journeyDoc = await getDoc(journeyRef);
            if (!journeyDoc.exists()) {
                console.error("Journey document not found");
                return false;
            }
            const journeyData = journeyDoc.data() as Journey;
            const indexToUpdate = journeyData.journey_dares.findIndex(
                (dare) => dare.dare_id === journeyDareId
            );
            if (indexToUpdate === -1) {
                console.error("Journey Dare not found in the array");
                return false;
            }
            // Update the milestone of the specific object in the array
            switch (key) {
                case "done":
                    journeyData.journey_dares[indexToUpdate].milestone = "passed";
                    break;
                case "abort":
                    journeyData.journey_dares[indexToUpdate].milestone = "aborted";
                    break
                default:
                    return false;
            }
            // Update the journey document with the modified array
            await updateDoc(journeyRef, {
                journey_dares: journeyData.journey_dares,
            });

            console.log("Dare marked as done successfully");
            return true;
        } catch (error) {
            console.error('Error marking dare as done:', error);
            return false;
        }
    };



    // Separate function to update a journey's milestone by dare ID
    const updateJourneyDareMilestone = async (
        journeyRef: DocumentReference,
        dareId: string,
        milestone: string
    ): Promise<void> => {
        try {
            const journeyDoc = await getDoc(journeyRef);
            if (!journeyDoc.exists()) {
                throw new Error("Journey document not found");
            }
            const journeyData = journeyDoc.data() as Journey;
            const dareIndex = journeyData.journey_dares.findIndex(
                (dare) => dare.dare_id === dareId
            );
            if (dareIndex === -1) {
                throw new Error("Dare not found in the journey");
            }
            journeyData.journey_dares[dareIndex].milestone = milestone;
            await updateDoc(journeyRef, { journey_dares: journeyData.journey_dares });
        } catch (error) {
            throw new Error(`Error updating dare milestone: ${error}`);
        }
    };

    // Modify swapJourneyDare function
    const swapJourneyDare = async (
        oldJourneyId: string,
        newJourneyId: string,
        oldDareId: string,
        newDareId: string
    ): Promise<void> => {
        const oldJourneyRef = doc(journeyCollection, oldJourneyId);
        const newJourneyRef = doc(journeyCollection, newJourneyId);

        try {
            // Update old journey dare to "aborted"
            await updateJourneyDareMilestone(oldJourneyRef, oldDareId, "aborted");

            // Update new journey dare to "passed"
            await updateJourneyDareMilestone(newJourneyRef, newDareId, "ongoing");

            console.log("Dare swap completed successfully");
        } catch (error) {
            console.error(error);
            throw new Error("Dare swap failed");
        }
    };


    return {
        hasJourneys,
        getJourneysByUser,
        createJourney,
        updateJourneyMilestone,
        swapJourneyDare,
        updateJourneyDares
    };
};
