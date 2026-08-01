export abstract class ValidateBankAccountOwnershipServiceContract {
  abstract validate(userId: string, bankAccountId: string): Promise<void>;
}
