import firebase from "firebase/compat/app";

export type Darepool = Dare[];

export type JourneyDare = {
  id: string;
  dare_id: string;
  milestone: string;
}

export type Dare = {
  id: string;
  short_name: string;
  description: string;
  created_at: firebase.firestore.Timestamp;
  created_by: string;
  shared_experiences: SharedExperience[];
}

export interface SharedExperience {
  id: string;
  user_id: string;
  content: string;
  date_created: firebase.firestore.Timestamp;
}
