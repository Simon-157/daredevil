// import { query, where, getDocs } from "firebase/firestore";

//     // Check if a user has at least one journey
//     const hasJourneys = async (userId: string): Promise<boolean> => {
//         try {
//             const userJourneysQuery = query(journeyCollection, where('created_by', '==', userId));
//             const userJourneysSnapshot = await getDocs(userJourneysQuery);
//             return !userJourneysSnapshot.empty;
//         } catch (error) {
//             console.error("Error checking user journeys:", error);
//             return false;
//         // }
//     };