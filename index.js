const etchSketch = document.querySelector('#Etch-a-Sketch');

let sketchInColor = false;

let currentDimension = 16;

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

setUpPage()


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

function clearGrid(){
   let cells = Array.from(etchSketch.children);
   cells.forEach( (cell) => cell.style.background = '' );
}

function setUpPage(){

    buildGrid(currentDimension,fillBlack);

    document.querySelector('button[data-buttonType=fill-black]').addEventListener('click', () => {
        buildGrid(currentDimension, fillBlack);
        sketchInColor = false;

    })
    document.querySelector('button[data-buttonType=fill-color]').addEventListener('click', () => {
        buildGrid(currentDimension, fillColor);
        sketchInColor = true;
    })
    document.querySelector('button[data-buttonType=clear]').addEventListener('click', () => {
       clearGrid();
    })

    
    document.querySelector('.submit-button').addEventListener('click', () => {
        let sizeInputField = document.querySelector('.grid-size-text-input');
        let sizeInput= parseInt(sizeInputField.value);
        if(sizeInput > 100 || sizeInput< 1 || isNaN(sizeInput)){
            sizeInputField.value = '';
            alert('Sorry that input is invalid :(  To assure success please enter a valid input... Thank you!')
        }
        else{
            currentDimension = sizeInput;
            if(sketchInColor){
                buildGrid(currentDimension, fillColor);
            }
            else{
                buildGrid(currentDimension, fillBlack);
            }
    }
    })
    

} 

