import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import pkg from './package.json' assert { type: 'json' };
import json from '@rollup/plugin-json';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import { visualizer } from 'rollup-plugin-visualizer';

const PRODUCTION = process.env.NODE_ENV === 'production';

const comfortReactGlobals = {
    'date-fns/locale/tr': 'date-fns/locale/tr',
    'date-fns/locale/en-US': 'date-fns/locale/en-US',
    '@mui/icons-material': '@mui/icons-material',
    '@mui/icons-material/Close': '@mui/icons-material/Close',
    '@mui/icons-material/FilterList': '@mui/icons-material/FilterList',
    '@mui/icons-material/Visibility': '@mui/icons-material/Visibility',
    '@mui/icons-material/VisibilityOff': '@mui/icons-material/VisibilityOff',
    '@mui/lab': '@mui/lab',
    '@mui/lab/LoadingButton': '@mui/lab/LoadingButton',
    '@mui/material': '@mui/material',
    '@mui/material/Collapse': '@mui/material/Collapse',
    '@mui/material/ClickAwayListener': '@mui/material/ClickAwayListener',
    '@mui/material/InputAdornment': '@mui/material/InputAdornment',
    '@mui/material/IconButton': '@mui/material/IconButton',
    '@mui/material/Menu': '@mui/material/Menu',
    '@mui/material/MenuItem': '@mui/material/MenuItem',
    '@mui/material/Slide': '@mui/material/Slide',
    '@mui/material/styles': '@mui/material/styles',
    '@mui/material/SvgIcon': '@mui/material/SvgIcon',
    '@mui/material/Tooltip': '@mui/material/Tooltip',
    '@mui/utils': '@mui/utils',
    '@mui/x-date-pickers': '@mui/x-date-pickers',
    '@mui/x-date-pickers/AdapterDateFns': '@mui/x-date-pickers/AdapterDateFns',
    react: 'react',
    'react-dom': 'react-dom',
    'react-draggable': 'react-draggable',
    'react-dropzone': 'react-dropzone',
    'react-imask': 'react-imask',
    'react-phone-input-2': 'react-phone-input-2',
    'react-phone-input-2/lang/tr.json': 'react-phone-input-2/lang/tr.json',
};

export default {
    input: 'src/lib/index.js',
    output: [
        {
            file: pkg.module,
            format: 'esm',
            globals: comfortReactGlobals,
        },
        {
            file: pkg.main,
            format: 'umd',
            globals: comfortReactGlobals,
            name: 'index.js',
        },
    ],
    plugins: [
        replace({
            preventAssignment: false,
            'process.env.NODE_ENV': JSON.stringify(PRODUCTION ? 'production' : 'development'),
        }),
        external(),
        babel({
            babelrc: false,
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            plugins: ['@babel/plugin-proposal-function-bind', '@babel/plugin-proposal-class-properties'],
            presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-react'],
        }),
        resolve({
            mainFields: ['browser', 'jsnext', 'module', 'main'],
        }),
        postcss({
            extensions: ['.css'],
        }),
        commonjs({
            // non-CommonJS modules will be ignored, but you can also
            // specifically include/exclude files
            include: 'node_modules/**', // Default: undefined
            // these values can also be regular expressions
            // include: /node_modules/

            // search for files other than .js files (must already
            // be transpiled by a previous plugin!)
            extensions: ['.js', '.jsx', '.coffee'], // Default: [ '.js' ]

            // if true then uses of `global` won't be dealt with by this plugin
            ignoreGlobal: false, // Default: false

            // if false then skip sourceMap generation for CommonJS modules
            sourceMap: false, // Default: true

            // sometimes you have to leave require statements
            // unconverted. Pass an array containing the IDs
            // or a `id => boolean` function. Only use this
            // option if you know what you're doing!
            ignore: ['conditional-runtime-dependency'],
        }),
        json(),
        globals(),
        builtins(),
        PRODUCTION ? visualizer({ gzipSize: true }) : null,
    ],
};
