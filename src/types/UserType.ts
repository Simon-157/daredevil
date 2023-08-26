type AuthObject = {
  user: User
  journeys?: Journey 
  darepool?: Darepool
}

type User = {
    id: string;
    name: string;
    email: string;
    joined_at: Date;
  };
  
  type Journey = {
    id: string;
    name: string;
    created_at: Date;
    start_date: Date;
    end_date: Date;
    swaps_made: number;
    milestone: 'completed' | 'abandoned';
    journey_freaks: JourneyFreak[];
  };
  
  type JourneyFreak = {
    id: string;
    freak_id: string;
    milestone: 'passed' | 'aborted' | 'missed';
  };
  


type JourneyMetricsType = {
    name:string;
    journeyId: string;
    swapsMade: number;
    milestone: 'completed' | 'abandoned';
    passedFreaks: number;
    abortedFreaks: number;
    missedFreaks: number;
    timeLeftFormatted: string;
  };
  