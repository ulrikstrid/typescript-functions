interface Context {
  log: (...message: any[]) => void;
  done: (err: Error | null, res: Res | null) => void;
}

interface Req {
  body: {
    name: string,
  };
  query: {
    name: string,
  };
}

interface Res {
  status: number;
  body: string;
}

module.exports = function (context: Context, req: Req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    let res: Res | null = null;

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
