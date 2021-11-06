const hexWidth = 106;
const hexHeight = 91;

const Grid = {
    _width: window.innerWidth,
    _height: window.innerHeight,
    _rows: Math.floor(this.height / hexHeight),
    _cols: Math.floor(this.width / hexWidth),
    get width() {
        return this._width;
    },
    get height() {
        return this._height;
    },
    get rows() {
        return this._rows;
    },
    get cols() {
        return this._cols;
    },
    set width(width) {
        this._width = width;
        this._cols = Math.floor(this.width / hexWidth);
    },
    set height(height) {
        this._height = height;
        this._rows = Math.floor(this.height / hexHeight);
    },
    setWidthHeight: function(width, height) {
        this.width = width;
        this.height = height;
    },
    generate: function () {
        // delete grid if it already exists
        if(document.getElementById("grid")) Grid.destroy("grid");

        // set up initial grid
        let grid = document.createElement("DIV");
        let width = this.width - (this.width % hexWidth);
        let height = this.height - (this.height % hexHeight);

        grid.setAttribute("id", "grid");
        grid.style.cssText = "min-width:" + width + "px; min-height:" + height + "px";

        console.log(Math.floor(this.height / hexHeight));
        console.log(this.rows);
        console.log(this.cols);
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
    },
    destroy: function(id) {
        document.getElementById(id).remove();
    }
}

window.addEventListener('resize', function(event) {
    Grid.setWidthHeight(window.innerWidth, window.innerHeight);
    Grid.generate();
}, true);

Grid.generate();