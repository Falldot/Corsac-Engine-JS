module.exports = class Manager{
    
    figures = new Array(100);
    figuresPointer = 0;
    constructor(gl, color){
        this.gl = gl;
        this.color = color;
    }

    AddFigure(figure){
        if(this.figures.length === this.figuresPointer){
            this.figures[this.figures.length*2] = undefined;
        }
        this.figures[this.figuresPointer] = figure;
        this.figuresPointer++;
    }

    AddFigures(...figures){
        for(let i = 0; i < figures.length; i++){    
            this.AddFigure(figures[i]);
        }
    }

    DrawAll(){
        for(let i = 0; i < this.figuresPointer; i++){
            if(this.figures[i].hasOwnProperty("Callback")) this.figures[i].Callback(this.figures[i]);
            this.gl.uniform4f(      this.color,
                                    this.figures[i].r,
                                    this.figures[i].g,
                                    this.figures[i].b,    
                                    this.figures[i].a
            );
            this.figures[i].Draw(this.gl);
        }
    }


}