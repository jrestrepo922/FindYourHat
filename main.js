const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';



class Field{
    constructor(field){
        this.field = field;
    }

    print(){
        for(let i = 0; i < this.field.length; i++){
            console.log(this.field[i].join(""))
        }
    }

    static generateField(height, width){
        // create an empty array with the pass values
        let field = [

        ];
        const validFieldPieces = ["O", "░", "░"]
        // createing the empty rows
        for(let i =0; i < height; i++){
            field.push([]);
        }
        
        // field the array with characters. 
        field[0].push("*");
        for(let j=0; j < height; j++){
            for(let y = 0; y < width; y++){
                if(j === 0 & y === 0){
                    continue;
                }
                let randomNum = Math.floor(Math.random() * 3); 
                field[j].push(validFieldPieces[randomNum]);
            }
        }

        let randomRow = Math.floor(Math.random() * (height - 1) + 1);
        let randomColumn = Math.floor(Math.random() * width);
        field[randomRow][randomColumn] = "^";
        return field; 
    }
}


const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);

  let field = myField.field;



function findTheHatGame(){
    // find the current location of the x and ^
    let currentLocation = '0,0';
    let gameOver = gameEnd(currentLocation);
    // loop will iterate while the game is not over
    let i = 0
    while(!gameOver){
        let handleInputOutput = handleUserInput(currentLocation);
        currentLocation = handleInputOutput[0];
        gameOver = handleInputOutput[1]
    }
   
    
}

function handleUserInput(currentLocation){
    let currentLocationArray = currentLocation.split(",")
    let validEntry = ["u", "d", "l", "r"]
    myField.print();
    let direction = prompt("What direction? "); 
    while(!validEntry.includes(direction)){
        direction = prompt("Please provide a Valid direction. u for up, d for down, l for left and r for rigth ")
    }
    if(direction === "u"){
        currentLocationArray[0]--;
    } else if(direction === "d"){
        currentLocationArray[0]++;
    } else if(direction === "l"){
        currentLocationArray[1]--;
    } else if(direction === "r"){
        currentLocationArray[1]++; 
    }
    let newLocation = currentLocationArray.join(",");
    let gameOver = gameEnd(newLocation);
    if(gameOver){
        return [newLocation, gameOver]
    } 

    field[currentLocationArray[0]][currentLocationArray[1]] = "*";
    return [newLocation, gameOver];
    
}



function gameEnd(currentLocation){
    
    //find the location of the hat 
    const hatLocation = findHatLocation(); 
    //find the locations of holes
    const holesLocations = findHolesLocation();
    //see if the location is out of bounds
    const outside = outsideOfArea(currentLocation); 
    if(currentLocation === hatLocation){
        console.log("Congratulations you won!!") 
        return true; 
    } else if(holesLocations.includes(currentLocation)){
        console.log("You fell on a hole!, Game Over!")
        return true; 
    } else if(outside){
        console.log("You are outside of the area, Game Over!")
        return true
    } else {
        return false; 
    }


}

function outsideOfArea(currentLocation){ //"0,0"

    const fieldRowStart = 0; 
    const fieldRowEnd = field.length - 1; 
    const fieldColumnStart = 0; 
    const fieldColumnEnd = field[field.length - 1].length -1; 
    // console.log(fieldRowStart, fieldRowEnd, fieldColumnStart, fieldColumnEnd)
    const currentLocationArray = currentLocation.split(",");
    if(currentLocationArray[0] > fieldRowEnd || currentLocationArray[0] < fieldRowStart){
        return true; 
    } else if(currentLocationArray[1] > fieldColumnEnd || currentLocationArray[1] < fieldColumnStart){
        return true; 
    } else {
        return false; 
    }
}

function findHolesLocation(){

    let holesLocations = [];
    for(let i = 0; i < field.length; i++){
        for(let j = 0; j < field[i].length; j++){
            if(field[i][j] === "O"){
                holesLocations.push(`${i},${j}`)
            }
        }
    }
    return holesLocations;
}


function findHatLocation(){

    let hatLocation;
    for(let i = 0; i < field.length; i++){
        for(let j = 0; j < field[i].length; j++){
            if(field[i][j] === "^"){
                hatLocation = `${i},${j}`;
                break;
            }
        }
        if(hatLocation === "^"){
            break;
        }
    }
    return hatLocation;
}



// findTheHatGame();


console.log(Field.generateField(4,4));