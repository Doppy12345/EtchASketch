const etchSketch = document.querySelector('#Etch-a-Sketch');

const fillBlack = function(element){
    element.style.background = 'black';
}

const fillColor = function(element){
    if(element.style.background == ''){
        element.style.background =`rgb(
            ${Math.floor(Math.random() * 256)},
            ${Math.floor(Math.random() * 256)},
            ${Math.floor(Math.random() * 256)}
            )`;
    }
    else{
        let rgbValue = element.style.background;
        let redVal = parseInt(rgbValue.substring(4,rgbValue.indexOf(',')));
        let greenVal = parseInt(rgbValue.substring(rgbValue.indexOf(',') + 1, rgbValue.indexOf(',', rgbValue.indexOf(',') + 1)));
        let blueVal = parseInt(rgbValue.substring(rgbValue.lastIndexOf(',')+1, rgbValue.indexOf(')')));
        
        element.style.background = `rgb(
            ${Math.max(redVal-25,0)},
            ${Math.max(greenVal-25,0)},
            ${Math.max(blueVal-25,0)}
        )`
    }
}


function buildGrid(dimension,fillCell){

    let destroyGrid = () => {
        while(etchSketch.firstChild){
            etchSketch.removeChild(etchSketch.firstChild);
        }
    }
    destroyGrid();


    etchSketch.style.cssText =`grid-template-columns: repeat(${dimension}, 1fr)`;


    for(let i  = 1; i <= dimension**2; i++){
        let cell = document.createElement('div');
        cell.classList.add('sketch-cell');

        cell.addEventListener('mouseenter', (e) => {
            fillCell(e.target);
        })

        etchSketch.appendChild(cell);
    }
}

function  clearGrid(){
   let cells = Array.from(etchSketch.children);
   cells.forEach( (cell) => cell.style.background = 'white' );
}


