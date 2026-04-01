import assert from 'node:assert/strict';

import { matchRoutes } from 'react-router-dom';

import { routes } from '../src/lib/routes.ts';
import { routeMetadata, type AppRouteHandle } from '../src/router/route-metadata.ts';
import { appRoutes } from '../src/router/routes.tsx';

function getRouteHandle(pathname: string) {
  const matches = matchRoutes(appRoutes, pathname);

  assert(matches && matches.length > 0, `No route matched ${pathname}`);

  const lastMatch = matches[matches.length - 1]?.route as { handle?: AppRouteHandle };
  const route = lastMatch.handle?.route;

  assert(route, `Missing route metadata for ${pathname}`);

  return route;
}

const sampleProjectId = 'sample-project';

const requiredRoutes = [
  routes.projects(),
  routes.create(),
  routes.projectOverview(sampleProjectId),
  routes.projectPipeline(sampleProjectId),
  routes.projectAssets(sampleProjectId),
  routes.projectBoard(sampleProjectId),
  routes.projectStudio(sampleProjectId),
  routes.projectQA(sampleProjectId),
  routes.settings(),
];

assert.equal(requiredRoutes.length, Object.keys(routeMetadata).length, 'Required route coverage drifted from route metadata');

for (const pathname of requiredRoutes) {
  getRouteHandle(pathname);
}

const routeCases = [
  {
    pathname: routes.projects(),
    expectedMetadata: routeMetadata.projects,
  },
  {
    pathname: routes.create(),
    expectedMetadata: routeMetadata.create,
  },
  {
    pathname: routes.projectOverview(sampleProjectId),
    expectedMetadata: routeMetadata.projectOverview,
  },
  {
    pathname: routes.projectPipeline(sampleProjectId),
    expectedMetadata: routeMetadata.projectPipeline,
  },
  {
    pathname: routes.projectAssets(sampleProjectId),
    expectedMetadata: routeMetadata.projectAssets,
  },
  {
    pathname: routes.projectBoard(sampleProjectId),
    expectedMetadata: routeMetadata.projectBoard,
  },
  {
    pathname: routes.projectStudio(sampleProjectId),
    expectedMetadata: routeMetadata.projectStudio,
  },
  {
    pathname: routes.projectQA(sampleProjectId),
    expectedMetadata: routeMetadata.projectQA,
  },
  {
    pathname: routes.settings(),
    expectedMetadata: routeMetadata.settings,
  },
];

for (const testCase of routeCases) {
  const resolvedMetadata = getRouteHandle(testCase.pathname);

  assert.equal(resolvedMetadata.id, testCase.expectedMetadata.id, `Route id mismatch for ${testCase.pathname}`);
  assert.equal(resolvedMetadata.title, testCase.expectedMetadata.title, `Route title mismatch for ${testCase.pathname}`);
  assert.equal(
    resolvedMetadata.description,
    testCase.expectedMetadata.description,
    `Route description mismatch for ${testCase.pathname}`,
  );
  assert.deepEqual(
    resolvedMetadata.shell,
    testCase.expectedMetadata.shell,
    `Shell metadata mismatch for ${testCase.pathname}`,
  );
}

console.log('Route shell metadata smoke test: OK');