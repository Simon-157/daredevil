import firebase from "firebase/compat/app";
import { Dare, Darepool, JourneyDare } from "./FreakPoolType";


export type AuthObject = {
  user: User
  journeys?: Journey
  darepool?: Darepool
}


export interface User {
  id: string;
  name: string;
  email: string;
  joined_at?: firebase.firestore.Timestamp;
  journeys?: Journey[];
}


export  interface Journey {
  created_by:string
  name: string;
  created_at: firebase.firestore.Timestamp;
  start_date: firebase.firestore.Timestamp;
  end_date: firebase.firestore.Timestamp;
  swaps_made: number;
  milestone: 'ongoing'|'completed' | 'abandoned';
  journey_dares: JourneyDare[];
  id: string;
}


export interface JourneyMetricsType  {
  numDares:number | 0;
  name: string;
  journeyId: string;
  swapsMade: number;
  milestone: 'ongoing' |'completed' | 'abandoned';
  passedFreaks: number;
  abortedFreaks: number;
  missedFreaks: number;
  timeLeftFormatted: string;
};
