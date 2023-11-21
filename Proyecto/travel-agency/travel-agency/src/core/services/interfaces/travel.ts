import { Base } from "./base";

export interface Travel extends Base {
  name: string;
  description: string;
  originCity: string;
  destinationCity: string;
  price: number;
  images: string[];
}
