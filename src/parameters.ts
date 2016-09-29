const _ = require('lodash');
import { Parameters as DEVParameters } from 'parameters.dev';

let Parameters = {
  DEFAULT_LANG: 'en',
  USER_SERVICE_API: 'http://localhost:8888',
  TRANSLATION_SERVICE_API: 'http://localhost:8888',
  MEDIA_SERVICE_API: 'http://localhost:3030',
  TRANSLATION_SERVICE_API_REAL: 'http://localhost:3040',
  TRANSLATION_SERVICE_PROVIDER: 'rest',
  PUBLIC_DIR: './src/app'
}

_.extend(Parameters, DEVParameters);

export { Parameters };
