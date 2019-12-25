class Point {
    public x: number;
    public y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public static create_random_direction(): Point {
        let x = Math.trunc(Math.random() * 3) - 1;
        let y = Math.trunc(Math.random() * 3) - 1;
        return new Point(x, y);
    }
}

class Rect {
    public left: number;
    public top: number;
    public right: number;
    public bottom: number;

    private constructor(
        left: number,
        top: number,
        right: number,
        bottom: number,
    ) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }

    public width(): number {
        return this.right - this.left;
    }

    public height(): number {
        return this.bottom - this.top;
    }

    public get_inner_rect(border: number): Rect {
        return new Rect(
            this.left + border,
            this.top + border,
            this.right - border,
            this.bottom - border
        );
    }

    public static from_boundries(
        left: number,
        top: number,
        right: number,
        bottom: number,
    ): Rect {
        return new Rect(left, top, right, bottom);
    }

    public static from_point_with_size(
        center: Point,
        width: number,
        height: number,
    ): Rect {
        return new Rect(center.x - width / 2, center.y - height / 2, center.x + width / 2, center.y + height / 2);
    }
}

export {
    Point,
    Rect
}