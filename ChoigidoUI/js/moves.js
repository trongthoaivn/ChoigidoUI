function check_position(category , position){
    //  gán vị trí
        var x = position.x;
        var y = position.y;
    //tìm hình ảnh trong ô
        var img = $('#'+x+y+'').find('img').attr("class");
        if(img != undefined){ //
           var cate_img = img.split(" ")[0];
            if(check_category(cate_img) == category)
                return 0;// có hình ảnh và cùng loại
            else return 1;// có hình ảnh và khác loại
        } else{
            if($('#'+x+y+'') == undefined){
                return 2; //ô nằm ngoài bàn
            }else return 3; //ô nằm trong bàn
        };
}

function check_category(category){
    if(category !=undefined){
        if (category == category.toUpperCase()) {
            return true;
            //black
        }
        if (category == category.toLowerCase()){
            return false;
            //white
        }   
    }    
    return undefined;
}


function get_moves(img, position){

    var accept_position = new Array();
    var x = Number.parseInt(position.x);
    var y = Number.parseInt(position.y);
    if(img.name == "k"){
        console.log("bk:"+position.x+position.y)
        var default_position = new Array();
        //default accept_position
        default_position.push(
            new Position(x+1,y+1), 
            new Position(x-1,y-1),
            new Position(x-1,y+1), 
            new Position(x+1,y-1),
            new Position(x,y-1),
            new Position(x,y+1),
            new Position(x+1,y),
            new Position(x-1,y),
            );
        // check accept_position
        default_position.forEach( e =>{
            if(check_position(false,e) == 1 ||check_position(false,e) == 3 ) 
                accept_position.push(e);
        });
            
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
        //default accept_position
        // 1->x
        for(let i = x-1 ; i>=1 ; i--){
            if(check_position(false,new Position(i ,y)) == 3 || check_position(false,new Position(i ,y)) == 1){
                console.log("vt trước x :"+i+""+y)
                accept_position.push(new Position(i ,y));
                console.log(check_position(false,new Position(i ,y)))
                
            }
            if(check_position(false,new Position(i ,y)) == 0 || check_position(false,new Position(i ,y)) == 1)
                break;
            
        }
        //x->8
        for(let i = x+1 ; i<=8 ; i++){
            if(check_position(false,new Position(i ,y)) == 3 || check_position(false,new Position(i ,y)) == 1){
                console.log("vt sau x :"+i+""+y)
                accept_position.push(new Position(i ,y));
                
            }
            if(check_position(false,new Position(i ,y)) == 0 || check_position(false,new Position(i ,y)) == 1)
                break;
        }
        //1->y
        for(let i = y-1 ; i>=1 ; i--){
            if(check_position(false,new Position(x ,i)) == 3 || check_position(false,new Position(x ,i)) == 1){
                console.log("vt trước y :"+x+""+i)
                accept_position.push(new Position(x ,i));
                
            }
            if(check_position(false,new Position(x ,i)) == 0 || check_position(false,new Position(x ,i)) == 1)
                break;
        }
        //y->8
        for(let i = y+1 ; i<=8 ; i++){
            if(check_position(false,new Position(x ,i)) == 3 || check_position(false,new Position(x ,i)) == 1){
                console.log("vt sau y :"+x+""+i)
                accept_position.push(new Position(x ,i));
                
            }
            if(check_position(false,new Position(x ,i)) == 0 || check_position(false,new Position(x ,i)) == 1)
                break;
        }
        return accept_position;
    }
    if(img.name == "p"){
        console.log("bp:"+position.x+position.y)
    }
    if(img.name == "K"){
        console.log("WK:"+position.x+position.y)
        var default_position = new Array();
        //default accept_position
        default_position.push(
            new Position(x+1,y+1), 
            new Position(x-1,y-1),
            new Position(x-1,y+1), 
            new Position(x+1,y-1),
            new Position(x,y-1),
            new Position(x,y+1),
            new Position(x+1,y),
            new Position(x-1,y),
            );
        // check accept_position
        default_position.forEach( e =>{
            if(check_position(true,e)) 
                accept_position.push(e);
        });
            
        return accept_position;
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
        //default accept_position
        // 1->x
        for(let i = x-1 ; i>=1 ; i--){
            if(check_position(true,new Position(i ,y)) == 3 || check_position(true,new Position(i ,y)) == 1){
                console.log("vt trước x :"+i+""+y)
                accept_position.push(new Position(i ,y));
                console.log(check_position(false,new Position(i ,y)))
                
            }
            if(check_position(true,new Position(i ,y)) == 0 || check_position(true,new Position(i ,y)) == 1)
                break;
            
        }
        //x->8
        for(let i = x+1 ; i<=8 ; i++){
            if(check_position(true,new Position(i ,y)) == 3 || check_position(true,new Position(i ,y)) == 1){
                console.log("vt sau x :"+i+""+y)
                accept_position.push(new Position(i ,y));
                
            }
            if(check_position(true,new Position(i ,y)) == 0 || check_position(true,new Position(i ,y)) == 1)
                break;
        }
        //1->y
        for(let i = y-1 ; i>=1 ; i--){
            if(check_position(true,new Position(x ,i)) == 3 || check_position(true,new Position(x ,i)) == 1){
                console.log("vt trước y :"+x+""+i)
                accept_position.push(new Position(x ,i));
                
            }
            if(check_position(true,new Position(x ,i)) == 0 || check_position(true,new Position(x ,i)) == 1)
                break;
        }
        //y->8
        for(let i = y+1 ; i<=8 ; i++){
            if(check_position(true,new Position(x ,i)) == 3 || check_position(true,new Position(x ,i)) == 1){
                console.log("vt sau y :"+x+""+i)
                accept_position.push(new Position(x ,i));
                
            }
            if(check_position(true,new Position(x ,i)) == 0 || check_position(true,new Position(x ,i)) == 1)
                break;
        }
        return accept_position;
    }
    if(img.name == "P"){
        console.log("WP:"+position.x+position.y)
    }
}
    
