import { ZodAny, ZodRawShape, ZodTypeAny } from 'zod';

declare global {
  type Status = 'failed' | 'success';

  type ResponseBase = {
    status: Status;
  };

  type PlainErrorWithCause<ErrorCause> = {
    cause?: ErrorCause;
  };
  type SuccessCase<Data> = {
    [K in 'data' as unknown extends Data ? never : K]: Data;
  } & ResponseBase & {
      status: 'success';
    };

  type FailCase<
    Error,
    WithCause extends boolean = boolean
  > = boolean extends WithCause
    ? FailCase<Error, true>
    : ResponseBase & {
        status: 'failed';
        error: { message: string } & (false extends WithCause
          ? unknown
          : PlainErrorWithCause<Error>);
      };

  type SharedServerGenField = 'createdAt' | 'updatedAt';

  type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

  type ExtensibleZodShape<T> = Expand<
    ZodRawShape & {
      [K in keyof T]: T[K] extends object
        ? ExtensibleZodShape<T[K]>
        : ZodTypeAny;
    }
  >;

  type ServerResponse<Data, Error, Dev extends boolean = boolean> =
    | SuccessCase<Data>
    | FailCase<Error, Dev>;

  type DataWithId<T> = { _id?: string; id: string } & T;

  type ACTIVE_ON_DEV = ReturnType<
    typeof getEnvVariable
  >['NODE_ENV'] extends infer Mode
    ? 'development' extends Mode
      ? 'production' extends Mode
        ? boolean
        : true
      : false
    : boolean;

  type StringifyNumber = `${number}`;
  interface ParsedQueryBase extends qs.ParsedQs {
    limit?: StringifyNumber;
    skip?: StringifyNumber;
  }
}
