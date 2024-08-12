import { AddItemInput, CategoryInput } from "../dto/category-input";
import { categories, categoryDoc } from "../models";

export class CategoryRepository {
  constructor() {}
  async createCategory({ name, detail_image, title, subtitle }: CategoryInput) {
    const newCategory = await categories.create({
      name,
      detail_image,
      title,
      products: [],
      subtitle,
    });

    return newCategory;
  }

  async getAllCategories(offset = 0, perpage?: number) {
    return categories
      .find()
      .skip(offset)
      .limit(perpage ? perpage : 100);
  }

  async getCategoryById(id: string) {
    return categories.findById(id);
  }

  async editCategory({
    id,
    name,
    detail_image,
    title,
    products,
    subtitle,
  }: CategoryInput) {
    let existingCategory = (await categories.findById(id)) as categoryDoc;
    existingCategory.name = name;
    existingCategory.detail_image = detail_image;
    existingCategory.title = title;
    existingCategory.products = products;
    existingCategory.subtitle = subtitle;
    return existingCategory.save();
  }

  async deleteCategory(_id: string) {
    return categories.deleteOne({ _id });
  }

  async addItem({ id, products }: AddItemInput) {
    let category = (await categories.findById(id)) as categoryDoc;
    category.products = [...category.products, ...products];
    return category.save();
  }

  async removeItem({ id, products }: AddItemInput) {
    let category = (await categories.findById(id)) as categoryDoc;
    const excludeProducts = category.products.filter(
      (item) => !products.includes(item)
    );
    category.products = excludeProducts;
    return category.save();
  }
}
