import {createCanvas} from 'canvas';

import Profile from '../../../../models/Profile';
import Size from '../../../../models/Size';
import buildTreeMap from './buildTreeMap';
import drawTreeMap from './drawTreeMap';

describe('drawTreeMap', () => {
  interface TestCase {
    description: string;
    profile: Profile;
  }

  const testCases: TestCase[] = [
    {description: 'empty profile', profile: {name: 'root', weight: 0}},
    {
      description: 'single node',
      profile: {
        name: 'root',
        weight: 100,
        children: [
          {
            name: 'A',
            weight: 100,
          },
        ],
      },
    },
    {
      description: 'several nodes',
      profile: {
        name: 'root',
        weight: 300,
        children: [
          {
            name: 'A',
            weight: 100,
          },
          {
            name: 'B',
            weight: 200,
          },
        ],
      },
    },
    {
      description: 'long node name',
      profile: {
        name: 'root',
        weight: 300,
        children: [
          {
            name: 'long long long long long node name',
            weight: 100,
          },
          {
            name: 'B',
            weight: 200,
          },
        ],
      },
    },
    {
      description: 'node nesting',
      profile: {
        name: 'root',
        weight: 300,
        children: [
          {
            name: 'A',
            weight: 100,
          },
          {
            name: 'B',
            weight: 200,
            children: [
              {
                name: 'B-A',
                weight: 50,
              },
              {
                name: 'B-B',
                weight: 150,
              },
            ],
          },
        ],
      },
    },
    {
      description: 'very small node',
      profile: {
        name: 'root',
        weight: 100,
        children: [
          {
            name: 'A',
            weight: 99,
          },
          {
            name: 'B',
            weight: 1,
          },
        ],
      },
    },
    {
      description: 'zero duration node',
      profile: {
        name: 'root',
        weight: 10,
        children: [
          {
            name: 'A',
            weight: 10,
          },
          {
            name: 'B',
            weight: 0,
          },
        ],
      },
    },
    {
      description: 'multiple small nodes - 5',
      profile: {
        name: 'root',
        weight: 10,
        children: [
          {
            name: 'A',
            weight: 5,
          },
          ...new Array(5)
            .fill(true)
            .map((_, idx) => ({name: `B-${idx}`, weight: 1})),
        ],
      },
    },
    {
      description: 'multiple small nodes - 50',
      profile: {
        name: 'root',
        weight: 100,
        children: [
          {
            name: 'A',
            weight: 50,
          },
          ...new Array(50)
            .fill(true)
            .map((_, idx) => ({name: `B-${idx}`, weight: 1})),
        ],
      },
    },
    {
      description: 'multiple small nodes - 500',
      profile: {
        name: 'root',
        weight: 1000,
        children: [
          {
            name: 'A',
            weight: 500,
          },
          ...new Array(500)
            .fill(true)
            .map((_, idx) => ({name: `B-${idx}`, weight: 1})),
        ],
      },
    },
    {
      description: 'multiple small nodes - 5000',
      profile: {
        name: 'root',
        weight: 10000,
        children: [
          {
            name: 'A',
            weight: 5000,
          },
          ...new Array(5000)
            .fill(true)
            .map((_, idx) => ({name: `B-${idx}`, weight: 1})),
        ],
      },
    },
    {
      description: 'complex',
      profile: {
        name: 'root',
        weight: 1000,
        children: [
          {
            name: 'A',
            weight: 750,
            children: [
              {
                name: 'A-A',
                weight: 300,
                children: [
                  {
                    name: 'A-A-A',
                    weight: 200,
                  },
                  {
                    name: 'A-A-B',
                    weight: 100,
                  },
                ],
              },
              {
                name: 'A-B',
                weight: 450,
              },
            ],
          },
          {
            name: 'B',
            weight: 250,
            children: [
              {
                name: 'B-A',
                weight: 50,
              },
              {
                name: 'B-B',
                weight: 50,
              },
              {
                name: 'B-C',
                weight: 150,
              },
            ],
          },
        ],
      },
    },
  ];

  testCases.forEach((tc) => {
    it(tc.description, () => {
      const canvasSize: Size = {width: 500, height: 400};
      const canvas = createCanvas(canvasSize.width, canvasSize.height);
      const ctx = canvas.getContext('2d');

      const data = buildTreeMap(tc.profile, canvasSize);
      drawTreeMap(ctx, data, canvasSize);

      expect(canvas.toBuffer()).toMatchImageSnapshot();
    });
  });
});
