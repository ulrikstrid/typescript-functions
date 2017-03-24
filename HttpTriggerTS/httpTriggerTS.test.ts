import { httpTriggerTS, HttpRequest, HttpResponse, Context } from '../HttpTriggerTS/httpTriggerTS';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.join(__dirname, './sample.dat');
const sampleDat = fs.readFileSync(dataPath, { encoding: 'utf8' });
const data: { name: string } = JSON.parse(sampleDat);

test('Http trigger with body success', () => {
  const mockContext: Context = {
    done: (err, response) => {
      // As everything is passed to the done function we can do our asserts here.
      expect(err).toBeNull(); // We never call the done function with a Error.

      expect(response.status).toBe(200); // When we succeed it should be 200.
      expect(response.body).toBe('Hello ' + data.name); // The response body built as in the function.
    },
    log: () => { }, // We can use a jest mock here if the logs are important to us, but in this case it is not.
  };

  // This is the request we will use to test our function.
  const mockRequest: HttpRequest = {
    body: data, // The data from sample.dat
    query: {},
  };

  // Call the function
  httpTriggerTS(mockContext, mockRequest);
});

test('Http trigger with query success', () => {
  const mockContext: Context = {
    done: (err, response) => {
      expect(err).toBeNull();

      expect(response.status).toBe(200);
      expect(response.body).toBe('Hello ' + data.name);
    },
    log: () => { },
  };

  const mockRequest: HttpRequest = {
    body: {},
    query: data,
  };

  httpTriggerTS(mockContext, mockRequest);
});

test('Http trigger fail', () => {
  const mockContext: Context = {
    done: (err, response) => {
      expect(err).toBeNull();

      expect(response.status).toBe(400);
      expect(response.body).toBe("Please pass a name on the query string or in the request body");
    },
    log: () => { },
  };

  const mockRequest: HttpRequest = {
    body: {},
    query: {},
  };

  httpTriggerTS(mockContext, mockRequest);
});
