import { Length } from "class-validator";

export class CategoryInput {
  id: string;

  @Length(3, 128)
  name: string;

  detail_image: string;

  products: string[];

  title: string;

  subtitle: string;
}

export class AddItemInput {
  @Length(3, 128)
  id: string;

  products: string[];
}
