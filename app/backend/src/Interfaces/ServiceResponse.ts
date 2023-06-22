export type ServiceResponseSuccess<T> = {
  status: 'SUCCESS',
  data: T
};

type ErrorTypes = 'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND' | 'CONFLICT';
type ServiceMessage = { message: string };

export type ServiceResponseError = {
  status: ErrorTypes,
  data: ServiceMessage
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
