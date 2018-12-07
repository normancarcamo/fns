export const input = {
  pass: {
    null: [ null ],
    browser: {
      setup: () => {
        global.window = {};
      },
      tearDown: () => {
        delete global.window;
      }
    },
    empty: [
      '', {}, [],
      /* istanbul ignore next */
      function() {},
      /* istanbul ignore next */
      () => {}
    ],
    UUID: [
      '7cf70174-f95a-11e8-8eb2-f2801f1b9fd1', // v1
      'e8e3db08-dc39-48ea-a3db-08dc3958eafb', // v2
      'e8b5a51d-11c8-3310-a6ab-367563f20686', // v3
      'c63deff2-1c91-4dd5-93ff-49d2ce061c54', // v4
      'fdda765f-fc57-5604-a269-52a7df8164ec', // v5
    ],
    promise: [
      Promise.resolve(1),
      Promise.reject(new Error('test'))
    ],
    integer: [ 23, 23, 32434234234, -245 ],
    isIPv4Address: [
      '115.42.150.37',
      '192.168.0.1',
      '110.234.52.124',
      '217.0.0.1',
      '10.0.2.14',
      '0.0.0.0'
    ]
  },
  fail: {
    null: [
      undefined, '', 3, '3', 'sklnlksdnf', [], '{}', {}, '[]', 0,
      ['kdnfkdfn'], [[{}]], true, false, 1,
      /* istanbul ignore next */
      function(){},
      /* istanbul ignore next */
      () => {},
    ],
    undefined: [
      null, '', 3, '3', 'undefined', [], '{}', {}, '[]', 0,
      ['kdnfkdfn'], [[{}]], true, false, 1,
      /* istanbul ignore next */
      function(){},
      /* istanbul ignore next */
      () => {},
    ],
    string: [
      null, 3, [], {}, 0, -1, ['kdnfkdfn'], [[{}]],
      true, false, undefined,
      /* istanbul ignore next */
      function(){},
      /* istanbul ignore next */
      () => {},
    ],
    boolean: [
      undefined, null, 3, [], {}, 0, -1, ['kdnfkdfn'], [[{}]], 'wdsfsdfsfd',
      /* istanbul ignore next */
      function(){},
      /* istanbul ignore next */
      () => {},
    ],
    number: [
      undefined, null, [], {}, ['kdnfkdfn'], [[{}]], 'wdsfsdfsfd', true, false,
      /* istanbul ignore next */
      function(){},
      /* istanbul ignore next */
      () => {},
    ],
    array: [
      undefined, null, {}, { numbers: [2, 3, 4, [[[]]]] }, 4.2,
      'wdsfsdfsfd', true, false, 2, '[]',
      /* istanbul ignore next */
      function(){},
      /* istanbul ignore next */
      () => {}
    ],
    object: [
      undefined, null, [], [{}], 4.2, '{}',
      'wdsfsdfsfd', true, false, 2,
      /* istanbul ignore next */
      function() {},
      /* istanbul ignore next */
      () => {},
    ],
    function: [
      undefined, null, [], [{}], 4.2, '{}', {},
      'wdsfsdfsfd', true, false, 2, 'function(){}', '() => {}'
    ],
    browser: [
      undefined, null, [], [{}], 4.2, '{}', {},
      'wdsfsdfsfd', true, false, 2,
      /* istanbul ignore next */
      function(){},
      /* istanbul ignore next */
      () => {}
    ],
    empty: [
      undefined, null, [''], [{}], 4.2, '{}', 0, -1,
      'wdsfsdfsfd', true, false, function(){ let a; }, () => { let e; }
    ],
    UUID: [
      undefined, null, [''], [{}], 4.2, '{}', 0, -1,
      'wdsfsdfsfd', true, false,
      '123e4567-e89b-12d3-a456-55664240',
      function(){ let a; }, () => { let e; },
      /* istanbul ignore next */
      function(){},
      /* istanbul ignore next */
      () => {},
    ],
    promise: [
      undefined, null, [''], [{}], 4.2, '{}', 0, -1,
      '123e4567-e89b-12d3-a456-55664240',
      'wdsfsdfsfd', true, false,
      function(){ let a; }, () => { let e; },
      /* istanbul ignore next */
      function(){},
      /* istanbul ignore next */
      () => {},
    ],
    integer: [
      undefined, null, [''], [{}], 4.2, '{}',
      'wdsfsdfsfd', true, false,
      '123e4567-e89b-12d3-a456-55664240',
      function(){ let a; }, () => { let e; },
      /* istanbul ignore next */
      function(){},
      /* istanbul ignore next */
      () => {}
    ],
    isIPv4Address: [
      undefined, null, [''], [{}], 4.2, '{}',
      'wdsfsdfsfd', true, false,
      '123e4567-e89b-12d3-a456-55664240',
      function(){ let a; }, () => { let e; },
      /* istanbul ignore next */
      function(){},
      /* istanbul ignore next */
      () => {},
      234234, 234, 0, 1, 40040404,
      '.42.150.37',
      '192.0.1',
      '110..52.124',
      '217.a.0.1',
      '10.120d.2.14',
      '0.0.0f.0'
    ]
  }
}
