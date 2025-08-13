import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';
import { createDateFormatter } from './createDateFormatter';
import type { CustomFormatters } from './types';

const TEST_DATE = new Date('2025-02-17T16:35:12.345Z');

describe('createDateFormatter', () => {
  beforeAll(() => {
    // Freeze time to a specific moment for consistent testing
    vi.useFakeTimers();
    vi.stubEnv('TZ', 'UTC');
    vi.setSystemTime(TEST_DATE);
  });

  afterAll(() => {
    vi.unstubAllEnvs();
    vi.useRealTimers();
  });

  test('vanilla formatter', () => {
    const formatter = createDateFormatter({});
    const formatted = formatter(TEST_DATE, 'YYYY-MM-DD');

    expect(formatted).toEqual('2025-02-17');
  });

  test('custom formatter', () => {
    const customFormatters: CustomFormatters = {
      SSS: (_, date) => date.getTime().toString().slice(-3),
    };

    const formatter = createDateFormatter(customFormatters);
    const formatted = formatter(TEST_DATE, 'SSS');

    expect(formatted).toEqual('345');
  });
});
