import Utils from "./utils";

export default class Stop {
    constructor(ctx, id, position, parent, color) {
        console.log(`Stop ${id} created.`);
        this._id = id;
        this._position = position;
        this._parent = parent;
        this._ctx = ctx;
        this._color = color;
    }

    get position() {
        return this._position;
    }

    render() {
        this._ctx.beginPath();
        this._ctx.strokeStyle = this._color;
        this._ctx.arc(Utils.convert(this.position.x), Utils.convert(this.position.y), 10, 0, 2 * Math.PI);
        this._ctx.stroke();

        if (typeof this._parent !== "undefined") {
            const px = Utils.convert(this._parent.position.x);
            const py = Utils.convert(this._parent.position.y);
            const x = Utils.convert(this.position.x);
            const y = Utils.convert(this.position.y);

            this._ctx.beginPath();
            this._ctx.strokeStyle = this._color;
            this._ctx.moveTo(px, py);
            this._ctx.lineTo(x, y);
            this._ctx.stroke();
        }
    }
}
