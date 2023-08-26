type Darepool = Dare[];

type Dare = {
  id: string;
  short_name: string;
  description: string;
  shared_experiences: SharedExperience[];
  created_at: Date;
  created_by: string;
};

type SharedExperience = {
  id: string;
  user_id: string;
  content: string;
  date_created: Date;
};

