import { UaParser } from './src/env';

export { UaParser };

var parser = new UaParser();
console.log(parser.getResult());
console.log('Hello world');
