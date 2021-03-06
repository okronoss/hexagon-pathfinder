class Grid {
    #width;
    #height;
    #hexWidth = 106;
    #hexHeight = 91;

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
    get hexWidth() {
        return this.#hexWidth;
    }
    get hexHeight() {
        return this.#hexHeight;
    }
    get rows() {
        return Math.floor(this.height / this.hexHeight);
    }
    get cols() {
        return Math.floor(this.width / this.hexWidth);
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
        let minWidth = this.width - (this.width % this.hexWidth);
        let minHeight = this.height - (this.height % this.hexHeight);

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
    #unique = false;
    #cssClass = "";
    constructor(x, y, cssClass = "", unique = false) {
        this.x = x;
        this.y = y;
        this.cssClass = cssClass
        this.applyClass(this.cssClass);
    }
    get x() {
        return this.#x;
    }
    get y() {
        return this.#y;
    }
    get unique() {
        return this.#unique;
    }
    get cssClass() {
        return this.#cssClass;
    }
    set x(val) {
        // TODO: when x or y is changed, update the class list of the current node then update the class list of the new node
        document.getElementById("r" + this.y + "c" + this.x).classList.remove(this.cssClass);
        this.#x = val;
        document.getElementById("r" + this.y + "c" + this.x).classList.add(this.cssClass);
    }
    set y(val) {
        // TODO: when x or y is changed, update the class list of the current node then update the class list of the new node
        this.#y = val;
    }
    set unique(val) {
        this.#unique = val;
    }
    set cssClass(val) {
        this.#cssClass = val;
    }
    applyClass(cssClass = "") {
        if(this.unique) this.clearAllClass(cssClass);
        document.getElementById("r" + this.y + "c" + this.x).classList.add(cssClass);
    }
    clearAllClass(cssClass) {
        let current = document.getElementsByClassName(cssClass);
        // for each item in current remove cssClass
        current.forEach((item) => {
            item.classList().remove(cssClass);
        });

    }
}

// Initialize and draw grid
let grid = new Grid(window.innerWidth, window.innerHeight);
grid.generate();

// set start point
let start = new Point(Math.floor(Math.random() * grid.cols / 2),
    Math.floor(Math.random() * grid.rows / 2),
    "start",
    true);

// set end point
let end = new Point(Math.floor(Math.random() * grid.cols / 2 + grid.cols / 2),
    Math.floor(Math.random() * grid.rows / 2 + grid.rows / 2),
    "end",
    true);

window.addEventListener('resize', function(event) {
    grid.width = window.innerWidth;
    grid.height = window.innerHeight;
    grid.generate();
    start.x = Math.floor(Math.random() * grid.cols / 2);
    start.y = Math.floor(Math.random() * grid.rows / 2);
    end.x = Math.floor(Math.random() * grid.cols / 2 + grid.cols / 2);
    end.y = Math.floor(Math.random() * grid.rows / 2 + grid.rows / 2);
}, true);