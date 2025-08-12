declare module "bcrypt" {
  /**
   * Hash a string with the given number of rounds.
   * @param data The data to be encrypted.
   * @param saltOrRounds The salt to be used in encryption. If specified as a number then a salt will be generated with the specified number of rounds and used.
   */
  export function hash(
    data: string | Buffer,
    saltOrRounds: string | number
  ): Promise<string>;

  /**
   * Hash a string with the given number of rounds (synchronous).
   * @param data The data to be encrypted.
   * @param saltOrRounds The salt to be used in encryption. If specified as a number then a salt will be generated with the specified number of rounds and used.
   */
  export function hashSync(
    data: string | Buffer,
    saltOrRounds: string | number
  ): string;

  /**
   * Compare a string with a hash to check if they match.
   * @param data The data to be compared.
   * @param encrypted The encrypted data to be compared against.
   */
  export function compare(
    data: string | Buffer,
    encrypted: string
  ): Promise<boolean>;

  /**
   * Compare a string with a hash to check if they match (synchronous).
   * @param data The data to be compared.
   * @param encrypted The encrypted data to be compared against.
   */
  export function compareSync(
    data: string | Buffer,
    encrypted: string
  ): boolean;

  /**
   * Generate a salt.
   * @param rounds The number of rounds to use. Default is 10.
   */
  export function genSalt(rounds?: number): Promise<string>;

  /**
   * Generate a salt (synchronous).
   * @param rounds The number of rounds to use. Default is 10.
   */
  export function genSaltSync(rounds?: number): string;

  /**
   * Get the number of rounds used to encrypt the given hash.
   * @param encrypted The hash to get the rounds from.
   */
  export function getRounds(encrypted: string): number;
}
