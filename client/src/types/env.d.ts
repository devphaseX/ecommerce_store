interface ImportMetaEnv {
  VITE_BACKEND_URL: string;
}

type Status = 'failed' | 'success';

type ResponseBase = {
  status: Status;
};

type PlainErrorWithCause<ErrorCause> = {
  cause?: ErrorCause;
};
type SuccessCase<Data extends unknown> = ([Data] extends [never]
  ? unknown
  : { data: Data }) &
  ResponseBase & {
    status: 'success';
  };

type FailCase<Error, WithCause = boolean> = boolean extends WithCause
  ? FailCase<Error, true>
  : ResponseBase & {
      status: 'failed';
      error: { message: string } & (false extends WithCause
        ? unknown
        : PlainErrorWithCause<Error>);
    };

type DateIsoString = string;
type NativeDate = Date | DateIsoString;
