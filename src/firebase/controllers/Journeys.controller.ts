import { firebaseApp } from "../config/firebase";
import { getFirestore, collection, doc, addDoc, arrayRemove, arrayUnion, getDoc, updateDoc, getDocs, query, where } from "firebase/firestore";

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

    // Method to abort a freak by a user
    const abortFreak = async (
        journeyId: string,
        journeyFreakId: string
    ): Promise<void> => {
        const journeyFreakRef = doc(
            journeyCollection,
            `${journeyId}/journey_dares/${journeyFreakId}`
        );
        await updateDoc(journeyFreakRef, {
            milestone: "aborted",
        });
    };



    // Method to mark a dare as done by a user
    const markDareDone = async (
        journeyId: string,
        journeyDareId: string
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
            journeyData.journey_dares[indexToUpdate].milestone = "passed";
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



    // Method to swap a journey and update milestones
    const swapJourney = async (
        oldJourneyId: string,
        newJourneyId: string,
        oldDareId: string,
        newDareId: string
    ): Promise<void> => {
        const oldJourneyRef = doc(journeyCollection, oldJourneyId);
        const newJourneyRef = doc(journeyCollection, newJourneyId);

        const oldJourneySnapshot = await getDoc(oldJourneyRef);
        const newJourneySnapshot = await getDoc(newJourneyRef);

        if (!oldJourneySnapshot.exists() || !newJourneySnapshot.exists()) {
            throw new Error("Journey not found");
        }

        const oldJourney = oldJourneySnapshot.data() as Journey;
        const newJourney = newJourneySnapshot.data() as Journey;

        const oldDareIndex = oldJourney.journey_dares.findIndex(
            (dare) => dare.dare_id === oldDareId
        );
        const newDareIndex = newJourney.journey_dares.findIndex(
            (dare) => dare.dare_id === newDareId
        );

        if (oldDareIndex === -1 || newDareIndex === -1) {
            throw new Error("Freak not found in journey");
        }

        // Update milestones
        oldJourney.journey_dares[oldDareIndex].milestone = "aborted";
        newJourney.journey_dares[newDareIndex].milestone = "passed";

        await updateDoc(oldJourneyRef, {
            journey_freaks: arrayRemove(oldDareId),
        });

        await updateDoc(newJourneyRef, {
            journey_freaks: arrayUnion(newDareId),
        });
    };

    return {
        hasJourneys,
        getJourneysByUser,
        createJourney,
        updateJourneyMilestone,
        swapJourney,
        abortFreak,
        markDareDone
    };
};
