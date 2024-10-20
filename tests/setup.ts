import '@testing-library/jest-dom/vitest' // allow to access all of jest dom matchers
import ResizeObserver from 'resize-observer-polyfill';
import {server} from "./mocks/server"

beforeAll(() => server.listen())

global.ResizeObserver = ResizeObserver;
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();

// used for handle 'matchMedia is not a function' error
beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(), // Deprecated
            removeListener: vi.fn(), // Deprecated
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });
});
