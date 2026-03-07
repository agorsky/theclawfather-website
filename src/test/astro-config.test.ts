import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const configPath = resolve(__dirname, '../../astro.config.mjs');
const configContent = readFileSync(configPath, 'utf-8');

describe('astro.config.mjs', () => {
  it('configures vite.ssr.noExternal for @fluentui/react-icons', () => {
    expect(configContent).toContain('noExternal');
    expect(configContent).toContain('@fluentui/react-icons');
  });

  it('has a vite.ssr configuration block', () => {
    expect(configContent).toMatch(/vite:\s*\{/);
    expect(configContent).toMatch(/ssr:\s*\{/);
  });

  it('includes required integrations', () => {
    expect(configContent).toContain('sitemap()');
    expect(configContent).toContain('react()');
    expect(configContent).toContain('tailwind(');
  });
});
