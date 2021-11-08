const hexWidth = 106;
const hexHeight = 91;

class Grid {
    #width;
    #height;

    constructor(width = window.innerWidth, height = window.innerHeight) {
        this.width = width;
        this.height = height;
    }
    get width() {
        return this.#width;
    }
    get height() {
        return this.#height;
    }
    get rows() {
        return Math.floor(this.height / hexHeight);
    }
    get cols() {
        return Math.floor(this.width / hexWidth);
    }
    set width(width) {
        this.#width = width;
    }
    set height(height) {
        this.#height = height;
    }
    generate() {
        // delete grid if it already exists
        if(document.getElementById("grid")) this.destroy("grid");

        // set up initial grid
        let grid = document.createElement("DIV");
        let minWidth = this.width - (this.width % hexWidth);
        let minHeight = this.height - (this.height % hexHeight);

        grid.setAttribute("id", "grid");
        grid.style.cssText = "min-width:" + minWidth + "px; min-height:" + minHeight + "px";

        for (let i = 0; i < this.rows; i++) {
            let row = document.createElement("DIV");
            row.setAttribute("class", "row");

            for (let j = 0; j < this.cols; j++) {
                let cell = document.createElement("div");
                cell.setAttribute("class", "hexagon");
                cell.setAttribute("id", "r" + i + "c" + j);
                row.appendChild(cell);
            }

            grid.appendChild(row);
        }

        document.body.appendChild(grid);
    }
    destroy(id) {
        document.getElementById(id).remove();
    }
}

class Point {
    #x = 0;
    #y = 0;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    get x() {
        return this.#x;
    }
    get y() {
        return this.#y;
    }
    set x(val) {
        this.#x = val;
    }
    set y(val) {
        this.#y = val;
    }
}

class Start extends Point{
    constructor(x, y) {
        super(x, y);
        this.checkConflict();
        this.applyClass();
    }
    checkConflict(...id) {

    }
    applyClass() {
        document.getElementById("r" + this.y + "c" + this.x).classList.add("start");
    }
}

let grid = new Grid(window.innerWidth, window.innerHeight);
let start = new Start(Math.floor(Math.random() * grid.cols), Math.floor(Math.random() * grid.rows));
let end = new Point(Math.floor(Math.random() * grid.cols), Math.floor(Math.random() * grid.rows));

// if the end point is the same as a
while(start.x === end.x && start.y === end.y) {
    end.x = Math.floor(Math.random() * grid.cols);
    end.y = Math.floor(Math.random() * grid.rows);
}
// initialize grid
grid.generate();
// set start point
// set end point

//

window.addEventListener('resize', function(event) {
    grid.width = window.innerWidth;
    grid.height = window.innerHeight;
    grid.generate();
}, true);