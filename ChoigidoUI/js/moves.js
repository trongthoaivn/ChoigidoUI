

function get_moves( img, position){

    var accept_position = new Array();
    var x = Number.parseInt(position.x);
    var y = Number.parseInt(position.y);
    if(img.name == "k"){
        console.log("bk:"+position.x+position.y)
        //default accept_position
        accept_position.push(
            new Position(x+1,y+1), 
            new Position(x-1,y-1),
            new Position(x-1,y+1), 
            new Position(x+1,y-1),
            new Position(x,y-1),
            new Position(x,y+1),
            new Position(x+1,y),
            new Position(x-1,y),
            );
        // trigger block (0,9)
            for (let i = 0; i < accept_position.length; i++) {
                var pos = new position("","");
                pos =accept_position[i];
                if((accept_position[i].x)>0 && (accept_position[i].x)<9 && (accept_position[i].y)>0 && (accept_position[i].y)<9  ){
                    accept_position.splice(i, 1);
            }
        return accept_position;
    }
    if(img.name == "q"){
        console.log("bq:"+position.x+position.y)
    }
    if(img.name == "b"){
        console.log("bb:"+position.x+position.y)
    }
    if(img.name == "n"){
        console.log("bn:"+position.x+position.y)
    }
    if(img.name == "r"){
        console.log("br:"+position.x+position.y)
    }
    if(img.name == "p"){
        console.log("bp:"+position.x+position.y)
    }
    if(img.name == "K"){
        console.log("WK:"+position.x+position.y)
    }
    if(img.name == "Q"){
        console.log("WQ:"+position.x+position.y)
    }
    if(img.name == "B"){
        console.log("WB:"+position.x+position.y)
    }
    if(img.name == "N"){
        console.log("WN:"+position.x+position.y)
    }
    if(img.name == "R"){
        console.log("WR:"+position.x+position.y)
    }
    if(img.name == "P"){
        console.log("WP:"+position.x+position.y)
    }
    }
    
}
