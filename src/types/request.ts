interface Metadata {
  date: string;
  file: string | null;
  skill: string;
  county: string;
  managed: string;
  village: string;
  amount: string;
  subCounty: string;
  description: string;
  packageType: string;
  linkageFee: number;
  status: string;
  id: string;
  estate: string;
}

interface RequestDetails {
  id: string;
  createdDate: string;
  updatedDate: string;
  name: string;
  amount: string;
  description: string | null;
  ownerId: string | null;
  categoryId: string;
  validated: boolean;
  locations: any[]; // Adjust as necessary
  active: boolean;
  results: any[];
  assetTypeId: string;
  quantity: number;
  currency: string | null;
  price: number;
  status: string;
  customAttributes: Record<string, any>;
  metadata: Metadata;
  platformData: Record<string, any>;
  livemode: boolean;
}

interface Requisition {
  number: string;
  id: string;
  date: string;
  category: string;
  subCategory: string;
  requestType: string;
  description: string;
  location: string;
  county: string;
  subCounty: string;
  status: string;
}
