
const k = new pieces("k", "black", "/ChoigidoUI/image/black_king.svg", "");
const q = new pieces("q", "black", "/ChoigidoUI/image/black_queen.svg", "");
const b = new pieces("b", "black", "/ChoigidoUI/image/black_bishop.svg", "");
const n = new pieces("n", "black", "/ChoigidoUI/image/black_knight.svg", "");
const r = new pieces("r", "white", "/ChoigidoUI/image/black_rook.svg", "");
const p = new pieces("p", "white", "/ChoigidoUI/image/black_pawn.svg", "");
const K = new pieces("K", "white", "/ChoigidoUI/image/white_king.svg", "");
const Q = new pieces("Q", "white", "/ChoigidoUI/image/white_queen.svg", "");
const B = new pieces("B", "white", "/ChoigidoUI/image/white_bishop.svg", "");
const N = new pieces("N", "white", "/ChoigidoUI/image/white_knight.svg", "");
const R = new pieces("R", "white", "/ChoigidoUI/image/white_rook.svg", "");
const P = new pieces("P", "white", "/ChoigidoUI/image/white_pawn.svg", "");
var List_pieces = [k, q, b, n, r, p, K, Q, B, N, R, P]

function get_moves( img, position){
    if(img.name == "k"){
        console.log("bk:"+position.x+position.y)
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
        console.log("QK:"+position.x+position.y)
    }
    if(img.name == "B"){
        console.log("BK:"+position.x+position.y)
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
