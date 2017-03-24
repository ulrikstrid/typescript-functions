export interface HttpRequest {
  body: {
    name?: string,
  };
  query: {
    name?: string,
  };
}

export interface HttpResponse {
  status: number;
  body: string;
}

export interface Context {
  log: (...message: any[]) => void;
  done: (err: Error | null, res: HttpResponse) => void;
}

export function httpTriggerTS(context: Context, req: HttpRequest) {
  context.log('JavaScript HTTP trigger function processed a request.');
  let res: HttpResponse | null = null;

  if (req.query.name || (req.body && req.body.name)) {
    res = {
      status: 200,
      body: "Hello " + (req.query.name || req.body.name)
    };
  }
  else {
    res = {
      status: 400,
      body: "Please pass a name on the query string or in the request body"
    };
  }
  context.done(null, res);
};
