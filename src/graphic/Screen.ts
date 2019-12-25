import { Rect } from "../utils/SimpleShapes";

export default class Screen {
    private container: HTMLElement = null;
    private buffer: string[] = Array(25 * 40).fill(' ', 0, 25 * 40);
    private previous_buffer: string[] = Array(25 * 40).fill(' ', 0, 25 * 40);

    public constructor(container: HTMLElement) {
        this.container = container;
    }


    public update() {
        if (!this.has_buffer_changed()) return;
        let buffer_lines = this.buffer.join('').match(/[\s\S]{1,40}/g).map((line) => {
            let escaped = line.replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
            return `<span>${escaped}</span>`;
        });
        this.container.innerHTML = buffer_lines.join('');
    }

    public put(x: number, y: number, char: string) {
        if (x < 0 || x >= 40 || y < 0 || y >= 25) return;
        let i = x + y * 40;
        if (typeof char !== 'string' || char === '') debugger;
        let chars = char.split('');
        chars.forEach((char) => {
            if (x >= 40) return;
            if (this.buffer[i] !== char) {
                this.buffer[i] = char;
            }
            x++; i++;
        });
    }

    public fill(rect: Rect, char: string) {
        let line = char.repeat(rect.width());
        for (let y = rect.top; y < rect.bottom; ++y) {
            this.put(rect.left, y, line);
        }
    }

    public border(rect: Rect) {
        for (let x = rect.left; x < rect.right; ++x) {
            this.put(x, rect.top, '-');
            this.put(x, rect.bottom, '-');
        }
        for (let y = rect.top; y < rect.bottom; ++y) {
            this.put(rect.left, y, '|');
            this.put(rect.right, y, '|');
        }
        this.put(rect.right, rect.top, '+');
        this.put(rect.left, rect.top, '+');
        this.put(rect.right, rect.bottom, '+');
        this.put(rect.left, rect.bottom, '+');
    }

    private has_buffer_changed(): boolean {
        let changed = false;
        this.buffer.forEach((char, i) => {
            if (this.previous_buffer[i] !== char) {
                this.previous_buffer[i] = char;
                changed = true;
            }
        });
        return changed;
    }
};