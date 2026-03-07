import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const pagePath = resolve(__dirname, '../pages/dispatcher.astro');
const pageContent = readFileSync(pagePath, 'utf-8');

describe('dispatcher.astro', () => {
  it('mounts DispatcherMarketing with client:load', () => {
    expect(pageContent).toContain('<DispatcherMarketing client:load />');
  });

  it('does not use client:only', () => {
    expect(pageContent).not.toContain('client:only');
  });

  it('imports DispatcherMarketing component', () => {
    expect(pageContent).toContain(
      "import DispatcherMarketing from '../components/DispatcherMarketing.tsx'"
    );
  });
});
