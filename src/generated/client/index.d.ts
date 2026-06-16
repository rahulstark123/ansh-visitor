
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Workspace
 * 
 */
export type Workspace = $Result.DefaultSelection<Prisma.$WorkspacePayload>
/**
 * Model WorkspaceConfig
 * 
 */
export type WorkspaceConfig = $Result.DefaultSelection<Prisma.$WorkspaceConfigPayload>
/**
 * Model Profile
 * 
 */
export type Profile = $Result.DefaultSelection<Prisma.$ProfilePayload>
/**
 * Model Visitor
 * 
 */
export type Visitor = $Result.DefaultSelection<Prisma.$VisitorPayload>
/**
 * Model Subscription
 * 
 */
export type Subscription = $Result.DefaultSelection<Prisma.$SubscriptionPayload>
/**
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>
/**
 * Model PublicRegistrationLink
 * 
 */
export type PublicRegistrationLink = $Result.DefaultSelection<Prisma.$PublicRegistrationLinkPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Workspaces
 * const workspaces = await prisma.workspace.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Workspaces
   * const workspaces = await prisma.workspace.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.workspace`: Exposes CRUD operations for the **Workspace** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Workspaces
    * const workspaces = await prisma.workspace.findMany()
    * ```
    */
  get workspace(): Prisma.WorkspaceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workspaceConfig`: Exposes CRUD operations for the **WorkspaceConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkspaceConfigs
    * const workspaceConfigs = await prisma.workspaceConfig.findMany()
    * ```
    */
  get workspaceConfig(): Prisma.WorkspaceConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): Prisma.ProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.visitor`: Exposes CRUD operations for the **Visitor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Visitors
    * const visitors = await prisma.visitor.findMany()
    * ```
    */
  get visitor(): Prisma.VisitorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subscription`: Exposes CRUD operations for the **Subscription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subscriptions
    * const subscriptions = await prisma.subscription.findMany()
    * ```
    */
  get subscription(): Prisma.SubscriptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.publicRegistrationLink`: Exposes CRUD operations for the **PublicRegistrationLink** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PublicRegistrationLinks
    * const publicRegistrationLinks = await prisma.publicRegistrationLink.findMany()
    * ```
    */
  get publicRegistrationLink(): Prisma.PublicRegistrationLinkDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Workspace: 'Workspace',
    WorkspaceConfig: 'WorkspaceConfig',
    Profile: 'Profile',
    Visitor: 'Visitor',
    Subscription: 'Subscription',
    Transaction: 'Transaction',
    PublicRegistrationLink: 'PublicRegistrationLink'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "workspace" | "workspaceConfig" | "profile" | "visitor" | "subscription" | "transaction" | "publicRegistrationLink"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Workspace: {
        payload: Prisma.$WorkspacePayload<ExtArgs>
        fields: Prisma.WorkspaceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkspaceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkspaceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>
          }
          findFirst: {
            args: Prisma.WorkspaceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkspaceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>
          }
          findMany: {
            args: Prisma.WorkspaceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>[]
          }
          create: {
            args: Prisma.WorkspaceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>
          }
          createMany: {
            args: Prisma.WorkspaceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkspaceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>[]
          }
          delete: {
            args: Prisma.WorkspaceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>
          }
          update: {
            args: Prisma.WorkspaceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>
          }
          deleteMany: {
            args: Prisma.WorkspaceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkspaceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkspaceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>[]
          }
          upsert: {
            args: Prisma.WorkspaceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>
          }
          aggregate: {
            args: Prisma.WorkspaceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkspace>
          }
          groupBy: {
            args: Prisma.WorkspaceGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkspaceGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkspaceCountArgs<ExtArgs>
            result: $Utils.Optional<WorkspaceCountAggregateOutputType> | number
          }
        }
      }
      WorkspaceConfig: {
        payload: Prisma.$WorkspaceConfigPayload<ExtArgs>
        fields: Prisma.WorkspaceConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkspaceConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkspaceConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceConfigPayload>
          }
          findFirst: {
            args: Prisma.WorkspaceConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkspaceConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceConfigPayload>
          }
          findMany: {
            args: Prisma.WorkspaceConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceConfigPayload>[]
          }
          create: {
            args: Prisma.WorkspaceConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceConfigPayload>
          }
          createMany: {
            args: Prisma.WorkspaceConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkspaceConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceConfigPayload>[]
          }
          delete: {
            args: Prisma.WorkspaceConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceConfigPayload>
          }
          update: {
            args: Prisma.WorkspaceConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceConfigPayload>
          }
          deleteMany: {
            args: Prisma.WorkspaceConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkspaceConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkspaceConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceConfigPayload>[]
          }
          upsert: {
            args: Prisma.WorkspaceConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceConfigPayload>
          }
          aggregate: {
            args: Prisma.WorkspaceConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkspaceConfig>
          }
          groupBy: {
            args: Prisma.WorkspaceConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkspaceConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkspaceConfigCountArgs<ExtArgs>
            result: $Utils.Optional<WorkspaceConfigCountAggregateOutputType> | number
          }
        }
      }
      Profile: {
        payload: Prisma.$ProfilePayload<ExtArgs>
        fields: Prisma.ProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findFirst: {
            args: Prisma.ProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findMany: {
            args: Prisma.ProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          create: {
            args: Prisma.ProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          createMany: {
            args: Prisma.ProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          delete: {
            args: Prisma.ProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          update: {
            args: Prisma.ProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          deleteMany: {
            args: Prisma.ProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          upsert: {
            args: Prisma.ProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          aggregate: {
            args: Prisma.ProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfile>
          }
          groupBy: {
            args: Prisma.ProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfileCountArgs<ExtArgs>
            result: $Utils.Optional<ProfileCountAggregateOutputType> | number
          }
        }
      }
      Visitor: {
        payload: Prisma.$VisitorPayload<ExtArgs>
        fields: Prisma.VisitorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VisitorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VisitorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitorPayload>
          }
          findFirst: {
            args: Prisma.VisitorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VisitorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitorPayload>
          }
          findMany: {
            args: Prisma.VisitorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitorPayload>[]
          }
          create: {
            args: Prisma.VisitorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitorPayload>
          }
          createMany: {
            args: Prisma.VisitorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VisitorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitorPayload>[]
          }
          delete: {
            args: Prisma.VisitorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitorPayload>
          }
          update: {
            args: Prisma.VisitorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitorPayload>
          }
          deleteMany: {
            args: Prisma.VisitorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VisitorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VisitorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitorPayload>[]
          }
          upsert: {
            args: Prisma.VisitorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitorPayload>
          }
          aggregate: {
            args: Prisma.VisitorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVisitor>
          }
          groupBy: {
            args: Prisma.VisitorGroupByArgs<ExtArgs>
            result: $Utils.Optional<VisitorGroupByOutputType>[]
          }
          count: {
            args: Prisma.VisitorCountArgs<ExtArgs>
            result: $Utils.Optional<VisitorCountAggregateOutputType> | number
          }
        }
      }
      Subscription: {
        payload: Prisma.$SubscriptionPayload<ExtArgs>
        fields: Prisma.SubscriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubscriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubscriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          findFirst: {
            args: Prisma.SubscriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubscriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          findMany: {
            args: Prisma.SubscriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          create: {
            args: Prisma.SubscriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          createMany: {
            args: Prisma.SubscriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubscriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          delete: {
            args: Prisma.SubscriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          update: {
            args: Prisma.SubscriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          deleteMany: {
            args: Prisma.SubscriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubscriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubscriptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          upsert: {
            args: Prisma.SubscriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          aggregate: {
            args: Prisma.SubscriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscription>
          }
          groupBy: {
            args: Prisma.SubscriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubscriptionCountArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionCountAggregateOutputType> | number
          }
        }
      }
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
          }
        }
      }
      PublicRegistrationLink: {
        payload: Prisma.$PublicRegistrationLinkPayload<ExtArgs>
        fields: Prisma.PublicRegistrationLinkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PublicRegistrationLinkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicRegistrationLinkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PublicRegistrationLinkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicRegistrationLinkPayload>
          }
          findFirst: {
            args: Prisma.PublicRegistrationLinkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicRegistrationLinkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PublicRegistrationLinkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicRegistrationLinkPayload>
          }
          findMany: {
            args: Prisma.PublicRegistrationLinkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicRegistrationLinkPayload>[]
          }
          create: {
            args: Prisma.PublicRegistrationLinkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicRegistrationLinkPayload>
          }
          createMany: {
            args: Prisma.PublicRegistrationLinkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PublicRegistrationLinkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicRegistrationLinkPayload>[]
          }
          delete: {
            args: Prisma.PublicRegistrationLinkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicRegistrationLinkPayload>
          }
          update: {
            args: Prisma.PublicRegistrationLinkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicRegistrationLinkPayload>
          }
          deleteMany: {
            args: Prisma.PublicRegistrationLinkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PublicRegistrationLinkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PublicRegistrationLinkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicRegistrationLinkPayload>[]
          }
          upsert: {
            args: Prisma.PublicRegistrationLinkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicRegistrationLinkPayload>
          }
          aggregate: {
            args: Prisma.PublicRegistrationLinkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePublicRegistrationLink>
          }
          groupBy: {
            args: Prisma.PublicRegistrationLinkGroupByArgs<ExtArgs>
            result: $Utils.Optional<PublicRegistrationLinkGroupByOutputType>[]
          }
          count: {
            args: Prisma.PublicRegistrationLinkCountArgs<ExtArgs>
            result: $Utils.Optional<PublicRegistrationLinkCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    workspace?: WorkspaceOmit
    workspaceConfig?: WorkspaceConfigOmit
    profile?: ProfileOmit
    visitor?: VisitorOmit
    subscription?: SubscriptionOmit
    transaction?: TransactionOmit
    publicRegistrationLink?: PublicRegistrationLinkOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type WorkspaceCountOutputType
   */

  export type WorkspaceCountOutputType = {
    profiles: number
    visitors: number
    subscriptions: number
    transactions: number
    registrationLinks: number
  }

  export type WorkspaceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profiles?: boolean | WorkspaceCountOutputTypeCountProfilesArgs
    visitors?: boolean | WorkspaceCountOutputTypeCountVisitorsArgs
    subscriptions?: boolean | WorkspaceCountOutputTypeCountSubscriptionsArgs
    transactions?: boolean | WorkspaceCountOutputTypeCountTransactionsArgs
    registrationLinks?: boolean | WorkspaceCountOutputTypeCountRegistrationLinksArgs
  }

  // Custom InputTypes
  /**
   * WorkspaceCountOutputType without action
   */
  export type WorkspaceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceCountOutputType
     */
    select?: WorkspaceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WorkspaceCountOutputType without action
   */
  export type WorkspaceCountOutputTypeCountProfilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileWhereInput
  }

  /**
   * WorkspaceCountOutputType without action
   */
  export type WorkspaceCountOutputTypeCountVisitorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VisitorWhereInput
  }

  /**
   * WorkspaceCountOutputType without action
   */
  export type WorkspaceCountOutputTypeCountSubscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
  }

  /**
   * WorkspaceCountOutputType without action
   */
  export type WorkspaceCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }

  /**
   * WorkspaceCountOutputType without action
   */
  export type WorkspaceCountOutputTypeCountRegistrationLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PublicRegistrationLinkWhereInput
  }


  /**
   * Count Type ProfileCountOutputType
   */

  export type ProfileCountOutputType = {
    visitors: number
    registrationLinks: number
  }

  export type ProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    visitors?: boolean | ProfileCountOutputTypeCountVisitorsArgs
    registrationLinks?: boolean | ProfileCountOutputTypeCountRegistrationLinksArgs
  }

  // Custom InputTypes
  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileCountOutputType
     */
    select?: ProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountVisitorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VisitorWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountRegistrationLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PublicRegistrationLinkWhereInput
  }


  /**
   * Count Type SubscriptionCountOutputType
   */

  export type SubscriptionCountOutputType = {
    transactions: number
  }

  export type SubscriptionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | SubscriptionCountOutputTypeCountTransactionsArgs
  }

  // Custom InputTypes
  /**
   * SubscriptionCountOutputType without action
   */
  export type SubscriptionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionCountOutputType
     */
    select?: SubscriptionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SubscriptionCountOutputType without action
   */
  export type SubscriptionCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Workspace
   */

  export type AggregateWorkspace = {
    _count: WorkspaceCountAggregateOutputType | null
    _avg: WorkspaceAvgAggregateOutputType | null
    _sum: WorkspaceSumAggregateOutputType | null
    _min: WorkspaceMinAggregateOutputType | null
    _max: WorkspaceMaxAggregateOutputType | null
  }

  export type WorkspaceAvgAggregateOutputType = {
    id: number | null
  }

  export type WorkspaceSumAggregateOutputType = {
    id: number | null
  }

  export type WorkspaceMinAggregateOutputType = {
    id: number | null
    name: string | null
    plan: string | null
    createdAt: Date | null
  }

  export type WorkspaceMaxAggregateOutputType = {
    id: number | null
    name: string | null
    plan: string | null
    createdAt: Date | null
  }

  export type WorkspaceCountAggregateOutputType = {
    id: number
    name: number
    plan: number
    createdAt: number
    _all: number
  }


  export type WorkspaceAvgAggregateInputType = {
    id?: true
  }

  export type WorkspaceSumAggregateInputType = {
    id?: true
  }

  export type WorkspaceMinAggregateInputType = {
    id?: true
    name?: true
    plan?: true
    createdAt?: true
  }

  export type WorkspaceMaxAggregateInputType = {
    id?: true
    name?: true
    plan?: true
    createdAt?: true
  }

  export type WorkspaceCountAggregateInputType = {
    id?: true
    name?: true
    plan?: true
    createdAt?: true
    _all?: true
  }

  export type WorkspaceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Workspace to aggregate.
     */
    where?: WorkspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workspaces to fetch.
     */
    orderBy?: WorkspaceOrderByWithRelationInput | WorkspaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workspaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Workspaces
    **/
    _count?: true | WorkspaceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WorkspaceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WorkspaceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkspaceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkspaceMaxAggregateInputType
  }

  export type GetWorkspaceAggregateType<T extends WorkspaceAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkspace]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkspace[P]>
      : GetScalarType<T[P], AggregateWorkspace[P]>
  }




  export type WorkspaceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkspaceWhereInput
    orderBy?: WorkspaceOrderByWithAggregationInput | WorkspaceOrderByWithAggregationInput[]
    by: WorkspaceScalarFieldEnum[] | WorkspaceScalarFieldEnum
    having?: WorkspaceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkspaceCountAggregateInputType | true
    _avg?: WorkspaceAvgAggregateInputType
    _sum?: WorkspaceSumAggregateInputType
    _min?: WorkspaceMinAggregateInputType
    _max?: WorkspaceMaxAggregateInputType
  }

  export type WorkspaceGroupByOutputType = {
    id: number
    name: string | null
    plan: string
    createdAt: Date
    _count: WorkspaceCountAggregateOutputType | null
    _avg: WorkspaceAvgAggregateOutputType | null
    _sum: WorkspaceSumAggregateOutputType | null
    _min: WorkspaceMinAggregateOutputType | null
    _max: WorkspaceMaxAggregateOutputType | null
  }

  type GetWorkspaceGroupByPayload<T extends WorkspaceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkspaceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkspaceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkspaceGroupByOutputType[P]>
            : GetScalarType<T[P], WorkspaceGroupByOutputType[P]>
        }
      >
    >


  export type WorkspaceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    plan?: boolean
    createdAt?: boolean
    profiles?: boolean | Workspace$profilesArgs<ExtArgs>
    visitors?: boolean | Workspace$visitorsArgs<ExtArgs>
    config?: boolean | Workspace$configArgs<ExtArgs>
    subscriptions?: boolean | Workspace$subscriptionsArgs<ExtArgs>
    transactions?: boolean | Workspace$transactionsArgs<ExtArgs>
    registrationLinks?: boolean | Workspace$registrationLinksArgs<ExtArgs>
    _count?: boolean | WorkspaceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workspace"]>

  export type WorkspaceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    plan?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["workspace"]>

  export type WorkspaceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    plan?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["workspace"]>

  export type WorkspaceSelectScalar = {
    id?: boolean
    name?: boolean
    plan?: boolean
    createdAt?: boolean
  }

  export type WorkspaceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "plan" | "createdAt", ExtArgs["result"]["workspace"]>
  export type WorkspaceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profiles?: boolean | Workspace$profilesArgs<ExtArgs>
    visitors?: boolean | Workspace$visitorsArgs<ExtArgs>
    config?: boolean | Workspace$configArgs<ExtArgs>
    subscriptions?: boolean | Workspace$subscriptionsArgs<ExtArgs>
    transactions?: boolean | Workspace$transactionsArgs<ExtArgs>
    registrationLinks?: boolean | Workspace$registrationLinksArgs<ExtArgs>
    _count?: boolean | WorkspaceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WorkspaceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type WorkspaceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $WorkspacePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Workspace"
    objects: {
      profiles: Prisma.$ProfilePayload<ExtArgs>[]
      visitors: Prisma.$VisitorPayload<ExtArgs>[]
      config: Prisma.$WorkspaceConfigPayload<ExtArgs> | null
      subscriptions: Prisma.$SubscriptionPayload<ExtArgs>[]
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
      registrationLinks: Prisma.$PublicRegistrationLinkPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string | null
      plan: string
      createdAt: Date
    }, ExtArgs["result"]["workspace"]>
    composites: {}
  }

  type WorkspaceGetPayload<S extends boolean | null | undefined | WorkspaceDefaultArgs> = $Result.GetResult<Prisma.$WorkspacePayload, S>

  type WorkspaceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkspaceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkspaceCountAggregateInputType | true
    }

  export interface WorkspaceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Workspace'], meta: { name: 'Workspace' } }
    /**
     * Find zero or one Workspace that matches the filter.
     * @param {WorkspaceFindUniqueArgs} args - Arguments to find a Workspace
     * @example
     * // Get one Workspace
     * const workspace = await prisma.workspace.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkspaceFindUniqueArgs>(args: SelectSubset<T, WorkspaceFindUniqueArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Workspace that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkspaceFindUniqueOrThrowArgs} args - Arguments to find a Workspace
     * @example
     * // Get one Workspace
     * const workspace = await prisma.workspace.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkspaceFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkspaceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Workspace that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceFindFirstArgs} args - Arguments to find a Workspace
     * @example
     * // Get one Workspace
     * const workspace = await prisma.workspace.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkspaceFindFirstArgs>(args?: SelectSubset<T, WorkspaceFindFirstArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Workspace that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceFindFirstOrThrowArgs} args - Arguments to find a Workspace
     * @example
     * // Get one Workspace
     * const workspace = await prisma.workspace.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkspaceFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkspaceFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Workspaces that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Workspaces
     * const workspaces = await prisma.workspace.findMany()
     * 
     * // Get first 10 Workspaces
     * const workspaces = await prisma.workspace.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workspaceWithIdOnly = await prisma.workspace.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkspaceFindManyArgs>(args?: SelectSubset<T, WorkspaceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Workspace.
     * @param {WorkspaceCreateArgs} args - Arguments to create a Workspace.
     * @example
     * // Create one Workspace
     * const Workspace = await prisma.workspace.create({
     *   data: {
     *     // ... data to create a Workspace
     *   }
     * })
     * 
     */
    create<T extends WorkspaceCreateArgs>(args: SelectSubset<T, WorkspaceCreateArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Workspaces.
     * @param {WorkspaceCreateManyArgs} args - Arguments to create many Workspaces.
     * @example
     * // Create many Workspaces
     * const workspace = await prisma.workspace.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkspaceCreateManyArgs>(args?: SelectSubset<T, WorkspaceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Workspaces and returns the data saved in the database.
     * @param {WorkspaceCreateManyAndReturnArgs} args - Arguments to create many Workspaces.
     * @example
     * // Create many Workspaces
     * const workspace = await prisma.workspace.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Workspaces and only return the `id`
     * const workspaceWithIdOnly = await prisma.workspace.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkspaceCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkspaceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Workspace.
     * @param {WorkspaceDeleteArgs} args - Arguments to delete one Workspace.
     * @example
     * // Delete one Workspace
     * const Workspace = await prisma.workspace.delete({
     *   where: {
     *     // ... filter to delete one Workspace
     *   }
     * })
     * 
     */
    delete<T extends WorkspaceDeleteArgs>(args: SelectSubset<T, WorkspaceDeleteArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Workspace.
     * @param {WorkspaceUpdateArgs} args - Arguments to update one Workspace.
     * @example
     * // Update one Workspace
     * const workspace = await prisma.workspace.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkspaceUpdateArgs>(args: SelectSubset<T, WorkspaceUpdateArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Workspaces.
     * @param {WorkspaceDeleteManyArgs} args - Arguments to filter Workspaces to delete.
     * @example
     * // Delete a few Workspaces
     * const { count } = await prisma.workspace.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkspaceDeleteManyArgs>(args?: SelectSubset<T, WorkspaceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Workspaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Workspaces
     * const workspace = await prisma.workspace.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkspaceUpdateManyArgs>(args: SelectSubset<T, WorkspaceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Workspaces and returns the data updated in the database.
     * @param {WorkspaceUpdateManyAndReturnArgs} args - Arguments to update many Workspaces.
     * @example
     * // Update many Workspaces
     * const workspace = await prisma.workspace.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Workspaces and only return the `id`
     * const workspaceWithIdOnly = await prisma.workspace.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WorkspaceUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkspaceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Workspace.
     * @param {WorkspaceUpsertArgs} args - Arguments to update or create a Workspace.
     * @example
     * // Update or create a Workspace
     * const workspace = await prisma.workspace.upsert({
     *   create: {
     *     // ... data to create a Workspace
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Workspace we want to update
     *   }
     * })
     */
    upsert<T extends WorkspaceUpsertArgs>(args: SelectSubset<T, WorkspaceUpsertArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Workspaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceCountArgs} args - Arguments to filter Workspaces to count.
     * @example
     * // Count the number of Workspaces
     * const count = await prisma.workspace.count({
     *   where: {
     *     // ... the filter for the Workspaces we want to count
     *   }
     * })
    **/
    count<T extends WorkspaceCountArgs>(
      args?: Subset<T, WorkspaceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkspaceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Workspace.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkspaceAggregateArgs>(args: Subset<T, WorkspaceAggregateArgs>): Prisma.PrismaPromise<GetWorkspaceAggregateType<T>>

    /**
     * Group by Workspace.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkspaceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkspaceGroupByArgs['orderBy'] }
        : { orderBy?: WorkspaceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkspaceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkspaceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Workspace model
   */
  readonly fields: WorkspaceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Workspace.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkspaceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profiles<T extends Workspace$profilesArgs<ExtArgs> = {}>(args?: Subset<T, Workspace$profilesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    visitors<T extends Workspace$visitorsArgs<ExtArgs> = {}>(args?: Subset<T, Workspace$visitorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VisitorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    config<T extends Workspace$configArgs<ExtArgs> = {}>(args?: Subset<T, Workspace$configArgs<ExtArgs>>): Prisma__WorkspaceConfigClient<$Result.GetResult<Prisma.$WorkspaceConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    subscriptions<T extends Workspace$subscriptionsArgs<ExtArgs> = {}>(args?: Subset<T, Workspace$subscriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transactions<T extends Workspace$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, Workspace$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    registrationLinks<T extends Workspace$registrationLinksArgs<ExtArgs> = {}>(args?: Subset<T, Workspace$registrationLinksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PublicRegistrationLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Workspace model
   */
  interface WorkspaceFieldRefs {
    readonly id: FieldRef<"Workspace", 'Int'>
    readonly name: FieldRef<"Workspace", 'String'>
    readonly plan: FieldRef<"Workspace", 'String'>
    readonly createdAt: FieldRef<"Workspace", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Workspace findUnique
   */
  export type WorkspaceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which Workspace to fetch.
     */
    where: WorkspaceWhereUniqueInput
  }

  /**
   * Workspace findUniqueOrThrow
   */
  export type WorkspaceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which Workspace to fetch.
     */
    where: WorkspaceWhereUniqueInput
  }

  /**
   * Workspace findFirst
   */
  export type WorkspaceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which Workspace to fetch.
     */
    where?: WorkspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workspaces to fetch.
     */
    orderBy?: WorkspaceOrderByWithRelationInput | WorkspaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Workspaces.
     */
    cursor?: WorkspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workspaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Workspaces.
     */
    distinct?: WorkspaceScalarFieldEnum | WorkspaceScalarFieldEnum[]
  }

  /**
   * Workspace findFirstOrThrow
   */
  export type WorkspaceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which Workspace to fetch.
     */
    where?: WorkspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workspaces to fetch.
     */
    orderBy?: WorkspaceOrderByWithRelationInput | WorkspaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Workspaces.
     */
    cursor?: WorkspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workspaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Workspaces.
     */
    distinct?: WorkspaceScalarFieldEnum | WorkspaceScalarFieldEnum[]
  }

  /**
   * Workspace findMany
   */
  export type WorkspaceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which Workspaces to fetch.
     */
    where?: WorkspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workspaces to fetch.
     */
    orderBy?: WorkspaceOrderByWithRelationInput | WorkspaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Workspaces.
     */
    cursor?: WorkspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workspaces.
     */
    skip?: number
    distinct?: WorkspaceScalarFieldEnum | WorkspaceScalarFieldEnum[]
  }

  /**
   * Workspace create
   */
  export type WorkspaceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * The data needed to create a Workspace.
     */
    data?: XOR<WorkspaceCreateInput, WorkspaceUncheckedCreateInput>
  }

  /**
   * Workspace createMany
   */
  export type WorkspaceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Workspaces.
     */
    data: WorkspaceCreateManyInput | WorkspaceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Workspace createManyAndReturn
   */
  export type WorkspaceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * The data used to create many Workspaces.
     */
    data: WorkspaceCreateManyInput | WorkspaceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Workspace update
   */
  export type WorkspaceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * The data needed to update a Workspace.
     */
    data: XOR<WorkspaceUpdateInput, WorkspaceUncheckedUpdateInput>
    /**
     * Choose, which Workspace to update.
     */
    where: WorkspaceWhereUniqueInput
  }

  /**
   * Workspace updateMany
   */
  export type WorkspaceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Workspaces.
     */
    data: XOR<WorkspaceUpdateManyMutationInput, WorkspaceUncheckedUpdateManyInput>
    /**
     * Filter which Workspaces to update
     */
    where?: WorkspaceWhereInput
    /**
     * Limit how many Workspaces to update.
     */
    limit?: number
  }

  /**
   * Workspace updateManyAndReturn
   */
  export type WorkspaceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * The data used to update Workspaces.
     */
    data: XOR<WorkspaceUpdateManyMutationInput, WorkspaceUncheckedUpdateManyInput>
    /**
     * Filter which Workspaces to update
     */
    where?: WorkspaceWhereInput
    /**
     * Limit how many Workspaces to update.
     */
    limit?: number
  }

  /**
   * Workspace upsert
   */
  export type WorkspaceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * The filter to search for the Workspace to update in case it exists.
     */
    where: WorkspaceWhereUniqueInput
    /**
     * In case the Workspace found by the `where` argument doesn't exist, create a new Workspace with this data.
     */
    create: XOR<WorkspaceCreateInput, WorkspaceUncheckedCreateInput>
    /**
     * In case the Workspace was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkspaceUpdateInput, WorkspaceUncheckedUpdateInput>
  }

  /**
   * Workspace delete
   */
  export type WorkspaceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter which Workspace to delete.
     */
    where: WorkspaceWhereUniqueInput
  }

  /**
   * Workspace deleteMany
   */
  export type WorkspaceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Workspaces to delete
     */
    where?: WorkspaceWhereInput
    /**
     * Limit how many Workspaces to delete.
     */
    limit?: number
  }

  /**
   * Workspace.profiles
   */
  export type Workspace$profilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    where?: ProfileWhereInput
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    cursor?: ProfileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Workspace.visitors
   */
  export type Workspace$visitorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visitor
     */
    select?: VisitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Visitor
     */
    omit?: VisitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitorInclude<ExtArgs> | null
    where?: VisitorWhereInput
    orderBy?: VisitorOrderByWithRelationInput | VisitorOrderByWithRelationInput[]
    cursor?: VisitorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VisitorScalarFieldEnum | VisitorScalarFieldEnum[]
  }

  /**
   * Workspace.config
   */
  export type Workspace$configArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceConfig
     */
    select?: WorkspaceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceConfig
     */
    omit?: WorkspaceConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceConfigInclude<ExtArgs> | null
    where?: WorkspaceConfigWhereInput
  }

  /**
   * Workspace.subscriptions
   */
  export type Workspace$subscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    where?: SubscriptionWhereInput
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    cursor?: SubscriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Workspace.transactions
   */
  export type Workspace$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Workspace.registrationLinks
   */
  export type Workspace$registrationLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicRegistrationLink
     */
    select?: PublicRegistrationLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicRegistrationLink
     */
    omit?: PublicRegistrationLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicRegistrationLinkInclude<ExtArgs> | null
    where?: PublicRegistrationLinkWhereInput
    orderBy?: PublicRegistrationLinkOrderByWithRelationInput | PublicRegistrationLinkOrderByWithRelationInput[]
    cursor?: PublicRegistrationLinkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PublicRegistrationLinkScalarFieldEnum | PublicRegistrationLinkScalarFieldEnum[]
  }

  /**
   * Workspace without action
   */
  export type WorkspaceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
  }


  /**
   * Model WorkspaceConfig
   */

  export type AggregateWorkspaceConfig = {
    _count: WorkspaceConfigCountAggregateOutputType | null
    _avg: WorkspaceConfigAvgAggregateOutputType | null
    _sum: WorkspaceConfigSumAggregateOutputType | null
    _min: WorkspaceConfigMinAggregateOutputType | null
    _max: WorkspaceConfigMaxAggregateOutputType | null
  }

  export type WorkspaceConfigAvgAggregateOutputType = {
    id: number | null
    wid: number | null
  }

  export type WorkspaceConfigSumAggregateOutputType = {
    id: number | null
    wid: number | null
  }

  export type WorkspaceConfigMinAggregateOutputType = {
    id: number | null
    wid: number | null
    updatedAt: Date | null
  }

  export type WorkspaceConfigMaxAggregateOutputType = {
    id: number | null
    wid: number | null
    updatedAt: Date | null
  }

  export type WorkspaceConfigCountAggregateOutputType = {
    id: number
    wid: number
    departments: number
    designations: number
    officeBranches: number
    workLocations: number
    updatedAt: number
    _all: number
  }


  export type WorkspaceConfigAvgAggregateInputType = {
    id?: true
    wid?: true
  }

  export type WorkspaceConfigSumAggregateInputType = {
    id?: true
    wid?: true
  }

  export type WorkspaceConfigMinAggregateInputType = {
    id?: true
    wid?: true
    updatedAt?: true
  }

  export type WorkspaceConfigMaxAggregateInputType = {
    id?: true
    wid?: true
    updatedAt?: true
  }

  export type WorkspaceConfigCountAggregateInputType = {
    id?: true
    wid?: true
    departments?: true
    designations?: true
    officeBranches?: true
    workLocations?: true
    updatedAt?: true
    _all?: true
  }

  export type WorkspaceConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkspaceConfig to aggregate.
     */
    where?: WorkspaceConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkspaceConfigs to fetch.
     */
    orderBy?: WorkspaceConfigOrderByWithRelationInput | WorkspaceConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkspaceConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkspaceConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkspaceConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkspaceConfigs
    **/
    _count?: true | WorkspaceConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WorkspaceConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WorkspaceConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkspaceConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkspaceConfigMaxAggregateInputType
  }

  export type GetWorkspaceConfigAggregateType<T extends WorkspaceConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkspaceConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkspaceConfig[P]>
      : GetScalarType<T[P], AggregateWorkspaceConfig[P]>
  }




  export type WorkspaceConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkspaceConfigWhereInput
    orderBy?: WorkspaceConfigOrderByWithAggregationInput | WorkspaceConfigOrderByWithAggregationInput[]
    by: WorkspaceConfigScalarFieldEnum[] | WorkspaceConfigScalarFieldEnum
    having?: WorkspaceConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkspaceConfigCountAggregateInputType | true
    _avg?: WorkspaceConfigAvgAggregateInputType
    _sum?: WorkspaceConfigSumAggregateInputType
    _min?: WorkspaceConfigMinAggregateInputType
    _max?: WorkspaceConfigMaxAggregateInputType
  }

  export type WorkspaceConfigGroupByOutputType = {
    id: number
    wid: number
    departments: string[]
    designations: string[]
    officeBranches: string[]
    workLocations: string[]
    updatedAt: Date
    _count: WorkspaceConfigCountAggregateOutputType | null
    _avg: WorkspaceConfigAvgAggregateOutputType | null
    _sum: WorkspaceConfigSumAggregateOutputType | null
    _min: WorkspaceConfigMinAggregateOutputType | null
    _max: WorkspaceConfigMaxAggregateOutputType | null
  }

  type GetWorkspaceConfigGroupByPayload<T extends WorkspaceConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkspaceConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkspaceConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkspaceConfigGroupByOutputType[P]>
            : GetScalarType<T[P], WorkspaceConfigGroupByOutputType[P]>
        }
      >
    >


  export type WorkspaceConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    wid?: boolean
    departments?: boolean
    designations?: boolean
    officeBranches?: boolean
    workLocations?: boolean
    updatedAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workspaceConfig"]>

  export type WorkspaceConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    wid?: boolean
    departments?: boolean
    designations?: boolean
    officeBranches?: boolean
    workLocations?: boolean
    updatedAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workspaceConfig"]>

  export type WorkspaceConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    wid?: boolean
    departments?: boolean
    designations?: boolean
    officeBranches?: boolean
    workLocations?: boolean
    updatedAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workspaceConfig"]>

  export type WorkspaceConfigSelectScalar = {
    id?: boolean
    wid?: boolean
    departments?: boolean
    designations?: boolean
    officeBranches?: boolean
    workLocations?: boolean
    updatedAt?: boolean
  }

  export type WorkspaceConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "wid" | "departments" | "designations" | "officeBranches" | "workLocations" | "updatedAt", ExtArgs["result"]["workspaceConfig"]>
  export type WorkspaceConfigInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }
  export type WorkspaceConfigIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }
  export type WorkspaceConfigIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }

  export type $WorkspaceConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkspaceConfig"
    objects: {
      workspace: Prisma.$WorkspacePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      wid: number
      departments: string[]
      designations: string[]
      officeBranches: string[]
      workLocations: string[]
      updatedAt: Date
    }, ExtArgs["result"]["workspaceConfig"]>
    composites: {}
  }

  type WorkspaceConfigGetPayload<S extends boolean | null | undefined | WorkspaceConfigDefaultArgs> = $Result.GetResult<Prisma.$WorkspaceConfigPayload, S>

  type WorkspaceConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkspaceConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkspaceConfigCountAggregateInputType | true
    }

  export interface WorkspaceConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkspaceConfig'], meta: { name: 'WorkspaceConfig' } }
    /**
     * Find zero or one WorkspaceConfig that matches the filter.
     * @param {WorkspaceConfigFindUniqueArgs} args - Arguments to find a WorkspaceConfig
     * @example
     * // Get one WorkspaceConfig
     * const workspaceConfig = await prisma.workspaceConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkspaceConfigFindUniqueArgs>(args: SelectSubset<T, WorkspaceConfigFindUniqueArgs<ExtArgs>>): Prisma__WorkspaceConfigClient<$Result.GetResult<Prisma.$WorkspaceConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkspaceConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkspaceConfigFindUniqueOrThrowArgs} args - Arguments to find a WorkspaceConfig
     * @example
     * // Get one WorkspaceConfig
     * const workspaceConfig = await prisma.workspaceConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkspaceConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkspaceConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkspaceConfigClient<$Result.GetResult<Prisma.$WorkspaceConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkspaceConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceConfigFindFirstArgs} args - Arguments to find a WorkspaceConfig
     * @example
     * // Get one WorkspaceConfig
     * const workspaceConfig = await prisma.workspaceConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkspaceConfigFindFirstArgs>(args?: SelectSubset<T, WorkspaceConfigFindFirstArgs<ExtArgs>>): Prisma__WorkspaceConfigClient<$Result.GetResult<Prisma.$WorkspaceConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkspaceConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceConfigFindFirstOrThrowArgs} args - Arguments to find a WorkspaceConfig
     * @example
     * // Get one WorkspaceConfig
     * const workspaceConfig = await prisma.workspaceConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkspaceConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkspaceConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkspaceConfigClient<$Result.GetResult<Prisma.$WorkspaceConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkspaceConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkspaceConfigs
     * const workspaceConfigs = await prisma.workspaceConfig.findMany()
     * 
     * // Get first 10 WorkspaceConfigs
     * const workspaceConfigs = await prisma.workspaceConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workspaceConfigWithIdOnly = await prisma.workspaceConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkspaceConfigFindManyArgs>(args?: SelectSubset<T, WorkspaceConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspaceConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkspaceConfig.
     * @param {WorkspaceConfigCreateArgs} args - Arguments to create a WorkspaceConfig.
     * @example
     * // Create one WorkspaceConfig
     * const WorkspaceConfig = await prisma.workspaceConfig.create({
     *   data: {
     *     // ... data to create a WorkspaceConfig
     *   }
     * })
     * 
     */
    create<T extends WorkspaceConfigCreateArgs>(args: SelectSubset<T, WorkspaceConfigCreateArgs<ExtArgs>>): Prisma__WorkspaceConfigClient<$Result.GetResult<Prisma.$WorkspaceConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkspaceConfigs.
     * @param {WorkspaceConfigCreateManyArgs} args - Arguments to create many WorkspaceConfigs.
     * @example
     * // Create many WorkspaceConfigs
     * const workspaceConfig = await prisma.workspaceConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkspaceConfigCreateManyArgs>(args?: SelectSubset<T, WorkspaceConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkspaceConfigs and returns the data saved in the database.
     * @param {WorkspaceConfigCreateManyAndReturnArgs} args - Arguments to create many WorkspaceConfigs.
     * @example
     * // Create many WorkspaceConfigs
     * const workspaceConfig = await prisma.workspaceConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkspaceConfigs and only return the `id`
     * const workspaceConfigWithIdOnly = await prisma.workspaceConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkspaceConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkspaceConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspaceConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WorkspaceConfig.
     * @param {WorkspaceConfigDeleteArgs} args - Arguments to delete one WorkspaceConfig.
     * @example
     * // Delete one WorkspaceConfig
     * const WorkspaceConfig = await prisma.workspaceConfig.delete({
     *   where: {
     *     // ... filter to delete one WorkspaceConfig
     *   }
     * })
     * 
     */
    delete<T extends WorkspaceConfigDeleteArgs>(args: SelectSubset<T, WorkspaceConfigDeleteArgs<ExtArgs>>): Prisma__WorkspaceConfigClient<$Result.GetResult<Prisma.$WorkspaceConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkspaceConfig.
     * @param {WorkspaceConfigUpdateArgs} args - Arguments to update one WorkspaceConfig.
     * @example
     * // Update one WorkspaceConfig
     * const workspaceConfig = await prisma.workspaceConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkspaceConfigUpdateArgs>(args: SelectSubset<T, WorkspaceConfigUpdateArgs<ExtArgs>>): Prisma__WorkspaceConfigClient<$Result.GetResult<Prisma.$WorkspaceConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkspaceConfigs.
     * @param {WorkspaceConfigDeleteManyArgs} args - Arguments to filter WorkspaceConfigs to delete.
     * @example
     * // Delete a few WorkspaceConfigs
     * const { count } = await prisma.workspaceConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkspaceConfigDeleteManyArgs>(args?: SelectSubset<T, WorkspaceConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkspaceConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkspaceConfigs
     * const workspaceConfig = await prisma.workspaceConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkspaceConfigUpdateManyArgs>(args: SelectSubset<T, WorkspaceConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkspaceConfigs and returns the data updated in the database.
     * @param {WorkspaceConfigUpdateManyAndReturnArgs} args - Arguments to update many WorkspaceConfigs.
     * @example
     * // Update many WorkspaceConfigs
     * const workspaceConfig = await prisma.workspaceConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WorkspaceConfigs and only return the `id`
     * const workspaceConfigWithIdOnly = await prisma.workspaceConfig.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WorkspaceConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkspaceConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspaceConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WorkspaceConfig.
     * @param {WorkspaceConfigUpsertArgs} args - Arguments to update or create a WorkspaceConfig.
     * @example
     * // Update or create a WorkspaceConfig
     * const workspaceConfig = await prisma.workspaceConfig.upsert({
     *   create: {
     *     // ... data to create a WorkspaceConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkspaceConfig we want to update
     *   }
     * })
     */
    upsert<T extends WorkspaceConfigUpsertArgs>(args: SelectSubset<T, WorkspaceConfigUpsertArgs<ExtArgs>>): Prisma__WorkspaceConfigClient<$Result.GetResult<Prisma.$WorkspaceConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkspaceConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceConfigCountArgs} args - Arguments to filter WorkspaceConfigs to count.
     * @example
     * // Count the number of WorkspaceConfigs
     * const count = await prisma.workspaceConfig.count({
     *   where: {
     *     // ... the filter for the WorkspaceConfigs we want to count
     *   }
     * })
    **/
    count<T extends WorkspaceConfigCountArgs>(
      args?: Subset<T, WorkspaceConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkspaceConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkspaceConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkspaceConfigAggregateArgs>(args: Subset<T, WorkspaceConfigAggregateArgs>): Prisma.PrismaPromise<GetWorkspaceConfigAggregateType<T>>

    /**
     * Group by WorkspaceConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkspaceConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkspaceConfigGroupByArgs['orderBy'] }
        : { orderBy?: WorkspaceConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkspaceConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkspaceConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkspaceConfig model
   */
  readonly fields: WorkspaceConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkspaceConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkspaceConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    workspace<T extends WorkspaceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkspaceDefaultArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WorkspaceConfig model
   */
  interface WorkspaceConfigFieldRefs {
    readonly id: FieldRef<"WorkspaceConfig", 'Int'>
    readonly wid: FieldRef<"WorkspaceConfig", 'Int'>
    readonly departments: FieldRef<"WorkspaceConfig", 'String[]'>
    readonly designations: FieldRef<"WorkspaceConfig", 'String[]'>
    readonly officeBranches: FieldRef<"WorkspaceConfig", 'String[]'>
    readonly workLocations: FieldRef<"WorkspaceConfig", 'String[]'>
    readonly updatedAt: FieldRef<"WorkspaceConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WorkspaceConfig findUnique
   */
  export type WorkspaceConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceConfig
     */
    select?: WorkspaceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceConfig
     */
    omit?: WorkspaceConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceConfigInclude<ExtArgs> | null
    /**
     * Filter, which WorkspaceConfig to fetch.
     */
    where: WorkspaceConfigWhereUniqueInput
  }

  /**
   * WorkspaceConfig findUniqueOrThrow
   */
  export type WorkspaceConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceConfig
     */
    select?: WorkspaceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceConfig
     */
    omit?: WorkspaceConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceConfigInclude<ExtArgs> | null
    /**
     * Filter, which WorkspaceConfig to fetch.
     */
    where: WorkspaceConfigWhereUniqueInput
  }

  /**
   * WorkspaceConfig findFirst
   */
  export type WorkspaceConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceConfig
     */
    select?: WorkspaceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceConfig
     */
    omit?: WorkspaceConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceConfigInclude<ExtArgs> | null
    /**
     * Filter, which WorkspaceConfig to fetch.
     */
    where?: WorkspaceConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkspaceConfigs to fetch.
     */
    orderBy?: WorkspaceConfigOrderByWithRelationInput | WorkspaceConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkspaceConfigs.
     */
    cursor?: WorkspaceConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkspaceConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkspaceConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkspaceConfigs.
     */
    distinct?: WorkspaceConfigScalarFieldEnum | WorkspaceConfigScalarFieldEnum[]
  }

  /**
   * WorkspaceConfig findFirstOrThrow
   */
  export type WorkspaceConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceConfig
     */
    select?: WorkspaceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceConfig
     */
    omit?: WorkspaceConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceConfigInclude<ExtArgs> | null
    /**
     * Filter, which WorkspaceConfig to fetch.
     */
    where?: WorkspaceConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkspaceConfigs to fetch.
     */
    orderBy?: WorkspaceConfigOrderByWithRelationInput | WorkspaceConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkspaceConfigs.
     */
    cursor?: WorkspaceConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkspaceConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkspaceConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkspaceConfigs.
     */
    distinct?: WorkspaceConfigScalarFieldEnum | WorkspaceConfigScalarFieldEnum[]
  }

  /**
   * WorkspaceConfig findMany
   */
  export type WorkspaceConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceConfig
     */
    select?: WorkspaceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceConfig
     */
    omit?: WorkspaceConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceConfigInclude<ExtArgs> | null
    /**
     * Filter, which WorkspaceConfigs to fetch.
     */
    where?: WorkspaceConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkspaceConfigs to fetch.
     */
    orderBy?: WorkspaceConfigOrderByWithRelationInput | WorkspaceConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkspaceConfigs.
     */
    cursor?: WorkspaceConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkspaceConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkspaceConfigs.
     */
    skip?: number
    distinct?: WorkspaceConfigScalarFieldEnum | WorkspaceConfigScalarFieldEnum[]
  }

  /**
   * WorkspaceConfig create
   */
  export type WorkspaceConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceConfig
     */
    select?: WorkspaceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceConfig
     */
    omit?: WorkspaceConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceConfigInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkspaceConfig.
     */
    data: XOR<WorkspaceConfigCreateInput, WorkspaceConfigUncheckedCreateInput>
  }

  /**
   * WorkspaceConfig createMany
   */
  export type WorkspaceConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkspaceConfigs.
     */
    data: WorkspaceConfigCreateManyInput | WorkspaceConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkspaceConfig createManyAndReturn
   */
  export type WorkspaceConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceConfig
     */
    select?: WorkspaceConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceConfig
     */
    omit?: WorkspaceConfigOmit<ExtArgs> | null
    /**
     * The data used to create many WorkspaceConfigs.
     */
    data: WorkspaceConfigCreateManyInput | WorkspaceConfigCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceConfigIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkspaceConfig update
   */
  export type WorkspaceConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceConfig
     */
    select?: WorkspaceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceConfig
     */
    omit?: WorkspaceConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceConfigInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkspaceConfig.
     */
    data: XOR<WorkspaceConfigUpdateInput, WorkspaceConfigUncheckedUpdateInput>
    /**
     * Choose, which WorkspaceConfig to update.
     */
    where: WorkspaceConfigWhereUniqueInput
  }

  /**
   * WorkspaceConfig updateMany
   */
  export type WorkspaceConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkspaceConfigs.
     */
    data: XOR<WorkspaceConfigUpdateManyMutationInput, WorkspaceConfigUncheckedUpdateManyInput>
    /**
     * Filter which WorkspaceConfigs to update
     */
    where?: WorkspaceConfigWhereInput
    /**
     * Limit how many WorkspaceConfigs to update.
     */
    limit?: number
  }

  /**
   * WorkspaceConfig updateManyAndReturn
   */
  export type WorkspaceConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceConfig
     */
    select?: WorkspaceConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceConfig
     */
    omit?: WorkspaceConfigOmit<ExtArgs> | null
    /**
     * The data used to update WorkspaceConfigs.
     */
    data: XOR<WorkspaceConfigUpdateManyMutationInput, WorkspaceConfigUncheckedUpdateManyInput>
    /**
     * Filter which WorkspaceConfigs to update
     */
    where?: WorkspaceConfigWhereInput
    /**
     * Limit how many WorkspaceConfigs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceConfigIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkspaceConfig upsert
   */
  export type WorkspaceConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceConfig
     */
    select?: WorkspaceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceConfig
     */
    omit?: WorkspaceConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceConfigInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkspaceConfig to update in case it exists.
     */
    where: WorkspaceConfigWhereUniqueInput
    /**
     * In case the WorkspaceConfig found by the `where` argument doesn't exist, create a new WorkspaceConfig with this data.
     */
    create: XOR<WorkspaceConfigCreateInput, WorkspaceConfigUncheckedCreateInput>
    /**
     * In case the WorkspaceConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkspaceConfigUpdateInput, WorkspaceConfigUncheckedUpdateInput>
  }

  /**
   * WorkspaceConfig delete
   */
  export type WorkspaceConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceConfig
     */
    select?: WorkspaceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceConfig
     */
    omit?: WorkspaceConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceConfigInclude<ExtArgs> | null
    /**
     * Filter which WorkspaceConfig to delete.
     */
    where: WorkspaceConfigWhereUniqueInput
  }

  /**
   * WorkspaceConfig deleteMany
   */
  export type WorkspaceConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkspaceConfigs to delete
     */
    where?: WorkspaceConfigWhereInput
    /**
     * Limit how many WorkspaceConfigs to delete.
     */
    limit?: number
  }

  /**
   * WorkspaceConfig without action
   */
  export type WorkspaceConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceConfig
     */
    select?: WorkspaceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceConfig
     */
    omit?: WorkspaceConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceConfigInclude<ExtArgs> | null
  }


  /**
   * Model Profile
   */

  export type AggregateProfile = {
    _count: ProfileCountAggregateOutputType | null
    _avg: ProfileAvgAggregateOutputType | null
    _sum: ProfileSumAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  export type ProfileAvgAggregateOutputType = {
    wid: number | null
  }

  export type ProfileSumAggregateOutputType = {
    wid: number | null
  }

  export type ProfileMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    role: string | null
    department: string | null
    designation: string | null
    officeBranch: string | null
    workLocation: string | null
    avatarInitials: string | null
    status: string | null
    phoneNumber: string | null
    personalEmail: string | null
    bloodGroup: string | null
    dob: string | null
    code: string | null
    joiningDate: string | null
    reportingManager: string | null
    reportingHR: string | null
    emergencyName: string | null
    emergencyPhone: string | null
    acceptedTerms: boolean | null
    acceptedPrivacy: boolean | null
    consentAt: Date | null
    termsVersion: string | null
    privacyVersion: string | null
    createdAt: Date | null
    wid: number | null
  }

  export type ProfileMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    role: string | null
    department: string | null
    designation: string | null
    officeBranch: string | null
    workLocation: string | null
    avatarInitials: string | null
    status: string | null
    phoneNumber: string | null
    personalEmail: string | null
    bloodGroup: string | null
    dob: string | null
    code: string | null
    joiningDate: string | null
    reportingManager: string | null
    reportingHR: string | null
    emergencyName: string | null
    emergencyPhone: string | null
    acceptedTerms: boolean | null
    acceptedPrivacy: boolean | null
    consentAt: Date | null
    termsVersion: string | null
    privacyVersion: string | null
    createdAt: Date | null
    wid: number | null
  }

  export type ProfileCountAggregateOutputType = {
    id: number
    name: number
    email: number
    role: number
    department: number
    designation: number
    officeBranch: number
    workLocation: number
    avatarInitials: number
    status: number
    phoneNumber: number
    personalEmail: number
    bloodGroup: number
    dob: number
    code: number
    joiningDate: number
    reportingManager: number
    reportingHR: number
    emergencyName: number
    emergencyPhone: number
    acceptedTerms: number
    acceptedPrivacy: number
    consentAt: number
    termsVersion: number
    privacyVersion: number
    createdAt: number
    wid: number
    _all: number
  }


  export type ProfileAvgAggregateInputType = {
    wid?: true
  }

  export type ProfileSumAggregateInputType = {
    wid?: true
  }

  export type ProfileMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    role?: true
    department?: true
    designation?: true
    officeBranch?: true
    workLocation?: true
    avatarInitials?: true
    status?: true
    phoneNumber?: true
    personalEmail?: true
    bloodGroup?: true
    dob?: true
    code?: true
    joiningDate?: true
    reportingManager?: true
    reportingHR?: true
    emergencyName?: true
    emergencyPhone?: true
    acceptedTerms?: true
    acceptedPrivacy?: true
    consentAt?: true
    termsVersion?: true
    privacyVersion?: true
    createdAt?: true
    wid?: true
  }

  export type ProfileMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    role?: true
    department?: true
    designation?: true
    officeBranch?: true
    workLocation?: true
    avatarInitials?: true
    status?: true
    phoneNumber?: true
    personalEmail?: true
    bloodGroup?: true
    dob?: true
    code?: true
    joiningDate?: true
    reportingManager?: true
    reportingHR?: true
    emergencyName?: true
    emergencyPhone?: true
    acceptedTerms?: true
    acceptedPrivacy?: true
    consentAt?: true
    termsVersion?: true
    privacyVersion?: true
    createdAt?: true
    wid?: true
  }

  export type ProfileCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    role?: true
    department?: true
    designation?: true
    officeBranch?: true
    workLocation?: true
    avatarInitials?: true
    status?: true
    phoneNumber?: true
    personalEmail?: true
    bloodGroup?: true
    dob?: true
    code?: true
    joiningDate?: true
    reportingManager?: true
    reportingHR?: true
    emergencyName?: true
    emergencyPhone?: true
    acceptedTerms?: true
    acceptedPrivacy?: true
    consentAt?: true
    termsVersion?: true
    privacyVersion?: true
    createdAt?: true
    wid?: true
    _all?: true
  }

  export type ProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profile to aggregate.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Profiles
    **/
    _count?: true | ProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileMaxAggregateInputType
  }

  export type GetProfileAggregateType<T extends ProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfile[P]>
      : GetScalarType<T[P], AggregateProfile[P]>
  }




  export type ProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileWhereInput
    orderBy?: ProfileOrderByWithAggregationInput | ProfileOrderByWithAggregationInput[]
    by: ProfileScalarFieldEnum[] | ProfileScalarFieldEnum
    having?: ProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileCountAggregateInputType | true
    _avg?: ProfileAvgAggregateInputType
    _sum?: ProfileSumAggregateInputType
    _min?: ProfileMinAggregateInputType
    _max?: ProfileMaxAggregateInputType
  }

  export type ProfileGroupByOutputType = {
    id: string
    name: string
    email: string
    role: string
    department: string
    designation: string | null
    officeBranch: string | null
    workLocation: string | null
    avatarInitials: string
    status: string
    phoneNumber: string | null
    personalEmail: string | null
    bloodGroup: string | null
    dob: string | null
    code: string | null
    joiningDate: string | null
    reportingManager: string | null
    reportingHR: string | null
    emergencyName: string | null
    emergencyPhone: string | null
    acceptedTerms: boolean
    acceptedPrivacy: boolean
    consentAt: Date | null
    termsVersion: string | null
    privacyVersion: string | null
    createdAt: Date
    wid: number | null
    _count: ProfileCountAggregateOutputType | null
    _avg: ProfileAvgAggregateOutputType | null
    _sum: ProfileSumAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  type GetProfileGroupByPayload<T extends ProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileGroupByOutputType[P]>
        }
      >
    >


  export type ProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    role?: boolean
    department?: boolean
    designation?: boolean
    officeBranch?: boolean
    workLocation?: boolean
    avatarInitials?: boolean
    status?: boolean
    phoneNumber?: boolean
    personalEmail?: boolean
    bloodGroup?: boolean
    dob?: boolean
    code?: boolean
    joiningDate?: boolean
    reportingManager?: boolean
    reportingHR?: boolean
    emergencyName?: boolean
    emergencyPhone?: boolean
    acceptedTerms?: boolean
    acceptedPrivacy?: boolean
    consentAt?: boolean
    termsVersion?: boolean
    privacyVersion?: boolean
    createdAt?: boolean
    wid?: boolean
    workspace?: boolean | Profile$workspaceArgs<ExtArgs>
    visitors?: boolean | Profile$visitorsArgs<ExtArgs>
    registrationLinks?: boolean | Profile$registrationLinksArgs<ExtArgs>
    _count?: boolean | ProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    role?: boolean
    department?: boolean
    designation?: boolean
    officeBranch?: boolean
    workLocation?: boolean
    avatarInitials?: boolean
    status?: boolean
    phoneNumber?: boolean
    personalEmail?: boolean
    bloodGroup?: boolean
    dob?: boolean
    code?: boolean
    joiningDate?: boolean
    reportingManager?: boolean
    reportingHR?: boolean
    emergencyName?: boolean
    emergencyPhone?: boolean
    acceptedTerms?: boolean
    acceptedPrivacy?: boolean
    consentAt?: boolean
    termsVersion?: boolean
    privacyVersion?: boolean
    createdAt?: boolean
    wid?: boolean
    workspace?: boolean | Profile$workspaceArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    role?: boolean
    department?: boolean
    designation?: boolean
    officeBranch?: boolean
    workLocation?: boolean
    avatarInitials?: boolean
    status?: boolean
    phoneNumber?: boolean
    personalEmail?: boolean
    bloodGroup?: boolean
    dob?: boolean
    code?: boolean
    joiningDate?: boolean
    reportingManager?: boolean
    reportingHR?: boolean
    emergencyName?: boolean
    emergencyPhone?: boolean
    acceptedTerms?: boolean
    acceptedPrivacy?: boolean
    consentAt?: boolean
    termsVersion?: boolean
    privacyVersion?: boolean
    createdAt?: boolean
    wid?: boolean
    workspace?: boolean | Profile$workspaceArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    role?: boolean
    department?: boolean
    designation?: boolean
    officeBranch?: boolean
    workLocation?: boolean
    avatarInitials?: boolean
    status?: boolean
    phoneNumber?: boolean
    personalEmail?: boolean
    bloodGroup?: boolean
    dob?: boolean
    code?: boolean
    joiningDate?: boolean
    reportingManager?: boolean
    reportingHR?: boolean
    emergencyName?: boolean
    emergencyPhone?: boolean
    acceptedTerms?: boolean
    acceptedPrivacy?: boolean
    consentAt?: boolean
    termsVersion?: boolean
    privacyVersion?: boolean
    createdAt?: boolean
    wid?: boolean
  }

  export type ProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "role" | "department" | "designation" | "officeBranch" | "workLocation" | "avatarInitials" | "status" | "phoneNumber" | "personalEmail" | "bloodGroup" | "dob" | "code" | "joiningDate" | "reportingManager" | "reportingHR" | "emergencyName" | "emergencyPhone" | "acceptedTerms" | "acceptedPrivacy" | "consentAt" | "termsVersion" | "privacyVersion" | "createdAt" | "wid", ExtArgs["result"]["profile"]>
  export type ProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | Profile$workspaceArgs<ExtArgs>
    visitors?: boolean | Profile$visitorsArgs<ExtArgs>
    registrationLinks?: boolean | Profile$registrationLinksArgs<ExtArgs>
    _count?: boolean | ProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | Profile$workspaceArgs<ExtArgs>
  }
  export type ProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | Profile$workspaceArgs<ExtArgs>
  }

  export type $ProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Profile"
    objects: {
      workspace: Prisma.$WorkspacePayload<ExtArgs> | null
      visitors: Prisma.$VisitorPayload<ExtArgs>[]
      registrationLinks: Prisma.$PublicRegistrationLinkPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      role: string
      department: string
      designation: string | null
      officeBranch: string | null
      workLocation: string | null
      avatarInitials: string
      status: string
      phoneNumber: string | null
      personalEmail: string | null
      bloodGroup: string | null
      dob: string | null
      code: string | null
      joiningDate: string | null
      reportingManager: string | null
      reportingHR: string | null
      emergencyName: string | null
      emergencyPhone: string | null
      acceptedTerms: boolean
      acceptedPrivacy: boolean
      consentAt: Date | null
      termsVersion: string | null
      privacyVersion: string | null
      createdAt: Date
      wid: number | null
    }, ExtArgs["result"]["profile"]>
    composites: {}
  }

  type ProfileGetPayload<S extends boolean | null | undefined | ProfileDefaultArgs> = $Result.GetResult<Prisma.$ProfilePayload, S>

  type ProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfileCountAggregateInputType | true
    }

  export interface ProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Profile'], meta: { name: 'Profile' } }
    /**
     * Find zero or one Profile that matches the filter.
     * @param {ProfileFindUniqueArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfileFindUniqueArgs>(args: SelectSubset<T, ProfileFindUniqueArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Profile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfileFindUniqueOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfileFindFirstArgs>(args?: SelectSubset<T, ProfileFindFirstArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profiles
     * const profiles = await prisma.profile.findMany()
     * 
     * // Get first 10 Profiles
     * const profiles = await prisma.profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfileFindManyArgs>(args?: SelectSubset<T, ProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Profile.
     * @param {ProfileCreateArgs} args - Arguments to create a Profile.
     * @example
     * // Create one Profile
     * const Profile = await prisma.profile.create({
     *   data: {
     *     // ... data to create a Profile
     *   }
     * })
     * 
     */
    create<T extends ProfileCreateArgs>(args: SelectSubset<T, ProfileCreateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Profiles.
     * @param {ProfileCreateManyArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfileCreateManyArgs>(args?: SelectSubset<T, ProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Profiles and returns the data saved in the database.
     * @param {ProfileCreateManyAndReturnArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Profile.
     * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
     * @example
     * // Delete one Profile
     * const Profile = await prisma.profile.delete({
     *   where: {
     *     // ... filter to delete one Profile
     *   }
     * })
     * 
     */
    delete<T extends ProfileDeleteArgs>(args: SelectSubset<T, ProfileDeleteArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Profile.
     * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
     * @example
     * // Update one Profile
     * const profile = await prisma.profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfileUpdateArgs>(args: SelectSubset<T, ProfileUpdateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Profiles.
     * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
     * @example
     * // Delete a few Profiles
     * const { count } = await prisma.profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfileDeleteManyArgs>(args?: SelectSubset<T, ProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfileUpdateManyArgs>(args: SelectSubset<T, ProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles and returns the data updated in the database.
     * @param {ProfileUpdateManyAndReturnArgs} args - Arguments to update many Profiles.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Profile.
     * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
     * @example
     * // Update or create a Profile
     * const profile = await prisma.profile.upsert({
     *   create: {
     *     // ... data to create a Profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profile we want to update
     *   }
     * })
     */
    upsert<T extends ProfileUpsertArgs>(args: SelectSubset<T, ProfileUpsertArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCountArgs} args - Arguments to filter Profiles to count.
     * @example
     * // Count the number of Profiles
     * const count = await prisma.profile.count({
     *   where: {
     *     // ... the filter for the Profiles we want to count
     *   }
     * })
    **/
    count<T extends ProfileCountArgs>(
      args?: Subset<T, ProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfileAggregateArgs>(args: Subset<T, ProfileAggregateArgs>): Prisma.PrismaPromise<GetProfileAggregateType<T>>

    /**
     * Group by Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileGroupByArgs['orderBy'] }
        : { orderBy?: ProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Profile model
   */
  readonly fields: ProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    workspace<T extends Profile$workspaceArgs<ExtArgs> = {}>(args?: Subset<T, Profile$workspaceArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    visitors<T extends Profile$visitorsArgs<ExtArgs> = {}>(args?: Subset<T, Profile$visitorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VisitorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    registrationLinks<T extends Profile$registrationLinksArgs<ExtArgs> = {}>(args?: Subset<T, Profile$registrationLinksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PublicRegistrationLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Profile model
   */
  interface ProfileFieldRefs {
    readonly id: FieldRef<"Profile", 'String'>
    readonly name: FieldRef<"Profile", 'String'>
    readonly email: FieldRef<"Profile", 'String'>
    readonly role: FieldRef<"Profile", 'String'>
    readonly department: FieldRef<"Profile", 'String'>
    readonly designation: FieldRef<"Profile", 'String'>
    readonly officeBranch: FieldRef<"Profile", 'String'>
    readonly workLocation: FieldRef<"Profile", 'String'>
    readonly avatarInitials: FieldRef<"Profile", 'String'>
    readonly status: FieldRef<"Profile", 'String'>
    readonly phoneNumber: FieldRef<"Profile", 'String'>
    readonly personalEmail: FieldRef<"Profile", 'String'>
    readonly bloodGroup: FieldRef<"Profile", 'String'>
    readonly dob: FieldRef<"Profile", 'String'>
    readonly code: FieldRef<"Profile", 'String'>
    readonly joiningDate: FieldRef<"Profile", 'String'>
    readonly reportingManager: FieldRef<"Profile", 'String'>
    readonly reportingHR: FieldRef<"Profile", 'String'>
    readonly emergencyName: FieldRef<"Profile", 'String'>
    readonly emergencyPhone: FieldRef<"Profile", 'String'>
    readonly acceptedTerms: FieldRef<"Profile", 'Boolean'>
    readonly acceptedPrivacy: FieldRef<"Profile", 'Boolean'>
    readonly consentAt: FieldRef<"Profile", 'DateTime'>
    readonly termsVersion: FieldRef<"Profile", 'String'>
    readonly privacyVersion: FieldRef<"Profile", 'String'>
    readonly createdAt: FieldRef<"Profile", 'DateTime'>
    readonly wid: FieldRef<"Profile", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Profile findUnique
   */
  export type ProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findUniqueOrThrow
   */
  export type ProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findFirst
   */
  export type ProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findFirstOrThrow
   */
  export type ProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findMany
   */
  export type ProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profiles to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile create
   */
  export type ProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a Profile.
     */
    data: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
  }

  /**
   * Profile createMany
   */
  export type ProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Profile createManyAndReturn
   */
  export type ProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Profile update
   */
  export type ProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a Profile.
     */
    data: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
    /**
     * Choose, which Profile to update.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile updateMany
   */
  export type ProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
  }

  /**
   * Profile updateManyAndReturn
   */
  export type ProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Profile upsert
   */
  export type ProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the Profile to update in case it exists.
     */
    where: ProfileWhereUniqueInput
    /**
     * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
     */
    create: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
    /**
     * In case the Profile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
  }

  /**
   * Profile delete
   */
  export type ProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter which Profile to delete.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile deleteMany
   */
  export type ProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profiles to delete
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to delete.
     */
    limit?: number
  }

  /**
   * Profile.workspace
   */
  export type Profile$workspaceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    where?: WorkspaceWhereInput
  }

  /**
   * Profile.visitors
   */
  export type Profile$visitorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visitor
     */
    select?: VisitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Visitor
     */
    omit?: VisitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitorInclude<ExtArgs> | null
    where?: VisitorWhereInput
    orderBy?: VisitorOrderByWithRelationInput | VisitorOrderByWithRelationInput[]
    cursor?: VisitorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VisitorScalarFieldEnum | VisitorScalarFieldEnum[]
  }

  /**
   * Profile.registrationLinks
   */
  export type Profile$registrationLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicRegistrationLink
     */
    select?: PublicRegistrationLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicRegistrationLink
     */
    omit?: PublicRegistrationLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicRegistrationLinkInclude<ExtArgs> | null
    where?: PublicRegistrationLinkWhereInput
    orderBy?: PublicRegistrationLinkOrderByWithRelationInput | PublicRegistrationLinkOrderByWithRelationInput[]
    cursor?: PublicRegistrationLinkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PublicRegistrationLinkScalarFieldEnum | PublicRegistrationLinkScalarFieldEnum[]
  }

  /**
   * Profile without action
   */
  export type ProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
  }


  /**
   * Model Visitor
   */

  export type AggregateVisitor = {
    _count: VisitorCountAggregateOutputType | null
    _avg: VisitorAvgAggregateOutputType | null
    _sum: VisitorSumAggregateOutputType | null
    _min: VisitorMinAggregateOutputType | null
    _max: VisitorMaxAggregateOutputType | null
  }

  export type VisitorAvgAggregateOutputType = {
    wid: number | null
  }

  export type VisitorSumAggregateOutputType = {
    wid: number | null
  }

  export type VisitorMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phone: string | null
    company: string | null
    purpose: string | null
    status: string | null
    hostId: string | null
    hostName: string | null
    checkedInAt: Date | null
    checkedOutAt: Date | null
    preRegisteredAt: Date | null
    idProofType: string | null
    idProofNumber: string | null
    badgeNumber: string | null
    qrCode: string | null
    qrValidUntil: Date | null
    walkIn: boolean | null
    notes: string | null
    wid: number | null
  }

  export type VisitorMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phone: string | null
    company: string | null
    purpose: string | null
    status: string | null
    hostId: string | null
    hostName: string | null
    checkedInAt: Date | null
    checkedOutAt: Date | null
    preRegisteredAt: Date | null
    idProofType: string | null
    idProofNumber: string | null
    badgeNumber: string | null
    qrCode: string | null
    qrValidUntil: Date | null
    walkIn: boolean | null
    notes: string | null
    wid: number | null
  }

  export type VisitorCountAggregateOutputType = {
    id: number
    name: number
    email: number
    phone: number
    company: number
    purpose: number
    status: number
    hostId: number
    hostName: number
    checkedInAt: number
    checkedOutAt: number
    preRegisteredAt: number
    idProofType: number
    idProofNumber: number
    badgeNumber: number
    qrCode: number
    qrValidUntil: number
    walkIn: number
    notes: number
    wid: number
    _all: number
  }


  export type VisitorAvgAggregateInputType = {
    wid?: true
  }

  export type VisitorSumAggregateInputType = {
    wid?: true
  }

  export type VisitorMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    company?: true
    purpose?: true
    status?: true
    hostId?: true
    hostName?: true
    checkedInAt?: true
    checkedOutAt?: true
    preRegisteredAt?: true
    idProofType?: true
    idProofNumber?: true
    badgeNumber?: true
    qrCode?: true
    qrValidUntil?: true
    walkIn?: true
    notes?: true
    wid?: true
  }

  export type VisitorMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    company?: true
    purpose?: true
    status?: true
    hostId?: true
    hostName?: true
    checkedInAt?: true
    checkedOutAt?: true
    preRegisteredAt?: true
    idProofType?: true
    idProofNumber?: true
    badgeNumber?: true
    qrCode?: true
    qrValidUntil?: true
    walkIn?: true
    notes?: true
    wid?: true
  }

  export type VisitorCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    company?: true
    purpose?: true
    status?: true
    hostId?: true
    hostName?: true
    checkedInAt?: true
    checkedOutAt?: true
    preRegisteredAt?: true
    idProofType?: true
    idProofNumber?: true
    badgeNumber?: true
    qrCode?: true
    qrValidUntil?: true
    walkIn?: true
    notes?: true
    wid?: true
    _all?: true
  }

  export type VisitorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Visitor to aggregate.
     */
    where?: VisitorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Visitors to fetch.
     */
    orderBy?: VisitorOrderByWithRelationInput | VisitorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VisitorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Visitors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Visitors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Visitors
    **/
    _count?: true | VisitorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VisitorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VisitorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VisitorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VisitorMaxAggregateInputType
  }

  export type GetVisitorAggregateType<T extends VisitorAggregateArgs> = {
        [P in keyof T & keyof AggregateVisitor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVisitor[P]>
      : GetScalarType<T[P], AggregateVisitor[P]>
  }




  export type VisitorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VisitorWhereInput
    orderBy?: VisitorOrderByWithAggregationInput | VisitorOrderByWithAggregationInput[]
    by: VisitorScalarFieldEnum[] | VisitorScalarFieldEnum
    having?: VisitorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VisitorCountAggregateInputType | true
    _avg?: VisitorAvgAggregateInputType
    _sum?: VisitorSumAggregateInputType
    _min?: VisitorMinAggregateInputType
    _max?: VisitorMaxAggregateInputType
  }

  export type VisitorGroupByOutputType = {
    id: string
    name: string
    email: string
    phone: string
    company: string | null
    purpose: string
    status: string
    hostId: string
    hostName: string
    checkedInAt: Date | null
    checkedOutAt: Date | null
    preRegisteredAt: Date
    idProofType: string | null
    idProofNumber: string | null
    badgeNumber: string | null
    qrCode: string | null
    qrValidUntil: Date | null
    walkIn: boolean
    notes: string | null
    wid: number
    _count: VisitorCountAggregateOutputType | null
    _avg: VisitorAvgAggregateOutputType | null
    _sum: VisitorSumAggregateOutputType | null
    _min: VisitorMinAggregateOutputType | null
    _max: VisitorMaxAggregateOutputType | null
  }

  type GetVisitorGroupByPayload<T extends VisitorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VisitorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VisitorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VisitorGroupByOutputType[P]>
            : GetScalarType<T[P], VisitorGroupByOutputType[P]>
        }
      >
    >


  export type VisitorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    company?: boolean
    purpose?: boolean
    status?: boolean
    hostId?: boolean
    hostName?: boolean
    checkedInAt?: boolean
    checkedOutAt?: boolean
    preRegisteredAt?: boolean
    idProofType?: boolean
    idProofNumber?: boolean
    badgeNumber?: boolean
    qrCode?: boolean
    qrValidUntil?: boolean
    walkIn?: boolean
    notes?: boolean
    wid?: boolean
    host?: boolean | ProfileDefaultArgs<ExtArgs>
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["visitor"]>

  export type VisitorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    company?: boolean
    purpose?: boolean
    status?: boolean
    hostId?: boolean
    hostName?: boolean
    checkedInAt?: boolean
    checkedOutAt?: boolean
    preRegisteredAt?: boolean
    idProofType?: boolean
    idProofNumber?: boolean
    badgeNumber?: boolean
    qrCode?: boolean
    qrValidUntil?: boolean
    walkIn?: boolean
    notes?: boolean
    wid?: boolean
    host?: boolean | ProfileDefaultArgs<ExtArgs>
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["visitor"]>

  export type VisitorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    company?: boolean
    purpose?: boolean
    status?: boolean
    hostId?: boolean
    hostName?: boolean
    checkedInAt?: boolean
    checkedOutAt?: boolean
    preRegisteredAt?: boolean
    idProofType?: boolean
    idProofNumber?: boolean
    badgeNumber?: boolean
    qrCode?: boolean
    qrValidUntil?: boolean
    walkIn?: boolean
    notes?: boolean
    wid?: boolean
    host?: boolean | ProfileDefaultArgs<ExtArgs>
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["visitor"]>

  export type VisitorSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    company?: boolean
    purpose?: boolean
    status?: boolean
    hostId?: boolean
    hostName?: boolean
    checkedInAt?: boolean
    checkedOutAt?: boolean
    preRegisteredAt?: boolean
    idProofType?: boolean
    idProofNumber?: boolean
    badgeNumber?: boolean
    qrCode?: boolean
    qrValidUntil?: boolean
    walkIn?: boolean
    notes?: boolean
    wid?: boolean
  }

  export type VisitorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "phone" | "company" | "purpose" | "status" | "hostId" | "hostName" | "checkedInAt" | "checkedOutAt" | "preRegisteredAt" | "idProofType" | "idProofNumber" | "badgeNumber" | "qrCode" | "qrValidUntil" | "walkIn" | "notes" | "wid", ExtArgs["result"]["visitor"]>
  export type VisitorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    host?: boolean | ProfileDefaultArgs<ExtArgs>
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }
  export type VisitorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    host?: boolean | ProfileDefaultArgs<ExtArgs>
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }
  export type VisitorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    host?: boolean | ProfileDefaultArgs<ExtArgs>
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }

  export type $VisitorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Visitor"
    objects: {
      host: Prisma.$ProfilePayload<ExtArgs>
      workspace: Prisma.$WorkspacePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      phone: string
      company: string | null
      purpose: string
      status: string
      hostId: string
      hostName: string
      checkedInAt: Date | null
      checkedOutAt: Date | null
      preRegisteredAt: Date
      idProofType: string | null
      idProofNumber: string | null
      badgeNumber: string | null
      qrCode: string | null
      qrValidUntil: Date | null
      walkIn: boolean
      notes: string | null
      wid: number
    }, ExtArgs["result"]["visitor"]>
    composites: {}
  }

  type VisitorGetPayload<S extends boolean | null | undefined | VisitorDefaultArgs> = $Result.GetResult<Prisma.$VisitorPayload, S>

  type VisitorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VisitorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VisitorCountAggregateInputType | true
    }

  export interface VisitorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Visitor'], meta: { name: 'Visitor' } }
    /**
     * Find zero or one Visitor that matches the filter.
     * @param {VisitorFindUniqueArgs} args - Arguments to find a Visitor
     * @example
     * // Get one Visitor
     * const visitor = await prisma.visitor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VisitorFindUniqueArgs>(args: SelectSubset<T, VisitorFindUniqueArgs<ExtArgs>>): Prisma__VisitorClient<$Result.GetResult<Prisma.$VisitorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Visitor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VisitorFindUniqueOrThrowArgs} args - Arguments to find a Visitor
     * @example
     * // Get one Visitor
     * const visitor = await prisma.visitor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VisitorFindUniqueOrThrowArgs>(args: SelectSubset<T, VisitorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VisitorClient<$Result.GetResult<Prisma.$VisitorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Visitor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitorFindFirstArgs} args - Arguments to find a Visitor
     * @example
     * // Get one Visitor
     * const visitor = await prisma.visitor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VisitorFindFirstArgs>(args?: SelectSubset<T, VisitorFindFirstArgs<ExtArgs>>): Prisma__VisitorClient<$Result.GetResult<Prisma.$VisitorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Visitor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitorFindFirstOrThrowArgs} args - Arguments to find a Visitor
     * @example
     * // Get one Visitor
     * const visitor = await prisma.visitor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VisitorFindFirstOrThrowArgs>(args?: SelectSubset<T, VisitorFindFirstOrThrowArgs<ExtArgs>>): Prisma__VisitorClient<$Result.GetResult<Prisma.$VisitorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Visitors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Visitors
     * const visitors = await prisma.visitor.findMany()
     * 
     * // Get first 10 Visitors
     * const visitors = await prisma.visitor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const visitorWithIdOnly = await prisma.visitor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VisitorFindManyArgs>(args?: SelectSubset<T, VisitorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VisitorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Visitor.
     * @param {VisitorCreateArgs} args - Arguments to create a Visitor.
     * @example
     * // Create one Visitor
     * const Visitor = await prisma.visitor.create({
     *   data: {
     *     // ... data to create a Visitor
     *   }
     * })
     * 
     */
    create<T extends VisitorCreateArgs>(args: SelectSubset<T, VisitorCreateArgs<ExtArgs>>): Prisma__VisitorClient<$Result.GetResult<Prisma.$VisitorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Visitors.
     * @param {VisitorCreateManyArgs} args - Arguments to create many Visitors.
     * @example
     * // Create many Visitors
     * const visitor = await prisma.visitor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VisitorCreateManyArgs>(args?: SelectSubset<T, VisitorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Visitors and returns the data saved in the database.
     * @param {VisitorCreateManyAndReturnArgs} args - Arguments to create many Visitors.
     * @example
     * // Create many Visitors
     * const visitor = await prisma.visitor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Visitors and only return the `id`
     * const visitorWithIdOnly = await prisma.visitor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VisitorCreateManyAndReturnArgs>(args?: SelectSubset<T, VisitorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VisitorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Visitor.
     * @param {VisitorDeleteArgs} args - Arguments to delete one Visitor.
     * @example
     * // Delete one Visitor
     * const Visitor = await prisma.visitor.delete({
     *   where: {
     *     // ... filter to delete one Visitor
     *   }
     * })
     * 
     */
    delete<T extends VisitorDeleteArgs>(args: SelectSubset<T, VisitorDeleteArgs<ExtArgs>>): Prisma__VisitorClient<$Result.GetResult<Prisma.$VisitorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Visitor.
     * @param {VisitorUpdateArgs} args - Arguments to update one Visitor.
     * @example
     * // Update one Visitor
     * const visitor = await prisma.visitor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VisitorUpdateArgs>(args: SelectSubset<T, VisitorUpdateArgs<ExtArgs>>): Prisma__VisitorClient<$Result.GetResult<Prisma.$VisitorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Visitors.
     * @param {VisitorDeleteManyArgs} args - Arguments to filter Visitors to delete.
     * @example
     * // Delete a few Visitors
     * const { count } = await prisma.visitor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VisitorDeleteManyArgs>(args?: SelectSubset<T, VisitorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Visitors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Visitors
     * const visitor = await prisma.visitor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VisitorUpdateManyArgs>(args: SelectSubset<T, VisitorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Visitors and returns the data updated in the database.
     * @param {VisitorUpdateManyAndReturnArgs} args - Arguments to update many Visitors.
     * @example
     * // Update many Visitors
     * const visitor = await prisma.visitor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Visitors and only return the `id`
     * const visitorWithIdOnly = await prisma.visitor.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VisitorUpdateManyAndReturnArgs>(args: SelectSubset<T, VisitorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VisitorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Visitor.
     * @param {VisitorUpsertArgs} args - Arguments to update or create a Visitor.
     * @example
     * // Update or create a Visitor
     * const visitor = await prisma.visitor.upsert({
     *   create: {
     *     // ... data to create a Visitor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Visitor we want to update
     *   }
     * })
     */
    upsert<T extends VisitorUpsertArgs>(args: SelectSubset<T, VisitorUpsertArgs<ExtArgs>>): Prisma__VisitorClient<$Result.GetResult<Prisma.$VisitorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Visitors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitorCountArgs} args - Arguments to filter Visitors to count.
     * @example
     * // Count the number of Visitors
     * const count = await prisma.visitor.count({
     *   where: {
     *     // ... the filter for the Visitors we want to count
     *   }
     * })
    **/
    count<T extends VisitorCountArgs>(
      args?: Subset<T, VisitorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VisitorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Visitor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VisitorAggregateArgs>(args: Subset<T, VisitorAggregateArgs>): Prisma.PrismaPromise<GetVisitorAggregateType<T>>

    /**
     * Group by Visitor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VisitorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VisitorGroupByArgs['orderBy'] }
        : { orderBy?: VisitorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VisitorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVisitorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Visitor model
   */
  readonly fields: VisitorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Visitor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VisitorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    host<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    workspace<T extends WorkspaceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkspaceDefaultArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Visitor model
   */
  interface VisitorFieldRefs {
    readonly id: FieldRef<"Visitor", 'String'>
    readonly name: FieldRef<"Visitor", 'String'>
    readonly email: FieldRef<"Visitor", 'String'>
    readonly phone: FieldRef<"Visitor", 'String'>
    readonly company: FieldRef<"Visitor", 'String'>
    readonly purpose: FieldRef<"Visitor", 'String'>
    readonly status: FieldRef<"Visitor", 'String'>
    readonly hostId: FieldRef<"Visitor", 'String'>
    readonly hostName: FieldRef<"Visitor", 'String'>
    readonly checkedInAt: FieldRef<"Visitor", 'DateTime'>
    readonly checkedOutAt: FieldRef<"Visitor", 'DateTime'>
    readonly preRegisteredAt: FieldRef<"Visitor", 'DateTime'>
    readonly idProofType: FieldRef<"Visitor", 'String'>
    readonly idProofNumber: FieldRef<"Visitor", 'String'>
    readonly badgeNumber: FieldRef<"Visitor", 'String'>
    readonly qrCode: FieldRef<"Visitor", 'String'>
    readonly qrValidUntil: FieldRef<"Visitor", 'DateTime'>
    readonly walkIn: FieldRef<"Visitor", 'Boolean'>
    readonly notes: FieldRef<"Visitor", 'String'>
    readonly wid: FieldRef<"Visitor", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Visitor findUnique
   */
  export type VisitorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visitor
     */
    select?: VisitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Visitor
     */
    omit?: VisitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitorInclude<ExtArgs> | null
    /**
     * Filter, which Visitor to fetch.
     */
    where: VisitorWhereUniqueInput
  }

  /**
   * Visitor findUniqueOrThrow
   */
  export type VisitorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visitor
     */
    select?: VisitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Visitor
     */
    omit?: VisitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitorInclude<ExtArgs> | null
    /**
     * Filter, which Visitor to fetch.
     */
    where: VisitorWhereUniqueInput
  }

  /**
   * Visitor findFirst
   */
  export type VisitorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visitor
     */
    select?: VisitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Visitor
     */
    omit?: VisitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitorInclude<ExtArgs> | null
    /**
     * Filter, which Visitor to fetch.
     */
    where?: VisitorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Visitors to fetch.
     */
    orderBy?: VisitorOrderByWithRelationInput | VisitorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Visitors.
     */
    cursor?: VisitorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Visitors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Visitors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Visitors.
     */
    distinct?: VisitorScalarFieldEnum | VisitorScalarFieldEnum[]
  }

  /**
   * Visitor findFirstOrThrow
   */
  export type VisitorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visitor
     */
    select?: VisitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Visitor
     */
    omit?: VisitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitorInclude<ExtArgs> | null
    /**
     * Filter, which Visitor to fetch.
     */
    where?: VisitorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Visitors to fetch.
     */
    orderBy?: VisitorOrderByWithRelationInput | VisitorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Visitors.
     */
    cursor?: VisitorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Visitors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Visitors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Visitors.
     */
    distinct?: VisitorScalarFieldEnum | VisitorScalarFieldEnum[]
  }

  /**
   * Visitor findMany
   */
  export type VisitorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visitor
     */
    select?: VisitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Visitor
     */
    omit?: VisitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitorInclude<ExtArgs> | null
    /**
     * Filter, which Visitors to fetch.
     */
    where?: VisitorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Visitors to fetch.
     */
    orderBy?: VisitorOrderByWithRelationInput | VisitorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Visitors.
     */
    cursor?: VisitorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Visitors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Visitors.
     */
    skip?: number
    distinct?: VisitorScalarFieldEnum | VisitorScalarFieldEnum[]
  }

  /**
   * Visitor create
   */
  export type VisitorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visitor
     */
    select?: VisitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Visitor
     */
    omit?: VisitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitorInclude<ExtArgs> | null
    /**
     * The data needed to create a Visitor.
     */
    data: XOR<VisitorCreateInput, VisitorUncheckedCreateInput>
  }

  /**
   * Visitor createMany
   */
  export type VisitorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Visitors.
     */
    data: VisitorCreateManyInput | VisitorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Visitor createManyAndReturn
   */
  export type VisitorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visitor
     */
    select?: VisitorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Visitor
     */
    omit?: VisitorOmit<ExtArgs> | null
    /**
     * The data used to create many Visitors.
     */
    data: VisitorCreateManyInput | VisitorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Visitor update
   */
  export type VisitorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visitor
     */
    select?: VisitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Visitor
     */
    omit?: VisitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitorInclude<ExtArgs> | null
    /**
     * The data needed to update a Visitor.
     */
    data: XOR<VisitorUpdateInput, VisitorUncheckedUpdateInput>
    /**
     * Choose, which Visitor to update.
     */
    where: VisitorWhereUniqueInput
  }

  /**
   * Visitor updateMany
   */
  export type VisitorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Visitors.
     */
    data: XOR<VisitorUpdateManyMutationInput, VisitorUncheckedUpdateManyInput>
    /**
     * Filter which Visitors to update
     */
    where?: VisitorWhereInput
    /**
     * Limit how many Visitors to update.
     */
    limit?: number
  }

  /**
   * Visitor updateManyAndReturn
   */
  export type VisitorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visitor
     */
    select?: VisitorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Visitor
     */
    omit?: VisitorOmit<ExtArgs> | null
    /**
     * The data used to update Visitors.
     */
    data: XOR<VisitorUpdateManyMutationInput, VisitorUncheckedUpdateManyInput>
    /**
     * Filter which Visitors to update
     */
    where?: VisitorWhereInput
    /**
     * Limit how many Visitors to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Visitor upsert
   */
  export type VisitorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visitor
     */
    select?: VisitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Visitor
     */
    omit?: VisitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitorInclude<ExtArgs> | null
    /**
     * The filter to search for the Visitor to update in case it exists.
     */
    where: VisitorWhereUniqueInput
    /**
     * In case the Visitor found by the `where` argument doesn't exist, create a new Visitor with this data.
     */
    create: XOR<VisitorCreateInput, VisitorUncheckedCreateInput>
    /**
     * In case the Visitor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VisitorUpdateInput, VisitorUncheckedUpdateInput>
  }

  /**
   * Visitor delete
   */
  export type VisitorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visitor
     */
    select?: VisitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Visitor
     */
    omit?: VisitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitorInclude<ExtArgs> | null
    /**
     * Filter which Visitor to delete.
     */
    where: VisitorWhereUniqueInput
  }

  /**
   * Visitor deleteMany
   */
  export type VisitorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Visitors to delete
     */
    where?: VisitorWhereInput
    /**
     * Limit how many Visitors to delete.
     */
    limit?: number
  }

  /**
   * Visitor without action
   */
  export type VisitorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visitor
     */
    select?: VisitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Visitor
     */
    omit?: VisitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitorInclude<ExtArgs> | null
  }


  /**
   * Model Subscription
   */

  export type AggregateSubscription = {
    _count: SubscriptionCountAggregateOutputType | null
    _avg: SubscriptionAvgAggregateOutputType | null
    _sum: SubscriptionSumAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  export type SubscriptionAvgAggregateOutputType = {
    wid: number | null
    amount: number | null
  }

  export type SubscriptionSumAggregateOutputType = {
    wid: number | null
    amount: number | null
  }

  export type SubscriptionMinAggregateOutputType = {
    id: string | null
    wid: number | null
    plan: string | null
    status: string | null
    amount: number | null
    currency: string | null
    region: string | null
    currentPeriodStart: Date | null
    currentPeriodEnd: Date | null
    cancelledAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriptionMaxAggregateOutputType = {
    id: string | null
    wid: number | null
    plan: string | null
    status: string | null
    amount: number | null
    currency: string | null
    region: string | null
    currentPeriodStart: Date | null
    currentPeriodEnd: Date | null
    cancelledAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriptionCountAggregateOutputType = {
    id: number
    wid: number
    plan: number
    status: number
    amount: number
    currency: number
    region: number
    currentPeriodStart: number
    currentPeriodEnd: number
    cancelledAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SubscriptionAvgAggregateInputType = {
    wid?: true
    amount?: true
  }

  export type SubscriptionSumAggregateInputType = {
    wid?: true
    amount?: true
  }

  export type SubscriptionMinAggregateInputType = {
    id?: true
    wid?: true
    plan?: true
    status?: true
    amount?: true
    currency?: true
    region?: true
    currentPeriodStart?: true
    currentPeriodEnd?: true
    cancelledAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriptionMaxAggregateInputType = {
    id?: true
    wid?: true
    plan?: true
    status?: true
    amount?: true
    currency?: true
    region?: true
    currentPeriodStart?: true
    currentPeriodEnd?: true
    cancelledAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriptionCountAggregateInputType = {
    id?: true
    wid?: true
    plan?: true
    status?: true
    amount?: true
    currency?: true
    region?: true
    currentPeriodStart?: true
    currentPeriodEnd?: true
    cancelledAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SubscriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscription to aggregate.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subscriptions
    **/
    _count?: true | SubscriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubscriptionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubscriptionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscriptionMaxAggregateInputType
  }

  export type GetSubscriptionAggregateType<T extends SubscriptionAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscription[P]>
      : GetScalarType<T[P], AggregateSubscription[P]>
  }




  export type SubscriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
    orderBy?: SubscriptionOrderByWithAggregationInput | SubscriptionOrderByWithAggregationInput[]
    by: SubscriptionScalarFieldEnum[] | SubscriptionScalarFieldEnum
    having?: SubscriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscriptionCountAggregateInputType | true
    _avg?: SubscriptionAvgAggregateInputType
    _sum?: SubscriptionSumAggregateInputType
    _min?: SubscriptionMinAggregateInputType
    _max?: SubscriptionMaxAggregateInputType
  }

  export type SubscriptionGroupByOutputType = {
    id: string
    wid: number
    plan: string
    status: string
    amount: number
    currency: string
    region: string
    currentPeriodStart: Date | null
    currentPeriodEnd: Date | null
    cancelledAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: SubscriptionCountAggregateOutputType | null
    _avg: SubscriptionAvgAggregateOutputType | null
    _sum: SubscriptionSumAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  type GetSubscriptionGroupByPayload<T extends SubscriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
            : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
        }
      >
    >


  export type SubscriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    wid?: boolean
    plan?: boolean
    status?: boolean
    amount?: boolean
    currency?: boolean
    region?: boolean
    currentPeriodStart?: boolean
    currentPeriodEnd?: boolean
    cancelledAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    transactions?: boolean | Subscription$transactionsArgs<ExtArgs>
    _count?: boolean | SubscriptionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    wid?: boolean
    plan?: boolean
    status?: boolean
    amount?: boolean
    currency?: boolean
    region?: boolean
    currentPeriodStart?: boolean
    currentPeriodEnd?: boolean
    cancelledAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    wid?: boolean
    plan?: boolean
    status?: boolean
    amount?: boolean
    currency?: boolean
    region?: boolean
    currentPeriodStart?: boolean
    currentPeriodEnd?: boolean
    cancelledAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectScalar = {
    id?: boolean
    wid?: boolean
    plan?: boolean
    status?: boolean
    amount?: boolean
    currency?: boolean
    region?: boolean
    currentPeriodStart?: boolean
    currentPeriodEnd?: boolean
    cancelledAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SubscriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "wid" | "plan" | "status" | "amount" | "currency" | "region" | "currentPeriodStart" | "currentPeriodEnd" | "cancelledAt" | "createdAt" | "updatedAt", ExtArgs["result"]["subscription"]>
  export type SubscriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    transactions?: boolean | Subscription$transactionsArgs<ExtArgs>
    _count?: boolean | SubscriptionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SubscriptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }
  export type SubscriptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }

  export type $SubscriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subscription"
    objects: {
      workspace: Prisma.$WorkspacePayload<ExtArgs>
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      wid: number
      plan: string
      status: string
      amount: number
      currency: string
      region: string
      currentPeriodStart: Date | null
      currentPeriodEnd: Date | null
      cancelledAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["subscription"]>
    composites: {}
  }

  type SubscriptionGetPayload<S extends boolean | null | undefined | SubscriptionDefaultArgs> = $Result.GetResult<Prisma.$SubscriptionPayload, S>

  type SubscriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubscriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubscriptionCountAggregateInputType | true
    }

  export interface SubscriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subscription'], meta: { name: 'Subscription' } }
    /**
     * Find zero or one Subscription that matches the filter.
     * @param {SubscriptionFindUniqueArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubscriptionFindUniqueArgs>(args: SelectSubset<T, SubscriptionFindUniqueArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subscription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubscriptionFindUniqueOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubscriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, SubscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubscriptionFindFirstArgs>(args?: SelectSubset<T, SubscriptionFindFirstArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubscriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, SubscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subscriptions
     * const subscriptions = await prisma.subscription.findMany()
     * 
     * // Get first 10 Subscriptions
     * const subscriptions = await prisma.subscription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubscriptionFindManyArgs>(args?: SelectSubset<T, SubscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subscription.
     * @param {SubscriptionCreateArgs} args - Arguments to create a Subscription.
     * @example
     * // Create one Subscription
     * const Subscription = await prisma.subscription.create({
     *   data: {
     *     // ... data to create a Subscription
     *   }
     * })
     * 
     */
    create<T extends SubscriptionCreateArgs>(args: SelectSubset<T, SubscriptionCreateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subscriptions.
     * @param {SubscriptionCreateManyArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscription = await prisma.subscription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubscriptionCreateManyArgs>(args?: SelectSubset<T, SubscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subscriptions and returns the data saved in the database.
     * @param {SubscriptionCreateManyAndReturnArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscription = await prisma.subscription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subscriptions and only return the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubscriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, SubscriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subscription.
     * @param {SubscriptionDeleteArgs} args - Arguments to delete one Subscription.
     * @example
     * // Delete one Subscription
     * const Subscription = await prisma.subscription.delete({
     *   where: {
     *     // ... filter to delete one Subscription
     *   }
     * })
     * 
     */
    delete<T extends SubscriptionDeleteArgs>(args: SelectSubset<T, SubscriptionDeleteArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subscription.
     * @param {SubscriptionUpdateArgs} args - Arguments to update one Subscription.
     * @example
     * // Update one Subscription
     * const subscription = await prisma.subscription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubscriptionUpdateArgs>(args: SelectSubset<T, SubscriptionUpdateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subscriptions.
     * @param {SubscriptionDeleteManyArgs} args - Arguments to filter Subscriptions to delete.
     * @example
     * // Delete a few Subscriptions
     * const { count } = await prisma.subscription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubscriptionDeleteManyArgs>(args?: SelectSubset<T, SubscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subscriptions
     * const subscription = await prisma.subscription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubscriptionUpdateManyArgs>(args: SelectSubset<T, SubscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions and returns the data updated in the database.
     * @param {SubscriptionUpdateManyAndReturnArgs} args - Arguments to update many Subscriptions.
     * @example
     * // Update many Subscriptions
     * const subscription = await prisma.subscription.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subscriptions and only return the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubscriptionUpdateManyAndReturnArgs>(args: SelectSubset<T, SubscriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subscription.
     * @param {SubscriptionUpsertArgs} args - Arguments to update or create a Subscription.
     * @example
     * // Update or create a Subscription
     * const subscription = await prisma.subscription.upsert({
     *   create: {
     *     // ... data to create a Subscription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subscription we want to update
     *   }
     * })
     */
    upsert<T extends SubscriptionUpsertArgs>(args: SelectSubset<T, SubscriptionUpsertArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionCountArgs} args - Arguments to filter Subscriptions to count.
     * @example
     * // Count the number of Subscriptions
     * const count = await prisma.subscription.count({
     *   where: {
     *     // ... the filter for the Subscriptions we want to count
     *   }
     * })
    **/
    count<T extends SubscriptionCountArgs>(
      args?: Subset<T, SubscriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubscriptionAggregateArgs>(args: Subset<T, SubscriptionAggregateArgs>): Prisma.PrismaPromise<GetSubscriptionAggregateType<T>>

    /**
     * Group by Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubscriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubscriptionGroupByArgs['orderBy'] }
        : { orderBy?: SubscriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subscription model
   */
  readonly fields: SubscriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subscription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubscriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    workspace<T extends WorkspaceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkspaceDefaultArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    transactions<T extends Subscription$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, Subscription$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Subscription model
   */
  interface SubscriptionFieldRefs {
    readonly id: FieldRef<"Subscription", 'String'>
    readonly wid: FieldRef<"Subscription", 'Int'>
    readonly plan: FieldRef<"Subscription", 'String'>
    readonly status: FieldRef<"Subscription", 'String'>
    readonly amount: FieldRef<"Subscription", 'Int'>
    readonly currency: FieldRef<"Subscription", 'String'>
    readonly region: FieldRef<"Subscription", 'String'>
    readonly currentPeriodStart: FieldRef<"Subscription", 'DateTime'>
    readonly currentPeriodEnd: FieldRef<"Subscription", 'DateTime'>
    readonly cancelledAt: FieldRef<"Subscription", 'DateTime'>
    readonly createdAt: FieldRef<"Subscription", 'DateTime'>
    readonly updatedAt: FieldRef<"Subscription", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Subscription findUnique
   */
  export type SubscriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findUniqueOrThrow
   */
  export type SubscriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findFirst
   */
  export type SubscriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findFirstOrThrow
   */
  export type SubscriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findMany
   */
  export type SubscriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscriptions to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription create
   */
  export type SubscriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a Subscription.
     */
    data: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
  }

  /**
   * Subscription createMany
   */
  export type SubscriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subscriptions.
     */
    data: SubscriptionCreateManyInput | SubscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subscription createManyAndReturn
   */
  export type SubscriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * The data used to create many Subscriptions.
     */
    data: SubscriptionCreateManyInput | SubscriptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subscription update
   */
  export type SubscriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a Subscription.
     */
    data: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
    /**
     * Choose, which Subscription to update.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription updateMany
   */
  export type SubscriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subscriptions.
     */
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Subscriptions to update
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to update.
     */
    limit?: number
  }

  /**
   * Subscription updateManyAndReturn
   */
  export type SubscriptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * The data used to update Subscriptions.
     */
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Subscriptions to update
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subscription upsert
   */
  export type SubscriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the Subscription to update in case it exists.
     */
    where: SubscriptionWhereUniqueInput
    /**
     * In case the Subscription found by the `where` argument doesn't exist, create a new Subscription with this data.
     */
    create: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
    /**
     * In case the Subscription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
  }

  /**
   * Subscription delete
   */
  export type SubscriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter which Subscription to delete.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription deleteMany
   */
  export type SubscriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscriptions to delete
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to delete.
     */
    limit?: number
  }

  /**
   * Subscription.transactions
   */
  export type Subscription$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Subscription without action
   */
  export type SubscriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
  }


  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    wid: number | null
    amount: number | null
  }

  export type TransactionSumAggregateOutputType = {
    wid: number | null
    amount: number | null
  }

  export type TransactionMinAggregateOutputType = {
    id: string | null
    wid: number | null
    subscriptionId: string | null
    razorpayOrderId: string | null
    razorpayPaymentId: string | null
    amount: number | null
    currency: string | null
    region: string | null
    status: string | null
    failureReason: string | null
    createdAt: Date | null
    verifiedAt: Date | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: string | null
    wid: number | null
    subscriptionId: string | null
    razorpayOrderId: string | null
    razorpayPaymentId: string | null
    amount: number | null
    currency: string | null
    region: string | null
    status: string | null
    failureReason: string | null
    createdAt: Date | null
    verifiedAt: Date | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    wid: number
    subscriptionId: number
    razorpayOrderId: number
    razorpayPaymentId: number
    amount: number
    currency: number
    region: number
    status: number
    failureReason: number
    createdAt: number
    verifiedAt: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    wid?: true
    amount?: true
  }

  export type TransactionSumAggregateInputType = {
    wid?: true
    amount?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    wid?: true
    subscriptionId?: true
    razorpayOrderId?: true
    razorpayPaymentId?: true
    amount?: true
    currency?: true
    region?: true
    status?: true
    failureReason?: true
    createdAt?: true
    verifiedAt?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    wid?: true
    subscriptionId?: true
    razorpayOrderId?: true
    razorpayPaymentId?: true
    amount?: true
    currency?: true
    region?: true
    status?: true
    failureReason?: true
    createdAt?: true
    verifiedAt?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    wid?: true
    subscriptionId?: true
    razorpayOrderId?: true
    razorpayPaymentId?: true
    amount?: true
    currency?: true
    region?: true
    status?: true
    failureReason?: true
    createdAt?: true
    verifiedAt?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: string
    wid: number
    subscriptionId: string
    razorpayOrderId: string
    razorpayPaymentId: string | null
    amount: number
    currency: string
    region: string
    status: string
    failureReason: string | null
    createdAt: Date
    verifiedAt: Date | null
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    wid?: boolean
    subscriptionId?: boolean
    razorpayOrderId?: boolean
    razorpayPaymentId?: boolean
    amount?: boolean
    currency?: boolean
    region?: boolean
    status?: boolean
    failureReason?: boolean
    createdAt?: boolean
    verifiedAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    subscription?: boolean | SubscriptionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    wid?: boolean
    subscriptionId?: boolean
    razorpayOrderId?: boolean
    razorpayPaymentId?: boolean
    amount?: boolean
    currency?: boolean
    region?: boolean
    status?: boolean
    failureReason?: boolean
    createdAt?: boolean
    verifiedAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    subscription?: boolean | SubscriptionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    wid?: boolean
    subscriptionId?: boolean
    razorpayOrderId?: boolean
    razorpayPaymentId?: boolean
    amount?: boolean
    currency?: boolean
    region?: boolean
    status?: boolean
    failureReason?: boolean
    createdAt?: boolean
    verifiedAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    subscription?: boolean | SubscriptionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectScalar = {
    id?: boolean
    wid?: boolean
    subscriptionId?: boolean
    razorpayOrderId?: boolean
    razorpayPaymentId?: boolean
    amount?: boolean
    currency?: boolean
    region?: boolean
    status?: boolean
    failureReason?: boolean
    createdAt?: boolean
    verifiedAt?: boolean
  }

  export type TransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "wid" | "subscriptionId" | "razorpayOrderId" | "razorpayPaymentId" | "amount" | "currency" | "region" | "status" | "failureReason" | "createdAt" | "verifiedAt", ExtArgs["result"]["transaction"]>
  export type TransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    subscription?: boolean | SubscriptionDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    subscription?: boolean | SubscriptionDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    subscription?: boolean | SubscriptionDefaultArgs<ExtArgs>
  }

  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {
      workspace: Prisma.$WorkspacePayload<ExtArgs>
      subscription: Prisma.$SubscriptionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      wid: number
      subscriptionId: string
      razorpayOrderId: string
      razorpayPaymentId: string | null
      amount: number
      currency: string
      region: string
      status: string
      failureReason: string | null
      createdAt: Date
      verifiedAt: Date | null
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }

  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionFindUniqueArgs>(args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionFindFirstArgs>(args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionFindManyArgs>(args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
     */
    create<T extends TransactionCreateArgs>(args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transactions.
     * @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionCreateManyArgs>(args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transactions and returns the data saved in the database.
     * @param {TransactionCreateManyAndReturnArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, TransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
     */
    delete<T extends TransactionDeleteArgs>(args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionUpdateArgs>(args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionDeleteManyArgs>(args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionUpdateManyArgs>(args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions and returns the data updated in the database.
     * @param {TransactionUpdateManyAndReturnArgs} args - Arguments to update many Transactions.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, TransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends TransactionUpsertArgs>(args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    workspace<T extends WorkspaceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkspaceDefaultArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    subscription<T extends SubscriptionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubscriptionDefaultArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Transaction model
   */
  interface TransactionFieldRefs {
    readonly id: FieldRef<"Transaction", 'String'>
    readonly wid: FieldRef<"Transaction", 'Int'>
    readonly subscriptionId: FieldRef<"Transaction", 'String'>
    readonly razorpayOrderId: FieldRef<"Transaction", 'String'>
    readonly razorpayPaymentId: FieldRef<"Transaction", 'String'>
    readonly amount: FieldRef<"Transaction", 'Int'>
    readonly currency: FieldRef<"Transaction", 'String'>
    readonly region: FieldRef<"Transaction", 'String'>
    readonly status: FieldRef<"Transaction", 'String'>
    readonly failureReason: FieldRef<"Transaction", 'String'>
    readonly createdAt: FieldRef<"Transaction", 'DateTime'>
    readonly verifiedAt: FieldRef<"Transaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }

  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transaction createManyAndReturn
   */
  export type TransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction updateManyAndReturn
   */
  export type TransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }

  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to delete.
     */
    limit?: number
  }

  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
  }


  /**
   * Model PublicRegistrationLink
   */

  export type AggregatePublicRegistrationLink = {
    _count: PublicRegistrationLinkCountAggregateOutputType | null
    _avg: PublicRegistrationLinkAvgAggregateOutputType | null
    _sum: PublicRegistrationLinkSumAggregateOutputType | null
    _min: PublicRegistrationLinkMinAggregateOutputType | null
    _max: PublicRegistrationLinkMaxAggregateOutputType | null
  }

  export type PublicRegistrationLinkAvgAggregateOutputType = {
    wid: number | null
  }

  export type PublicRegistrationLinkSumAggregateOutputType = {
    wid: number | null
  }

  export type PublicRegistrationLinkMinAggregateOutputType = {
    id: string | null
    slug: string | null
    wid: number | null
    hostId: string | null
    officeBranch: string | null
    enabled: boolean | null
    designTheme: string | null
    pageTitle: string | null
    welcomeMessage: string | null
    qrValidityPeriod: string | null
    fieldNameRequired: boolean | null
    fieldPhoneRequired: boolean | null
    fieldEmailRequired: boolean | null
    fieldPurposeRequired: boolean | null
    fieldIdProofRequired: boolean | null
    fieldCompanyEnabled: boolean | null
    fieldCompanyRequired: boolean | null
    fieldNotesEnabled: boolean | null
    fieldNotesRequired: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PublicRegistrationLinkMaxAggregateOutputType = {
    id: string | null
    slug: string | null
    wid: number | null
    hostId: string | null
    officeBranch: string | null
    enabled: boolean | null
    designTheme: string | null
    pageTitle: string | null
    welcomeMessage: string | null
    qrValidityPeriod: string | null
    fieldNameRequired: boolean | null
    fieldPhoneRequired: boolean | null
    fieldEmailRequired: boolean | null
    fieldPurposeRequired: boolean | null
    fieldIdProofRequired: boolean | null
    fieldCompanyEnabled: boolean | null
    fieldCompanyRequired: boolean | null
    fieldNotesEnabled: boolean | null
    fieldNotesRequired: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PublicRegistrationLinkCountAggregateOutputType = {
    id: number
    slug: number
    wid: number
    hostId: number
    officeBranch: number
    enabled: number
    designTheme: number
    pageTitle: number
    welcomeMessage: number
    qrValidityPeriod: number
    fieldNameRequired: number
    fieldPhoneRequired: number
    fieldEmailRequired: number
    fieldPurposeRequired: number
    fieldIdProofRequired: number
    fieldCompanyEnabled: number
    fieldCompanyRequired: number
    fieldNotesEnabled: number
    fieldNotesRequired: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PublicRegistrationLinkAvgAggregateInputType = {
    wid?: true
  }

  export type PublicRegistrationLinkSumAggregateInputType = {
    wid?: true
  }

  export type PublicRegistrationLinkMinAggregateInputType = {
    id?: true
    slug?: true
    wid?: true
    hostId?: true
    officeBranch?: true
    enabled?: true
    designTheme?: true
    pageTitle?: true
    welcomeMessage?: true
    qrValidityPeriod?: true
    fieldNameRequired?: true
    fieldPhoneRequired?: true
    fieldEmailRequired?: true
    fieldPurposeRequired?: true
    fieldIdProofRequired?: true
    fieldCompanyEnabled?: true
    fieldCompanyRequired?: true
    fieldNotesEnabled?: true
    fieldNotesRequired?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PublicRegistrationLinkMaxAggregateInputType = {
    id?: true
    slug?: true
    wid?: true
    hostId?: true
    officeBranch?: true
    enabled?: true
    designTheme?: true
    pageTitle?: true
    welcomeMessage?: true
    qrValidityPeriod?: true
    fieldNameRequired?: true
    fieldPhoneRequired?: true
    fieldEmailRequired?: true
    fieldPurposeRequired?: true
    fieldIdProofRequired?: true
    fieldCompanyEnabled?: true
    fieldCompanyRequired?: true
    fieldNotesEnabled?: true
    fieldNotesRequired?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PublicRegistrationLinkCountAggregateInputType = {
    id?: true
    slug?: true
    wid?: true
    hostId?: true
    officeBranch?: true
    enabled?: true
    designTheme?: true
    pageTitle?: true
    welcomeMessage?: true
    qrValidityPeriod?: true
    fieldNameRequired?: true
    fieldPhoneRequired?: true
    fieldEmailRequired?: true
    fieldPurposeRequired?: true
    fieldIdProofRequired?: true
    fieldCompanyEnabled?: true
    fieldCompanyRequired?: true
    fieldNotesEnabled?: true
    fieldNotesRequired?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PublicRegistrationLinkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PublicRegistrationLink to aggregate.
     */
    where?: PublicRegistrationLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PublicRegistrationLinks to fetch.
     */
    orderBy?: PublicRegistrationLinkOrderByWithRelationInput | PublicRegistrationLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PublicRegistrationLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PublicRegistrationLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PublicRegistrationLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PublicRegistrationLinks
    **/
    _count?: true | PublicRegistrationLinkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PublicRegistrationLinkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PublicRegistrationLinkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PublicRegistrationLinkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PublicRegistrationLinkMaxAggregateInputType
  }

  export type GetPublicRegistrationLinkAggregateType<T extends PublicRegistrationLinkAggregateArgs> = {
        [P in keyof T & keyof AggregatePublicRegistrationLink]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePublicRegistrationLink[P]>
      : GetScalarType<T[P], AggregatePublicRegistrationLink[P]>
  }




  export type PublicRegistrationLinkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PublicRegistrationLinkWhereInput
    orderBy?: PublicRegistrationLinkOrderByWithAggregationInput | PublicRegistrationLinkOrderByWithAggregationInput[]
    by: PublicRegistrationLinkScalarFieldEnum[] | PublicRegistrationLinkScalarFieldEnum
    having?: PublicRegistrationLinkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PublicRegistrationLinkCountAggregateInputType | true
    _avg?: PublicRegistrationLinkAvgAggregateInputType
    _sum?: PublicRegistrationLinkSumAggregateInputType
    _min?: PublicRegistrationLinkMinAggregateInputType
    _max?: PublicRegistrationLinkMaxAggregateInputType
  }

  export type PublicRegistrationLinkGroupByOutputType = {
    id: string
    slug: string
    wid: number
    hostId: string
    officeBranch: string
    enabled: boolean
    designTheme: string
    pageTitle: string | null
    welcomeMessage: string | null
    qrValidityPeriod: string
    fieldNameRequired: boolean
    fieldPhoneRequired: boolean
    fieldEmailRequired: boolean
    fieldPurposeRequired: boolean
    fieldIdProofRequired: boolean
    fieldCompanyEnabled: boolean
    fieldCompanyRequired: boolean
    fieldNotesEnabled: boolean
    fieldNotesRequired: boolean
    createdAt: Date
    updatedAt: Date
    _count: PublicRegistrationLinkCountAggregateOutputType | null
    _avg: PublicRegistrationLinkAvgAggregateOutputType | null
    _sum: PublicRegistrationLinkSumAggregateOutputType | null
    _min: PublicRegistrationLinkMinAggregateOutputType | null
    _max: PublicRegistrationLinkMaxAggregateOutputType | null
  }

  type GetPublicRegistrationLinkGroupByPayload<T extends PublicRegistrationLinkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PublicRegistrationLinkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PublicRegistrationLinkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PublicRegistrationLinkGroupByOutputType[P]>
            : GetScalarType<T[P], PublicRegistrationLinkGroupByOutputType[P]>
        }
      >
    >


  export type PublicRegistrationLinkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    wid?: boolean
    hostId?: boolean
    officeBranch?: boolean
    enabled?: boolean
    designTheme?: boolean
    pageTitle?: boolean
    welcomeMessage?: boolean
    qrValidityPeriod?: boolean
    fieldNameRequired?: boolean
    fieldPhoneRequired?: boolean
    fieldEmailRequired?: boolean
    fieldPurposeRequired?: boolean
    fieldIdProofRequired?: boolean
    fieldCompanyEnabled?: boolean
    fieldCompanyRequired?: boolean
    fieldNotesEnabled?: boolean
    fieldNotesRequired?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    host?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["publicRegistrationLink"]>

  export type PublicRegistrationLinkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    wid?: boolean
    hostId?: boolean
    officeBranch?: boolean
    enabled?: boolean
    designTheme?: boolean
    pageTitle?: boolean
    welcomeMessage?: boolean
    qrValidityPeriod?: boolean
    fieldNameRequired?: boolean
    fieldPhoneRequired?: boolean
    fieldEmailRequired?: boolean
    fieldPurposeRequired?: boolean
    fieldIdProofRequired?: boolean
    fieldCompanyEnabled?: boolean
    fieldCompanyRequired?: boolean
    fieldNotesEnabled?: boolean
    fieldNotesRequired?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    host?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["publicRegistrationLink"]>

  export type PublicRegistrationLinkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    wid?: boolean
    hostId?: boolean
    officeBranch?: boolean
    enabled?: boolean
    designTheme?: boolean
    pageTitle?: boolean
    welcomeMessage?: boolean
    qrValidityPeriod?: boolean
    fieldNameRequired?: boolean
    fieldPhoneRequired?: boolean
    fieldEmailRequired?: boolean
    fieldPurposeRequired?: boolean
    fieldIdProofRequired?: boolean
    fieldCompanyEnabled?: boolean
    fieldCompanyRequired?: boolean
    fieldNotesEnabled?: boolean
    fieldNotesRequired?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    host?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["publicRegistrationLink"]>

  export type PublicRegistrationLinkSelectScalar = {
    id?: boolean
    slug?: boolean
    wid?: boolean
    hostId?: boolean
    officeBranch?: boolean
    enabled?: boolean
    designTheme?: boolean
    pageTitle?: boolean
    welcomeMessage?: boolean
    qrValidityPeriod?: boolean
    fieldNameRequired?: boolean
    fieldPhoneRequired?: boolean
    fieldEmailRequired?: boolean
    fieldPurposeRequired?: boolean
    fieldIdProofRequired?: boolean
    fieldCompanyEnabled?: boolean
    fieldCompanyRequired?: boolean
    fieldNotesEnabled?: boolean
    fieldNotesRequired?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PublicRegistrationLinkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "wid" | "hostId" | "officeBranch" | "enabled" | "designTheme" | "pageTitle" | "welcomeMessage" | "qrValidityPeriod" | "fieldNameRequired" | "fieldPhoneRequired" | "fieldEmailRequired" | "fieldPurposeRequired" | "fieldIdProofRequired" | "fieldCompanyEnabled" | "fieldCompanyRequired" | "fieldNotesEnabled" | "fieldNotesRequired" | "createdAt" | "updatedAt", ExtArgs["result"]["publicRegistrationLink"]>
  export type PublicRegistrationLinkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    host?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type PublicRegistrationLinkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    host?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type PublicRegistrationLinkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    host?: boolean | ProfileDefaultArgs<ExtArgs>
  }

  export type $PublicRegistrationLinkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PublicRegistrationLink"
    objects: {
      workspace: Prisma.$WorkspacePayload<ExtArgs>
      host: Prisma.$ProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      slug: string
      wid: number
      hostId: string
      officeBranch: string
      enabled: boolean
      designTheme: string
      pageTitle: string | null
      welcomeMessage: string | null
      qrValidityPeriod: string
      fieldNameRequired: boolean
      fieldPhoneRequired: boolean
      fieldEmailRequired: boolean
      fieldPurposeRequired: boolean
      fieldIdProofRequired: boolean
      fieldCompanyEnabled: boolean
      fieldCompanyRequired: boolean
      fieldNotesEnabled: boolean
      fieldNotesRequired: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["publicRegistrationLink"]>
    composites: {}
  }

  type PublicRegistrationLinkGetPayload<S extends boolean | null | undefined | PublicRegistrationLinkDefaultArgs> = $Result.GetResult<Prisma.$PublicRegistrationLinkPayload, S>

  type PublicRegistrationLinkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PublicRegistrationLinkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PublicRegistrationLinkCountAggregateInputType | true
    }

  export interface PublicRegistrationLinkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PublicRegistrationLink'], meta: { name: 'PublicRegistrationLink' } }
    /**
     * Find zero or one PublicRegistrationLink that matches the filter.
     * @param {PublicRegistrationLinkFindUniqueArgs} args - Arguments to find a PublicRegistrationLink
     * @example
     * // Get one PublicRegistrationLink
     * const publicRegistrationLink = await prisma.publicRegistrationLink.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PublicRegistrationLinkFindUniqueArgs>(args: SelectSubset<T, PublicRegistrationLinkFindUniqueArgs<ExtArgs>>): Prisma__PublicRegistrationLinkClient<$Result.GetResult<Prisma.$PublicRegistrationLinkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PublicRegistrationLink that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PublicRegistrationLinkFindUniqueOrThrowArgs} args - Arguments to find a PublicRegistrationLink
     * @example
     * // Get one PublicRegistrationLink
     * const publicRegistrationLink = await prisma.publicRegistrationLink.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PublicRegistrationLinkFindUniqueOrThrowArgs>(args: SelectSubset<T, PublicRegistrationLinkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PublicRegistrationLinkClient<$Result.GetResult<Prisma.$PublicRegistrationLinkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PublicRegistrationLink that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicRegistrationLinkFindFirstArgs} args - Arguments to find a PublicRegistrationLink
     * @example
     * // Get one PublicRegistrationLink
     * const publicRegistrationLink = await prisma.publicRegistrationLink.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PublicRegistrationLinkFindFirstArgs>(args?: SelectSubset<T, PublicRegistrationLinkFindFirstArgs<ExtArgs>>): Prisma__PublicRegistrationLinkClient<$Result.GetResult<Prisma.$PublicRegistrationLinkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PublicRegistrationLink that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicRegistrationLinkFindFirstOrThrowArgs} args - Arguments to find a PublicRegistrationLink
     * @example
     * // Get one PublicRegistrationLink
     * const publicRegistrationLink = await prisma.publicRegistrationLink.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PublicRegistrationLinkFindFirstOrThrowArgs>(args?: SelectSubset<T, PublicRegistrationLinkFindFirstOrThrowArgs<ExtArgs>>): Prisma__PublicRegistrationLinkClient<$Result.GetResult<Prisma.$PublicRegistrationLinkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PublicRegistrationLinks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicRegistrationLinkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PublicRegistrationLinks
     * const publicRegistrationLinks = await prisma.publicRegistrationLink.findMany()
     * 
     * // Get first 10 PublicRegistrationLinks
     * const publicRegistrationLinks = await prisma.publicRegistrationLink.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const publicRegistrationLinkWithIdOnly = await prisma.publicRegistrationLink.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PublicRegistrationLinkFindManyArgs>(args?: SelectSubset<T, PublicRegistrationLinkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PublicRegistrationLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PublicRegistrationLink.
     * @param {PublicRegistrationLinkCreateArgs} args - Arguments to create a PublicRegistrationLink.
     * @example
     * // Create one PublicRegistrationLink
     * const PublicRegistrationLink = await prisma.publicRegistrationLink.create({
     *   data: {
     *     // ... data to create a PublicRegistrationLink
     *   }
     * })
     * 
     */
    create<T extends PublicRegistrationLinkCreateArgs>(args: SelectSubset<T, PublicRegistrationLinkCreateArgs<ExtArgs>>): Prisma__PublicRegistrationLinkClient<$Result.GetResult<Prisma.$PublicRegistrationLinkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PublicRegistrationLinks.
     * @param {PublicRegistrationLinkCreateManyArgs} args - Arguments to create many PublicRegistrationLinks.
     * @example
     * // Create many PublicRegistrationLinks
     * const publicRegistrationLink = await prisma.publicRegistrationLink.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PublicRegistrationLinkCreateManyArgs>(args?: SelectSubset<T, PublicRegistrationLinkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PublicRegistrationLinks and returns the data saved in the database.
     * @param {PublicRegistrationLinkCreateManyAndReturnArgs} args - Arguments to create many PublicRegistrationLinks.
     * @example
     * // Create many PublicRegistrationLinks
     * const publicRegistrationLink = await prisma.publicRegistrationLink.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PublicRegistrationLinks and only return the `id`
     * const publicRegistrationLinkWithIdOnly = await prisma.publicRegistrationLink.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PublicRegistrationLinkCreateManyAndReturnArgs>(args?: SelectSubset<T, PublicRegistrationLinkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PublicRegistrationLinkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PublicRegistrationLink.
     * @param {PublicRegistrationLinkDeleteArgs} args - Arguments to delete one PublicRegistrationLink.
     * @example
     * // Delete one PublicRegistrationLink
     * const PublicRegistrationLink = await prisma.publicRegistrationLink.delete({
     *   where: {
     *     // ... filter to delete one PublicRegistrationLink
     *   }
     * })
     * 
     */
    delete<T extends PublicRegistrationLinkDeleteArgs>(args: SelectSubset<T, PublicRegistrationLinkDeleteArgs<ExtArgs>>): Prisma__PublicRegistrationLinkClient<$Result.GetResult<Prisma.$PublicRegistrationLinkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PublicRegistrationLink.
     * @param {PublicRegistrationLinkUpdateArgs} args - Arguments to update one PublicRegistrationLink.
     * @example
     * // Update one PublicRegistrationLink
     * const publicRegistrationLink = await prisma.publicRegistrationLink.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PublicRegistrationLinkUpdateArgs>(args: SelectSubset<T, PublicRegistrationLinkUpdateArgs<ExtArgs>>): Prisma__PublicRegistrationLinkClient<$Result.GetResult<Prisma.$PublicRegistrationLinkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PublicRegistrationLinks.
     * @param {PublicRegistrationLinkDeleteManyArgs} args - Arguments to filter PublicRegistrationLinks to delete.
     * @example
     * // Delete a few PublicRegistrationLinks
     * const { count } = await prisma.publicRegistrationLink.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PublicRegistrationLinkDeleteManyArgs>(args?: SelectSubset<T, PublicRegistrationLinkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PublicRegistrationLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicRegistrationLinkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PublicRegistrationLinks
     * const publicRegistrationLink = await prisma.publicRegistrationLink.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PublicRegistrationLinkUpdateManyArgs>(args: SelectSubset<T, PublicRegistrationLinkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PublicRegistrationLinks and returns the data updated in the database.
     * @param {PublicRegistrationLinkUpdateManyAndReturnArgs} args - Arguments to update many PublicRegistrationLinks.
     * @example
     * // Update many PublicRegistrationLinks
     * const publicRegistrationLink = await prisma.publicRegistrationLink.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PublicRegistrationLinks and only return the `id`
     * const publicRegistrationLinkWithIdOnly = await prisma.publicRegistrationLink.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PublicRegistrationLinkUpdateManyAndReturnArgs>(args: SelectSubset<T, PublicRegistrationLinkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PublicRegistrationLinkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PublicRegistrationLink.
     * @param {PublicRegistrationLinkUpsertArgs} args - Arguments to update or create a PublicRegistrationLink.
     * @example
     * // Update or create a PublicRegistrationLink
     * const publicRegistrationLink = await prisma.publicRegistrationLink.upsert({
     *   create: {
     *     // ... data to create a PublicRegistrationLink
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PublicRegistrationLink we want to update
     *   }
     * })
     */
    upsert<T extends PublicRegistrationLinkUpsertArgs>(args: SelectSubset<T, PublicRegistrationLinkUpsertArgs<ExtArgs>>): Prisma__PublicRegistrationLinkClient<$Result.GetResult<Prisma.$PublicRegistrationLinkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PublicRegistrationLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicRegistrationLinkCountArgs} args - Arguments to filter PublicRegistrationLinks to count.
     * @example
     * // Count the number of PublicRegistrationLinks
     * const count = await prisma.publicRegistrationLink.count({
     *   where: {
     *     // ... the filter for the PublicRegistrationLinks we want to count
     *   }
     * })
    **/
    count<T extends PublicRegistrationLinkCountArgs>(
      args?: Subset<T, PublicRegistrationLinkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PublicRegistrationLinkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PublicRegistrationLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicRegistrationLinkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PublicRegistrationLinkAggregateArgs>(args: Subset<T, PublicRegistrationLinkAggregateArgs>): Prisma.PrismaPromise<GetPublicRegistrationLinkAggregateType<T>>

    /**
     * Group by PublicRegistrationLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicRegistrationLinkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PublicRegistrationLinkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PublicRegistrationLinkGroupByArgs['orderBy'] }
        : { orderBy?: PublicRegistrationLinkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PublicRegistrationLinkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPublicRegistrationLinkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PublicRegistrationLink model
   */
  readonly fields: PublicRegistrationLinkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PublicRegistrationLink.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PublicRegistrationLinkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    workspace<T extends WorkspaceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkspaceDefaultArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    host<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PublicRegistrationLink model
   */
  interface PublicRegistrationLinkFieldRefs {
    readonly id: FieldRef<"PublicRegistrationLink", 'String'>
    readonly slug: FieldRef<"PublicRegistrationLink", 'String'>
    readonly wid: FieldRef<"PublicRegistrationLink", 'Int'>
    readonly hostId: FieldRef<"PublicRegistrationLink", 'String'>
    readonly officeBranch: FieldRef<"PublicRegistrationLink", 'String'>
    readonly enabled: FieldRef<"PublicRegistrationLink", 'Boolean'>
    readonly designTheme: FieldRef<"PublicRegistrationLink", 'String'>
    readonly pageTitle: FieldRef<"PublicRegistrationLink", 'String'>
    readonly welcomeMessage: FieldRef<"PublicRegistrationLink", 'String'>
    readonly qrValidityPeriod: FieldRef<"PublicRegistrationLink", 'String'>
    readonly fieldNameRequired: FieldRef<"PublicRegistrationLink", 'Boolean'>
    readonly fieldPhoneRequired: FieldRef<"PublicRegistrationLink", 'Boolean'>
    readonly fieldEmailRequired: FieldRef<"PublicRegistrationLink", 'Boolean'>
    readonly fieldPurposeRequired: FieldRef<"PublicRegistrationLink", 'Boolean'>
    readonly fieldIdProofRequired: FieldRef<"PublicRegistrationLink", 'Boolean'>
    readonly fieldCompanyEnabled: FieldRef<"PublicRegistrationLink", 'Boolean'>
    readonly fieldCompanyRequired: FieldRef<"PublicRegistrationLink", 'Boolean'>
    readonly fieldNotesEnabled: FieldRef<"PublicRegistrationLink", 'Boolean'>
    readonly fieldNotesRequired: FieldRef<"PublicRegistrationLink", 'Boolean'>
    readonly createdAt: FieldRef<"PublicRegistrationLink", 'DateTime'>
    readonly updatedAt: FieldRef<"PublicRegistrationLink", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PublicRegistrationLink findUnique
   */
  export type PublicRegistrationLinkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicRegistrationLink
     */
    select?: PublicRegistrationLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicRegistrationLink
     */
    omit?: PublicRegistrationLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicRegistrationLinkInclude<ExtArgs> | null
    /**
     * Filter, which PublicRegistrationLink to fetch.
     */
    where: PublicRegistrationLinkWhereUniqueInput
  }

  /**
   * PublicRegistrationLink findUniqueOrThrow
   */
  export type PublicRegistrationLinkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicRegistrationLink
     */
    select?: PublicRegistrationLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicRegistrationLink
     */
    omit?: PublicRegistrationLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicRegistrationLinkInclude<ExtArgs> | null
    /**
     * Filter, which PublicRegistrationLink to fetch.
     */
    where: PublicRegistrationLinkWhereUniqueInput
  }

  /**
   * PublicRegistrationLink findFirst
   */
  export type PublicRegistrationLinkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicRegistrationLink
     */
    select?: PublicRegistrationLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicRegistrationLink
     */
    omit?: PublicRegistrationLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicRegistrationLinkInclude<ExtArgs> | null
    /**
     * Filter, which PublicRegistrationLink to fetch.
     */
    where?: PublicRegistrationLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PublicRegistrationLinks to fetch.
     */
    orderBy?: PublicRegistrationLinkOrderByWithRelationInput | PublicRegistrationLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PublicRegistrationLinks.
     */
    cursor?: PublicRegistrationLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PublicRegistrationLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PublicRegistrationLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PublicRegistrationLinks.
     */
    distinct?: PublicRegistrationLinkScalarFieldEnum | PublicRegistrationLinkScalarFieldEnum[]
  }

  /**
   * PublicRegistrationLink findFirstOrThrow
   */
  export type PublicRegistrationLinkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicRegistrationLink
     */
    select?: PublicRegistrationLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicRegistrationLink
     */
    omit?: PublicRegistrationLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicRegistrationLinkInclude<ExtArgs> | null
    /**
     * Filter, which PublicRegistrationLink to fetch.
     */
    where?: PublicRegistrationLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PublicRegistrationLinks to fetch.
     */
    orderBy?: PublicRegistrationLinkOrderByWithRelationInput | PublicRegistrationLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PublicRegistrationLinks.
     */
    cursor?: PublicRegistrationLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PublicRegistrationLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PublicRegistrationLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PublicRegistrationLinks.
     */
    distinct?: PublicRegistrationLinkScalarFieldEnum | PublicRegistrationLinkScalarFieldEnum[]
  }

  /**
   * PublicRegistrationLink findMany
   */
  export type PublicRegistrationLinkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicRegistrationLink
     */
    select?: PublicRegistrationLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicRegistrationLink
     */
    omit?: PublicRegistrationLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicRegistrationLinkInclude<ExtArgs> | null
    /**
     * Filter, which PublicRegistrationLinks to fetch.
     */
    where?: PublicRegistrationLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PublicRegistrationLinks to fetch.
     */
    orderBy?: PublicRegistrationLinkOrderByWithRelationInput | PublicRegistrationLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PublicRegistrationLinks.
     */
    cursor?: PublicRegistrationLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PublicRegistrationLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PublicRegistrationLinks.
     */
    skip?: number
    distinct?: PublicRegistrationLinkScalarFieldEnum | PublicRegistrationLinkScalarFieldEnum[]
  }

  /**
   * PublicRegistrationLink create
   */
  export type PublicRegistrationLinkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicRegistrationLink
     */
    select?: PublicRegistrationLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicRegistrationLink
     */
    omit?: PublicRegistrationLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicRegistrationLinkInclude<ExtArgs> | null
    /**
     * The data needed to create a PublicRegistrationLink.
     */
    data: XOR<PublicRegistrationLinkCreateInput, PublicRegistrationLinkUncheckedCreateInput>
  }

  /**
   * PublicRegistrationLink createMany
   */
  export type PublicRegistrationLinkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PublicRegistrationLinks.
     */
    data: PublicRegistrationLinkCreateManyInput | PublicRegistrationLinkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PublicRegistrationLink createManyAndReturn
   */
  export type PublicRegistrationLinkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicRegistrationLink
     */
    select?: PublicRegistrationLinkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PublicRegistrationLink
     */
    omit?: PublicRegistrationLinkOmit<ExtArgs> | null
    /**
     * The data used to create many PublicRegistrationLinks.
     */
    data: PublicRegistrationLinkCreateManyInput | PublicRegistrationLinkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicRegistrationLinkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PublicRegistrationLink update
   */
  export type PublicRegistrationLinkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicRegistrationLink
     */
    select?: PublicRegistrationLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicRegistrationLink
     */
    omit?: PublicRegistrationLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicRegistrationLinkInclude<ExtArgs> | null
    /**
     * The data needed to update a PublicRegistrationLink.
     */
    data: XOR<PublicRegistrationLinkUpdateInput, PublicRegistrationLinkUncheckedUpdateInput>
    /**
     * Choose, which PublicRegistrationLink to update.
     */
    where: PublicRegistrationLinkWhereUniqueInput
  }

  /**
   * PublicRegistrationLink updateMany
   */
  export type PublicRegistrationLinkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PublicRegistrationLinks.
     */
    data: XOR<PublicRegistrationLinkUpdateManyMutationInput, PublicRegistrationLinkUncheckedUpdateManyInput>
    /**
     * Filter which PublicRegistrationLinks to update
     */
    where?: PublicRegistrationLinkWhereInput
    /**
     * Limit how many PublicRegistrationLinks to update.
     */
    limit?: number
  }

  /**
   * PublicRegistrationLink updateManyAndReturn
   */
  export type PublicRegistrationLinkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicRegistrationLink
     */
    select?: PublicRegistrationLinkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PublicRegistrationLink
     */
    omit?: PublicRegistrationLinkOmit<ExtArgs> | null
    /**
     * The data used to update PublicRegistrationLinks.
     */
    data: XOR<PublicRegistrationLinkUpdateManyMutationInput, PublicRegistrationLinkUncheckedUpdateManyInput>
    /**
     * Filter which PublicRegistrationLinks to update
     */
    where?: PublicRegistrationLinkWhereInput
    /**
     * Limit how many PublicRegistrationLinks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicRegistrationLinkIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PublicRegistrationLink upsert
   */
  export type PublicRegistrationLinkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicRegistrationLink
     */
    select?: PublicRegistrationLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicRegistrationLink
     */
    omit?: PublicRegistrationLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicRegistrationLinkInclude<ExtArgs> | null
    /**
     * The filter to search for the PublicRegistrationLink to update in case it exists.
     */
    where: PublicRegistrationLinkWhereUniqueInput
    /**
     * In case the PublicRegistrationLink found by the `where` argument doesn't exist, create a new PublicRegistrationLink with this data.
     */
    create: XOR<PublicRegistrationLinkCreateInput, PublicRegistrationLinkUncheckedCreateInput>
    /**
     * In case the PublicRegistrationLink was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PublicRegistrationLinkUpdateInput, PublicRegistrationLinkUncheckedUpdateInput>
  }

  /**
   * PublicRegistrationLink delete
   */
  export type PublicRegistrationLinkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicRegistrationLink
     */
    select?: PublicRegistrationLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicRegistrationLink
     */
    omit?: PublicRegistrationLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicRegistrationLinkInclude<ExtArgs> | null
    /**
     * Filter which PublicRegistrationLink to delete.
     */
    where: PublicRegistrationLinkWhereUniqueInput
  }

  /**
   * PublicRegistrationLink deleteMany
   */
  export type PublicRegistrationLinkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PublicRegistrationLinks to delete
     */
    where?: PublicRegistrationLinkWhereInput
    /**
     * Limit how many PublicRegistrationLinks to delete.
     */
    limit?: number
  }

  /**
   * PublicRegistrationLink without action
   */
  export type PublicRegistrationLinkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicRegistrationLink
     */
    select?: PublicRegistrationLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicRegistrationLink
     */
    omit?: PublicRegistrationLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicRegistrationLinkInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const WorkspaceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    plan: 'plan',
    createdAt: 'createdAt'
  };

  export type WorkspaceScalarFieldEnum = (typeof WorkspaceScalarFieldEnum)[keyof typeof WorkspaceScalarFieldEnum]


  export const WorkspaceConfigScalarFieldEnum: {
    id: 'id',
    wid: 'wid',
    departments: 'departments',
    designations: 'designations',
    officeBranches: 'officeBranches',
    workLocations: 'workLocations',
    updatedAt: 'updatedAt'
  };

  export type WorkspaceConfigScalarFieldEnum = (typeof WorkspaceConfigScalarFieldEnum)[keyof typeof WorkspaceConfigScalarFieldEnum]


  export const ProfileScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    role: 'role',
    department: 'department',
    designation: 'designation',
    officeBranch: 'officeBranch',
    workLocation: 'workLocation',
    avatarInitials: 'avatarInitials',
    status: 'status',
    phoneNumber: 'phoneNumber',
    personalEmail: 'personalEmail',
    bloodGroup: 'bloodGroup',
    dob: 'dob',
    code: 'code',
    joiningDate: 'joiningDate',
    reportingManager: 'reportingManager',
    reportingHR: 'reportingHR',
    emergencyName: 'emergencyName',
    emergencyPhone: 'emergencyPhone',
    acceptedTerms: 'acceptedTerms',
    acceptedPrivacy: 'acceptedPrivacy',
    consentAt: 'consentAt',
    termsVersion: 'termsVersion',
    privacyVersion: 'privacyVersion',
    createdAt: 'createdAt',
    wid: 'wid'
  };

  export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum]


  export const VisitorScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    company: 'company',
    purpose: 'purpose',
    status: 'status',
    hostId: 'hostId',
    hostName: 'hostName',
    checkedInAt: 'checkedInAt',
    checkedOutAt: 'checkedOutAt',
    preRegisteredAt: 'preRegisteredAt',
    idProofType: 'idProofType',
    idProofNumber: 'idProofNumber',
    badgeNumber: 'badgeNumber',
    qrCode: 'qrCode',
    qrValidUntil: 'qrValidUntil',
    walkIn: 'walkIn',
    notes: 'notes',
    wid: 'wid'
  };

  export type VisitorScalarFieldEnum = (typeof VisitorScalarFieldEnum)[keyof typeof VisitorScalarFieldEnum]


  export const SubscriptionScalarFieldEnum: {
    id: 'id',
    wid: 'wid',
    plan: 'plan',
    status: 'status',
    amount: 'amount',
    currency: 'currency',
    region: 'region',
    currentPeriodStart: 'currentPeriodStart',
    currentPeriodEnd: 'currentPeriodEnd',
    cancelledAt: 'cancelledAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SubscriptionScalarFieldEnum = (typeof SubscriptionScalarFieldEnum)[keyof typeof SubscriptionScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    wid: 'wid',
    subscriptionId: 'subscriptionId',
    razorpayOrderId: 'razorpayOrderId',
    razorpayPaymentId: 'razorpayPaymentId',
    amount: 'amount',
    currency: 'currency',
    region: 'region',
    status: 'status',
    failureReason: 'failureReason',
    createdAt: 'createdAt',
    verifiedAt: 'verifiedAt'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const PublicRegistrationLinkScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    wid: 'wid',
    hostId: 'hostId',
    officeBranch: 'officeBranch',
    enabled: 'enabled',
    designTheme: 'designTheme',
    pageTitle: 'pageTitle',
    welcomeMessage: 'welcomeMessage',
    qrValidityPeriod: 'qrValidityPeriod',
    fieldNameRequired: 'fieldNameRequired',
    fieldPhoneRequired: 'fieldPhoneRequired',
    fieldEmailRequired: 'fieldEmailRequired',
    fieldPurposeRequired: 'fieldPurposeRequired',
    fieldIdProofRequired: 'fieldIdProofRequired',
    fieldCompanyEnabled: 'fieldCompanyEnabled',
    fieldCompanyRequired: 'fieldCompanyRequired',
    fieldNotesEnabled: 'fieldNotesEnabled',
    fieldNotesRequired: 'fieldNotesRequired',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PublicRegistrationLinkScalarFieldEnum = (typeof PublicRegistrationLinkScalarFieldEnum)[keyof typeof PublicRegistrationLinkScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type WorkspaceWhereInput = {
    AND?: WorkspaceWhereInput | WorkspaceWhereInput[]
    OR?: WorkspaceWhereInput[]
    NOT?: WorkspaceWhereInput | WorkspaceWhereInput[]
    id?: IntFilter<"Workspace"> | number
    name?: StringNullableFilter<"Workspace"> | string | null
    plan?: StringFilter<"Workspace"> | string
    createdAt?: DateTimeFilter<"Workspace"> | Date | string
    profiles?: ProfileListRelationFilter
    visitors?: VisitorListRelationFilter
    config?: XOR<WorkspaceConfigNullableScalarRelationFilter, WorkspaceConfigWhereInput> | null
    subscriptions?: SubscriptionListRelationFilter
    transactions?: TransactionListRelationFilter
    registrationLinks?: PublicRegistrationLinkListRelationFilter
  }

  export type WorkspaceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    plan?: SortOrder
    createdAt?: SortOrder
    profiles?: ProfileOrderByRelationAggregateInput
    visitors?: VisitorOrderByRelationAggregateInput
    config?: WorkspaceConfigOrderByWithRelationInput
    subscriptions?: SubscriptionOrderByRelationAggregateInput
    transactions?: TransactionOrderByRelationAggregateInput
    registrationLinks?: PublicRegistrationLinkOrderByRelationAggregateInput
  }

  export type WorkspaceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: WorkspaceWhereInput | WorkspaceWhereInput[]
    OR?: WorkspaceWhereInput[]
    NOT?: WorkspaceWhereInput | WorkspaceWhereInput[]
    name?: StringNullableFilter<"Workspace"> | string | null
    plan?: StringFilter<"Workspace"> | string
    createdAt?: DateTimeFilter<"Workspace"> | Date | string
    profiles?: ProfileListRelationFilter
    visitors?: VisitorListRelationFilter
    config?: XOR<WorkspaceConfigNullableScalarRelationFilter, WorkspaceConfigWhereInput> | null
    subscriptions?: SubscriptionListRelationFilter
    transactions?: TransactionListRelationFilter
    registrationLinks?: PublicRegistrationLinkListRelationFilter
  }, "id">

  export type WorkspaceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    plan?: SortOrder
    createdAt?: SortOrder
    _count?: WorkspaceCountOrderByAggregateInput
    _avg?: WorkspaceAvgOrderByAggregateInput
    _max?: WorkspaceMaxOrderByAggregateInput
    _min?: WorkspaceMinOrderByAggregateInput
    _sum?: WorkspaceSumOrderByAggregateInput
  }

  export type WorkspaceScalarWhereWithAggregatesInput = {
    AND?: WorkspaceScalarWhereWithAggregatesInput | WorkspaceScalarWhereWithAggregatesInput[]
    OR?: WorkspaceScalarWhereWithAggregatesInput[]
    NOT?: WorkspaceScalarWhereWithAggregatesInput | WorkspaceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Workspace"> | number
    name?: StringNullableWithAggregatesFilter<"Workspace"> | string | null
    plan?: StringWithAggregatesFilter<"Workspace"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Workspace"> | Date | string
  }

  export type WorkspaceConfigWhereInput = {
    AND?: WorkspaceConfigWhereInput | WorkspaceConfigWhereInput[]
    OR?: WorkspaceConfigWhereInput[]
    NOT?: WorkspaceConfigWhereInput | WorkspaceConfigWhereInput[]
    id?: IntFilter<"WorkspaceConfig"> | number
    wid?: IntFilter<"WorkspaceConfig"> | number
    departments?: StringNullableListFilter<"WorkspaceConfig">
    designations?: StringNullableListFilter<"WorkspaceConfig">
    officeBranches?: StringNullableListFilter<"WorkspaceConfig">
    workLocations?: StringNullableListFilter<"WorkspaceConfig">
    updatedAt?: DateTimeFilter<"WorkspaceConfig"> | Date | string
    workspace?: XOR<WorkspaceScalarRelationFilter, WorkspaceWhereInput>
  }

  export type WorkspaceConfigOrderByWithRelationInput = {
    id?: SortOrder
    wid?: SortOrder
    departments?: SortOrder
    designations?: SortOrder
    officeBranches?: SortOrder
    workLocations?: SortOrder
    updatedAt?: SortOrder
    workspace?: WorkspaceOrderByWithRelationInput
  }

  export type WorkspaceConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    wid?: number
    AND?: WorkspaceConfigWhereInput | WorkspaceConfigWhereInput[]
    OR?: WorkspaceConfigWhereInput[]
    NOT?: WorkspaceConfigWhereInput | WorkspaceConfigWhereInput[]
    departments?: StringNullableListFilter<"WorkspaceConfig">
    designations?: StringNullableListFilter<"WorkspaceConfig">
    officeBranches?: StringNullableListFilter<"WorkspaceConfig">
    workLocations?: StringNullableListFilter<"WorkspaceConfig">
    updatedAt?: DateTimeFilter<"WorkspaceConfig"> | Date | string
    workspace?: XOR<WorkspaceScalarRelationFilter, WorkspaceWhereInput>
  }, "id" | "wid">

  export type WorkspaceConfigOrderByWithAggregationInput = {
    id?: SortOrder
    wid?: SortOrder
    departments?: SortOrder
    designations?: SortOrder
    officeBranches?: SortOrder
    workLocations?: SortOrder
    updatedAt?: SortOrder
    _count?: WorkspaceConfigCountOrderByAggregateInput
    _avg?: WorkspaceConfigAvgOrderByAggregateInput
    _max?: WorkspaceConfigMaxOrderByAggregateInput
    _min?: WorkspaceConfigMinOrderByAggregateInput
    _sum?: WorkspaceConfigSumOrderByAggregateInput
  }

  export type WorkspaceConfigScalarWhereWithAggregatesInput = {
    AND?: WorkspaceConfigScalarWhereWithAggregatesInput | WorkspaceConfigScalarWhereWithAggregatesInput[]
    OR?: WorkspaceConfigScalarWhereWithAggregatesInput[]
    NOT?: WorkspaceConfigScalarWhereWithAggregatesInput | WorkspaceConfigScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"WorkspaceConfig"> | number
    wid?: IntWithAggregatesFilter<"WorkspaceConfig"> | number
    departments?: StringNullableListFilter<"WorkspaceConfig">
    designations?: StringNullableListFilter<"WorkspaceConfig">
    officeBranches?: StringNullableListFilter<"WorkspaceConfig">
    workLocations?: StringNullableListFilter<"WorkspaceConfig">
    updatedAt?: DateTimeWithAggregatesFilter<"WorkspaceConfig"> | Date | string
  }

  export type ProfileWhereInput = {
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    id?: StringFilter<"Profile"> | string
    name?: StringFilter<"Profile"> | string
    email?: StringFilter<"Profile"> | string
    role?: StringFilter<"Profile"> | string
    department?: StringFilter<"Profile"> | string
    designation?: StringNullableFilter<"Profile"> | string | null
    officeBranch?: StringNullableFilter<"Profile"> | string | null
    workLocation?: StringNullableFilter<"Profile"> | string | null
    avatarInitials?: StringFilter<"Profile"> | string
    status?: StringFilter<"Profile"> | string
    phoneNumber?: StringNullableFilter<"Profile"> | string | null
    personalEmail?: StringNullableFilter<"Profile"> | string | null
    bloodGroup?: StringNullableFilter<"Profile"> | string | null
    dob?: StringNullableFilter<"Profile"> | string | null
    code?: StringNullableFilter<"Profile"> | string | null
    joiningDate?: StringNullableFilter<"Profile"> | string | null
    reportingManager?: StringNullableFilter<"Profile"> | string | null
    reportingHR?: StringNullableFilter<"Profile"> | string | null
    emergencyName?: StringNullableFilter<"Profile"> | string | null
    emergencyPhone?: StringNullableFilter<"Profile"> | string | null
    acceptedTerms?: BoolFilter<"Profile"> | boolean
    acceptedPrivacy?: BoolFilter<"Profile"> | boolean
    consentAt?: DateTimeNullableFilter<"Profile"> | Date | string | null
    termsVersion?: StringNullableFilter<"Profile"> | string | null
    privacyVersion?: StringNullableFilter<"Profile"> | string | null
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    wid?: IntNullableFilter<"Profile"> | number | null
    workspace?: XOR<WorkspaceNullableScalarRelationFilter, WorkspaceWhereInput> | null
    visitors?: VisitorListRelationFilter
    registrationLinks?: PublicRegistrationLinkListRelationFilter
  }

  export type ProfileOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    department?: SortOrder
    designation?: SortOrderInput | SortOrder
    officeBranch?: SortOrderInput | SortOrder
    workLocation?: SortOrderInput | SortOrder
    avatarInitials?: SortOrder
    status?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    personalEmail?: SortOrderInput | SortOrder
    bloodGroup?: SortOrderInput | SortOrder
    dob?: SortOrderInput | SortOrder
    code?: SortOrderInput | SortOrder
    joiningDate?: SortOrderInput | SortOrder
    reportingManager?: SortOrderInput | SortOrder
    reportingHR?: SortOrderInput | SortOrder
    emergencyName?: SortOrderInput | SortOrder
    emergencyPhone?: SortOrderInput | SortOrder
    acceptedTerms?: SortOrder
    acceptedPrivacy?: SortOrder
    consentAt?: SortOrderInput | SortOrder
    termsVersion?: SortOrderInput | SortOrder
    privacyVersion?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    wid?: SortOrderInput | SortOrder
    workspace?: WorkspaceOrderByWithRelationInput
    visitors?: VisitorOrderByRelationAggregateInput
    registrationLinks?: PublicRegistrationLinkOrderByRelationAggregateInput
  }

  export type ProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    name?: StringFilter<"Profile"> | string
    role?: StringFilter<"Profile"> | string
    department?: StringFilter<"Profile"> | string
    designation?: StringNullableFilter<"Profile"> | string | null
    officeBranch?: StringNullableFilter<"Profile"> | string | null
    workLocation?: StringNullableFilter<"Profile"> | string | null
    avatarInitials?: StringFilter<"Profile"> | string
    status?: StringFilter<"Profile"> | string
    phoneNumber?: StringNullableFilter<"Profile"> | string | null
    personalEmail?: StringNullableFilter<"Profile"> | string | null
    bloodGroup?: StringNullableFilter<"Profile"> | string | null
    dob?: StringNullableFilter<"Profile"> | string | null
    code?: StringNullableFilter<"Profile"> | string | null
    joiningDate?: StringNullableFilter<"Profile"> | string | null
    reportingManager?: StringNullableFilter<"Profile"> | string | null
    reportingHR?: StringNullableFilter<"Profile"> | string | null
    emergencyName?: StringNullableFilter<"Profile"> | string | null
    emergencyPhone?: StringNullableFilter<"Profile"> | string | null
    acceptedTerms?: BoolFilter<"Profile"> | boolean
    acceptedPrivacy?: BoolFilter<"Profile"> | boolean
    consentAt?: DateTimeNullableFilter<"Profile"> | Date | string | null
    termsVersion?: StringNullableFilter<"Profile"> | string | null
    privacyVersion?: StringNullableFilter<"Profile"> | string | null
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    wid?: IntNullableFilter<"Profile"> | number | null
    workspace?: XOR<WorkspaceNullableScalarRelationFilter, WorkspaceWhereInput> | null
    visitors?: VisitorListRelationFilter
    registrationLinks?: PublicRegistrationLinkListRelationFilter
  }, "id" | "email">

  export type ProfileOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    department?: SortOrder
    designation?: SortOrderInput | SortOrder
    officeBranch?: SortOrderInput | SortOrder
    workLocation?: SortOrderInput | SortOrder
    avatarInitials?: SortOrder
    status?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    personalEmail?: SortOrderInput | SortOrder
    bloodGroup?: SortOrderInput | SortOrder
    dob?: SortOrderInput | SortOrder
    code?: SortOrderInput | SortOrder
    joiningDate?: SortOrderInput | SortOrder
    reportingManager?: SortOrderInput | SortOrder
    reportingHR?: SortOrderInput | SortOrder
    emergencyName?: SortOrderInput | SortOrder
    emergencyPhone?: SortOrderInput | SortOrder
    acceptedTerms?: SortOrder
    acceptedPrivacy?: SortOrder
    consentAt?: SortOrderInput | SortOrder
    termsVersion?: SortOrderInput | SortOrder
    privacyVersion?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    wid?: SortOrderInput | SortOrder
    _count?: ProfileCountOrderByAggregateInput
    _avg?: ProfileAvgOrderByAggregateInput
    _max?: ProfileMaxOrderByAggregateInput
    _min?: ProfileMinOrderByAggregateInput
    _sum?: ProfileSumOrderByAggregateInput
  }

  export type ProfileScalarWhereWithAggregatesInput = {
    AND?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    OR?: ProfileScalarWhereWithAggregatesInput[]
    NOT?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Profile"> | string
    name?: StringWithAggregatesFilter<"Profile"> | string
    email?: StringWithAggregatesFilter<"Profile"> | string
    role?: StringWithAggregatesFilter<"Profile"> | string
    department?: StringWithAggregatesFilter<"Profile"> | string
    designation?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    officeBranch?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    workLocation?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    avatarInitials?: StringWithAggregatesFilter<"Profile"> | string
    status?: StringWithAggregatesFilter<"Profile"> | string
    phoneNumber?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    personalEmail?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    bloodGroup?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    dob?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    code?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    joiningDate?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    reportingManager?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    reportingHR?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    emergencyName?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    emergencyPhone?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    acceptedTerms?: BoolWithAggregatesFilter<"Profile"> | boolean
    acceptedPrivacy?: BoolWithAggregatesFilter<"Profile"> | boolean
    consentAt?: DateTimeNullableWithAggregatesFilter<"Profile"> | Date | string | null
    termsVersion?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    privacyVersion?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
    wid?: IntNullableWithAggregatesFilter<"Profile"> | number | null
  }

  export type VisitorWhereInput = {
    AND?: VisitorWhereInput | VisitorWhereInput[]
    OR?: VisitorWhereInput[]
    NOT?: VisitorWhereInput | VisitorWhereInput[]
    id?: StringFilter<"Visitor"> | string
    name?: StringFilter<"Visitor"> | string
    email?: StringFilter<"Visitor"> | string
    phone?: StringFilter<"Visitor"> | string
    company?: StringNullableFilter<"Visitor"> | string | null
    purpose?: StringFilter<"Visitor"> | string
    status?: StringFilter<"Visitor"> | string
    hostId?: StringFilter<"Visitor"> | string
    hostName?: StringFilter<"Visitor"> | string
    checkedInAt?: DateTimeNullableFilter<"Visitor"> | Date | string | null
    checkedOutAt?: DateTimeNullableFilter<"Visitor"> | Date | string | null
    preRegisteredAt?: DateTimeFilter<"Visitor"> | Date | string
    idProofType?: StringNullableFilter<"Visitor"> | string | null
    idProofNumber?: StringNullableFilter<"Visitor"> | string | null
    badgeNumber?: StringNullableFilter<"Visitor"> | string | null
    qrCode?: StringNullableFilter<"Visitor"> | string | null
    qrValidUntil?: DateTimeNullableFilter<"Visitor"> | Date | string | null
    walkIn?: BoolFilter<"Visitor"> | boolean
    notes?: StringNullableFilter<"Visitor"> | string | null
    wid?: IntFilter<"Visitor"> | number
    host?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    workspace?: XOR<WorkspaceScalarRelationFilter, WorkspaceWhereInput>
  }

  export type VisitorOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    company?: SortOrderInput | SortOrder
    purpose?: SortOrder
    status?: SortOrder
    hostId?: SortOrder
    hostName?: SortOrder
    checkedInAt?: SortOrderInput | SortOrder
    checkedOutAt?: SortOrderInput | SortOrder
    preRegisteredAt?: SortOrder
    idProofType?: SortOrderInput | SortOrder
    idProofNumber?: SortOrderInput | SortOrder
    badgeNumber?: SortOrderInput | SortOrder
    qrCode?: SortOrderInput | SortOrder
    qrValidUntil?: SortOrderInput | SortOrder
    walkIn?: SortOrder
    notes?: SortOrderInput | SortOrder
    wid?: SortOrder
    host?: ProfileOrderByWithRelationInput
    workspace?: WorkspaceOrderByWithRelationInput
  }

  export type VisitorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VisitorWhereInput | VisitorWhereInput[]
    OR?: VisitorWhereInput[]
    NOT?: VisitorWhereInput | VisitorWhereInput[]
    name?: StringFilter<"Visitor"> | string
    email?: StringFilter<"Visitor"> | string
    phone?: StringFilter<"Visitor"> | string
    company?: StringNullableFilter<"Visitor"> | string | null
    purpose?: StringFilter<"Visitor"> | string
    status?: StringFilter<"Visitor"> | string
    hostId?: StringFilter<"Visitor"> | string
    hostName?: StringFilter<"Visitor"> | string
    checkedInAt?: DateTimeNullableFilter<"Visitor"> | Date | string | null
    checkedOutAt?: DateTimeNullableFilter<"Visitor"> | Date | string | null
    preRegisteredAt?: DateTimeFilter<"Visitor"> | Date | string
    idProofType?: StringNullableFilter<"Visitor"> | string | null
    idProofNumber?: StringNullableFilter<"Visitor"> | string | null
    badgeNumber?: StringNullableFilter<"Visitor"> | string | null
    qrCode?: StringNullableFilter<"Visitor"> | string | null
    qrValidUntil?: DateTimeNullableFilter<"Visitor"> | Date | string | null
    walkIn?: BoolFilter<"Visitor"> | boolean
    notes?: StringNullableFilter<"Visitor"> | string | null
    wid?: IntFilter<"Visitor"> | number
    host?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    workspace?: XOR<WorkspaceScalarRelationFilter, WorkspaceWhereInput>
  }, "id">

  export type VisitorOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    company?: SortOrderInput | SortOrder
    purpose?: SortOrder
    status?: SortOrder
    hostId?: SortOrder
    hostName?: SortOrder
    checkedInAt?: SortOrderInput | SortOrder
    checkedOutAt?: SortOrderInput | SortOrder
    preRegisteredAt?: SortOrder
    idProofType?: SortOrderInput | SortOrder
    idProofNumber?: SortOrderInput | SortOrder
    badgeNumber?: SortOrderInput | SortOrder
    qrCode?: SortOrderInput | SortOrder
    qrValidUntil?: SortOrderInput | SortOrder
    walkIn?: SortOrder
    notes?: SortOrderInput | SortOrder
    wid?: SortOrder
    _count?: VisitorCountOrderByAggregateInput
    _avg?: VisitorAvgOrderByAggregateInput
    _max?: VisitorMaxOrderByAggregateInput
    _min?: VisitorMinOrderByAggregateInput
    _sum?: VisitorSumOrderByAggregateInput
  }

  export type VisitorScalarWhereWithAggregatesInput = {
    AND?: VisitorScalarWhereWithAggregatesInput | VisitorScalarWhereWithAggregatesInput[]
    OR?: VisitorScalarWhereWithAggregatesInput[]
    NOT?: VisitorScalarWhereWithAggregatesInput | VisitorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Visitor"> | string
    name?: StringWithAggregatesFilter<"Visitor"> | string
    email?: StringWithAggregatesFilter<"Visitor"> | string
    phone?: StringWithAggregatesFilter<"Visitor"> | string
    company?: StringNullableWithAggregatesFilter<"Visitor"> | string | null
    purpose?: StringWithAggregatesFilter<"Visitor"> | string
    status?: StringWithAggregatesFilter<"Visitor"> | string
    hostId?: StringWithAggregatesFilter<"Visitor"> | string
    hostName?: StringWithAggregatesFilter<"Visitor"> | string
    checkedInAt?: DateTimeNullableWithAggregatesFilter<"Visitor"> | Date | string | null
    checkedOutAt?: DateTimeNullableWithAggregatesFilter<"Visitor"> | Date | string | null
    preRegisteredAt?: DateTimeWithAggregatesFilter<"Visitor"> | Date | string
    idProofType?: StringNullableWithAggregatesFilter<"Visitor"> | string | null
    idProofNumber?: StringNullableWithAggregatesFilter<"Visitor"> | string | null
    badgeNumber?: StringNullableWithAggregatesFilter<"Visitor"> | string | null
    qrCode?: StringNullableWithAggregatesFilter<"Visitor"> | string | null
    qrValidUntil?: DateTimeNullableWithAggregatesFilter<"Visitor"> | Date | string | null
    walkIn?: BoolWithAggregatesFilter<"Visitor"> | boolean
    notes?: StringNullableWithAggregatesFilter<"Visitor"> | string | null
    wid?: IntWithAggregatesFilter<"Visitor"> | number
  }

  export type SubscriptionWhereInput = {
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    id?: StringFilter<"Subscription"> | string
    wid?: IntFilter<"Subscription"> | number
    plan?: StringFilter<"Subscription"> | string
    status?: StringFilter<"Subscription"> | string
    amount?: IntFilter<"Subscription"> | number
    currency?: StringFilter<"Subscription"> | string
    region?: StringFilter<"Subscription"> | string
    currentPeriodStart?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    currentPeriodEnd?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    cancelledAt?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
    workspace?: XOR<WorkspaceScalarRelationFilter, WorkspaceWhereInput>
    transactions?: TransactionListRelationFilter
  }

  export type SubscriptionOrderByWithRelationInput = {
    id?: SortOrder
    wid?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    region?: SortOrder
    currentPeriodStart?: SortOrderInput | SortOrder
    currentPeriodEnd?: SortOrderInput | SortOrder
    cancelledAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    workspace?: WorkspaceOrderByWithRelationInput
    transactions?: TransactionOrderByRelationAggregateInput
  }

  export type SubscriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    wid?: IntFilter<"Subscription"> | number
    plan?: StringFilter<"Subscription"> | string
    status?: StringFilter<"Subscription"> | string
    amount?: IntFilter<"Subscription"> | number
    currency?: StringFilter<"Subscription"> | string
    region?: StringFilter<"Subscription"> | string
    currentPeriodStart?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    currentPeriodEnd?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    cancelledAt?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
    workspace?: XOR<WorkspaceScalarRelationFilter, WorkspaceWhereInput>
    transactions?: TransactionListRelationFilter
  }, "id">

  export type SubscriptionOrderByWithAggregationInput = {
    id?: SortOrder
    wid?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    region?: SortOrder
    currentPeriodStart?: SortOrderInput | SortOrder
    currentPeriodEnd?: SortOrderInput | SortOrder
    cancelledAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SubscriptionCountOrderByAggregateInput
    _avg?: SubscriptionAvgOrderByAggregateInput
    _max?: SubscriptionMaxOrderByAggregateInput
    _min?: SubscriptionMinOrderByAggregateInput
    _sum?: SubscriptionSumOrderByAggregateInput
  }

  export type SubscriptionScalarWhereWithAggregatesInput = {
    AND?: SubscriptionScalarWhereWithAggregatesInput | SubscriptionScalarWhereWithAggregatesInput[]
    OR?: SubscriptionScalarWhereWithAggregatesInput[]
    NOT?: SubscriptionScalarWhereWithAggregatesInput | SubscriptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Subscription"> | string
    wid?: IntWithAggregatesFilter<"Subscription"> | number
    plan?: StringWithAggregatesFilter<"Subscription"> | string
    status?: StringWithAggregatesFilter<"Subscription"> | string
    amount?: IntWithAggregatesFilter<"Subscription"> | number
    currency?: StringWithAggregatesFilter<"Subscription"> | string
    region?: StringWithAggregatesFilter<"Subscription"> | string
    currentPeriodStart?: DateTimeNullableWithAggregatesFilter<"Subscription"> | Date | string | null
    currentPeriodEnd?: DateTimeNullableWithAggregatesFilter<"Subscription"> | Date | string | null
    cancelledAt?: DateTimeNullableWithAggregatesFilter<"Subscription"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
  }

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    id?: StringFilter<"Transaction"> | string
    wid?: IntFilter<"Transaction"> | number
    subscriptionId?: StringFilter<"Transaction"> | string
    razorpayOrderId?: StringFilter<"Transaction"> | string
    razorpayPaymentId?: StringNullableFilter<"Transaction"> | string | null
    amount?: IntFilter<"Transaction"> | number
    currency?: StringFilter<"Transaction"> | string
    region?: StringFilter<"Transaction"> | string
    status?: StringFilter<"Transaction"> | string
    failureReason?: StringNullableFilter<"Transaction"> | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    verifiedAt?: DateTimeNullableFilter<"Transaction"> | Date | string | null
    workspace?: XOR<WorkspaceScalarRelationFilter, WorkspaceWhereInput>
    subscription?: XOR<SubscriptionScalarRelationFilter, SubscriptionWhereInput>
  }

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder
    wid?: SortOrder
    subscriptionId?: SortOrder
    razorpayOrderId?: SortOrder
    razorpayPaymentId?: SortOrderInput | SortOrder
    amount?: SortOrder
    currency?: SortOrder
    region?: SortOrder
    status?: SortOrder
    failureReason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    workspace?: WorkspaceOrderByWithRelationInput
    subscription?: SubscriptionOrderByWithRelationInput
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    razorpayOrderId?: string
    razorpayPaymentId?: string
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    wid?: IntFilter<"Transaction"> | number
    subscriptionId?: StringFilter<"Transaction"> | string
    amount?: IntFilter<"Transaction"> | number
    currency?: StringFilter<"Transaction"> | string
    region?: StringFilter<"Transaction"> | string
    status?: StringFilter<"Transaction"> | string
    failureReason?: StringNullableFilter<"Transaction"> | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    verifiedAt?: DateTimeNullableFilter<"Transaction"> | Date | string | null
    workspace?: XOR<WorkspaceScalarRelationFilter, WorkspaceWhereInput>
    subscription?: XOR<SubscriptionScalarRelationFilter, SubscriptionWhereInput>
  }, "id" | "razorpayOrderId" | "razorpayPaymentId">

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder
    wid?: SortOrder
    subscriptionId?: SortOrder
    razorpayOrderId?: SortOrder
    razorpayPaymentId?: SortOrderInput | SortOrder
    amount?: SortOrder
    currency?: SortOrder
    region?: SortOrder
    status?: SortOrder
    failureReason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _avg?: TransactionAvgOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
    _sum?: TransactionSumOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transaction"> | string
    wid?: IntWithAggregatesFilter<"Transaction"> | number
    subscriptionId?: StringWithAggregatesFilter<"Transaction"> | string
    razorpayOrderId?: StringWithAggregatesFilter<"Transaction"> | string
    razorpayPaymentId?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    amount?: IntWithAggregatesFilter<"Transaction"> | number
    currency?: StringWithAggregatesFilter<"Transaction"> | string
    region?: StringWithAggregatesFilter<"Transaction"> | string
    status?: StringWithAggregatesFilter<"Transaction"> | string
    failureReason?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    verifiedAt?: DateTimeNullableWithAggregatesFilter<"Transaction"> | Date | string | null
  }

  export type PublicRegistrationLinkWhereInput = {
    AND?: PublicRegistrationLinkWhereInput | PublicRegistrationLinkWhereInput[]
    OR?: PublicRegistrationLinkWhereInput[]
    NOT?: PublicRegistrationLinkWhereInput | PublicRegistrationLinkWhereInput[]
    id?: StringFilter<"PublicRegistrationLink"> | string
    slug?: StringFilter<"PublicRegistrationLink"> | string
    wid?: IntFilter<"PublicRegistrationLink"> | number
    hostId?: StringFilter<"PublicRegistrationLink"> | string
    officeBranch?: StringFilter<"PublicRegistrationLink"> | string
    enabled?: BoolFilter<"PublicRegistrationLink"> | boolean
    designTheme?: StringFilter<"PublicRegistrationLink"> | string
    pageTitle?: StringNullableFilter<"PublicRegistrationLink"> | string | null
    welcomeMessage?: StringNullableFilter<"PublicRegistrationLink"> | string | null
    qrValidityPeriod?: StringFilter<"PublicRegistrationLink"> | string
    fieldNameRequired?: BoolFilter<"PublicRegistrationLink"> | boolean
    fieldPhoneRequired?: BoolFilter<"PublicRegistrationLink"> | boolean
    fieldEmailRequired?: BoolFilter<"PublicRegistrationLink"> | boolean
    fieldPurposeRequired?: BoolFilter<"PublicRegistrationLink"> | boolean
    fieldIdProofRequired?: BoolFilter<"PublicRegistrationLink"> | boolean
    fieldCompanyEnabled?: BoolFilter<"PublicRegistrationLink"> | boolean
    fieldCompanyRequired?: BoolFilter<"PublicRegistrationLink"> | boolean
    fieldNotesEnabled?: BoolFilter<"PublicRegistrationLink"> | boolean
    fieldNotesRequired?: BoolFilter<"PublicRegistrationLink"> | boolean
    createdAt?: DateTimeFilter<"PublicRegistrationLink"> | Date | string
    updatedAt?: DateTimeFilter<"PublicRegistrationLink"> | Date | string
    workspace?: XOR<WorkspaceScalarRelationFilter, WorkspaceWhereInput>
    host?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }

  export type PublicRegistrationLinkOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    wid?: SortOrder
    hostId?: SortOrder
    officeBranch?: SortOrder
    enabled?: SortOrder
    designTheme?: SortOrder
    pageTitle?: SortOrderInput | SortOrder
    welcomeMessage?: SortOrderInput | SortOrder
    qrValidityPeriod?: SortOrder
    fieldNameRequired?: SortOrder
    fieldPhoneRequired?: SortOrder
    fieldEmailRequired?: SortOrder
    fieldPurposeRequired?: SortOrder
    fieldIdProofRequired?: SortOrder
    fieldCompanyEnabled?: SortOrder
    fieldCompanyRequired?: SortOrder
    fieldNotesEnabled?: SortOrder
    fieldNotesRequired?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    workspace?: WorkspaceOrderByWithRelationInput
    host?: ProfileOrderByWithRelationInput
  }

  export type PublicRegistrationLinkWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    wid_hostId?: PublicRegistrationLinkWidHostIdCompoundUniqueInput
    AND?: PublicRegistrationLinkWhereInput | PublicRegistrationLinkWhereInput[]
    OR?: PublicRegistrationLinkWhereInput[]
    NOT?: PublicRegistrationLinkWhereInput | PublicRegistrationLinkWhereInput[]
    wid?: IntFilter<"PublicRegistrationLink"> | number
    hostId?: StringFilter<"PublicRegistrationLink"> | string
    officeBranch?: StringFilter<"PublicRegistrationLink"> | string
    enabled?: BoolFilter<"PublicRegistrationLink"> | boolean
    designTheme?: StringFilter<"PublicRegistrationLink"> | string
    pageTitle?: StringNullableFilter<"PublicRegistrationLink"> | string | null
    welcomeMessage?: StringNullableFilter<"PublicRegistrationLink"> | string | null
    qrValidityPeriod?: StringFilter<"PublicRegistrationLink"> | string
    fieldNameRequired?: BoolFilter<"PublicRegistrationLink"> | boolean
    fieldPhoneRequired?: BoolFilter<"PublicRegistrationLink"> | boolean
    fieldEmailRequired?: BoolFilter<"PublicRegistrationLink"> | boolean
    fieldPurposeRequired?: BoolFilter<"PublicRegistrationLink"> | boolean
    fieldIdProofRequired?: BoolFilter<"PublicRegistrationLink"> | boolean
    fieldCompanyEnabled?: BoolFilter<"PublicRegistrationLink"> | boolean
    fieldCompanyRequired?: BoolFilter<"PublicRegistrationLink"> | boolean
    fieldNotesEnabled?: BoolFilter<"PublicRegistrationLink"> | boolean
    fieldNotesRequired?: BoolFilter<"PublicRegistrationLink"> | boolean
    createdAt?: DateTimeFilter<"PublicRegistrationLink"> | Date | string
    updatedAt?: DateTimeFilter<"PublicRegistrationLink"> | Date | string
    workspace?: XOR<WorkspaceScalarRelationFilter, WorkspaceWhereInput>
    host?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }, "id" | "slug" | "wid_hostId">

  export type PublicRegistrationLinkOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    wid?: SortOrder
    hostId?: SortOrder
    officeBranch?: SortOrder
    enabled?: SortOrder
    designTheme?: SortOrder
    pageTitle?: SortOrderInput | SortOrder
    welcomeMessage?: SortOrderInput | SortOrder
    qrValidityPeriod?: SortOrder
    fieldNameRequired?: SortOrder
    fieldPhoneRequired?: SortOrder
    fieldEmailRequired?: SortOrder
    fieldPurposeRequired?: SortOrder
    fieldIdProofRequired?: SortOrder
    fieldCompanyEnabled?: SortOrder
    fieldCompanyRequired?: SortOrder
    fieldNotesEnabled?: SortOrder
    fieldNotesRequired?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PublicRegistrationLinkCountOrderByAggregateInput
    _avg?: PublicRegistrationLinkAvgOrderByAggregateInput
    _max?: PublicRegistrationLinkMaxOrderByAggregateInput
    _min?: PublicRegistrationLinkMinOrderByAggregateInput
    _sum?: PublicRegistrationLinkSumOrderByAggregateInput
  }

  export type PublicRegistrationLinkScalarWhereWithAggregatesInput = {
    AND?: PublicRegistrationLinkScalarWhereWithAggregatesInput | PublicRegistrationLinkScalarWhereWithAggregatesInput[]
    OR?: PublicRegistrationLinkScalarWhereWithAggregatesInput[]
    NOT?: PublicRegistrationLinkScalarWhereWithAggregatesInput | PublicRegistrationLinkScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PublicRegistrationLink"> | string
    slug?: StringWithAggregatesFilter<"PublicRegistrationLink"> | string
    wid?: IntWithAggregatesFilter<"PublicRegistrationLink"> | number
    hostId?: StringWithAggregatesFilter<"PublicRegistrationLink"> | string
    officeBranch?: StringWithAggregatesFilter<"PublicRegistrationLink"> | string
    enabled?: BoolWithAggregatesFilter<"PublicRegistrationLink"> | boolean
    designTheme?: StringWithAggregatesFilter<"PublicRegistrationLink"> | string
    pageTitle?: StringNullableWithAggregatesFilter<"PublicRegistrationLink"> | string | null
    welcomeMessage?: StringNullableWithAggregatesFilter<"PublicRegistrationLink"> | string | null
    qrValidityPeriod?: StringWithAggregatesFilter<"PublicRegistrationLink"> | string
    fieldNameRequired?: BoolWithAggregatesFilter<"PublicRegistrationLink"> | boolean
    fieldPhoneRequired?: BoolWithAggregatesFilter<"PublicRegistrationLink"> | boolean
    fieldEmailRequired?: BoolWithAggregatesFilter<"PublicRegistrationLink"> | boolean
    fieldPurposeRequired?: BoolWithAggregatesFilter<"PublicRegistrationLink"> | boolean
    fieldIdProofRequired?: BoolWithAggregatesFilter<"PublicRegistrationLink"> | boolean
    fieldCompanyEnabled?: BoolWithAggregatesFilter<"PublicRegistrationLink"> | boolean
    fieldCompanyRequired?: BoolWithAggregatesFilter<"PublicRegistrationLink"> | boolean
    fieldNotesEnabled?: BoolWithAggregatesFilter<"PublicRegistrationLink"> | boolean
    fieldNotesRequired?: BoolWithAggregatesFilter<"PublicRegistrationLink"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"PublicRegistrationLink"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PublicRegistrationLink"> | Date | string
  }

  export type WorkspaceCreateInput = {
    name?: string | null
    plan?: string
    createdAt?: Date | string
    profiles?: ProfileCreateNestedManyWithoutWorkspaceInput
    visitors?: VisitorCreateNestedManyWithoutWorkspaceInput
    config?: WorkspaceConfigCreateNestedOneWithoutWorkspaceInput
    subscriptions?: SubscriptionCreateNestedManyWithoutWorkspaceInput
    transactions?: TransactionCreateNestedManyWithoutWorkspaceInput
    registrationLinks?: PublicRegistrationLinkCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUncheckedCreateInput = {
    id?: number
    name?: string | null
    plan?: string
    createdAt?: Date | string
    profiles?: ProfileUncheckedCreateNestedManyWithoutWorkspaceInput
    visitors?: VisitorUncheckedCreateNestedManyWithoutWorkspaceInput
    config?: WorkspaceConfigUncheckedCreateNestedOneWithoutWorkspaceInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutWorkspaceInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutWorkspaceInput
    registrationLinks?: PublicRegistrationLinkUncheckedCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profiles?: ProfileUpdateManyWithoutWorkspaceNestedInput
    visitors?: VisitorUpdateManyWithoutWorkspaceNestedInput
    config?: WorkspaceConfigUpdateOneWithoutWorkspaceNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutWorkspaceNestedInput
    transactions?: TransactionUpdateManyWithoutWorkspaceNestedInput
    registrationLinks?: PublicRegistrationLinkUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profiles?: ProfileUncheckedUpdateManyWithoutWorkspaceNestedInput
    visitors?: VisitorUncheckedUpdateManyWithoutWorkspaceNestedInput
    config?: WorkspaceConfigUncheckedUpdateOneWithoutWorkspaceNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutWorkspaceNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutWorkspaceNestedInput
    registrationLinks?: PublicRegistrationLinkUncheckedUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceCreateManyInput = {
    id?: number
    name?: string | null
    plan?: string
    createdAt?: Date | string
  }

  export type WorkspaceUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceConfigCreateInput = {
    departments?: WorkspaceConfigCreatedepartmentsInput | string[]
    designations?: WorkspaceConfigCreatedesignationsInput | string[]
    officeBranches?: WorkspaceConfigCreateofficeBranchesInput | string[]
    workLocations?: WorkspaceConfigCreateworkLocationsInput | string[]
    updatedAt?: Date | string
    workspace: WorkspaceCreateNestedOneWithoutConfigInput
  }

  export type WorkspaceConfigUncheckedCreateInput = {
    id?: number
    wid: number
    departments?: WorkspaceConfigCreatedepartmentsInput | string[]
    designations?: WorkspaceConfigCreatedesignationsInput | string[]
    officeBranches?: WorkspaceConfigCreateofficeBranchesInput | string[]
    workLocations?: WorkspaceConfigCreateworkLocationsInput | string[]
    updatedAt?: Date | string
  }

  export type WorkspaceConfigUpdateInput = {
    departments?: WorkspaceConfigUpdatedepartmentsInput | string[]
    designations?: WorkspaceConfigUpdatedesignationsInput | string[]
    officeBranches?: WorkspaceConfigUpdateofficeBranchesInput | string[]
    workLocations?: WorkspaceConfigUpdateworkLocationsInput | string[]
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneRequiredWithoutConfigNestedInput
  }

  export type WorkspaceConfigUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    wid?: IntFieldUpdateOperationsInput | number
    departments?: WorkspaceConfigUpdatedepartmentsInput | string[]
    designations?: WorkspaceConfigUpdatedesignationsInput | string[]
    officeBranches?: WorkspaceConfigUpdateofficeBranchesInput | string[]
    workLocations?: WorkspaceConfigUpdateworkLocationsInput | string[]
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceConfigCreateManyInput = {
    id?: number
    wid: number
    departments?: WorkspaceConfigCreatedepartmentsInput | string[]
    designations?: WorkspaceConfigCreatedesignationsInput | string[]
    officeBranches?: WorkspaceConfigCreateofficeBranchesInput | string[]
    workLocations?: WorkspaceConfigCreateworkLocationsInput | string[]
    updatedAt?: Date | string
  }

  export type WorkspaceConfigUpdateManyMutationInput = {
    departments?: WorkspaceConfigUpdatedepartmentsInput | string[]
    designations?: WorkspaceConfigUpdatedesignationsInput | string[]
    officeBranches?: WorkspaceConfigUpdateofficeBranchesInput | string[]
    workLocations?: WorkspaceConfigUpdateworkLocationsInput | string[]
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceConfigUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    wid?: IntFieldUpdateOperationsInput | number
    departments?: WorkspaceConfigUpdatedepartmentsInput | string[]
    designations?: WorkspaceConfigUpdatedesignationsInput | string[]
    officeBranches?: WorkspaceConfigUpdateofficeBranchesInput | string[]
    workLocations?: WorkspaceConfigUpdateworkLocationsInput | string[]
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileCreateInput = {
    id: string
    name: string
    email: string
    role?: string
    department?: string
    designation?: string | null
    officeBranch?: string | null
    workLocation?: string | null
    avatarInitials?: string
    status?: string
    phoneNumber?: string | null
    personalEmail?: string | null
    bloodGroup?: string | null
    dob?: string | null
    code?: string | null
    joiningDate?: string | null
    reportingManager?: string | null
    reportingHR?: string | null
    emergencyName?: string | null
    emergencyPhone?: string | null
    acceptedTerms?: boolean
    acceptedPrivacy?: boolean
    consentAt?: Date | string | null
    termsVersion?: string | null
    privacyVersion?: string | null
    createdAt?: Date | string
    workspace?: WorkspaceCreateNestedOneWithoutProfilesInput
    visitors?: VisitorCreateNestedManyWithoutHostInput
    registrationLinks?: PublicRegistrationLinkCreateNestedManyWithoutHostInput
  }

  export type ProfileUncheckedCreateInput = {
    id: string
    name: string
    email: string
    role?: string
    department?: string
    designation?: string | null
    officeBranch?: string | null
    workLocation?: string | null
    avatarInitials?: string
    status?: string
    phoneNumber?: string | null
    personalEmail?: string | null
    bloodGroup?: string | null
    dob?: string | null
    code?: string | null
    joiningDate?: string | null
    reportingManager?: string | null
    reportingHR?: string | null
    emergencyName?: string | null
    emergencyPhone?: string | null
    acceptedTerms?: boolean
    acceptedPrivacy?: boolean
    consentAt?: Date | string | null
    termsVersion?: string | null
    privacyVersion?: string | null
    createdAt?: Date | string
    wid?: number | null
    visitors?: VisitorUncheckedCreateNestedManyWithoutHostInput
    registrationLinks?: PublicRegistrationLinkUncheckedCreateNestedManyWithoutHostInput
  }

  export type ProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    officeBranch?: NullableStringFieldUpdateOperationsInput | string | null
    workLocation?: NullableStringFieldUpdateOperationsInput | string | null
    avatarInitials?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    personalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableStringFieldUpdateOperationsInput | string | null
    code?: NullableStringFieldUpdateOperationsInput | string | null
    joiningDate?: NullableStringFieldUpdateOperationsInput | string | null
    reportingManager?: NullableStringFieldUpdateOperationsInput | string | null
    reportingHR?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyPhone?: NullableStringFieldUpdateOperationsInput | string | null
    acceptedTerms?: BoolFieldUpdateOperationsInput | boolean
    acceptedPrivacy?: BoolFieldUpdateOperationsInput | boolean
    consentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    termsVersion?: NullableStringFieldUpdateOperationsInput | string | null
    privacyVersion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneWithoutProfilesNestedInput
    visitors?: VisitorUpdateManyWithoutHostNestedInput
    registrationLinks?: PublicRegistrationLinkUpdateManyWithoutHostNestedInput
  }

  export type ProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    officeBranch?: NullableStringFieldUpdateOperationsInput | string | null
    workLocation?: NullableStringFieldUpdateOperationsInput | string | null
    avatarInitials?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    personalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableStringFieldUpdateOperationsInput | string | null
    code?: NullableStringFieldUpdateOperationsInput | string | null
    joiningDate?: NullableStringFieldUpdateOperationsInput | string | null
    reportingManager?: NullableStringFieldUpdateOperationsInput | string | null
    reportingHR?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyPhone?: NullableStringFieldUpdateOperationsInput | string | null
    acceptedTerms?: BoolFieldUpdateOperationsInput | boolean
    acceptedPrivacy?: BoolFieldUpdateOperationsInput | boolean
    consentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    termsVersion?: NullableStringFieldUpdateOperationsInput | string | null
    privacyVersion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wid?: NullableIntFieldUpdateOperationsInput | number | null
    visitors?: VisitorUncheckedUpdateManyWithoutHostNestedInput
    registrationLinks?: PublicRegistrationLinkUncheckedUpdateManyWithoutHostNestedInput
  }

  export type ProfileCreateManyInput = {
    id: string
    name: string
    email: string
    role?: string
    department?: string
    designation?: string | null
    officeBranch?: string | null
    workLocation?: string | null
    avatarInitials?: string
    status?: string
    phoneNumber?: string | null
    personalEmail?: string | null
    bloodGroup?: string | null
    dob?: string | null
    code?: string | null
    joiningDate?: string | null
    reportingManager?: string | null
    reportingHR?: string | null
    emergencyName?: string | null
    emergencyPhone?: string | null
    acceptedTerms?: boolean
    acceptedPrivacy?: boolean
    consentAt?: Date | string | null
    termsVersion?: string | null
    privacyVersion?: string | null
    createdAt?: Date | string
    wid?: number | null
  }

  export type ProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    officeBranch?: NullableStringFieldUpdateOperationsInput | string | null
    workLocation?: NullableStringFieldUpdateOperationsInput | string | null
    avatarInitials?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    personalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableStringFieldUpdateOperationsInput | string | null
    code?: NullableStringFieldUpdateOperationsInput | string | null
    joiningDate?: NullableStringFieldUpdateOperationsInput | string | null
    reportingManager?: NullableStringFieldUpdateOperationsInput | string | null
    reportingHR?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyPhone?: NullableStringFieldUpdateOperationsInput | string | null
    acceptedTerms?: BoolFieldUpdateOperationsInput | boolean
    acceptedPrivacy?: BoolFieldUpdateOperationsInput | boolean
    consentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    termsVersion?: NullableStringFieldUpdateOperationsInput | string | null
    privacyVersion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    officeBranch?: NullableStringFieldUpdateOperationsInput | string | null
    workLocation?: NullableStringFieldUpdateOperationsInput | string | null
    avatarInitials?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    personalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableStringFieldUpdateOperationsInput | string | null
    code?: NullableStringFieldUpdateOperationsInput | string | null
    joiningDate?: NullableStringFieldUpdateOperationsInput | string | null
    reportingManager?: NullableStringFieldUpdateOperationsInput | string | null
    reportingHR?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyPhone?: NullableStringFieldUpdateOperationsInput | string | null
    acceptedTerms?: BoolFieldUpdateOperationsInput | boolean
    acceptedPrivacy?: BoolFieldUpdateOperationsInput | boolean
    consentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    termsVersion?: NullableStringFieldUpdateOperationsInput | string | null
    privacyVersion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wid?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type VisitorCreateInput = {
    id?: string
    name: string
    email: string
    phone: string
    company?: string | null
    purpose: string
    status?: string
    hostName: string
    checkedInAt?: Date | string | null
    checkedOutAt?: Date | string | null
    preRegisteredAt?: Date | string
    idProofType?: string | null
    idProofNumber?: string | null
    badgeNumber?: string | null
    qrCode?: string | null
    qrValidUntil?: Date | string | null
    walkIn?: boolean
    notes?: string | null
    host: ProfileCreateNestedOneWithoutVisitorsInput
    workspace: WorkspaceCreateNestedOneWithoutVisitorsInput
  }

  export type VisitorUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    phone: string
    company?: string | null
    purpose: string
    status?: string
    hostId: string
    hostName: string
    checkedInAt?: Date | string | null
    checkedOutAt?: Date | string | null
    preRegisteredAt?: Date | string
    idProofType?: string | null
    idProofNumber?: string | null
    badgeNumber?: string | null
    qrCode?: string | null
    qrValidUntil?: Date | string | null
    walkIn?: boolean
    notes?: string | null
    wid: number
  }

  export type VisitorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    hostName?: StringFieldUpdateOperationsInput | string
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedOutAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preRegisteredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    idProofType?: NullableStringFieldUpdateOperationsInput | string | null
    idProofNumber?: NullableStringFieldUpdateOperationsInput | string | null
    badgeNumber?: NullableStringFieldUpdateOperationsInput | string | null
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    qrValidUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    walkIn?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    host?: ProfileUpdateOneRequiredWithoutVisitorsNestedInput
    workspace?: WorkspaceUpdateOneRequiredWithoutVisitorsNestedInput
  }

  export type VisitorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    hostName?: StringFieldUpdateOperationsInput | string
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedOutAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preRegisteredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    idProofType?: NullableStringFieldUpdateOperationsInput | string | null
    idProofNumber?: NullableStringFieldUpdateOperationsInput | string | null
    badgeNumber?: NullableStringFieldUpdateOperationsInput | string | null
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    qrValidUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    walkIn?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    wid?: IntFieldUpdateOperationsInput | number
  }

  export type VisitorCreateManyInput = {
    id?: string
    name: string
    email: string
    phone: string
    company?: string | null
    purpose: string
    status?: string
    hostId: string
    hostName: string
    checkedInAt?: Date | string | null
    checkedOutAt?: Date | string | null
    preRegisteredAt?: Date | string
    idProofType?: string | null
    idProofNumber?: string | null
    badgeNumber?: string | null
    qrCode?: string | null
    qrValidUntil?: Date | string | null
    walkIn?: boolean
    notes?: string | null
    wid: number
  }

  export type VisitorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    hostName?: StringFieldUpdateOperationsInput | string
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedOutAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preRegisteredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    idProofType?: NullableStringFieldUpdateOperationsInput | string | null
    idProofNumber?: NullableStringFieldUpdateOperationsInput | string | null
    badgeNumber?: NullableStringFieldUpdateOperationsInput | string | null
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    qrValidUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    walkIn?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VisitorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    hostName?: StringFieldUpdateOperationsInput | string
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedOutAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preRegisteredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    idProofType?: NullableStringFieldUpdateOperationsInput | string | null
    idProofNumber?: NullableStringFieldUpdateOperationsInput | string | null
    badgeNumber?: NullableStringFieldUpdateOperationsInput | string | null
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    qrValidUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    walkIn?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    wid?: IntFieldUpdateOperationsInput | number
  }

  export type SubscriptionCreateInput = {
    id?: string
    plan?: string
    status?: string
    amount: number
    currency: string
    region: string
    currentPeriodStart?: Date | string | null
    currentPeriodEnd?: Date | string | null
    cancelledAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workspace: WorkspaceCreateNestedOneWithoutSubscriptionsInput
    transactions?: TransactionCreateNestedManyWithoutSubscriptionInput
  }

  export type SubscriptionUncheckedCreateInput = {
    id?: string
    wid: number
    plan?: string
    status?: string
    amount: number
    currency: string
    region: string
    currentPeriodStart?: Date | string | null
    currentPeriodEnd?: Date | string | null
    cancelledAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutSubscriptionInput
  }

  export type SubscriptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    currentPeriodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneRequiredWithoutSubscriptionsNestedInput
    transactions?: TransactionUpdateManyWithoutSubscriptionNestedInput
  }

  export type SubscriptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    wid?: IntFieldUpdateOperationsInput | number
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    currentPeriodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutSubscriptionNestedInput
  }

  export type SubscriptionCreateManyInput = {
    id?: string
    wid: number
    plan?: string
    status?: string
    amount: number
    currency: string
    region: string
    currentPeriodStart?: Date | string | null
    currentPeriodEnd?: Date | string | null
    cancelledAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    currentPeriodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    wid?: IntFieldUpdateOperationsInput | number
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    currentPeriodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateInput = {
    id?: string
    razorpayOrderId: string
    razorpayPaymentId?: string | null
    amount: number
    currency: string
    region: string
    status?: string
    failureReason?: string | null
    createdAt?: Date | string
    verifiedAt?: Date | string | null
    workspace: WorkspaceCreateNestedOneWithoutTransactionsInput
    subscription: SubscriptionCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateInput = {
    id?: string
    wid: number
    subscriptionId: string
    razorpayOrderId: string
    razorpayPaymentId?: string | null
    amount: number
    currency: string
    region: string
    status?: string
    failureReason?: string | null
    createdAt?: Date | string
    verifiedAt?: Date | string | null
  }

  export type TransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    razorpayOrderId?: StringFieldUpdateOperationsInput | string
    razorpayPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workspace?: WorkspaceUpdateOneRequiredWithoutTransactionsNestedInput
    subscription?: SubscriptionUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    wid?: IntFieldUpdateOperationsInput | number
    subscriptionId?: StringFieldUpdateOperationsInput | string
    razorpayOrderId?: StringFieldUpdateOperationsInput | string
    razorpayPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TransactionCreateManyInput = {
    id?: string
    wid: number
    subscriptionId: string
    razorpayOrderId: string
    razorpayPaymentId?: string | null
    amount: number
    currency: string
    region: string
    status?: string
    failureReason?: string | null
    createdAt?: Date | string
    verifiedAt?: Date | string | null
  }

  export type TransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    razorpayOrderId?: StringFieldUpdateOperationsInput | string
    razorpayPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    wid?: IntFieldUpdateOperationsInput | number
    subscriptionId?: StringFieldUpdateOperationsInput | string
    razorpayOrderId?: StringFieldUpdateOperationsInput | string
    razorpayPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PublicRegistrationLinkCreateInput = {
    id?: string
    slug: string
    officeBranch: string
    enabled?: boolean
    designTheme?: string
    pageTitle?: string | null
    welcomeMessage?: string | null
    qrValidityPeriod?: string
    fieldNameRequired?: boolean
    fieldPhoneRequired?: boolean
    fieldEmailRequired?: boolean
    fieldPurposeRequired?: boolean
    fieldIdProofRequired?: boolean
    fieldCompanyEnabled?: boolean
    fieldCompanyRequired?: boolean
    fieldNotesEnabled?: boolean
    fieldNotesRequired?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    workspace: WorkspaceCreateNestedOneWithoutRegistrationLinksInput
    host: ProfileCreateNestedOneWithoutRegistrationLinksInput
  }

  export type PublicRegistrationLinkUncheckedCreateInput = {
    id?: string
    slug: string
    wid: number
    hostId: string
    officeBranch: string
    enabled?: boolean
    designTheme?: string
    pageTitle?: string | null
    welcomeMessage?: string | null
    qrValidityPeriod?: string
    fieldNameRequired?: boolean
    fieldPhoneRequired?: boolean
    fieldEmailRequired?: boolean
    fieldPurposeRequired?: boolean
    fieldIdProofRequired?: boolean
    fieldCompanyEnabled?: boolean
    fieldCompanyRequired?: boolean
    fieldNotesEnabled?: boolean
    fieldNotesRequired?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PublicRegistrationLinkUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    officeBranch?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    designTheme?: StringFieldUpdateOperationsInput | string
    pageTitle?: NullableStringFieldUpdateOperationsInput | string | null
    welcomeMessage?: NullableStringFieldUpdateOperationsInput | string | null
    qrValidityPeriod?: StringFieldUpdateOperationsInput | string
    fieldNameRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldPhoneRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldEmailRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldPurposeRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldIdProofRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldCompanyEnabled?: BoolFieldUpdateOperationsInput | boolean
    fieldCompanyRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldNotesEnabled?: BoolFieldUpdateOperationsInput | boolean
    fieldNotesRequired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneRequiredWithoutRegistrationLinksNestedInput
    host?: ProfileUpdateOneRequiredWithoutRegistrationLinksNestedInput
  }

  export type PublicRegistrationLinkUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    wid?: IntFieldUpdateOperationsInput | number
    hostId?: StringFieldUpdateOperationsInput | string
    officeBranch?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    designTheme?: StringFieldUpdateOperationsInput | string
    pageTitle?: NullableStringFieldUpdateOperationsInput | string | null
    welcomeMessage?: NullableStringFieldUpdateOperationsInput | string | null
    qrValidityPeriod?: StringFieldUpdateOperationsInput | string
    fieldNameRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldPhoneRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldEmailRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldPurposeRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldIdProofRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldCompanyEnabled?: BoolFieldUpdateOperationsInput | boolean
    fieldCompanyRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldNotesEnabled?: BoolFieldUpdateOperationsInput | boolean
    fieldNotesRequired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PublicRegistrationLinkCreateManyInput = {
    id?: string
    slug: string
    wid: number
    hostId: string
    officeBranch: string
    enabled?: boolean
    designTheme?: string
    pageTitle?: string | null
    welcomeMessage?: string | null
    qrValidityPeriod?: string
    fieldNameRequired?: boolean
    fieldPhoneRequired?: boolean
    fieldEmailRequired?: boolean
    fieldPurposeRequired?: boolean
    fieldIdProofRequired?: boolean
    fieldCompanyEnabled?: boolean
    fieldCompanyRequired?: boolean
    fieldNotesEnabled?: boolean
    fieldNotesRequired?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PublicRegistrationLinkUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    officeBranch?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    designTheme?: StringFieldUpdateOperationsInput | string
    pageTitle?: NullableStringFieldUpdateOperationsInput | string | null
    welcomeMessage?: NullableStringFieldUpdateOperationsInput | string | null
    qrValidityPeriod?: StringFieldUpdateOperationsInput | string
    fieldNameRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldPhoneRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldEmailRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldPurposeRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldIdProofRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldCompanyEnabled?: BoolFieldUpdateOperationsInput | boolean
    fieldCompanyRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldNotesEnabled?: BoolFieldUpdateOperationsInput | boolean
    fieldNotesRequired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PublicRegistrationLinkUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    wid?: IntFieldUpdateOperationsInput | number
    hostId?: StringFieldUpdateOperationsInput | string
    officeBranch?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    designTheme?: StringFieldUpdateOperationsInput | string
    pageTitle?: NullableStringFieldUpdateOperationsInput | string | null
    welcomeMessage?: NullableStringFieldUpdateOperationsInput | string | null
    qrValidityPeriod?: StringFieldUpdateOperationsInput | string
    fieldNameRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldPhoneRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldEmailRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldPurposeRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldIdProofRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldCompanyEnabled?: BoolFieldUpdateOperationsInput | boolean
    fieldCompanyRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldNotesEnabled?: BoolFieldUpdateOperationsInput | boolean
    fieldNotesRequired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProfileListRelationFilter = {
    every?: ProfileWhereInput
    some?: ProfileWhereInput
    none?: ProfileWhereInput
  }

  export type VisitorListRelationFilter = {
    every?: VisitorWhereInput
    some?: VisitorWhereInput
    none?: VisitorWhereInput
  }

  export type WorkspaceConfigNullableScalarRelationFilter = {
    is?: WorkspaceConfigWhereInput | null
    isNot?: WorkspaceConfigWhereInput | null
  }

  export type SubscriptionListRelationFilter = {
    every?: SubscriptionWhereInput
    some?: SubscriptionWhereInput
    none?: SubscriptionWhereInput
  }

  export type TransactionListRelationFilter = {
    every?: TransactionWhereInput
    some?: TransactionWhereInput
    none?: TransactionWhereInput
  }

  export type PublicRegistrationLinkListRelationFilter = {
    every?: PublicRegistrationLinkWhereInput
    some?: PublicRegistrationLinkWhereInput
    none?: PublicRegistrationLinkWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProfileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VisitorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubscriptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PublicRegistrationLinkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkspaceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    plan?: SortOrder
    createdAt?: SortOrder
  }

  export type WorkspaceAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type WorkspaceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    plan?: SortOrder
    createdAt?: SortOrder
  }

  export type WorkspaceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    plan?: SortOrder
    createdAt?: SortOrder
  }

  export type WorkspaceSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type WorkspaceScalarRelationFilter = {
    is?: WorkspaceWhereInput
    isNot?: WorkspaceWhereInput
  }

  export type WorkspaceConfigCountOrderByAggregateInput = {
    id?: SortOrder
    wid?: SortOrder
    departments?: SortOrder
    designations?: SortOrder
    officeBranches?: SortOrder
    workLocations?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkspaceConfigAvgOrderByAggregateInput = {
    id?: SortOrder
    wid?: SortOrder
  }

  export type WorkspaceConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    wid?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkspaceConfigMinOrderByAggregateInput = {
    id?: SortOrder
    wid?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkspaceConfigSumOrderByAggregateInput = {
    id?: SortOrder
    wid?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type WorkspaceNullableScalarRelationFilter = {
    is?: WorkspaceWhereInput | null
    isNot?: WorkspaceWhereInput | null
  }

  export type ProfileCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    department?: SortOrder
    designation?: SortOrder
    officeBranch?: SortOrder
    workLocation?: SortOrder
    avatarInitials?: SortOrder
    status?: SortOrder
    phoneNumber?: SortOrder
    personalEmail?: SortOrder
    bloodGroup?: SortOrder
    dob?: SortOrder
    code?: SortOrder
    joiningDate?: SortOrder
    reportingManager?: SortOrder
    reportingHR?: SortOrder
    emergencyName?: SortOrder
    emergencyPhone?: SortOrder
    acceptedTerms?: SortOrder
    acceptedPrivacy?: SortOrder
    consentAt?: SortOrder
    termsVersion?: SortOrder
    privacyVersion?: SortOrder
    createdAt?: SortOrder
    wid?: SortOrder
  }

  export type ProfileAvgOrderByAggregateInput = {
    wid?: SortOrder
  }

  export type ProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    department?: SortOrder
    designation?: SortOrder
    officeBranch?: SortOrder
    workLocation?: SortOrder
    avatarInitials?: SortOrder
    status?: SortOrder
    phoneNumber?: SortOrder
    personalEmail?: SortOrder
    bloodGroup?: SortOrder
    dob?: SortOrder
    code?: SortOrder
    joiningDate?: SortOrder
    reportingManager?: SortOrder
    reportingHR?: SortOrder
    emergencyName?: SortOrder
    emergencyPhone?: SortOrder
    acceptedTerms?: SortOrder
    acceptedPrivacy?: SortOrder
    consentAt?: SortOrder
    termsVersion?: SortOrder
    privacyVersion?: SortOrder
    createdAt?: SortOrder
    wid?: SortOrder
  }

  export type ProfileMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    department?: SortOrder
    designation?: SortOrder
    officeBranch?: SortOrder
    workLocation?: SortOrder
    avatarInitials?: SortOrder
    status?: SortOrder
    phoneNumber?: SortOrder
    personalEmail?: SortOrder
    bloodGroup?: SortOrder
    dob?: SortOrder
    code?: SortOrder
    joiningDate?: SortOrder
    reportingManager?: SortOrder
    reportingHR?: SortOrder
    emergencyName?: SortOrder
    emergencyPhone?: SortOrder
    acceptedTerms?: SortOrder
    acceptedPrivacy?: SortOrder
    consentAt?: SortOrder
    termsVersion?: SortOrder
    privacyVersion?: SortOrder
    createdAt?: SortOrder
    wid?: SortOrder
  }

  export type ProfileSumOrderByAggregateInput = {
    wid?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type ProfileScalarRelationFilter = {
    is?: ProfileWhereInput
    isNot?: ProfileWhereInput
  }

  export type VisitorCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    company?: SortOrder
    purpose?: SortOrder
    status?: SortOrder
    hostId?: SortOrder
    hostName?: SortOrder
    checkedInAt?: SortOrder
    checkedOutAt?: SortOrder
    preRegisteredAt?: SortOrder
    idProofType?: SortOrder
    idProofNumber?: SortOrder
    badgeNumber?: SortOrder
    qrCode?: SortOrder
    qrValidUntil?: SortOrder
    walkIn?: SortOrder
    notes?: SortOrder
    wid?: SortOrder
  }

  export type VisitorAvgOrderByAggregateInput = {
    wid?: SortOrder
  }

  export type VisitorMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    company?: SortOrder
    purpose?: SortOrder
    status?: SortOrder
    hostId?: SortOrder
    hostName?: SortOrder
    checkedInAt?: SortOrder
    checkedOutAt?: SortOrder
    preRegisteredAt?: SortOrder
    idProofType?: SortOrder
    idProofNumber?: SortOrder
    badgeNumber?: SortOrder
    qrCode?: SortOrder
    qrValidUntil?: SortOrder
    walkIn?: SortOrder
    notes?: SortOrder
    wid?: SortOrder
  }

  export type VisitorMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    company?: SortOrder
    purpose?: SortOrder
    status?: SortOrder
    hostId?: SortOrder
    hostName?: SortOrder
    checkedInAt?: SortOrder
    checkedOutAt?: SortOrder
    preRegisteredAt?: SortOrder
    idProofType?: SortOrder
    idProofNumber?: SortOrder
    badgeNumber?: SortOrder
    qrCode?: SortOrder
    qrValidUntil?: SortOrder
    walkIn?: SortOrder
    notes?: SortOrder
    wid?: SortOrder
  }

  export type VisitorSumOrderByAggregateInput = {
    wid?: SortOrder
  }

  export type SubscriptionCountOrderByAggregateInput = {
    id?: SortOrder
    wid?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    region?: SortOrder
    currentPeriodStart?: SortOrder
    currentPeriodEnd?: SortOrder
    cancelledAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionAvgOrderByAggregateInput = {
    wid?: SortOrder
    amount?: SortOrder
  }

  export type SubscriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    wid?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    region?: SortOrder
    currentPeriodStart?: SortOrder
    currentPeriodEnd?: SortOrder
    cancelledAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionMinOrderByAggregateInput = {
    id?: SortOrder
    wid?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    region?: SortOrder
    currentPeriodStart?: SortOrder
    currentPeriodEnd?: SortOrder
    cancelledAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionSumOrderByAggregateInput = {
    wid?: SortOrder
    amount?: SortOrder
  }

  export type SubscriptionScalarRelationFilter = {
    is?: SubscriptionWhereInput
    isNot?: SubscriptionWhereInput
  }

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder
    wid?: SortOrder
    subscriptionId?: SortOrder
    razorpayOrderId?: SortOrder
    razorpayPaymentId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    region?: SortOrder
    status?: SortOrder
    failureReason?: SortOrder
    createdAt?: SortOrder
    verifiedAt?: SortOrder
  }

  export type TransactionAvgOrderByAggregateInput = {
    wid?: SortOrder
    amount?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    wid?: SortOrder
    subscriptionId?: SortOrder
    razorpayOrderId?: SortOrder
    razorpayPaymentId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    region?: SortOrder
    status?: SortOrder
    failureReason?: SortOrder
    createdAt?: SortOrder
    verifiedAt?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder
    wid?: SortOrder
    subscriptionId?: SortOrder
    razorpayOrderId?: SortOrder
    razorpayPaymentId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    region?: SortOrder
    status?: SortOrder
    failureReason?: SortOrder
    createdAt?: SortOrder
    verifiedAt?: SortOrder
  }

  export type TransactionSumOrderByAggregateInput = {
    wid?: SortOrder
    amount?: SortOrder
  }

  export type PublicRegistrationLinkWidHostIdCompoundUniqueInput = {
    wid: number
    hostId: string
  }

  export type PublicRegistrationLinkCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    wid?: SortOrder
    hostId?: SortOrder
    officeBranch?: SortOrder
    enabled?: SortOrder
    designTheme?: SortOrder
    pageTitle?: SortOrder
    welcomeMessage?: SortOrder
    qrValidityPeriod?: SortOrder
    fieldNameRequired?: SortOrder
    fieldPhoneRequired?: SortOrder
    fieldEmailRequired?: SortOrder
    fieldPurposeRequired?: SortOrder
    fieldIdProofRequired?: SortOrder
    fieldCompanyEnabled?: SortOrder
    fieldCompanyRequired?: SortOrder
    fieldNotesEnabled?: SortOrder
    fieldNotesRequired?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PublicRegistrationLinkAvgOrderByAggregateInput = {
    wid?: SortOrder
  }

  export type PublicRegistrationLinkMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    wid?: SortOrder
    hostId?: SortOrder
    officeBranch?: SortOrder
    enabled?: SortOrder
    designTheme?: SortOrder
    pageTitle?: SortOrder
    welcomeMessage?: SortOrder
    qrValidityPeriod?: SortOrder
    fieldNameRequired?: SortOrder
    fieldPhoneRequired?: SortOrder
    fieldEmailRequired?: SortOrder
    fieldPurposeRequired?: SortOrder
    fieldIdProofRequired?: SortOrder
    fieldCompanyEnabled?: SortOrder
    fieldCompanyRequired?: SortOrder
    fieldNotesEnabled?: SortOrder
    fieldNotesRequired?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PublicRegistrationLinkMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    wid?: SortOrder
    hostId?: SortOrder
    officeBranch?: SortOrder
    enabled?: SortOrder
    designTheme?: SortOrder
    pageTitle?: SortOrder
    welcomeMessage?: SortOrder
    qrValidityPeriod?: SortOrder
    fieldNameRequired?: SortOrder
    fieldPhoneRequired?: SortOrder
    fieldEmailRequired?: SortOrder
    fieldPurposeRequired?: SortOrder
    fieldIdProofRequired?: SortOrder
    fieldCompanyEnabled?: SortOrder
    fieldCompanyRequired?: SortOrder
    fieldNotesEnabled?: SortOrder
    fieldNotesRequired?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PublicRegistrationLinkSumOrderByAggregateInput = {
    wid?: SortOrder
  }

  export type ProfileCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<ProfileCreateWithoutWorkspaceInput, ProfileUncheckedCreateWithoutWorkspaceInput> | ProfileCreateWithoutWorkspaceInput[] | ProfileUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: ProfileCreateOrConnectWithoutWorkspaceInput | ProfileCreateOrConnectWithoutWorkspaceInput[]
    createMany?: ProfileCreateManyWorkspaceInputEnvelope
    connect?: ProfileWhereUniqueInput | ProfileWhereUniqueInput[]
  }

  export type VisitorCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<VisitorCreateWithoutWorkspaceInput, VisitorUncheckedCreateWithoutWorkspaceInput> | VisitorCreateWithoutWorkspaceInput[] | VisitorUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: VisitorCreateOrConnectWithoutWorkspaceInput | VisitorCreateOrConnectWithoutWorkspaceInput[]
    createMany?: VisitorCreateManyWorkspaceInputEnvelope
    connect?: VisitorWhereUniqueInput | VisitorWhereUniqueInput[]
  }

  export type WorkspaceConfigCreateNestedOneWithoutWorkspaceInput = {
    create?: XOR<WorkspaceConfigCreateWithoutWorkspaceInput, WorkspaceConfigUncheckedCreateWithoutWorkspaceInput>
    connectOrCreate?: WorkspaceConfigCreateOrConnectWithoutWorkspaceInput
    connect?: WorkspaceConfigWhereUniqueInput
  }

  export type SubscriptionCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<SubscriptionCreateWithoutWorkspaceInput, SubscriptionUncheckedCreateWithoutWorkspaceInput> | SubscriptionCreateWithoutWorkspaceInput[] | SubscriptionUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutWorkspaceInput | SubscriptionCreateOrConnectWithoutWorkspaceInput[]
    createMany?: SubscriptionCreateManyWorkspaceInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type TransactionCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<TransactionCreateWithoutWorkspaceInput, TransactionUncheckedCreateWithoutWorkspaceInput> | TransactionCreateWithoutWorkspaceInput[] | TransactionUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutWorkspaceInput | TransactionCreateOrConnectWithoutWorkspaceInput[]
    createMany?: TransactionCreateManyWorkspaceInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type PublicRegistrationLinkCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<PublicRegistrationLinkCreateWithoutWorkspaceInput, PublicRegistrationLinkUncheckedCreateWithoutWorkspaceInput> | PublicRegistrationLinkCreateWithoutWorkspaceInput[] | PublicRegistrationLinkUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: PublicRegistrationLinkCreateOrConnectWithoutWorkspaceInput | PublicRegistrationLinkCreateOrConnectWithoutWorkspaceInput[]
    createMany?: PublicRegistrationLinkCreateManyWorkspaceInputEnvelope
    connect?: PublicRegistrationLinkWhereUniqueInput | PublicRegistrationLinkWhereUniqueInput[]
  }

  export type ProfileUncheckedCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<ProfileCreateWithoutWorkspaceInput, ProfileUncheckedCreateWithoutWorkspaceInput> | ProfileCreateWithoutWorkspaceInput[] | ProfileUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: ProfileCreateOrConnectWithoutWorkspaceInput | ProfileCreateOrConnectWithoutWorkspaceInput[]
    createMany?: ProfileCreateManyWorkspaceInputEnvelope
    connect?: ProfileWhereUniqueInput | ProfileWhereUniqueInput[]
  }

  export type VisitorUncheckedCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<VisitorCreateWithoutWorkspaceInput, VisitorUncheckedCreateWithoutWorkspaceInput> | VisitorCreateWithoutWorkspaceInput[] | VisitorUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: VisitorCreateOrConnectWithoutWorkspaceInput | VisitorCreateOrConnectWithoutWorkspaceInput[]
    createMany?: VisitorCreateManyWorkspaceInputEnvelope
    connect?: VisitorWhereUniqueInput | VisitorWhereUniqueInput[]
  }

  export type WorkspaceConfigUncheckedCreateNestedOneWithoutWorkspaceInput = {
    create?: XOR<WorkspaceConfigCreateWithoutWorkspaceInput, WorkspaceConfigUncheckedCreateWithoutWorkspaceInput>
    connectOrCreate?: WorkspaceConfigCreateOrConnectWithoutWorkspaceInput
    connect?: WorkspaceConfigWhereUniqueInput
  }

  export type SubscriptionUncheckedCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<SubscriptionCreateWithoutWorkspaceInput, SubscriptionUncheckedCreateWithoutWorkspaceInput> | SubscriptionCreateWithoutWorkspaceInput[] | SubscriptionUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutWorkspaceInput | SubscriptionCreateOrConnectWithoutWorkspaceInput[]
    createMany?: SubscriptionCreateManyWorkspaceInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<TransactionCreateWithoutWorkspaceInput, TransactionUncheckedCreateWithoutWorkspaceInput> | TransactionCreateWithoutWorkspaceInput[] | TransactionUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutWorkspaceInput | TransactionCreateOrConnectWithoutWorkspaceInput[]
    createMany?: TransactionCreateManyWorkspaceInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type PublicRegistrationLinkUncheckedCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<PublicRegistrationLinkCreateWithoutWorkspaceInput, PublicRegistrationLinkUncheckedCreateWithoutWorkspaceInput> | PublicRegistrationLinkCreateWithoutWorkspaceInput[] | PublicRegistrationLinkUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: PublicRegistrationLinkCreateOrConnectWithoutWorkspaceInput | PublicRegistrationLinkCreateOrConnectWithoutWorkspaceInput[]
    createMany?: PublicRegistrationLinkCreateManyWorkspaceInputEnvelope
    connect?: PublicRegistrationLinkWhereUniqueInput | PublicRegistrationLinkWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProfileUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<ProfileCreateWithoutWorkspaceInput, ProfileUncheckedCreateWithoutWorkspaceInput> | ProfileCreateWithoutWorkspaceInput[] | ProfileUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: ProfileCreateOrConnectWithoutWorkspaceInput | ProfileCreateOrConnectWithoutWorkspaceInput[]
    upsert?: ProfileUpsertWithWhereUniqueWithoutWorkspaceInput | ProfileUpsertWithWhereUniqueWithoutWorkspaceInput[]
    createMany?: ProfileCreateManyWorkspaceInputEnvelope
    set?: ProfileWhereUniqueInput | ProfileWhereUniqueInput[]
    disconnect?: ProfileWhereUniqueInput | ProfileWhereUniqueInput[]
    delete?: ProfileWhereUniqueInput | ProfileWhereUniqueInput[]
    connect?: ProfileWhereUniqueInput | ProfileWhereUniqueInput[]
    update?: ProfileUpdateWithWhereUniqueWithoutWorkspaceInput | ProfileUpdateWithWhereUniqueWithoutWorkspaceInput[]
    updateMany?: ProfileUpdateManyWithWhereWithoutWorkspaceInput | ProfileUpdateManyWithWhereWithoutWorkspaceInput[]
    deleteMany?: ProfileScalarWhereInput | ProfileScalarWhereInput[]
  }

  export type VisitorUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<VisitorCreateWithoutWorkspaceInput, VisitorUncheckedCreateWithoutWorkspaceInput> | VisitorCreateWithoutWorkspaceInput[] | VisitorUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: VisitorCreateOrConnectWithoutWorkspaceInput | VisitorCreateOrConnectWithoutWorkspaceInput[]
    upsert?: VisitorUpsertWithWhereUniqueWithoutWorkspaceInput | VisitorUpsertWithWhereUniqueWithoutWorkspaceInput[]
    createMany?: VisitorCreateManyWorkspaceInputEnvelope
    set?: VisitorWhereUniqueInput | VisitorWhereUniqueInput[]
    disconnect?: VisitorWhereUniqueInput | VisitorWhereUniqueInput[]
    delete?: VisitorWhereUniqueInput | VisitorWhereUniqueInput[]
    connect?: VisitorWhereUniqueInput | VisitorWhereUniqueInput[]
    update?: VisitorUpdateWithWhereUniqueWithoutWorkspaceInput | VisitorUpdateWithWhereUniqueWithoutWorkspaceInput[]
    updateMany?: VisitorUpdateManyWithWhereWithoutWorkspaceInput | VisitorUpdateManyWithWhereWithoutWorkspaceInput[]
    deleteMany?: VisitorScalarWhereInput | VisitorScalarWhereInput[]
  }

  export type WorkspaceConfigUpdateOneWithoutWorkspaceNestedInput = {
    create?: XOR<WorkspaceConfigCreateWithoutWorkspaceInput, WorkspaceConfigUncheckedCreateWithoutWorkspaceInput>
    connectOrCreate?: WorkspaceConfigCreateOrConnectWithoutWorkspaceInput
    upsert?: WorkspaceConfigUpsertWithoutWorkspaceInput
    disconnect?: WorkspaceConfigWhereInput | boolean
    delete?: WorkspaceConfigWhereInput | boolean
    connect?: WorkspaceConfigWhereUniqueInput
    update?: XOR<XOR<WorkspaceConfigUpdateToOneWithWhereWithoutWorkspaceInput, WorkspaceConfigUpdateWithoutWorkspaceInput>, WorkspaceConfigUncheckedUpdateWithoutWorkspaceInput>
  }

  export type SubscriptionUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<SubscriptionCreateWithoutWorkspaceInput, SubscriptionUncheckedCreateWithoutWorkspaceInput> | SubscriptionCreateWithoutWorkspaceInput[] | SubscriptionUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutWorkspaceInput | SubscriptionCreateOrConnectWithoutWorkspaceInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutWorkspaceInput | SubscriptionUpsertWithWhereUniqueWithoutWorkspaceInput[]
    createMany?: SubscriptionCreateManyWorkspaceInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutWorkspaceInput | SubscriptionUpdateWithWhereUniqueWithoutWorkspaceInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutWorkspaceInput | SubscriptionUpdateManyWithWhereWithoutWorkspaceInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type TransactionUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<TransactionCreateWithoutWorkspaceInput, TransactionUncheckedCreateWithoutWorkspaceInput> | TransactionCreateWithoutWorkspaceInput[] | TransactionUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutWorkspaceInput | TransactionCreateOrConnectWithoutWorkspaceInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutWorkspaceInput | TransactionUpsertWithWhereUniqueWithoutWorkspaceInput[]
    createMany?: TransactionCreateManyWorkspaceInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutWorkspaceInput | TransactionUpdateWithWhereUniqueWithoutWorkspaceInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutWorkspaceInput | TransactionUpdateManyWithWhereWithoutWorkspaceInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type PublicRegistrationLinkUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<PublicRegistrationLinkCreateWithoutWorkspaceInput, PublicRegistrationLinkUncheckedCreateWithoutWorkspaceInput> | PublicRegistrationLinkCreateWithoutWorkspaceInput[] | PublicRegistrationLinkUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: PublicRegistrationLinkCreateOrConnectWithoutWorkspaceInput | PublicRegistrationLinkCreateOrConnectWithoutWorkspaceInput[]
    upsert?: PublicRegistrationLinkUpsertWithWhereUniqueWithoutWorkspaceInput | PublicRegistrationLinkUpsertWithWhereUniqueWithoutWorkspaceInput[]
    createMany?: PublicRegistrationLinkCreateManyWorkspaceInputEnvelope
    set?: PublicRegistrationLinkWhereUniqueInput | PublicRegistrationLinkWhereUniqueInput[]
    disconnect?: PublicRegistrationLinkWhereUniqueInput | PublicRegistrationLinkWhereUniqueInput[]
    delete?: PublicRegistrationLinkWhereUniqueInput | PublicRegistrationLinkWhereUniqueInput[]
    connect?: PublicRegistrationLinkWhereUniqueInput | PublicRegistrationLinkWhereUniqueInput[]
    update?: PublicRegistrationLinkUpdateWithWhereUniqueWithoutWorkspaceInput | PublicRegistrationLinkUpdateWithWhereUniqueWithoutWorkspaceInput[]
    updateMany?: PublicRegistrationLinkUpdateManyWithWhereWithoutWorkspaceInput | PublicRegistrationLinkUpdateManyWithWhereWithoutWorkspaceInput[]
    deleteMany?: PublicRegistrationLinkScalarWhereInput | PublicRegistrationLinkScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProfileUncheckedUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<ProfileCreateWithoutWorkspaceInput, ProfileUncheckedCreateWithoutWorkspaceInput> | ProfileCreateWithoutWorkspaceInput[] | ProfileUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: ProfileCreateOrConnectWithoutWorkspaceInput | ProfileCreateOrConnectWithoutWorkspaceInput[]
    upsert?: ProfileUpsertWithWhereUniqueWithoutWorkspaceInput | ProfileUpsertWithWhereUniqueWithoutWorkspaceInput[]
    createMany?: ProfileCreateManyWorkspaceInputEnvelope
    set?: ProfileWhereUniqueInput | ProfileWhereUniqueInput[]
    disconnect?: ProfileWhereUniqueInput | ProfileWhereUniqueInput[]
    delete?: ProfileWhereUniqueInput | ProfileWhereUniqueInput[]
    connect?: ProfileWhereUniqueInput | ProfileWhereUniqueInput[]
    update?: ProfileUpdateWithWhereUniqueWithoutWorkspaceInput | ProfileUpdateWithWhereUniqueWithoutWorkspaceInput[]
    updateMany?: ProfileUpdateManyWithWhereWithoutWorkspaceInput | ProfileUpdateManyWithWhereWithoutWorkspaceInput[]
    deleteMany?: ProfileScalarWhereInput | ProfileScalarWhereInput[]
  }

  export type VisitorUncheckedUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<VisitorCreateWithoutWorkspaceInput, VisitorUncheckedCreateWithoutWorkspaceInput> | VisitorCreateWithoutWorkspaceInput[] | VisitorUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: VisitorCreateOrConnectWithoutWorkspaceInput | VisitorCreateOrConnectWithoutWorkspaceInput[]
    upsert?: VisitorUpsertWithWhereUniqueWithoutWorkspaceInput | VisitorUpsertWithWhereUniqueWithoutWorkspaceInput[]
    createMany?: VisitorCreateManyWorkspaceInputEnvelope
    set?: VisitorWhereUniqueInput | VisitorWhereUniqueInput[]
    disconnect?: VisitorWhereUniqueInput | VisitorWhereUniqueInput[]
    delete?: VisitorWhereUniqueInput | VisitorWhereUniqueInput[]
    connect?: VisitorWhereUniqueInput | VisitorWhereUniqueInput[]
    update?: VisitorUpdateWithWhereUniqueWithoutWorkspaceInput | VisitorUpdateWithWhereUniqueWithoutWorkspaceInput[]
    updateMany?: VisitorUpdateManyWithWhereWithoutWorkspaceInput | VisitorUpdateManyWithWhereWithoutWorkspaceInput[]
    deleteMany?: VisitorScalarWhereInput | VisitorScalarWhereInput[]
  }

  export type WorkspaceConfigUncheckedUpdateOneWithoutWorkspaceNestedInput = {
    create?: XOR<WorkspaceConfigCreateWithoutWorkspaceInput, WorkspaceConfigUncheckedCreateWithoutWorkspaceInput>
    connectOrCreate?: WorkspaceConfigCreateOrConnectWithoutWorkspaceInput
    upsert?: WorkspaceConfigUpsertWithoutWorkspaceInput
    disconnect?: WorkspaceConfigWhereInput | boolean
    delete?: WorkspaceConfigWhereInput | boolean
    connect?: WorkspaceConfigWhereUniqueInput
    update?: XOR<XOR<WorkspaceConfigUpdateToOneWithWhereWithoutWorkspaceInput, WorkspaceConfigUpdateWithoutWorkspaceInput>, WorkspaceConfigUncheckedUpdateWithoutWorkspaceInput>
  }

  export type SubscriptionUncheckedUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<SubscriptionCreateWithoutWorkspaceInput, SubscriptionUncheckedCreateWithoutWorkspaceInput> | SubscriptionCreateWithoutWorkspaceInput[] | SubscriptionUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutWorkspaceInput | SubscriptionCreateOrConnectWithoutWorkspaceInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutWorkspaceInput | SubscriptionUpsertWithWhereUniqueWithoutWorkspaceInput[]
    createMany?: SubscriptionCreateManyWorkspaceInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutWorkspaceInput | SubscriptionUpdateWithWhereUniqueWithoutWorkspaceInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutWorkspaceInput | SubscriptionUpdateManyWithWhereWithoutWorkspaceInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<TransactionCreateWithoutWorkspaceInput, TransactionUncheckedCreateWithoutWorkspaceInput> | TransactionCreateWithoutWorkspaceInput[] | TransactionUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutWorkspaceInput | TransactionCreateOrConnectWithoutWorkspaceInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutWorkspaceInput | TransactionUpsertWithWhereUniqueWithoutWorkspaceInput[]
    createMany?: TransactionCreateManyWorkspaceInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutWorkspaceInput | TransactionUpdateWithWhereUniqueWithoutWorkspaceInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutWorkspaceInput | TransactionUpdateManyWithWhereWithoutWorkspaceInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type PublicRegistrationLinkUncheckedUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<PublicRegistrationLinkCreateWithoutWorkspaceInput, PublicRegistrationLinkUncheckedCreateWithoutWorkspaceInput> | PublicRegistrationLinkCreateWithoutWorkspaceInput[] | PublicRegistrationLinkUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: PublicRegistrationLinkCreateOrConnectWithoutWorkspaceInput | PublicRegistrationLinkCreateOrConnectWithoutWorkspaceInput[]
    upsert?: PublicRegistrationLinkUpsertWithWhereUniqueWithoutWorkspaceInput | PublicRegistrationLinkUpsertWithWhereUniqueWithoutWorkspaceInput[]
    createMany?: PublicRegistrationLinkCreateManyWorkspaceInputEnvelope
    set?: PublicRegistrationLinkWhereUniqueInput | PublicRegistrationLinkWhereUniqueInput[]
    disconnect?: PublicRegistrationLinkWhereUniqueInput | PublicRegistrationLinkWhereUniqueInput[]
    delete?: PublicRegistrationLinkWhereUniqueInput | PublicRegistrationLinkWhereUniqueInput[]
    connect?: PublicRegistrationLinkWhereUniqueInput | PublicRegistrationLinkWhereUniqueInput[]
    update?: PublicRegistrationLinkUpdateWithWhereUniqueWithoutWorkspaceInput | PublicRegistrationLinkUpdateWithWhereUniqueWithoutWorkspaceInput[]
    updateMany?: PublicRegistrationLinkUpdateManyWithWhereWithoutWorkspaceInput | PublicRegistrationLinkUpdateManyWithWhereWithoutWorkspaceInput[]
    deleteMany?: PublicRegistrationLinkScalarWhereInput | PublicRegistrationLinkScalarWhereInput[]
  }

  export type WorkspaceConfigCreatedepartmentsInput = {
    set: string[]
  }

  export type WorkspaceConfigCreatedesignationsInput = {
    set: string[]
  }

  export type WorkspaceConfigCreateofficeBranchesInput = {
    set: string[]
  }

  export type WorkspaceConfigCreateworkLocationsInput = {
    set: string[]
  }

  export type WorkspaceCreateNestedOneWithoutConfigInput = {
    create?: XOR<WorkspaceCreateWithoutConfigInput, WorkspaceUncheckedCreateWithoutConfigInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutConfigInput
    connect?: WorkspaceWhereUniqueInput
  }

  export type WorkspaceConfigUpdatedepartmentsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type WorkspaceConfigUpdatedesignationsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type WorkspaceConfigUpdateofficeBranchesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type WorkspaceConfigUpdateworkLocationsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type WorkspaceUpdateOneRequiredWithoutConfigNestedInput = {
    create?: XOR<WorkspaceCreateWithoutConfigInput, WorkspaceUncheckedCreateWithoutConfigInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutConfigInput
    upsert?: WorkspaceUpsertWithoutConfigInput
    connect?: WorkspaceWhereUniqueInput
    update?: XOR<XOR<WorkspaceUpdateToOneWithWhereWithoutConfigInput, WorkspaceUpdateWithoutConfigInput>, WorkspaceUncheckedUpdateWithoutConfigInput>
  }

  export type WorkspaceCreateNestedOneWithoutProfilesInput = {
    create?: XOR<WorkspaceCreateWithoutProfilesInput, WorkspaceUncheckedCreateWithoutProfilesInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutProfilesInput
    connect?: WorkspaceWhereUniqueInput
  }

  export type VisitorCreateNestedManyWithoutHostInput = {
    create?: XOR<VisitorCreateWithoutHostInput, VisitorUncheckedCreateWithoutHostInput> | VisitorCreateWithoutHostInput[] | VisitorUncheckedCreateWithoutHostInput[]
    connectOrCreate?: VisitorCreateOrConnectWithoutHostInput | VisitorCreateOrConnectWithoutHostInput[]
    createMany?: VisitorCreateManyHostInputEnvelope
    connect?: VisitorWhereUniqueInput | VisitorWhereUniqueInput[]
  }

  export type PublicRegistrationLinkCreateNestedManyWithoutHostInput = {
    create?: XOR<PublicRegistrationLinkCreateWithoutHostInput, PublicRegistrationLinkUncheckedCreateWithoutHostInput> | PublicRegistrationLinkCreateWithoutHostInput[] | PublicRegistrationLinkUncheckedCreateWithoutHostInput[]
    connectOrCreate?: PublicRegistrationLinkCreateOrConnectWithoutHostInput | PublicRegistrationLinkCreateOrConnectWithoutHostInput[]
    createMany?: PublicRegistrationLinkCreateManyHostInputEnvelope
    connect?: PublicRegistrationLinkWhereUniqueInput | PublicRegistrationLinkWhereUniqueInput[]
  }

  export type VisitorUncheckedCreateNestedManyWithoutHostInput = {
    create?: XOR<VisitorCreateWithoutHostInput, VisitorUncheckedCreateWithoutHostInput> | VisitorCreateWithoutHostInput[] | VisitorUncheckedCreateWithoutHostInput[]
    connectOrCreate?: VisitorCreateOrConnectWithoutHostInput | VisitorCreateOrConnectWithoutHostInput[]
    createMany?: VisitorCreateManyHostInputEnvelope
    connect?: VisitorWhereUniqueInput | VisitorWhereUniqueInput[]
  }

  export type PublicRegistrationLinkUncheckedCreateNestedManyWithoutHostInput = {
    create?: XOR<PublicRegistrationLinkCreateWithoutHostInput, PublicRegistrationLinkUncheckedCreateWithoutHostInput> | PublicRegistrationLinkCreateWithoutHostInput[] | PublicRegistrationLinkUncheckedCreateWithoutHostInput[]
    connectOrCreate?: PublicRegistrationLinkCreateOrConnectWithoutHostInput | PublicRegistrationLinkCreateOrConnectWithoutHostInput[]
    createMany?: PublicRegistrationLinkCreateManyHostInputEnvelope
    connect?: PublicRegistrationLinkWhereUniqueInput | PublicRegistrationLinkWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type WorkspaceUpdateOneWithoutProfilesNestedInput = {
    create?: XOR<WorkspaceCreateWithoutProfilesInput, WorkspaceUncheckedCreateWithoutProfilesInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutProfilesInput
    upsert?: WorkspaceUpsertWithoutProfilesInput
    disconnect?: WorkspaceWhereInput | boolean
    delete?: WorkspaceWhereInput | boolean
    connect?: WorkspaceWhereUniqueInput
    update?: XOR<XOR<WorkspaceUpdateToOneWithWhereWithoutProfilesInput, WorkspaceUpdateWithoutProfilesInput>, WorkspaceUncheckedUpdateWithoutProfilesInput>
  }

  export type VisitorUpdateManyWithoutHostNestedInput = {
    create?: XOR<VisitorCreateWithoutHostInput, VisitorUncheckedCreateWithoutHostInput> | VisitorCreateWithoutHostInput[] | VisitorUncheckedCreateWithoutHostInput[]
    connectOrCreate?: VisitorCreateOrConnectWithoutHostInput | VisitorCreateOrConnectWithoutHostInput[]
    upsert?: VisitorUpsertWithWhereUniqueWithoutHostInput | VisitorUpsertWithWhereUniqueWithoutHostInput[]
    createMany?: VisitorCreateManyHostInputEnvelope
    set?: VisitorWhereUniqueInput | VisitorWhereUniqueInput[]
    disconnect?: VisitorWhereUniqueInput | VisitorWhereUniqueInput[]
    delete?: VisitorWhereUniqueInput | VisitorWhereUniqueInput[]
    connect?: VisitorWhereUniqueInput | VisitorWhereUniqueInput[]
    update?: VisitorUpdateWithWhereUniqueWithoutHostInput | VisitorUpdateWithWhereUniqueWithoutHostInput[]
    updateMany?: VisitorUpdateManyWithWhereWithoutHostInput | VisitorUpdateManyWithWhereWithoutHostInput[]
    deleteMany?: VisitorScalarWhereInput | VisitorScalarWhereInput[]
  }

  export type PublicRegistrationLinkUpdateManyWithoutHostNestedInput = {
    create?: XOR<PublicRegistrationLinkCreateWithoutHostInput, PublicRegistrationLinkUncheckedCreateWithoutHostInput> | PublicRegistrationLinkCreateWithoutHostInput[] | PublicRegistrationLinkUncheckedCreateWithoutHostInput[]
    connectOrCreate?: PublicRegistrationLinkCreateOrConnectWithoutHostInput | PublicRegistrationLinkCreateOrConnectWithoutHostInput[]
    upsert?: PublicRegistrationLinkUpsertWithWhereUniqueWithoutHostInput | PublicRegistrationLinkUpsertWithWhereUniqueWithoutHostInput[]
    createMany?: PublicRegistrationLinkCreateManyHostInputEnvelope
    set?: PublicRegistrationLinkWhereUniqueInput | PublicRegistrationLinkWhereUniqueInput[]
    disconnect?: PublicRegistrationLinkWhereUniqueInput | PublicRegistrationLinkWhereUniqueInput[]
    delete?: PublicRegistrationLinkWhereUniqueInput | PublicRegistrationLinkWhereUniqueInput[]
    connect?: PublicRegistrationLinkWhereUniqueInput | PublicRegistrationLinkWhereUniqueInput[]
    update?: PublicRegistrationLinkUpdateWithWhereUniqueWithoutHostInput | PublicRegistrationLinkUpdateWithWhereUniqueWithoutHostInput[]
    updateMany?: PublicRegistrationLinkUpdateManyWithWhereWithoutHostInput | PublicRegistrationLinkUpdateManyWithWhereWithoutHostInput[]
    deleteMany?: PublicRegistrationLinkScalarWhereInput | PublicRegistrationLinkScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type VisitorUncheckedUpdateManyWithoutHostNestedInput = {
    create?: XOR<VisitorCreateWithoutHostInput, VisitorUncheckedCreateWithoutHostInput> | VisitorCreateWithoutHostInput[] | VisitorUncheckedCreateWithoutHostInput[]
    connectOrCreate?: VisitorCreateOrConnectWithoutHostInput | VisitorCreateOrConnectWithoutHostInput[]
    upsert?: VisitorUpsertWithWhereUniqueWithoutHostInput | VisitorUpsertWithWhereUniqueWithoutHostInput[]
    createMany?: VisitorCreateManyHostInputEnvelope
    set?: VisitorWhereUniqueInput | VisitorWhereUniqueInput[]
    disconnect?: VisitorWhereUniqueInput | VisitorWhereUniqueInput[]
    delete?: VisitorWhereUniqueInput | VisitorWhereUniqueInput[]
    connect?: VisitorWhereUniqueInput | VisitorWhereUniqueInput[]
    update?: VisitorUpdateWithWhereUniqueWithoutHostInput | VisitorUpdateWithWhereUniqueWithoutHostInput[]
    updateMany?: VisitorUpdateManyWithWhereWithoutHostInput | VisitorUpdateManyWithWhereWithoutHostInput[]
    deleteMany?: VisitorScalarWhereInput | VisitorScalarWhereInput[]
  }

  export type PublicRegistrationLinkUncheckedUpdateManyWithoutHostNestedInput = {
    create?: XOR<PublicRegistrationLinkCreateWithoutHostInput, PublicRegistrationLinkUncheckedCreateWithoutHostInput> | PublicRegistrationLinkCreateWithoutHostInput[] | PublicRegistrationLinkUncheckedCreateWithoutHostInput[]
    connectOrCreate?: PublicRegistrationLinkCreateOrConnectWithoutHostInput | PublicRegistrationLinkCreateOrConnectWithoutHostInput[]
    upsert?: PublicRegistrationLinkUpsertWithWhereUniqueWithoutHostInput | PublicRegistrationLinkUpsertWithWhereUniqueWithoutHostInput[]
    createMany?: PublicRegistrationLinkCreateManyHostInputEnvelope
    set?: PublicRegistrationLinkWhereUniqueInput | PublicRegistrationLinkWhereUniqueInput[]
    disconnect?: PublicRegistrationLinkWhereUniqueInput | PublicRegistrationLinkWhereUniqueInput[]
    delete?: PublicRegistrationLinkWhereUniqueInput | PublicRegistrationLinkWhereUniqueInput[]
    connect?: PublicRegistrationLinkWhereUniqueInput | PublicRegistrationLinkWhereUniqueInput[]
    update?: PublicRegistrationLinkUpdateWithWhereUniqueWithoutHostInput | PublicRegistrationLinkUpdateWithWhereUniqueWithoutHostInput[]
    updateMany?: PublicRegistrationLinkUpdateManyWithWhereWithoutHostInput | PublicRegistrationLinkUpdateManyWithWhereWithoutHostInput[]
    deleteMany?: PublicRegistrationLinkScalarWhereInput | PublicRegistrationLinkScalarWhereInput[]
  }

  export type ProfileCreateNestedOneWithoutVisitorsInput = {
    create?: XOR<ProfileCreateWithoutVisitorsInput, ProfileUncheckedCreateWithoutVisitorsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutVisitorsInput
    connect?: ProfileWhereUniqueInput
  }

  export type WorkspaceCreateNestedOneWithoutVisitorsInput = {
    create?: XOR<WorkspaceCreateWithoutVisitorsInput, WorkspaceUncheckedCreateWithoutVisitorsInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutVisitorsInput
    connect?: WorkspaceWhereUniqueInput
  }

  export type ProfileUpdateOneRequiredWithoutVisitorsNestedInput = {
    create?: XOR<ProfileCreateWithoutVisitorsInput, ProfileUncheckedCreateWithoutVisitorsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutVisitorsInput
    upsert?: ProfileUpsertWithoutVisitorsInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutVisitorsInput, ProfileUpdateWithoutVisitorsInput>, ProfileUncheckedUpdateWithoutVisitorsInput>
  }

  export type WorkspaceUpdateOneRequiredWithoutVisitorsNestedInput = {
    create?: XOR<WorkspaceCreateWithoutVisitorsInput, WorkspaceUncheckedCreateWithoutVisitorsInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutVisitorsInput
    upsert?: WorkspaceUpsertWithoutVisitorsInput
    connect?: WorkspaceWhereUniqueInput
    update?: XOR<XOR<WorkspaceUpdateToOneWithWhereWithoutVisitorsInput, WorkspaceUpdateWithoutVisitorsInput>, WorkspaceUncheckedUpdateWithoutVisitorsInput>
  }

  export type WorkspaceCreateNestedOneWithoutSubscriptionsInput = {
    create?: XOR<WorkspaceCreateWithoutSubscriptionsInput, WorkspaceUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutSubscriptionsInput
    connect?: WorkspaceWhereUniqueInput
  }

  export type TransactionCreateNestedManyWithoutSubscriptionInput = {
    create?: XOR<TransactionCreateWithoutSubscriptionInput, TransactionUncheckedCreateWithoutSubscriptionInput> | TransactionCreateWithoutSubscriptionInput[] | TransactionUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutSubscriptionInput | TransactionCreateOrConnectWithoutSubscriptionInput[]
    createMany?: TransactionCreateManySubscriptionInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutSubscriptionInput = {
    create?: XOR<TransactionCreateWithoutSubscriptionInput, TransactionUncheckedCreateWithoutSubscriptionInput> | TransactionCreateWithoutSubscriptionInput[] | TransactionUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutSubscriptionInput | TransactionCreateOrConnectWithoutSubscriptionInput[]
    createMany?: TransactionCreateManySubscriptionInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type WorkspaceUpdateOneRequiredWithoutSubscriptionsNestedInput = {
    create?: XOR<WorkspaceCreateWithoutSubscriptionsInput, WorkspaceUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutSubscriptionsInput
    upsert?: WorkspaceUpsertWithoutSubscriptionsInput
    connect?: WorkspaceWhereUniqueInput
    update?: XOR<XOR<WorkspaceUpdateToOneWithWhereWithoutSubscriptionsInput, WorkspaceUpdateWithoutSubscriptionsInput>, WorkspaceUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type TransactionUpdateManyWithoutSubscriptionNestedInput = {
    create?: XOR<TransactionCreateWithoutSubscriptionInput, TransactionUncheckedCreateWithoutSubscriptionInput> | TransactionCreateWithoutSubscriptionInput[] | TransactionUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutSubscriptionInput | TransactionCreateOrConnectWithoutSubscriptionInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutSubscriptionInput | TransactionUpsertWithWhereUniqueWithoutSubscriptionInput[]
    createMany?: TransactionCreateManySubscriptionInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutSubscriptionInput | TransactionUpdateWithWhereUniqueWithoutSubscriptionInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutSubscriptionInput | TransactionUpdateManyWithWhereWithoutSubscriptionInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutSubscriptionNestedInput = {
    create?: XOR<TransactionCreateWithoutSubscriptionInput, TransactionUncheckedCreateWithoutSubscriptionInput> | TransactionCreateWithoutSubscriptionInput[] | TransactionUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutSubscriptionInput | TransactionCreateOrConnectWithoutSubscriptionInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutSubscriptionInput | TransactionUpsertWithWhereUniqueWithoutSubscriptionInput[]
    createMany?: TransactionCreateManySubscriptionInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutSubscriptionInput | TransactionUpdateWithWhereUniqueWithoutSubscriptionInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutSubscriptionInput | TransactionUpdateManyWithWhereWithoutSubscriptionInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type WorkspaceCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<WorkspaceCreateWithoutTransactionsInput, WorkspaceUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutTransactionsInput
    connect?: WorkspaceWhereUniqueInput
  }

  export type SubscriptionCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<SubscriptionCreateWithoutTransactionsInput, SubscriptionUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutTransactionsInput
    connect?: SubscriptionWhereUniqueInput
  }

  export type WorkspaceUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<WorkspaceCreateWithoutTransactionsInput, WorkspaceUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutTransactionsInput
    upsert?: WorkspaceUpsertWithoutTransactionsInput
    connect?: WorkspaceWhereUniqueInput
    update?: XOR<XOR<WorkspaceUpdateToOneWithWhereWithoutTransactionsInput, WorkspaceUpdateWithoutTransactionsInput>, WorkspaceUncheckedUpdateWithoutTransactionsInput>
  }

  export type SubscriptionUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<SubscriptionCreateWithoutTransactionsInput, SubscriptionUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutTransactionsInput
    upsert?: SubscriptionUpsertWithoutTransactionsInput
    connect?: SubscriptionWhereUniqueInput
    update?: XOR<XOR<SubscriptionUpdateToOneWithWhereWithoutTransactionsInput, SubscriptionUpdateWithoutTransactionsInput>, SubscriptionUncheckedUpdateWithoutTransactionsInput>
  }

  export type WorkspaceCreateNestedOneWithoutRegistrationLinksInput = {
    create?: XOR<WorkspaceCreateWithoutRegistrationLinksInput, WorkspaceUncheckedCreateWithoutRegistrationLinksInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutRegistrationLinksInput
    connect?: WorkspaceWhereUniqueInput
  }

  export type ProfileCreateNestedOneWithoutRegistrationLinksInput = {
    create?: XOR<ProfileCreateWithoutRegistrationLinksInput, ProfileUncheckedCreateWithoutRegistrationLinksInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutRegistrationLinksInput
    connect?: ProfileWhereUniqueInput
  }

  export type WorkspaceUpdateOneRequiredWithoutRegistrationLinksNestedInput = {
    create?: XOR<WorkspaceCreateWithoutRegistrationLinksInput, WorkspaceUncheckedCreateWithoutRegistrationLinksInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutRegistrationLinksInput
    upsert?: WorkspaceUpsertWithoutRegistrationLinksInput
    connect?: WorkspaceWhereUniqueInput
    update?: XOR<XOR<WorkspaceUpdateToOneWithWhereWithoutRegistrationLinksInput, WorkspaceUpdateWithoutRegistrationLinksInput>, WorkspaceUncheckedUpdateWithoutRegistrationLinksInput>
  }

  export type ProfileUpdateOneRequiredWithoutRegistrationLinksNestedInput = {
    create?: XOR<ProfileCreateWithoutRegistrationLinksInput, ProfileUncheckedCreateWithoutRegistrationLinksInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutRegistrationLinksInput
    upsert?: ProfileUpsertWithoutRegistrationLinksInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutRegistrationLinksInput, ProfileUpdateWithoutRegistrationLinksInput>, ProfileUncheckedUpdateWithoutRegistrationLinksInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ProfileCreateWithoutWorkspaceInput = {
    id: string
    name: string
    email: string
    role?: string
    department?: string
    designation?: string | null
    officeBranch?: string | null
    workLocation?: string | null
    avatarInitials?: string
    status?: string
    phoneNumber?: string | null
    personalEmail?: string | null
    bloodGroup?: string | null
    dob?: string | null
    code?: string | null
    joiningDate?: string | null
    reportingManager?: string | null
    reportingHR?: string | null
    emergencyName?: string | null
    emergencyPhone?: string | null
    acceptedTerms?: boolean
    acceptedPrivacy?: boolean
    consentAt?: Date | string | null
    termsVersion?: string | null
    privacyVersion?: string | null
    createdAt?: Date | string
    visitors?: VisitorCreateNestedManyWithoutHostInput
    registrationLinks?: PublicRegistrationLinkCreateNestedManyWithoutHostInput
  }

  export type ProfileUncheckedCreateWithoutWorkspaceInput = {
    id: string
    name: string
    email: string
    role?: string
    department?: string
    designation?: string | null
    officeBranch?: string | null
    workLocation?: string | null
    avatarInitials?: string
    status?: string
    phoneNumber?: string | null
    personalEmail?: string | null
    bloodGroup?: string | null
    dob?: string | null
    code?: string | null
    joiningDate?: string | null
    reportingManager?: string | null
    reportingHR?: string | null
    emergencyName?: string | null
    emergencyPhone?: string | null
    acceptedTerms?: boolean
    acceptedPrivacy?: boolean
    consentAt?: Date | string | null
    termsVersion?: string | null
    privacyVersion?: string | null
    createdAt?: Date | string
    visitors?: VisitorUncheckedCreateNestedManyWithoutHostInput
    registrationLinks?: PublicRegistrationLinkUncheckedCreateNestedManyWithoutHostInput
  }

  export type ProfileCreateOrConnectWithoutWorkspaceInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutWorkspaceInput, ProfileUncheckedCreateWithoutWorkspaceInput>
  }

  export type ProfileCreateManyWorkspaceInputEnvelope = {
    data: ProfileCreateManyWorkspaceInput | ProfileCreateManyWorkspaceInput[]
    skipDuplicates?: boolean
  }

  export type VisitorCreateWithoutWorkspaceInput = {
    id?: string
    name: string
    email: string
    phone: string
    company?: string | null
    purpose: string
    status?: string
    hostName: string
    checkedInAt?: Date | string | null
    checkedOutAt?: Date | string | null
    preRegisteredAt?: Date | string
    idProofType?: string | null
    idProofNumber?: string | null
    badgeNumber?: string | null
    qrCode?: string | null
    qrValidUntil?: Date | string | null
    walkIn?: boolean
    notes?: string | null
    host: ProfileCreateNestedOneWithoutVisitorsInput
  }

  export type VisitorUncheckedCreateWithoutWorkspaceInput = {
    id?: string
    name: string
    email: string
    phone: string
    company?: string | null
    purpose: string
    status?: string
    hostId: string
    hostName: string
    checkedInAt?: Date | string | null
    checkedOutAt?: Date | string | null
    preRegisteredAt?: Date | string
    idProofType?: string | null
    idProofNumber?: string | null
    badgeNumber?: string | null
    qrCode?: string | null
    qrValidUntil?: Date | string | null
    walkIn?: boolean
    notes?: string | null
  }

  export type VisitorCreateOrConnectWithoutWorkspaceInput = {
    where: VisitorWhereUniqueInput
    create: XOR<VisitorCreateWithoutWorkspaceInput, VisitorUncheckedCreateWithoutWorkspaceInput>
  }

  export type VisitorCreateManyWorkspaceInputEnvelope = {
    data: VisitorCreateManyWorkspaceInput | VisitorCreateManyWorkspaceInput[]
    skipDuplicates?: boolean
  }

  export type WorkspaceConfigCreateWithoutWorkspaceInput = {
    departments?: WorkspaceConfigCreatedepartmentsInput | string[]
    designations?: WorkspaceConfigCreatedesignationsInput | string[]
    officeBranches?: WorkspaceConfigCreateofficeBranchesInput | string[]
    workLocations?: WorkspaceConfigCreateworkLocationsInput | string[]
    updatedAt?: Date | string
  }

  export type WorkspaceConfigUncheckedCreateWithoutWorkspaceInput = {
    id?: number
    departments?: WorkspaceConfigCreatedepartmentsInput | string[]
    designations?: WorkspaceConfigCreatedesignationsInput | string[]
    officeBranches?: WorkspaceConfigCreateofficeBranchesInput | string[]
    workLocations?: WorkspaceConfigCreateworkLocationsInput | string[]
    updatedAt?: Date | string
  }

  export type WorkspaceConfigCreateOrConnectWithoutWorkspaceInput = {
    where: WorkspaceConfigWhereUniqueInput
    create: XOR<WorkspaceConfigCreateWithoutWorkspaceInput, WorkspaceConfigUncheckedCreateWithoutWorkspaceInput>
  }

  export type SubscriptionCreateWithoutWorkspaceInput = {
    id?: string
    plan?: string
    status?: string
    amount: number
    currency: string
    region: string
    currentPeriodStart?: Date | string | null
    currentPeriodEnd?: Date | string | null
    cancelledAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionCreateNestedManyWithoutSubscriptionInput
  }

  export type SubscriptionUncheckedCreateWithoutWorkspaceInput = {
    id?: string
    plan?: string
    status?: string
    amount: number
    currency: string
    region: string
    currentPeriodStart?: Date | string | null
    currentPeriodEnd?: Date | string | null
    cancelledAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutSubscriptionInput
  }

  export type SubscriptionCreateOrConnectWithoutWorkspaceInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutWorkspaceInput, SubscriptionUncheckedCreateWithoutWorkspaceInput>
  }

  export type SubscriptionCreateManyWorkspaceInputEnvelope = {
    data: SubscriptionCreateManyWorkspaceInput | SubscriptionCreateManyWorkspaceInput[]
    skipDuplicates?: boolean
  }

  export type TransactionCreateWithoutWorkspaceInput = {
    id?: string
    razorpayOrderId: string
    razorpayPaymentId?: string | null
    amount: number
    currency: string
    region: string
    status?: string
    failureReason?: string | null
    createdAt?: Date | string
    verifiedAt?: Date | string | null
    subscription: SubscriptionCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutWorkspaceInput = {
    id?: string
    subscriptionId: string
    razorpayOrderId: string
    razorpayPaymentId?: string | null
    amount: number
    currency: string
    region: string
    status?: string
    failureReason?: string | null
    createdAt?: Date | string
    verifiedAt?: Date | string | null
  }

  export type TransactionCreateOrConnectWithoutWorkspaceInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutWorkspaceInput, TransactionUncheckedCreateWithoutWorkspaceInput>
  }

  export type TransactionCreateManyWorkspaceInputEnvelope = {
    data: TransactionCreateManyWorkspaceInput | TransactionCreateManyWorkspaceInput[]
    skipDuplicates?: boolean
  }

  export type PublicRegistrationLinkCreateWithoutWorkspaceInput = {
    id?: string
    slug: string
    officeBranch: string
    enabled?: boolean
    designTheme?: string
    pageTitle?: string | null
    welcomeMessage?: string | null
    qrValidityPeriod?: string
    fieldNameRequired?: boolean
    fieldPhoneRequired?: boolean
    fieldEmailRequired?: boolean
    fieldPurposeRequired?: boolean
    fieldIdProofRequired?: boolean
    fieldCompanyEnabled?: boolean
    fieldCompanyRequired?: boolean
    fieldNotesEnabled?: boolean
    fieldNotesRequired?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    host: ProfileCreateNestedOneWithoutRegistrationLinksInput
  }

  export type PublicRegistrationLinkUncheckedCreateWithoutWorkspaceInput = {
    id?: string
    slug: string
    hostId: string
    officeBranch: string
    enabled?: boolean
    designTheme?: string
    pageTitle?: string | null
    welcomeMessage?: string | null
    qrValidityPeriod?: string
    fieldNameRequired?: boolean
    fieldPhoneRequired?: boolean
    fieldEmailRequired?: boolean
    fieldPurposeRequired?: boolean
    fieldIdProofRequired?: boolean
    fieldCompanyEnabled?: boolean
    fieldCompanyRequired?: boolean
    fieldNotesEnabled?: boolean
    fieldNotesRequired?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PublicRegistrationLinkCreateOrConnectWithoutWorkspaceInput = {
    where: PublicRegistrationLinkWhereUniqueInput
    create: XOR<PublicRegistrationLinkCreateWithoutWorkspaceInput, PublicRegistrationLinkUncheckedCreateWithoutWorkspaceInput>
  }

  export type PublicRegistrationLinkCreateManyWorkspaceInputEnvelope = {
    data: PublicRegistrationLinkCreateManyWorkspaceInput | PublicRegistrationLinkCreateManyWorkspaceInput[]
    skipDuplicates?: boolean
  }

  export type ProfileUpsertWithWhereUniqueWithoutWorkspaceInput = {
    where: ProfileWhereUniqueInput
    update: XOR<ProfileUpdateWithoutWorkspaceInput, ProfileUncheckedUpdateWithoutWorkspaceInput>
    create: XOR<ProfileCreateWithoutWorkspaceInput, ProfileUncheckedCreateWithoutWorkspaceInput>
  }

  export type ProfileUpdateWithWhereUniqueWithoutWorkspaceInput = {
    where: ProfileWhereUniqueInput
    data: XOR<ProfileUpdateWithoutWorkspaceInput, ProfileUncheckedUpdateWithoutWorkspaceInput>
  }

  export type ProfileUpdateManyWithWhereWithoutWorkspaceInput = {
    where: ProfileScalarWhereInput
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyWithoutWorkspaceInput>
  }

  export type ProfileScalarWhereInput = {
    AND?: ProfileScalarWhereInput | ProfileScalarWhereInput[]
    OR?: ProfileScalarWhereInput[]
    NOT?: ProfileScalarWhereInput | ProfileScalarWhereInput[]
    id?: StringFilter<"Profile"> | string
    name?: StringFilter<"Profile"> | string
    email?: StringFilter<"Profile"> | string
    role?: StringFilter<"Profile"> | string
    department?: StringFilter<"Profile"> | string
    designation?: StringNullableFilter<"Profile"> | string | null
    officeBranch?: StringNullableFilter<"Profile"> | string | null
    workLocation?: StringNullableFilter<"Profile"> | string | null
    avatarInitials?: StringFilter<"Profile"> | string
    status?: StringFilter<"Profile"> | string
    phoneNumber?: StringNullableFilter<"Profile"> | string | null
    personalEmail?: StringNullableFilter<"Profile"> | string | null
    bloodGroup?: StringNullableFilter<"Profile"> | string | null
    dob?: StringNullableFilter<"Profile"> | string | null
    code?: StringNullableFilter<"Profile"> | string | null
    joiningDate?: StringNullableFilter<"Profile"> | string | null
    reportingManager?: StringNullableFilter<"Profile"> | string | null
    reportingHR?: StringNullableFilter<"Profile"> | string | null
    emergencyName?: StringNullableFilter<"Profile"> | string | null
    emergencyPhone?: StringNullableFilter<"Profile"> | string | null
    acceptedTerms?: BoolFilter<"Profile"> | boolean
    acceptedPrivacy?: BoolFilter<"Profile"> | boolean
    consentAt?: DateTimeNullableFilter<"Profile"> | Date | string | null
    termsVersion?: StringNullableFilter<"Profile"> | string | null
    privacyVersion?: StringNullableFilter<"Profile"> | string | null
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    wid?: IntNullableFilter<"Profile"> | number | null
  }

  export type VisitorUpsertWithWhereUniqueWithoutWorkspaceInput = {
    where: VisitorWhereUniqueInput
    update: XOR<VisitorUpdateWithoutWorkspaceInput, VisitorUncheckedUpdateWithoutWorkspaceInput>
    create: XOR<VisitorCreateWithoutWorkspaceInput, VisitorUncheckedCreateWithoutWorkspaceInput>
  }

  export type VisitorUpdateWithWhereUniqueWithoutWorkspaceInput = {
    where: VisitorWhereUniqueInput
    data: XOR<VisitorUpdateWithoutWorkspaceInput, VisitorUncheckedUpdateWithoutWorkspaceInput>
  }

  export type VisitorUpdateManyWithWhereWithoutWorkspaceInput = {
    where: VisitorScalarWhereInput
    data: XOR<VisitorUpdateManyMutationInput, VisitorUncheckedUpdateManyWithoutWorkspaceInput>
  }

  export type VisitorScalarWhereInput = {
    AND?: VisitorScalarWhereInput | VisitorScalarWhereInput[]
    OR?: VisitorScalarWhereInput[]
    NOT?: VisitorScalarWhereInput | VisitorScalarWhereInput[]
    id?: StringFilter<"Visitor"> | string
    name?: StringFilter<"Visitor"> | string
    email?: StringFilter<"Visitor"> | string
    phone?: StringFilter<"Visitor"> | string
    company?: StringNullableFilter<"Visitor"> | string | null
    purpose?: StringFilter<"Visitor"> | string
    status?: StringFilter<"Visitor"> | string
    hostId?: StringFilter<"Visitor"> | string
    hostName?: StringFilter<"Visitor"> | string
    checkedInAt?: DateTimeNullableFilter<"Visitor"> | Date | string | null
    checkedOutAt?: DateTimeNullableFilter<"Visitor"> | Date | string | null
    preRegisteredAt?: DateTimeFilter<"Visitor"> | Date | string
    idProofType?: StringNullableFilter<"Visitor"> | string | null
    idProofNumber?: StringNullableFilter<"Visitor"> | string | null
    badgeNumber?: StringNullableFilter<"Visitor"> | string | null
    qrCode?: StringNullableFilter<"Visitor"> | string | null
    qrValidUntil?: DateTimeNullableFilter<"Visitor"> | Date | string | null
    walkIn?: BoolFilter<"Visitor"> | boolean
    notes?: StringNullableFilter<"Visitor"> | string | null
    wid?: IntFilter<"Visitor"> | number
  }

  export type WorkspaceConfigUpsertWithoutWorkspaceInput = {
    update: XOR<WorkspaceConfigUpdateWithoutWorkspaceInput, WorkspaceConfigUncheckedUpdateWithoutWorkspaceInput>
    create: XOR<WorkspaceConfigCreateWithoutWorkspaceInput, WorkspaceConfigUncheckedCreateWithoutWorkspaceInput>
    where?: WorkspaceConfigWhereInput
  }

  export type WorkspaceConfigUpdateToOneWithWhereWithoutWorkspaceInput = {
    where?: WorkspaceConfigWhereInput
    data: XOR<WorkspaceConfigUpdateWithoutWorkspaceInput, WorkspaceConfigUncheckedUpdateWithoutWorkspaceInput>
  }

  export type WorkspaceConfigUpdateWithoutWorkspaceInput = {
    departments?: WorkspaceConfigUpdatedepartmentsInput | string[]
    designations?: WorkspaceConfigUpdatedesignationsInput | string[]
    officeBranches?: WorkspaceConfigUpdateofficeBranchesInput | string[]
    workLocations?: WorkspaceConfigUpdateworkLocationsInput | string[]
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceConfigUncheckedUpdateWithoutWorkspaceInput = {
    id?: IntFieldUpdateOperationsInput | number
    departments?: WorkspaceConfigUpdatedepartmentsInput | string[]
    designations?: WorkspaceConfigUpdatedesignationsInput | string[]
    officeBranches?: WorkspaceConfigUpdateofficeBranchesInput | string[]
    workLocations?: WorkspaceConfigUpdateworkLocationsInput | string[]
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUpsertWithWhereUniqueWithoutWorkspaceInput = {
    where: SubscriptionWhereUniqueInput
    update: XOR<SubscriptionUpdateWithoutWorkspaceInput, SubscriptionUncheckedUpdateWithoutWorkspaceInput>
    create: XOR<SubscriptionCreateWithoutWorkspaceInput, SubscriptionUncheckedCreateWithoutWorkspaceInput>
  }

  export type SubscriptionUpdateWithWhereUniqueWithoutWorkspaceInput = {
    where: SubscriptionWhereUniqueInput
    data: XOR<SubscriptionUpdateWithoutWorkspaceInput, SubscriptionUncheckedUpdateWithoutWorkspaceInput>
  }

  export type SubscriptionUpdateManyWithWhereWithoutWorkspaceInput = {
    where: SubscriptionScalarWhereInput
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyWithoutWorkspaceInput>
  }

  export type SubscriptionScalarWhereInput = {
    AND?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
    OR?: SubscriptionScalarWhereInput[]
    NOT?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
    id?: StringFilter<"Subscription"> | string
    wid?: IntFilter<"Subscription"> | number
    plan?: StringFilter<"Subscription"> | string
    status?: StringFilter<"Subscription"> | string
    amount?: IntFilter<"Subscription"> | number
    currency?: StringFilter<"Subscription"> | string
    region?: StringFilter<"Subscription"> | string
    currentPeriodStart?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    currentPeriodEnd?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    cancelledAt?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
  }

  export type TransactionUpsertWithWhereUniqueWithoutWorkspaceInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutWorkspaceInput, TransactionUncheckedUpdateWithoutWorkspaceInput>
    create: XOR<TransactionCreateWithoutWorkspaceInput, TransactionUncheckedCreateWithoutWorkspaceInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutWorkspaceInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutWorkspaceInput, TransactionUncheckedUpdateWithoutWorkspaceInput>
  }

  export type TransactionUpdateManyWithWhereWithoutWorkspaceInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutWorkspaceInput>
  }

  export type TransactionScalarWhereInput = {
    AND?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    OR?: TransactionScalarWhereInput[]
    NOT?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    id?: StringFilter<"Transaction"> | string
    wid?: IntFilter<"Transaction"> | number
    subscriptionId?: StringFilter<"Transaction"> | string
    razorpayOrderId?: StringFilter<"Transaction"> | string
    razorpayPaymentId?: StringNullableFilter<"Transaction"> | string | null
    amount?: IntFilter<"Transaction"> | number
    currency?: StringFilter<"Transaction"> | string
    region?: StringFilter<"Transaction"> | string
    status?: StringFilter<"Transaction"> | string
    failureReason?: StringNullableFilter<"Transaction"> | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    verifiedAt?: DateTimeNullableFilter<"Transaction"> | Date | string | null
  }

  export type PublicRegistrationLinkUpsertWithWhereUniqueWithoutWorkspaceInput = {
    where: PublicRegistrationLinkWhereUniqueInput
    update: XOR<PublicRegistrationLinkUpdateWithoutWorkspaceInput, PublicRegistrationLinkUncheckedUpdateWithoutWorkspaceInput>
    create: XOR<PublicRegistrationLinkCreateWithoutWorkspaceInput, PublicRegistrationLinkUncheckedCreateWithoutWorkspaceInput>
  }

  export type PublicRegistrationLinkUpdateWithWhereUniqueWithoutWorkspaceInput = {
    where: PublicRegistrationLinkWhereUniqueInput
    data: XOR<PublicRegistrationLinkUpdateWithoutWorkspaceInput, PublicRegistrationLinkUncheckedUpdateWithoutWorkspaceInput>
  }

  export type PublicRegistrationLinkUpdateManyWithWhereWithoutWorkspaceInput = {
    where: PublicRegistrationLinkScalarWhereInput
    data: XOR<PublicRegistrationLinkUpdateManyMutationInput, PublicRegistrationLinkUncheckedUpdateManyWithoutWorkspaceInput>
  }

  export type PublicRegistrationLinkScalarWhereInput = {
    AND?: PublicRegistrationLinkScalarWhereInput | PublicRegistrationLinkScalarWhereInput[]
    OR?: PublicRegistrationLinkScalarWhereInput[]
    NOT?: PublicRegistrationLinkScalarWhereInput | PublicRegistrationLinkScalarWhereInput[]
    id?: StringFilter<"PublicRegistrationLink"> | string
    slug?: StringFilter<"PublicRegistrationLink"> | string
    wid?: IntFilter<"PublicRegistrationLink"> | number
    hostId?: StringFilter<"PublicRegistrationLink"> | string
    officeBranch?: StringFilter<"PublicRegistrationLink"> | string
    enabled?: BoolFilter<"PublicRegistrationLink"> | boolean
    designTheme?: StringFilter<"PublicRegistrationLink"> | string
    pageTitle?: StringNullableFilter<"PublicRegistrationLink"> | string | null
    welcomeMessage?: StringNullableFilter<"PublicRegistrationLink"> | string | null
    qrValidityPeriod?: StringFilter<"PublicRegistrationLink"> | string
    fieldNameRequired?: BoolFilter<"PublicRegistrationLink"> | boolean
    fieldPhoneRequired?: BoolFilter<"PublicRegistrationLink"> | boolean
    fieldEmailRequired?: BoolFilter<"PublicRegistrationLink"> | boolean
    fieldPurposeRequired?: BoolFilter<"PublicRegistrationLink"> | boolean
    fieldIdProofRequired?: BoolFilter<"PublicRegistrationLink"> | boolean
    fieldCompanyEnabled?: BoolFilter<"PublicRegistrationLink"> | boolean
    fieldCompanyRequired?: BoolFilter<"PublicRegistrationLink"> | boolean
    fieldNotesEnabled?: BoolFilter<"PublicRegistrationLink"> | boolean
    fieldNotesRequired?: BoolFilter<"PublicRegistrationLink"> | boolean
    createdAt?: DateTimeFilter<"PublicRegistrationLink"> | Date | string
    updatedAt?: DateTimeFilter<"PublicRegistrationLink"> | Date | string
  }

  export type WorkspaceCreateWithoutConfigInput = {
    name?: string | null
    plan?: string
    createdAt?: Date | string
    profiles?: ProfileCreateNestedManyWithoutWorkspaceInput
    visitors?: VisitorCreateNestedManyWithoutWorkspaceInput
    subscriptions?: SubscriptionCreateNestedManyWithoutWorkspaceInput
    transactions?: TransactionCreateNestedManyWithoutWorkspaceInput
    registrationLinks?: PublicRegistrationLinkCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUncheckedCreateWithoutConfigInput = {
    id?: number
    name?: string | null
    plan?: string
    createdAt?: Date | string
    profiles?: ProfileUncheckedCreateNestedManyWithoutWorkspaceInput
    visitors?: VisitorUncheckedCreateNestedManyWithoutWorkspaceInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutWorkspaceInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutWorkspaceInput
    registrationLinks?: PublicRegistrationLinkUncheckedCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceCreateOrConnectWithoutConfigInput = {
    where: WorkspaceWhereUniqueInput
    create: XOR<WorkspaceCreateWithoutConfigInput, WorkspaceUncheckedCreateWithoutConfigInput>
  }

  export type WorkspaceUpsertWithoutConfigInput = {
    update: XOR<WorkspaceUpdateWithoutConfigInput, WorkspaceUncheckedUpdateWithoutConfigInput>
    create: XOR<WorkspaceCreateWithoutConfigInput, WorkspaceUncheckedCreateWithoutConfigInput>
    where?: WorkspaceWhereInput
  }

  export type WorkspaceUpdateToOneWithWhereWithoutConfigInput = {
    where?: WorkspaceWhereInput
    data: XOR<WorkspaceUpdateWithoutConfigInput, WorkspaceUncheckedUpdateWithoutConfigInput>
  }

  export type WorkspaceUpdateWithoutConfigInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profiles?: ProfileUpdateManyWithoutWorkspaceNestedInput
    visitors?: VisitorUpdateManyWithoutWorkspaceNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutWorkspaceNestedInput
    transactions?: TransactionUpdateManyWithoutWorkspaceNestedInput
    registrationLinks?: PublicRegistrationLinkUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceUncheckedUpdateWithoutConfigInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profiles?: ProfileUncheckedUpdateManyWithoutWorkspaceNestedInput
    visitors?: VisitorUncheckedUpdateManyWithoutWorkspaceNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutWorkspaceNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutWorkspaceNestedInput
    registrationLinks?: PublicRegistrationLinkUncheckedUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceCreateWithoutProfilesInput = {
    name?: string | null
    plan?: string
    createdAt?: Date | string
    visitors?: VisitorCreateNestedManyWithoutWorkspaceInput
    config?: WorkspaceConfigCreateNestedOneWithoutWorkspaceInput
    subscriptions?: SubscriptionCreateNestedManyWithoutWorkspaceInput
    transactions?: TransactionCreateNestedManyWithoutWorkspaceInput
    registrationLinks?: PublicRegistrationLinkCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUncheckedCreateWithoutProfilesInput = {
    id?: number
    name?: string | null
    plan?: string
    createdAt?: Date | string
    visitors?: VisitorUncheckedCreateNestedManyWithoutWorkspaceInput
    config?: WorkspaceConfigUncheckedCreateNestedOneWithoutWorkspaceInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutWorkspaceInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutWorkspaceInput
    registrationLinks?: PublicRegistrationLinkUncheckedCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceCreateOrConnectWithoutProfilesInput = {
    where: WorkspaceWhereUniqueInput
    create: XOR<WorkspaceCreateWithoutProfilesInput, WorkspaceUncheckedCreateWithoutProfilesInput>
  }

  export type VisitorCreateWithoutHostInput = {
    id?: string
    name: string
    email: string
    phone: string
    company?: string | null
    purpose: string
    status?: string
    hostName: string
    checkedInAt?: Date | string | null
    checkedOutAt?: Date | string | null
    preRegisteredAt?: Date | string
    idProofType?: string | null
    idProofNumber?: string | null
    badgeNumber?: string | null
    qrCode?: string | null
    qrValidUntil?: Date | string | null
    walkIn?: boolean
    notes?: string | null
    workspace: WorkspaceCreateNestedOneWithoutVisitorsInput
  }

  export type VisitorUncheckedCreateWithoutHostInput = {
    id?: string
    name: string
    email: string
    phone: string
    company?: string | null
    purpose: string
    status?: string
    hostName: string
    checkedInAt?: Date | string | null
    checkedOutAt?: Date | string | null
    preRegisteredAt?: Date | string
    idProofType?: string | null
    idProofNumber?: string | null
    badgeNumber?: string | null
    qrCode?: string | null
    qrValidUntil?: Date | string | null
    walkIn?: boolean
    notes?: string | null
    wid: number
  }

  export type VisitorCreateOrConnectWithoutHostInput = {
    where: VisitorWhereUniqueInput
    create: XOR<VisitorCreateWithoutHostInput, VisitorUncheckedCreateWithoutHostInput>
  }

  export type VisitorCreateManyHostInputEnvelope = {
    data: VisitorCreateManyHostInput | VisitorCreateManyHostInput[]
    skipDuplicates?: boolean
  }

  export type PublicRegistrationLinkCreateWithoutHostInput = {
    id?: string
    slug: string
    officeBranch: string
    enabled?: boolean
    designTheme?: string
    pageTitle?: string | null
    welcomeMessage?: string | null
    qrValidityPeriod?: string
    fieldNameRequired?: boolean
    fieldPhoneRequired?: boolean
    fieldEmailRequired?: boolean
    fieldPurposeRequired?: boolean
    fieldIdProofRequired?: boolean
    fieldCompanyEnabled?: boolean
    fieldCompanyRequired?: boolean
    fieldNotesEnabled?: boolean
    fieldNotesRequired?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    workspace: WorkspaceCreateNestedOneWithoutRegistrationLinksInput
  }

  export type PublicRegistrationLinkUncheckedCreateWithoutHostInput = {
    id?: string
    slug: string
    wid: number
    officeBranch: string
    enabled?: boolean
    designTheme?: string
    pageTitle?: string | null
    welcomeMessage?: string | null
    qrValidityPeriod?: string
    fieldNameRequired?: boolean
    fieldPhoneRequired?: boolean
    fieldEmailRequired?: boolean
    fieldPurposeRequired?: boolean
    fieldIdProofRequired?: boolean
    fieldCompanyEnabled?: boolean
    fieldCompanyRequired?: boolean
    fieldNotesEnabled?: boolean
    fieldNotesRequired?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PublicRegistrationLinkCreateOrConnectWithoutHostInput = {
    where: PublicRegistrationLinkWhereUniqueInput
    create: XOR<PublicRegistrationLinkCreateWithoutHostInput, PublicRegistrationLinkUncheckedCreateWithoutHostInput>
  }

  export type PublicRegistrationLinkCreateManyHostInputEnvelope = {
    data: PublicRegistrationLinkCreateManyHostInput | PublicRegistrationLinkCreateManyHostInput[]
    skipDuplicates?: boolean
  }

  export type WorkspaceUpsertWithoutProfilesInput = {
    update: XOR<WorkspaceUpdateWithoutProfilesInput, WorkspaceUncheckedUpdateWithoutProfilesInput>
    create: XOR<WorkspaceCreateWithoutProfilesInput, WorkspaceUncheckedCreateWithoutProfilesInput>
    where?: WorkspaceWhereInput
  }

  export type WorkspaceUpdateToOneWithWhereWithoutProfilesInput = {
    where?: WorkspaceWhereInput
    data: XOR<WorkspaceUpdateWithoutProfilesInput, WorkspaceUncheckedUpdateWithoutProfilesInput>
  }

  export type WorkspaceUpdateWithoutProfilesInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visitors?: VisitorUpdateManyWithoutWorkspaceNestedInput
    config?: WorkspaceConfigUpdateOneWithoutWorkspaceNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutWorkspaceNestedInput
    transactions?: TransactionUpdateManyWithoutWorkspaceNestedInput
    registrationLinks?: PublicRegistrationLinkUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceUncheckedUpdateWithoutProfilesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visitors?: VisitorUncheckedUpdateManyWithoutWorkspaceNestedInput
    config?: WorkspaceConfigUncheckedUpdateOneWithoutWorkspaceNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutWorkspaceNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutWorkspaceNestedInput
    registrationLinks?: PublicRegistrationLinkUncheckedUpdateManyWithoutWorkspaceNestedInput
  }

  export type VisitorUpsertWithWhereUniqueWithoutHostInput = {
    where: VisitorWhereUniqueInput
    update: XOR<VisitorUpdateWithoutHostInput, VisitorUncheckedUpdateWithoutHostInput>
    create: XOR<VisitorCreateWithoutHostInput, VisitorUncheckedCreateWithoutHostInput>
  }

  export type VisitorUpdateWithWhereUniqueWithoutHostInput = {
    where: VisitorWhereUniqueInput
    data: XOR<VisitorUpdateWithoutHostInput, VisitorUncheckedUpdateWithoutHostInput>
  }

  export type VisitorUpdateManyWithWhereWithoutHostInput = {
    where: VisitorScalarWhereInput
    data: XOR<VisitorUpdateManyMutationInput, VisitorUncheckedUpdateManyWithoutHostInput>
  }

  export type PublicRegistrationLinkUpsertWithWhereUniqueWithoutHostInput = {
    where: PublicRegistrationLinkWhereUniqueInput
    update: XOR<PublicRegistrationLinkUpdateWithoutHostInput, PublicRegistrationLinkUncheckedUpdateWithoutHostInput>
    create: XOR<PublicRegistrationLinkCreateWithoutHostInput, PublicRegistrationLinkUncheckedCreateWithoutHostInput>
  }

  export type PublicRegistrationLinkUpdateWithWhereUniqueWithoutHostInput = {
    where: PublicRegistrationLinkWhereUniqueInput
    data: XOR<PublicRegistrationLinkUpdateWithoutHostInput, PublicRegistrationLinkUncheckedUpdateWithoutHostInput>
  }

  export type PublicRegistrationLinkUpdateManyWithWhereWithoutHostInput = {
    where: PublicRegistrationLinkScalarWhereInput
    data: XOR<PublicRegistrationLinkUpdateManyMutationInput, PublicRegistrationLinkUncheckedUpdateManyWithoutHostInput>
  }

  export type ProfileCreateWithoutVisitorsInput = {
    id: string
    name: string
    email: string
    role?: string
    department?: string
    designation?: string | null
    officeBranch?: string | null
    workLocation?: string | null
    avatarInitials?: string
    status?: string
    phoneNumber?: string | null
    personalEmail?: string | null
    bloodGroup?: string | null
    dob?: string | null
    code?: string | null
    joiningDate?: string | null
    reportingManager?: string | null
    reportingHR?: string | null
    emergencyName?: string | null
    emergencyPhone?: string | null
    acceptedTerms?: boolean
    acceptedPrivacy?: boolean
    consentAt?: Date | string | null
    termsVersion?: string | null
    privacyVersion?: string | null
    createdAt?: Date | string
    workspace?: WorkspaceCreateNestedOneWithoutProfilesInput
    registrationLinks?: PublicRegistrationLinkCreateNestedManyWithoutHostInput
  }

  export type ProfileUncheckedCreateWithoutVisitorsInput = {
    id: string
    name: string
    email: string
    role?: string
    department?: string
    designation?: string | null
    officeBranch?: string | null
    workLocation?: string | null
    avatarInitials?: string
    status?: string
    phoneNumber?: string | null
    personalEmail?: string | null
    bloodGroup?: string | null
    dob?: string | null
    code?: string | null
    joiningDate?: string | null
    reportingManager?: string | null
    reportingHR?: string | null
    emergencyName?: string | null
    emergencyPhone?: string | null
    acceptedTerms?: boolean
    acceptedPrivacy?: boolean
    consentAt?: Date | string | null
    termsVersion?: string | null
    privacyVersion?: string | null
    createdAt?: Date | string
    wid?: number | null
    registrationLinks?: PublicRegistrationLinkUncheckedCreateNestedManyWithoutHostInput
  }

  export type ProfileCreateOrConnectWithoutVisitorsInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutVisitorsInput, ProfileUncheckedCreateWithoutVisitorsInput>
  }

  export type WorkspaceCreateWithoutVisitorsInput = {
    name?: string | null
    plan?: string
    createdAt?: Date | string
    profiles?: ProfileCreateNestedManyWithoutWorkspaceInput
    config?: WorkspaceConfigCreateNestedOneWithoutWorkspaceInput
    subscriptions?: SubscriptionCreateNestedManyWithoutWorkspaceInput
    transactions?: TransactionCreateNestedManyWithoutWorkspaceInput
    registrationLinks?: PublicRegistrationLinkCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUncheckedCreateWithoutVisitorsInput = {
    id?: number
    name?: string | null
    plan?: string
    createdAt?: Date | string
    profiles?: ProfileUncheckedCreateNestedManyWithoutWorkspaceInput
    config?: WorkspaceConfigUncheckedCreateNestedOneWithoutWorkspaceInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutWorkspaceInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutWorkspaceInput
    registrationLinks?: PublicRegistrationLinkUncheckedCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceCreateOrConnectWithoutVisitorsInput = {
    where: WorkspaceWhereUniqueInput
    create: XOR<WorkspaceCreateWithoutVisitorsInput, WorkspaceUncheckedCreateWithoutVisitorsInput>
  }

  export type ProfileUpsertWithoutVisitorsInput = {
    update: XOR<ProfileUpdateWithoutVisitorsInput, ProfileUncheckedUpdateWithoutVisitorsInput>
    create: XOR<ProfileCreateWithoutVisitorsInput, ProfileUncheckedCreateWithoutVisitorsInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutVisitorsInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutVisitorsInput, ProfileUncheckedUpdateWithoutVisitorsInput>
  }

  export type ProfileUpdateWithoutVisitorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    officeBranch?: NullableStringFieldUpdateOperationsInput | string | null
    workLocation?: NullableStringFieldUpdateOperationsInput | string | null
    avatarInitials?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    personalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableStringFieldUpdateOperationsInput | string | null
    code?: NullableStringFieldUpdateOperationsInput | string | null
    joiningDate?: NullableStringFieldUpdateOperationsInput | string | null
    reportingManager?: NullableStringFieldUpdateOperationsInput | string | null
    reportingHR?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyPhone?: NullableStringFieldUpdateOperationsInput | string | null
    acceptedTerms?: BoolFieldUpdateOperationsInput | boolean
    acceptedPrivacy?: BoolFieldUpdateOperationsInput | boolean
    consentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    termsVersion?: NullableStringFieldUpdateOperationsInput | string | null
    privacyVersion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneWithoutProfilesNestedInput
    registrationLinks?: PublicRegistrationLinkUpdateManyWithoutHostNestedInput
  }

  export type ProfileUncheckedUpdateWithoutVisitorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    officeBranch?: NullableStringFieldUpdateOperationsInput | string | null
    workLocation?: NullableStringFieldUpdateOperationsInput | string | null
    avatarInitials?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    personalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableStringFieldUpdateOperationsInput | string | null
    code?: NullableStringFieldUpdateOperationsInput | string | null
    joiningDate?: NullableStringFieldUpdateOperationsInput | string | null
    reportingManager?: NullableStringFieldUpdateOperationsInput | string | null
    reportingHR?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyPhone?: NullableStringFieldUpdateOperationsInput | string | null
    acceptedTerms?: BoolFieldUpdateOperationsInput | boolean
    acceptedPrivacy?: BoolFieldUpdateOperationsInput | boolean
    consentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    termsVersion?: NullableStringFieldUpdateOperationsInput | string | null
    privacyVersion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wid?: NullableIntFieldUpdateOperationsInput | number | null
    registrationLinks?: PublicRegistrationLinkUncheckedUpdateManyWithoutHostNestedInput
  }

  export type WorkspaceUpsertWithoutVisitorsInput = {
    update: XOR<WorkspaceUpdateWithoutVisitorsInput, WorkspaceUncheckedUpdateWithoutVisitorsInput>
    create: XOR<WorkspaceCreateWithoutVisitorsInput, WorkspaceUncheckedCreateWithoutVisitorsInput>
    where?: WorkspaceWhereInput
  }

  export type WorkspaceUpdateToOneWithWhereWithoutVisitorsInput = {
    where?: WorkspaceWhereInput
    data: XOR<WorkspaceUpdateWithoutVisitorsInput, WorkspaceUncheckedUpdateWithoutVisitorsInput>
  }

  export type WorkspaceUpdateWithoutVisitorsInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profiles?: ProfileUpdateManyWithoutWorkspaceNestedInput
    config?: WorkspaceConfigUpdateOneWithoutWorkspaceNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutWorkspaceNestedInput
    transactions?: TransactionUpdateManyWithoutWorkspaceNestedInput
    registrationLinks?: PublicRegistrationLinkUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceUncheckedUpdateWithoutVisitorsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profiles?: ProfileUncheckedUpdateManyWithoutWorkspaceNestedInput
    config?: WorkspaceConfigUncheckedUpdateOneWithoutWorkspaceNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutWorkspaceNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutWorkspaceNestedInput
    registrationLinks?: PublicRegistrationLinkUncheckedUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceCreateWithoutSubscriptionsInput = {
    name?: string | null
    plan?: string
    createdAt?: Date | string
    profiles?: ProfileCreateNestedManyWithoutWorkspaceInput
    visitors?: VisitorCreateNestedManyWithoutWorkspaceInput
    config?: WorkspaceConfigCreateNestedOneWithoutWorkspaceInput
    transactions?: TransactionCreateNestedManyWithoutWorkspaceInput
    registrationLinks?: PublicRegistrationLinkCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUncheckedCreateWithoutSubscriptionsInput = {
    id?: number
    name?: string | null
    plan?: string
    createdAt?: Date | string
    profiles?: ProfileUncheckedCreateNestedManyWithoutWorkspaceInput
    visitors?: VisitorUncheckedCreateNestedManyWithoutWorkspaceInput
    config?: WorkspaceConfigUncheckedCreateNestedOneWithoutWorkspaceInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutWorkspaceInput
    registrationLinks?: PublicRegistrationLinkUncheckedCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceCreateOrConnectWithoutSubscriptionsInput = {
    where: WorkspaceWhereUniqueInput
    create: XOR<WorkspaceCreateWithoutSubscriptionsInput, WorkspaceUncheckedCreateWithoutSubscriptionsInput>
  }

  export type TransactionCreateWithoutSubscriptionInput = {
    id?: string
    razorpayOrderId: string
    razorpayPaymentId?: string | null
    amount: number
    currency: string
    region: string
    status?: string
    failureReason?: string | null
    createdAt?: Date | string
    verifiedAt?: Date | string | null
    workspace: WorkspaceCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutSubscriptionInput = {
    id?: string
    wid: number
    razorpayOrderId: string
    razorpayPaymentId?: string | null
    amount: number
    currency: string
    region: string
    status?: string
    failureReason?: string | null
    createdAt?: Date | string
    verifiedAt?: Date | string | null
  }

  export type TransactionCreateOrConnectWithoutSubscriptionInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutSubscriptionInput, TransactionUncheckedCreateWithoutSubscriptionInput>
  }

  export type TransactionCreateManySubscriptionInputEnvelope = {
    data: TransactionCreateManySubscriptionInput | TransactionCreateManySubscriptionInput[]
    skipDuplicates?: boolean
  }

  export type WorkspaceUpsertWithoutSubscriptionsInput = {
    update: XOR<WorkspaceUpdateWithoutSubscriptionsInput, WorkspaceUncheckedUpdateWithoutSubscriptionsInput>
    create: XOR<WorkspaceCreateWithoutSubscriptionsInput, WorkspaceUncheckedCreateWithoutSubscriptionsInput>
    where?: WorkspaceWhereInput
  }

  export type WorkspaceUpdateToOneWithWhereWithoutSubscriptionsInput = {
    where?: WorkspaceWhereInput
    data: XOR<WorkspaceUpdateWithoutSubscriptionsInput, WorkspaceUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type WorkspaceUpdateWithoutSubscriptionsInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profiles?: ProfileUpdateManyWithoutWorkspaceNestedInput
    visitors?: VisitorUpdateManyWithoutWorkspaceNestedInput
    config?: WorkspaceConfigUpdateOneWithoutWorkspaceNestedInput
    transactions?: TransactionUpdateManyWithoutWorkspaceNestedInput
    registrationLinks?: PublicRegistrationLinkUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceUncheckedUpdateWithoutSubscriptionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profiles?: ProfileUncheckedUpdateManyWithoutWorkspaceNestedInput
    visitors?: VisitorUncheckedUpdateManyWithoutWorkspaceNestedInput
    config?: WorkspaceConfigUncheckedUpdateOneWithoutWorkspaceNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutWorkspaceNestedInput
    registrationLinks?: PublicRegistrationLinkUncheckedUpdateManyWithoutWorkspaceNestedInput
  }

  export type TransactionUpsertWithWhereUniqueWithoutSubscriptionInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutSubscriptionInput, TransactionUncheckedUpdateWithoutSubscriptionInput>
    create: XOR<TransactionCreateWithoutSubscriptionInput, TransactionUncheckedCreateWithoutSubscriptionInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutSubscriptionInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutSubscriptionInput, TransactionUncheckedUpdateWithoutSubscriptionInput>
  }

  export type TransactionUpdateManyWithWhereWithoutSubscriptionInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutSubscriptionInput>
  }

  export type WorkspaceCreateWithoutTransactionsInput = {
    name?: string | null
    plan?: string
    createdAt?: Date | string
    profiles?: ProfileCreateNestedManyWithoutWorkspaceInput
    visitors?: VisitorCreateNestedManyWithoutWorkspaceInput
    config?: WorkspaceConfigCreateNestedOneWithoutWorkspaceInput
    subscriptions?: SubscriptionCreateNestedManyWithoutWorkspaceInput
    registrationLinks?: PublicRegistrationLinkCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUncheckedCreateWithoutTransactionsInput = {
    id?: number
    name?: string | null
    plan?: string
    createdAt?: Date | string
    profiles?: ProfileUncheckedCreateNestedManyWithoutWorkspaceInput
    visitors?: VisitorUncheckedCreateNestedManyWithoutWorkspaceInput
    config?: WorkspaceConfigUncheckedCreateNestedOneWithoutWorkspaceInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutWorkspaceInput
    registrationLinks?: PublicRegistrationLinkUncheckedCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceCreateOrConnectWithoutTransactionsInput = {
    where: WorkspaceWhereUniqueInput
    create: XOR<WorkspaceCreateWithoutTransactionsInput, WorkspaceUncheckedCreateWithoutTransactionsInput>
  }

  export type SubscriptionCreateWithoutTransactionsInput = {
    id?: string
    plan?: string
    status?: string
    amount: number
    currency: string
    region: string
    currentPeriodStart?: Date | string | null
    currentPeriodEnd?: Date | string | null
    cancelledAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workspace: WorkspaceCreateNestedOneWithoutSubscriptionsInput
  }

  export type SubscriptionUncheckedCreateWithoutTransactionsInput = {
    id?: string
    wid: number
    plan?: string
    status?: string
    amount: number
    currency: string
    region: string
    currentPeriodStart?: Date | string | null
    currentPeriodEnd?: Date | string | null
    cancelledAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionCreateOrConnectWithoutTransactionsInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutTransactionsInput, SubscriptionUncheckedCreateWithoutTransactionsInput>
  }

  export type WorkspaceUpsertWithoutTransactionsInput = {
    update: XOR<WorkspaceUpdateWithoutTransactionsInput, WorkspaceUncheckedUpdateWithoutTransactionsInput>
    create: XOR<WorkspaceCreateWithoutTransactionsInput, WorkspaceUncheckedCreateWithoutTransactionsInput>
    where?: WorkspaceWhereInput
  }

  export type WorkspaceUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: WorkspaceWhereInput
    data: XOR<WorkspaceUpdateWithoutTransactionsInput, WorkspaceUncheckedUpdateWithoutTransactionsInput>
  }

  export type WorkspaceUpdateWithoutTransactionsInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profiles?: ProfileUpdateManyWithoutWorkspaceNestedInput
    visitors?: VisitorUpdateManyWithoutWorkspaceNestedInput
    config?: WorkspaceConfigUpdateOneWithoutWorkspaceNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutWorkspaceNestedInput
    registrationLinks?: PublicRegistrationLinkUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceUncheckedUpdateWithoutTransactionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profiles?: ProfileUncheckedUpdateManyWithoutWorkspaceNestedInput
    visitors?: VisitorUncheckedUpdateManyWithoutWorkspaceNestedInput
    config?: WorkspaceConfigUncheckedUpdateOneWithoutWorkspaceNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutWorkspaceNestedInput
    registrationLinks?: PublicRegistrationLinkUncheckedUpdateManyWithoutWorkspaceNestedInput
  }

  export type SubscriptionUpsertWithoutTransactionsInput = {
    update: XOR<SubscriptionUpdateWithoutTransactionsInput, SubscriptionUncheckedUpdateWithoutTransactionsInput>
    create: XOR<SubscriptionCreateWithoutTransactionsInput, SubscriptionUncheckedCreateWithoutTransactionsInput>
    where?: SubscriptionWhereInput
  }

  export type SubscriptionUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: SubscriptionWhereInput
    data: XOR<SubscriptionUpdateWithoutTransactionsInput, SubscriptionUncheckedUpdateWithoutTransactionsInput>
  }

  export type SubscriptionUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    currentPeriodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneRequiredWithoutSubscriptionsNestedInput
  }

  export type SubscriptionUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    wid?: IntFieldUpdateOperationsInput | number
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    currentPeriodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceCreateWithoutRegistrationLinksInput = {
    name?: string | null
    plan?: string
    createdAt?: Date | string
    profiles?: ProfileCreateNestedManyWithoutWorkspaceInput
    visitors?: VisitorCreateNestedManyWithoutWorkspaceInput
    config?: WorkspaceConfigCreateNestedOneWithoutWorkspaceInput
    subscriptions?: SubscriptionCreateNestedManyWithoutWorkspaceInput
    transactions?: TransactionCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUncheckedCreateWithoutRegistrationLinksInput = {
    id?: number
    name?: string | null
    plan?: string
    createdAt?: Date | string
    profiles?: ProfileUncheckedCreateNestedManyWithoutWorkspaceInput
    visitors?: VisitorUncheckedCreateNestedManyWithoutWorkspaceInput
    config?: WorkspaceConfigUncheckedCreateNestedOneWithoutWorkspaceInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutWorkspaceInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceCreateOrConnectWithoutRegistrationLinksInput = {
    where: WorkspaceWhereUniqueInput
    create: XOR<WorkspaceCreateWithoutRegistrationLinksInput, WorkspaceUncheckedCreateWithoutRegistrationLinksInput>
  }

  export type ProfileCreateWithoutRegistrationLinksInput = {
    id: string
    name: string
    email: string
    role?: string
    department?: string
    designation?: string | null
    officeBranch?: string | null
    workLocation?: string | null
    avatarInitials?: string
    status?: string
    phoneNumber?: string | null
    personalEmail?: string | null
    bloodGroup?: string | null
    dob?: string | null
    code?: string | null
    joiningDate?: string | null
    reportingManager?: string | null
    reportingHR?: string | null
    emergencyName?: string | null
    emergencyPhone?: string | null
    acceptedTerms?: boolean
    acceptedPrivacy?: boolean
    consentAt?: Date | string | null
    termsVersion?: string | null
    privacyVersion?: string | null
    createdAt?: Date | string
    workspace?: WorkspaceCreateNestedOneWithoutProfilesInput
    visitors?: VisitorCreateNestedManyWithoutHostInput
  }

  export type ProfileUncheckedCreateWithoutRegistrationLinksInput = {
    id: string
    name: string
    email: string
    role?: string
    department?: string
    designation?: string | null
    officeBranch?: string | null
    workLocation?: string | null
    avatarInitials?: string
    status?: string
    phoneNumber?: string | null
    personalEmail?: string | null
    bloodGroup?: string | null
    dob?: string | null
    code?: string | null
    joiningDate?: string | null
    reportingManager?: string | null
    reportingHR?: string | null
    emergencyName?: string | null
    emergencyPhone?: string | null
    acceptedTerms?: boolean
    acceptedPrivacy?: boolean
    consentAt?: Date | string | null
    termsVersion?: string | null
    privacyVersion?: string | null
    createdAt?: Date | string
    wid?: number | null
    visitors?: VisitorUncheckedCreateNestedManyWithoutHostInput
  }

  export type ProfileCreateOrConnectWithoutRegistrationLinksInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutRegistrationLinksInput, ProfileUncheckedCreateWithoutRegistrationLinksInput>
  }

  export type WorkspaceUpsertWithoutRegistrationLinksInput = {
    update: XOR<WorkspaceUpdateWithoutRegistrationLinksInput, WorkspaceUncheckedUpdateWithoutRegistrationLinksInput>
    create: XOR<WorkspaceCreateWithoutRegistrationLinksInput, WorkspaceUncheckedCreateWithoutRegistrationLinksInput>
    where?: WorkspaceWhereInput
  }

  export type WorkspaceUpdateToOneWithWhereWithoutRegistrationLinksInput = {
    where?: WorkspaceWhereInput
    data: XOR<WorkspaceUpdateWithoutRegistrationLinksInput, WorkspaceUncheckedUpdateWithoutRegistrationLinksInput>
  }

  export type WorkspaceUpdateWithoutRegistrationLinksInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profiles?: ProfileUpdateManyWithoutWorkspaceNestedInput
    visitors?: VisitorUpdateManyWithoutWorkspaceNestedInput
    config?: WorkspaceConfigUpdateOneWithoutWorkspaceNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutWorkspaceNestedInput
    transactions?: TransactionUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceUncheckedUpdateWithoutRegistrationLinksInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profiles?: ProfileUncheckedUpdateManyWithoutWorkspaceNestedInput
    visitors?: VisitorUncheckedUpdateManyWithoutWorkspaceNestedInput
    config?: WorkspaceConfigUncheckedUpdateOneWithoutWorkspaceNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutWorkspaceNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutWorkspaceNestedInput
  }

  export type ProfileUpsertWithoutRegistrationLinksInput = {
    update: XOR<ProfileUpdateWithoutRegistrationLinksInput, ProfileUncheckedUpdateWithoutRegistrationLinksInput>
    create: XOR<ProfileCreateWithoutRegistrationLinksInput, ProfileUncheckedCreateWithoutRegistrationLinksInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutRegistrationLinksInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutRegistrationLinksInput, ProfileUncheckedUpdateWithoutRegistrationLinksInput>
  }

  export type ProfileUpdateWithoutRegistrationLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    officeBranch?: NullableStringFieldUpdateOperationsInput | string | null
    workLocation?: NullableStringFieldUpdateOperationsInput | string | null
    avatarInitials?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    personalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableStringFieldUpdateOperationsInput | string | null
    code?: NullableStringFieldUpdateOperationsInput | string | null
    joiningDate?: NullableStringFieldUpdateOperationsInput | string | null
    reportingManager?: NullableStringFieldUpdateOperationsInput | string | null
    reportingHR?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyPhone?: NullableStringFieldUpdateOperationsInput | string | null
    acceptedTerms?: BoolFieldUpdateOperationsInput | boolean
    acceptedPrivacy?: BoolFieldUpdateOperationsInput | boolean
    consentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    termsVersion?: NullableStringFieldUpdateOperationsInput | string | null
    privacyVersion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneWithoutProfilesNestedInput
    visitors?: VisitorUpdateManyWithoutHostNestedInput
  }

  export type ProfileUncheckedUpdateWithoutRegistrationLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    officeBranch?: NullableStringFieldUpdateOperationsInput | string | null
    workLocation?: NullableStringFieldUpdateOperationsInput | string | null
    avatarInitials?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    personalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableStringFieldUpdateOperationsInput | string | null
    code?: NullableStringFieldUpdateOperationsInput | string | null
    joiningDate?: NullableStringFieldUpdateOperationsInput | string | null
    reportingManager?: NullableStringFieldUpdateOperationsInput | string | null
    reportingHR?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyPhone?: NullableStringFieldUpdateOperationsInput | string | null
    acceptedTerms?: BoolFieldUpdateOperationsInput | boolean
    acceptedPrivacy?: BoolFieldUpdateOperationsInput | boolean
    consentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    termsVersion?: NullableStringFieldUpdateOperationsInput | string | null
    privacyVersion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wid?: NullableIntFieldUpdateOperationsInput | number | null
    visitors?: VisitorUncheckedUpdateManyWithoutHostNestedInput
  }

  export type ProfileCreateManyWorkspaceInput = {
    id: string
    name: string
    email: string
    role?: string
    department?: string
    designation?: string | null
    officeBranch?: string | null
    workLocation?: string | null
    avatarInitials?: string
    status?: string
    phoneNumber?: string | null
    personalEmail?: string | null
    bloodGroup?: string | null
    dob?: string | null
    code?: string | null
    joiningDate?: string | null
    reportingManager?: string | null
    reportingHR?: string | null
    emergencyName?: string | null
    emergencyPhone?: string | null
    acceptedTerms?: boolean
    acceptedPrivacy?: boolean
    consentAt?: Date | string | null
    termsVersion?: string | null
    privacyVersion?: string | null
    createdAt?: Date | string
  }

  export type VisitorCreateManyWorkspaceInput = {
    id?: string
    name: string
    email: string
    phone: string
    company?: string | null
    purpose: string
    status?: string
    hostId: string
    hostName: string
    checkedInAt?: Date | string | null
    checkedOutAt?: Date | string | null
    preRegisteredAt?: Date | string
    idProofType?: string | null
    idProofNumber?: string | null
    badgeNumber?: string | null
    qrCode?: string | null
    qrValidUntil?: Date | string | null
    walkIn?: boolean
    notes?: string | null
  }

  export type SubscriptionCreateManyWorkspaceInput = {
    id?: string
    plan?: string
    status?: string
    amount: number
    currency: string
    region: string
    currentPeriodStart?: Date | string | null
    currentPeriodEnd?: Date | string | null
    cancelledAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateManyWorkspaceInput = {
    id?: string
    subscriptionId: string
    razorpayOrderId: string
    razorpayPaymentId?: string | null
    amount: number
    currency: string
    region: string
    status?: string
    failureReason?: string | null
    createdAt?: Date | string
    verifiedAt?: Date | string | null
  }

  export type PublicRegistrationLinkCreateManyWorkspaceInput = {
    id?: string
    slug: string
    hostId: string
    officeBranch: string
    enabled?: boolean
    designTheme?: string
    pageTitle?: string | null
    welcomeMessage?: string | null
    qrValidityPeriod?: string
    fieldNameRequired?: boolean
    fieldPhoneRequired?: boolean
    fieldEmailRequired?: boolean
    fieldPurposeRequired?: boolean
    fieldIdProofRequired?: boolean
    fieldCompanyEnabled?: boolean
    fieldCompanyRequired?: boolean
    fieldNotesEnabled?: boolean
    fieldNotesRequired?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfileUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    officeBranch?: NullableStringFieldUpdateOperationsInput | string | null
    workLocation?: NullableStringFieldUpdateOperationsInput | string | null
    avatarInitials?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    personalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableStringFieldUpdateOperationsInput | string | null
    code?: NullableStringFieldUpdateOperationsInput | string | null
    joiningDate?: NullableStringFieldUpdateOperationsInput | string | null
    reportingManager?: NullableStringFieldUpdateOperationsInput | string | null
    reportingHR?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyPhone?: NullableStringFieldUpdateOperationsInput | string | null
    acceptedTerms?: BoolFieldUpdateOperationsInput | boolean
    acceptedPrivacy?: BoolFieldUpdateOperationsInput | boolean
    consentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    termsVersion?: NullableStringFieldUpdateOperationsInput | string | null
    privacyVersion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visitors?: VisitorUpdateManyWithoutHostNestedInput
    registrationLinks?: PublicRegistrationLinkUpdateManyWithoutHostNestedInput
  }

  export type ProfileUncheckedUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    officeBranch?: NullableStringFieldUpdateOperationsInput | string | null
    workLocation?: NullableStringFieldUpdateOperationsInput | string | null
    avatarInitials?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    personalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableStringFieldUpdateOperationsInput | string | null
    code?: NullableStringFieldUpdateOperationsInput | string | null
    joiningDate?: NullableStringFieldUpdateOperationsInput | string | null
    reportingManager?: NullableStringFieldUpdateOperationsInput | string | null
    reportingHR?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyPhone?: NullableStringFieldUpdateOperationsInput | string | null
    acceptedTerms?: BoolFieldUpdateOperationsInput | boolean
    acceptedPrivacy?: BoolFieldUpdateOperationsInput | boolean
    consentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    termsVersion?: NullableStringFieldUpdateOperationsInput | string | null
    privacyVersion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visitors?: VisitorUncheckedUpdateManyWithoutHostNestedInput
    registrationLinks?: PublicRegistrationLinkUncheckedUpdateManyWithoutHostNestedInput
  }

  export type ProfileUncheckedUpdateManyWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    officeBranch?: NullableStringFieldUpdateOperationsInput | string | null
    workLocation?: NullableStringFieldUpdateOperationsInput | string | null
    avatarInitials?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    personalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableStringFieldUpdateOperationsInput | string | null
    code?: NullableStringFieldUpdateOperationsInput | string | null
    joiningDate?: NullableStringFieldUpdateOperationsInput | string | null
    reportingManager?: NullableStringFieldUpdateOperationsInput | string | null
    reportingHR?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyPhone?: NullableStringFieldUpdateOperationsInput | string | null
    acceptedTerms?: BoolFieldUpdateOperationsInput | boolean
    acceptedPrivacy?: BoolFieldUpdateOperationsInput | boolean
    consentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    termsVersion?: NullableStringFieldUpdateOperationsInput | string | null
    privacyVersion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VisitorUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    hostName?: StringFieldUpdateOperationsInput | string
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedOutAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preRegisteredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    idProofType?: NullableStringFieldUpdateOperationsInput | string | null
    idProofNumber?: NullableStringFieldUpdateOperationsInput | string | null
    badgeNumber?: NullableStringFieldUpdateOperationsInput | string | null
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    qrValidUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    walkIn?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    host?: ProfileUpdateOneRequiredWithoutVisitorsNestedInput
  }

  export type VisitorUncheckedUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    hostName?: StringFieldUpdateOperationsInput | string
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedOutAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preRegisteredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    idProofType?: NullableStringFieldUpdateOperationsInput | string | null
    idProofNumber?: NullableStringFieldUpdateOperationsInput | string | null
    badgeNumber?: NullableStringFieldUpdateOperationsInput | string | null
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    qrValidUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    walkIn?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VisitorUncheckedUpdateManyWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    hostName?: StringFieldUpdateOperationsInput | string
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedOutAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preRegisteredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    idProofType?: NullableStringFieldUpdateOperationsInput | string | null
    idProofNumber?: NullableStringFieldUpdateOperationsInput | string | null
    badgeNumber?: NullableStringFieldUpdateOperationsInput | string | null
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    qrValidUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    walkIn?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SubscriptionUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    currentPeriodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUpdateManyWithoutSubscriptionNestedInput
  }

  export type SubscriptionUncheckedUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    currentPeriodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutSubscriptionNestedInput
  }

  export type SubscriptionUncheckedUpdateManyWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    currentPeriodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    razorpayOrderId?: StringFieldUpdateOperationsInput | string
    razorpayPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscription?: SubscriptionUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    subscriptionId?: StringFieldUpdateOperationsInput | string
    razorpayOrderId?: StringFieldUpdateOperationsInput | string
    razorpayPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TransactionUncheckedUpdateManyWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    subscriptionId?: StringFieldUpdateOperationsInput | string
    razorpayOrderId?: StringFieldUpdateOperationsInput | string
    razorpayPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PublicRegistrationLinkUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    officeBranch?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    designTheme?: StringFieldUpdateOperationsInput | string
    pageTitle?: NullableStringFieldUpdateOperationsInput | string | null
    welcomeMessage?: NullableStringFieldUpdateOperationsInput | string | null
    qrValidityPeriod?: StringFieldUpdateOperationsInput | string
    fieldNameRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldPhoneRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldEmailRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldPurposeRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldIdProofRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldCompanyEnabled?: BoolFieldUpdateOperationsInput | boolean
    fieldCompanyRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldNotesEnabled?: BoolFieldUpdateOperationsInput | boolean
    fieldNotesRequired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    host?: ProfileUpdateOneRequiredWithoutRegistrationLinksNestedInput
  }

  export type PublicRegistrationLinkUncheckedUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    officeBranch?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    designTheme?: StringFieldUpdateOperationsInput | string
    pageTitle?: NullableStringFieldUpdateOperationsInput | string | null
    welcomeMessage?: NullableStringFieldUpdateOperationsInput | string | null
    qrValidityPeriod?: StringFieldUpdateOperationsInput | string
    fieldNameRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldPhoneRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldEmailRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldPurposeRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldIdProofRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldCompanyEnabled?: BoolFieldUpdateOperationsInput | boolean
    fieldCompanyRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldNotesEnabled?: BoolFieldUpdateOperationsInput | boolean
    fieldNotesRequired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PublicRegistrationLinkUncheckedUpdateManyWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    officeBranch?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    designTheme?: StringFieldUpdateOperationsInput | string
    pageTitle?: NullableStringFieldUpdateOperationsInput | string | null
    welcomeMessage?: NullableStringFieldUpdateOperationsInput | string | null
    qrValidityPeriod?: StringFieldUpdateOperationsInput | string
    fieldNameRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldPhoneRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldEmailRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldPurposeRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldIdProofRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldCompanyEnabled?: BoolFieldUpdateOperationsInput | boolean
    fieldCompanyRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldNotesEnabled?: BoolFieldUpdateOperationsInput | boolean
    fieldNotesRequired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VisitorCreateManyHostInput = {
    id?: string
    name: string
    email: string
    phone: string
    company?: string | null
    purpose: string
    status?: string
    hostName: string
    checkedInAt?: Date | string | null
    checkedOutAt?: Date | string | null
    preRegisteredAt?: Date | string
    idProofType?: string | null
    idProofNumber?: string | null
    badgeNumber?: string | null
    qrCode?: string | null
    qrValidUntil?: Date | string | null
    walkIn?: boolean
    notes?: string | null
    wid: number
  }

  export type PublicRegistrationLinkCreateManyHostInput = {
    id?: string
    slug: string
    wid: number
    officeBranch: string
    enabled?: boolean
    designTheme?: string
    pageTitle?: string | null
    welcomeMessage?: string | null
    qrValidityPeriod?: string
    fieldNameRequired?: boolean
    fieldPhoneRequired?: boolean
    fieldEmailRequired?: boolean
    fieldPurposeRequired?: boolean
    fieldIdProofRequired?: boolean
    fieldCompanyEnabled?: boolean
    fieldCompanyRequired?: boolean
    fieldNotesEnabled?: boolean
    fieldNotesRequired?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VisitorUpdateWithoutHostInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    hostName?: StringFieldUpdateOperationsInput | string
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedOutAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preRegisteredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    idProofType?: NullableStringFieldUpdateOperationsInput | string | null
    idProofNumber?: NullableStringFieldUpdateOperationsInput | string | null
    badgeNumber?: NullableStringFieldUpdateOperationsInput | string | null
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    qrValidUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    walkIn?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    workspace?: WorkspaceUpdateOneRequiredWithoutVisitorsNestedInput
  }

  export type VisitorUncheckedUpdateWithoutHostInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    hostName?: StringFieldUpdateOperationsInput | string
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedOutAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preRegisteredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    idProofType?: NullableStringFieldUpdateOperationsInput | string | null
    idProofNumber?: NullableStringFieldUpdateOperationsInput | string | null
    badgeNumber?: NullableStringFieldUpdateOperationsInput | string | null
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    qrValidUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    walkIn?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    wid?: IntFieldUpdateOperationsInput | number
  }

  export type VisitorUncheckedUpdateManyWithoutHostInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    hostName?: StringFieldUpdateOperationsInput | string
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedOutAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preRegisteredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    idProofType?: NullableStringFieldUpdateOperationsInput | string | null
    idProofNumber?: NullableStringFieldUpdateOperationsInput | string | null
    badgeNumber?: NullableStringFieldUpdateOperationsInput | string | null
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    qrValidUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    walkIn?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    wid?: IntFieldUpdateOperationsInput | number
  }

  export type PublicRegistrationLinkUpdateWithoutHostInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    officeBranch?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    designTheme?: StringFieldUpdateOperationsInput | string
    pageTitle?: NullableStringFieldUpdateOperationsInput | string | null
    welcomeMessage?: NullableStringFieldUpdateOperationsInput | string | null
    qrValidityPeriod?: StringFieldUpdateOperationsInput | string
    fieldNameRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldPhoneRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldEmailRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldPurposeRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldIdProofRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldCompanyEnabled?: BoolFieldUpdateOperationsInput | boolean
    fieldCompanyRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldNotesEnabled?: BoolFieldUpdateOperationsInput | boolean
    fieldNotesRequired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneRequiredWithoutRegistrationLinksNestedInput
  }

  export type PublicRegistrationLinkUncheckedUpdateWithoutHostInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    wid?: IntFieldUpdateOperationsInput | number
    officeBranch?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    designTheme?: StringFieldUpdateOperationsInput | string
    pageTitle?: NullableStringFieldUpdateOperationsInput | string | null
    welcomeMessage?: NullableStringFieldUpdateOperationsInput | string | null
    qrValidityPeriod?: StringFieldUpdateOperationsInput | string
    fieldNameRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldPhoneRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldEmailRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldPurposeRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldIdProofRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldCompanyEnabled?: BoolFieldUpdateOperationsInput | boolean
    fieldCompanyRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldNotesEnabled?: BoolFieldUpdateOperationsInput | boolean
    fieldNotesRequired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PublicRegistrationLinkUncheckedUpdateManyWithoutHostInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    wid?: IntFieldUpdateOperationsInput | number
    officeBranch?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    designTheme?: StringFieldUpdateOperationsInput | string
    pageTitle?: NullableStringFieldUpdateOperationsInput | string | null
    welcomeMessage?: NullableStringFieldUpdateOperationsInput | string | null
    qrValidityPeriod?: StringFieldUpdateOperationsInput | string
    fieldNameRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldPhoneRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldEmailRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldPurposeRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldIdProofRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldCompanyEnabled?: BoolFieldUpdateOperationsInput | boolean
    fieldCompanyRequired?: BoolFieldUpdateOperationsInput | boolean
    fieldNotesEnabled?: BoolFieldUpdateOperationsInput | boolean
    fieldNotesRequired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManySubscriptionInput = {
    id?: string
    wid: number
    razorpayOrderId: string
    razorpayPaymentId?: string | null
    amount: number
    currency: string
    region: string
    status?: string
    failureReason?: string | null
    createdAt?: Date | string
    verifiedAt?: Date | string | null
  }

  export type TransactionUpdateWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    razorpayOrderId?: StringFieldUpdateOperationsInput | string
    razorpayPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workspace?: WorkspaceUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    wid?: IntFieldUpdateOperationsInput | number
    razorpayOrderId?: StringFieldUpdateOperationsInput | string
    razorpayPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TransactionUncheckedUpdateManyWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    wid?: IntFieldUpdateOperationsInput | number
    razorpayOrderId?: StringFieldUpdateOperationsInput | string
    razorpayPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}