import { mergeConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, defineConfig({
    test: {
        globals: true,
        environment: "jsdom",
        include: ['src/**/*.test.{js,ts}'],
        coverage: {
            provider: 'c9',
            all: true,
            reporter: ['text', 'json', 'html'],
            include: ['src']
        }
    }
}))