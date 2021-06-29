

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

const List_pieces =[k, q, b, n, r, p, K, Q, B, N, R, P]


$(document).ready(function() {
    make_board();
   // set_drop();
});


function Create_lick(){
    var Fen = $("#Fen").val();
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

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (List_pieces.find(function(e) {
                    if (e.name == Row[i][j]) {
                        $('#' + Number.parseInt(i+1) + '' + Number.parseInt(j+1)  + '').append('<img width = "50"src = "' + e.image + '" class ="'+e.name+'">');
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
    for (y = 1; y <= 8; ++y) {
        var tr = document.createElement("tr");

        for (x = 1; x <= 8; ++x) {
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

function get_Pieces(ui){
    var chess = ui.className.split(" ")
    var pieces;
    List_pieces.find(function(e){
        if(e.name==chess[0]) {
            pieces = e;
            return true;
        }
        return false;
    })
    return pieces;
}

function set_drag(){
    $('img').draggable({
        containment: "tbody",
        revert: 'invalid',
        start:function(ev, ui){
            var img = ui.helper.context;
            var p = new pieces();
            var position = new Position($(img).parent().attr("id")[0],$(img).parent().attr("id")[1]);
            p = get_Pieces(img);
            get_moves(p,position);
        }
    });
}

function set_drop(){
    $('td').droppable({
        
    });
    //     over: function(el, ui) {
    //         oldPoss = ui.draggable.parent().attr("id")
    //         console.log(ui.draggable.parent().attr("id"))
    //         newPoss = $(this).attr("id")
    //         console.log($(this).attr("id"))
    //         if (Number($(this).attr("id")) == Number(ui.draggable.parent().attr("id")) + 10 || Number($(this).attr("id")) == Number(ui.draggable.parent().attr("id")) + 20) {
    //             console.log("lớn hơn")
    //             $(this).css({
    //                 "border": "5px solid white"
    //             })
    //         } else {
    //             $(this).css({
    //                 "border": "5px solid red"
    //             })
    //         }
    //         ui.draggable.parent().droppable("enable");
    //     },
    //     out: function(el, ui) {
    //         $(this).css({
    //             "border": "none"
    //         })
    //     },
    //     accept: function(el, ui) {
    //         var flag = false;

    //         var className = $(this).find("img").attr("class");
    //         var name = el.attr("class").split(" ");
    //         if (className != undefined) {
    //             var split = className.split(" ");
    //             if (split[2] == name[2]) {
    //                 flag = false;
    //             } else {
    //                 flag = true;
    //             }
    //         } else {
    //             flag = true;

    //         }
    //         return flag;
    //     },
    //     drop: function(ev, ui) {
    //         console.log("Stop: " + newPoss + "---" + oldPoss)
    //         var dropped = ui.draggable;
    //         var droppedOn = $(this);
    //         var name = ui.draggable.attr("class").split(" ");
    //         console.log("Tên quân cờ: " + name[0])
    //         console.log("Phe " + name[2])
    //         console.log("Vị trí cũ " + $(dropped).parent().attr("id"));
    //         switch (name[0]) {
    //             case 'tot':
    //                 if (Number(newPoss) == Number(oldPoss) + 10 || Number(newPoss) == Number(oldPoss) + 20) {
    //                     $(this).css({
    //                         "border": "none"
    //                     })
    //                     if ($('td').not('td:empty')) {
    //                         var className = $(droppedOn).find("img").attr("class");
    //                         if (className != undefined) {
    //                             var split = className.split(" ");
    //                             if (split[2] != name[2]) {
    //                                 console.log("Khác phe cờ");
    //                                 $(droppedOn).find('img').remove()
    //                             } else {
    //                                 $(droppedOn).droppable("disable");
    //                             }
    //                         }
    //                     }
    //                     $(dropped).parent().droppable("enable");
    //                     $(dropped).detach().css({
    //                         top: 0,
    //                         left: 0
    //                     }).appendTo(droppedOn);
    //                     console.log("Vị trí mới " + $(dropped).parent().attr("id"))
    //                     console.log("--------------------------------------------")
    //                 } else {
    //                     $(this).css({
    //                         "border": "none"
    //                     })
    //                     $(dropped).detach().css({
    //                         top: 0,
    //                         left: 0
    //                     }).appendTo("#" + oldPoss + "");
    //                 }
    //                 break;
    //                 default:
    //                 $(this).css({
    //                     "border": "none"
    //                 })
    //                 $(dropped).detach().css({
    //                     top: 0,
    //                     left: 0
    //                 }).appendTo("#" + oldPoss + "");
    //                 break;
    //         }
    //     }  
    // });
    // $('td').not('td:empty').droppable("disable");   
}
