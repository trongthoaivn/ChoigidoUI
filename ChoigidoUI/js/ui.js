$(document).ready(function() {
    make_board();
    
});
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

function set_drag(){
    $('img').draggable({
        containment: "#board",
        revert: 'invalid'
    });
}

function Create_lick(){
    var Fen = $("#Fen").val();
    console.log(Fen)
    Clear_board();
    draw_pieces(Fen);
    set_drag();
}

function Clear_board(){
    $('img').remove();
}

function draw_pieces(Fen) {
    var def = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"; //Fen mặc định
    if (Fen == undefined || Fen === "") {
        Fen = def;
    }
    var Arr = new Array();
    Arr = Fen.split(" ");
    var board = Arr[0];
    var turn_player = Arr[1];
    var Round = Arr[4];
    var turn = Arr[5];
    var Row = board.split("/");
    console.log("Đoạn ban đầu " + Fen)
    console.log("Bỏ / --> " + Row)

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (List_pieces.find(function(e) {
                    if (e.name == Row[i][j]) {
                        console.log(e.name)
                        $('#' + i + '' + j + '').append('<img width = "50"src = "' + e.image + '" class ="'+e.name+'">');
                        return true;
                    } {
                        return false;
                    }
                }));
        };
    }
}

function make_board() {
    var div = $("#board");
    var table = document.createElement("table");
    var tbody = document.createElement("tbody");
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    for (y = 0; y < 8; ++y) {
        var tr = document.createElement("tr");

        for (x = 0; x < 8; ++x) {
            var td = document.createElement("td");
            td.style.width = 70 + "px";
            td.style.height = 70 + "px";
            td.id = y + "" + x
            td.style.backgroundColor = ((y ^ x) & 1) ? "#bf8661" : "#f6d8b5";
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    table.append(tbody);
    $(div).append(table);
}