import assert from 'node:assert/strict';

import { matchRoutes } from 'react-router-dom';

import { appRoutes, type ShellLayoutHandle } from '../src/router/routes';

function getShellHandle(pathname: string) {
  const matches = matchRoutes(appRoutes, pathname);

  assert(matches && matches.length > 0, `No route matched ${pathname}`);

  const lastMatch = matches[matches.length - 1]?.route as { handle?: ShellLayoutHandle };
  const shell = lastMatch.handle?.shell;

  assert(shell, `Missing shell metadata for ${pathname}`);

  return shell;
}

const requiredRoutes = [
  '/projects',
  '/create',
  '/projects/alpha',
  '/projects/alpha/pipeline',
  '/projects/alpha/assets',
  '/projects/alpha/board',
  '/projects/alpha/studio',
  '/projects/alpha/qa',
  '/settings',
];

for (const pathname of requiredRoutes) {
  getShellHandle(pathname);
}

const shellCases = [
  {
    pathname: '/projects/alpha/board',
    expected: {
      showProjectHeader: true,
      showInspector: false,
      showBottomDrawer: false,
    },
  },
  {
    pathname: '/projects/alpha/studio',
    expected: {
      showProjectHeader: true,
      showInspector: false,
      showBottomDrawer: false,
    },
  },
  {
    pathname: '/projects/alpha/pipeline',
    expected: {
      showProjectHeader: true,
      showInspector: true,
      showBottomDrawer: true,
    },
  },
  {
    pathname: '/projects/alpha/assets',
    expected: {
      showProjectHeader: true,
      showInspector: true,
      showBottomDrawer: true,
    },
  },
  {
    pathname: '/projects/alpha/qa',
    expected: {
      showProjectHeader: true,
      showInspector: true,
      showBottomDrawer: true,
    },
  },
];

for (const testCase of shellCases) {
  assert.deepEqual(getShellHandle(testCase.pathname), testCase.expected, `Shell metadata mismatch for ${testCase.pathname}`);
}

console.log('Route shell smoke test: OK');