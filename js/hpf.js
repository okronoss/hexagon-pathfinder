const hexWidth = 106;
const hexHeight = 91;

const Grid = class {
    constructor(width = window.innerWidth, height = window.innerHeight) {
        this.width = width;
        this.height = height;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    get rows() {
        return Math.floor(this.height / hexHeight);
    }
    get cols() {
        return Math.floor(this.width / hexWidth);
    }
    set width(width) {
        this._width = width;
    }
    set height(height) {
        this._height = height;
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

let grid = new Grid(window.innerWidth, window.innerHeight);

grid.generate();

window.addEventListener('resize', function(event) {
    grid.width = window.innerWidth;
    grid.height = window.innerHeight;
    grid.generate();
}, true);