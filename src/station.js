import "pixi.js";
import Utils from "./utils";

export default class Station extends PIXI.Graphics {
    constructor({id, position}) {
        super();
        console.log(`Station ${id} created.`);
        this._id = id;
        //this.parentStation = parentStation;
        this._color = "0xFF0000";
        this._cargo = 0;
        this._currentTrain = null;

        this.x = Utils.convert(position.x);
        this.y = Utils.convert(position.y);

        setInterval(() =>  {
            this.addCargo(Math.floor(Math.random() * 10));
        }, 2000);
    }

    enter(train){
        if(this._currentTrain === null){
            console.log(`Train ${train._id} in entering in Station ${this._id}.`);
            this._currentTrain = train;
        } else {
            throw new Error("A train is in this station!");
        }
    }

    leave(train){
        if(train === this._currentTrain){
            console.log(`Train ${train._id} in leaving Station ${this._id}.`);
            this._currentTrain = null;
        }
    }

    getCurrentTrain(){
        return this._currentTrain;
    }

    hasTrain(){
        return this._currentTrain !== null;
    }

    getTheCargo(){
        const cargo = this._cargo;
        this._cargo = 0;
        this._render();
        return cargo;
    }

    addCargo(value){
        this._cargo += value;
        this._render();
    }

    _render(){
        this.clear();
        this.lineStyle(1, this._color);
        this.drawCircle(0, 0, 10 + this._cargo);
    }
}