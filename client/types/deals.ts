export interface Deal {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription?: string;

  partner?: {
    name: string;
    logo?: string;
    website?: string;
  };

  eligibility?: string[];
  accessLevel: "public" | "locked";
}
