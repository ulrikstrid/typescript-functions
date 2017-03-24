import { httpTriggerTS, HttpRequest, HttpResponse, Context } from '../httpTriggerTS';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.join(__dirname, '../sample.dat');
const sampleDat = fs.readFileSync(dataPath, { encoding: 'utf8' });
const data: { name: string } = JSON.parse(sampleDat);

test('Http trigger with body success', () => {
  const mockContext: Context = {
    done: (err, response) => {
      expect(err).toBeNull();

      expect(response.status).toBe(200);
      expect(response.body).toBe('Hello ' + data.name);
    },
    log: () => { },
  };

  const mockRequest: HttpRequest = {
    body: data,
    query: {},
  };

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
