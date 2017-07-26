const sX = 0.34;
const sY = 0.06;
const sS = 20000;

export default class Line {
  constructor(id, color, data) {
    this._id = id;
    // console.log(`Line ${this._id} created.`);
    this.color = color;
    this.list = [];

    for (let i = 0; i < data.length; i += 1) {
      const info = data[i];
      const lat = Line.convert(parseFloat(info.lat));
      const lon = Line.convert(parseFloat(info.lon));
      const station = {
        id: `${info.id}-f`,
        name: `${info.name}-f`,
        line: info.line,
        lat,
        lon,
        color: this.color,
        position: { x: lat - (sS * sX), y: lon - (sS * sY) },
        dir: 1,
        type: 1,
      };

      this.list.push(station);
    }

    const dataRev = data.reverse();

    for (let j = 0; j < dataRev.length; j += 1) {
      const info = dataRev[j];
      const lat = Line.convert(parseFloat(info.lat));
      const lon = Line.convert(parseFloat(info.lon));
      const station = {
        id: `${info.id}-b`,
        name: `${info.name}-b`,
        line: info.line,
        lat,
        lon,
        color: this.color,
        position: { x: lat - (sS * sX), y: lon - (sS * sY) },
        dir: -1,
        type: 1,
      };
      this.list.push(station);
    }
  }

  static convert(value) {
    const integer = Math.floor(value);
    return Math.floor(((value - integer) * sS));
  }

  get id() {
    return this._id;
  }

  set list(value) {
    this._list = value;
  }

  get list() {
    return this._list;
  }

  set color(value) {
    this._color = value;
  }

  get color() {
    return this._color;
  }
}
