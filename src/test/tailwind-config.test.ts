import { describe, it, expect } from 'vitest';
import { createRequire } from 'module';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { globSync } from 'fs';

// We can't dynamically import .mjs in vitest easily, so parse the file
const configPath = resolve(__dirname, '../../tailwind.config.mjs');
const configContent = readFileSync(configPath, 'utf-8');

describe('tailwind.config.mjs', () => {
  it('exists and is readable', () => {
    expect(configContent).toBeTruthy();
  });

  it('uses ESM export default syntax', () => {
    expect(configContent).toContain('export default');
  });

  it('includes content paths for all source file types', () => {
    const requiredExtensions = ['astro', 'html', 'js', 'jsx', 'md', 'mdx', 'ts', 'tsx'];
    for (const ext of requiredExtensions) {
      expect(configContent).toContain(ext);
    }
  });

  it('scans the ./src directory', () => {
    expect(configContent).toMatch(/['"]\.\/src\//);
  });

  it('has a content array with glob patterns', () => {
    expect(configContent).toMatch(/content:\s*\[/);
  });

  it('includes theme and plugins sections', () => {
    expect(configContent).toContain('theme:');
    expect(configContent).toContain('plugins:');
  });
});
