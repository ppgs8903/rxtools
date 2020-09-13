import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import html from '@rollup/plugin-html';
import babel from '@rollup/plugin-babel';
import url from '@rollup/plugin-url';
import serve from 'rollup-plugin-serve';
import json from '@rollup/plugin-json';
import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'index.js',
    output: {
      name: 'index',
      file: pkg.browser,
      format: 'umd',
    },
    plugins: [
      serve({
        open: true,
        contentBase: ['dist', 'static'],
      }),
      babel({
        exclude: 'node_modules/**',
      }),
      json(),
      url({
        limit: 5 * 1024,
        include: ['**/*.png'], // defaults to .svg, .png, .jpg and .gif files
        emitFiles: true, // defaults to true
      }),
      html(),
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
    ],
  },
  {
    input: 'index.js',
    external: ['ms'],
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
      json(),
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
    ],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
  },
];
