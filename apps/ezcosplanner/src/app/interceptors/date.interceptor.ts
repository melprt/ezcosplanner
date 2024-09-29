import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

function convertDateUTC(date: Date): Date {
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
}

type RequestBody = Record<string, unknown> | null;

/**
 * Convert all dates from request body to UTC dates
 *  
 * @param req HttpRequest<unknown>
 * @param next HttpHandlerFn
 * @returns HttpInterceptorFn
 */
export const dateInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  req = req.clone();

  handleBody(req.body as RequestBody);

  return next(req);
};

function handleBody(bodyPart: RequestBody): RequestBody {
  if (bodyPart === null) {
    return null;
  }

  for (const [key, value] of Object.entries(bodyPart)) {
    if (value instanceof Date) {
      bodyPart[key] = convertDateUTC(value);
    } else if (
      typeof value === 'object' &&
      !Array.isArray(value) &&
      value != null
    ) {
      bodyPart[key] = handleBody(value as Record<string, unknown>);
    }
  }

  return bodyPart;
}
