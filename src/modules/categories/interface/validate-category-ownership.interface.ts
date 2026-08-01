export abstract class ValidateCategoryOwnershipServiceContract {
  abstract validate(
    userId: string,
    categoryId?: string | null,
  ): Promise<void>;
}
