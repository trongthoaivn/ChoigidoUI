const k = new pieces("k", "black", "image/black_king.svg", "");
const q = new pieces("q", "black", "image/black_queen.svg", "");
const b = new pieces("b", "black", "image/black_bishop.svg", "");
const n = new pieces("n", "black", "image/black_knight.svg", "");
const r = new pieces("r", "white", "image/black_rook.svg", "");
const p = new pieces("p", "white", "image/black_pawn.svg", "");
const K = new pieces("K", "white", "image/white_king.svg", "");
const Q = new pieces("Q", "white", "image/white_queen.svg", "");
const B = new pieces("B", "white", "image/white_bishop.svg", "");
const N = new pieces("N", "white", "image/white_knight.svg", "");
const R = new pieces("R", "white", "image/white_rook.svg", "");
const P = new pieces("P", "white", "image/white_pawn.svg", "");

const List_pieces = [k, q, b, n, r, p, K, Q, B, N, R, P]


$(document).ready(function() {
    make_board();
    // set_drop();
});


function Create_lick() {
    var Fen = $("#Fen").val();
    Clear_board();
    draw_pieces(Fen);
    set_drag();
    set_drop();
}

function Clear_board() {
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
    var Fen_compile = []
    for (let i = 0; i < 8; i++) {
        Fen_compile.push(new Array());
        for (let j = 0; j < 8; j++) {
            var str = Row[i][j];
            var so = Number.parseInt(str);
            if (so != undefined) {
                for (let n = 0; n < so; n++) {
                    Fen_compile[i].push("*");
                }
            }
            if (str != undefined && Number.isNaN(Number.parseInt(str))) {
                Fen_compile[i].push(str);
            }
        };
    }

    function draw() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                List_pieces.forEach(element => {
                    if (element.name == Fen_compile[i][j]) {
                        $('#' + Number.parseInt(i + 1) + '' + Number.parseInt(j + 1) + '').append('<img width = "50"src = "' + element.image + '" class ="' + element.name + '">');
                    }
                });
            }
        }
    }
    draw();
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

function get_Pieces(ui) {
    var chess = ui.className.split(" ")
    var pieces;
    List_pieces.find(function(e) {
        if (e.name == chess[0]) {
            pieces = e;
            return true;
        }
        return false;
    })
    return pieces;
}

//làm trung gian đem đống drop hợp lệ đi
var accept;

function set_drag() {
    $('img').draggable({
        containment: "tbody",
        revert: 'invalid',
        start: function(ev, ui) {
            var img = ui.helper.context;
            var name = $(img).attr("class")[0];
            console.log("Tên quân cờ: " + $(img).attr("class")[0]);
            console.log("Vị trí hàng: " + $(img).parent().attr("id")[0])
            console.log("Vị trí cột: " + $(img).parent().attr("id")[1])
            var p = new pieces();
            var position = new Position($(img).parent().attr("id")[0], $(img).parent().attr("id")[1]);
            p = get_Pieces(img);
            console.log(p);
            accept = get_moves(p, position);
            accept.forEach(function(items) {
                console.log(items.x + "" + items.y)
                if (accept[0].x == 3 && accept[1].x == 4 || accept[0].x == 6 && accept[1].x == 5) {
                    $("#" + items.x + "" + items.y + "").css({
                        "border": "5px solid white"
                    })
                } else {
                    $("#" + accept[0].x + "" + accept[0].y + "").css({
                        "border": "5px solid white"
                    })
                    if (($("#" + accept[2].x + "" + accept[2].y + "").find("img").length) > 0) {
                        $("#" + accept[2].x + "" + accept[2].y + "").parent().find("#" + accept[2].x + "" + accept[2].y + "").css({
                            "border": "5px solid yellow"
                        })
                    }
                    if (($("#" + accept[3].x + "" + accept[3].y + "").find("img").length) > 0) {
                        $("#" + accept[3].x + "" + accept[3].y + "").parent().find("#" + accept[3].x + "" + accept[3].y + "").css({
                            "border": "5px solid yellow"
                        })
                    }
                    if (name == 'p' && accept[0].x == 3 || name == 'P' && accept[0].x == 6) {
                        $("#" + accept[1].x + "" + accept[1].y + "").css({
                            "border": "5px solid white"
                        })
                    }
                }
            })
        },
        stop: function(ev, ui) {
            accept.forEach(function(items) {
                console.log(items.x + "" + items.y)
                $("#" + items.x + "" + items.y + "").css({
                    "border": "none"
                })
            })
        }
    });
}

var oldPoss;
var newPoss;

function set_drop() {
    $('td').droppable({
        over: function(el, ui) {
            oldPoss = ui.draggable.parent().attr("id")
            newPoss = $(this).attr("id")
        },
        accept: function(el, ui) {
            var flag = false;
            var className = $(this).find("img").attr("class");
            var name = el.attr("class").split(" ");
            if (className != undefined) {
                var split = className.split(" ");
                if (split[0] == name[0]) {
                    flag = false;
                } else {
                    flag = true;
                }
            } else {
                flag = true;

            }
            return flag;
        },

        drop: function(ev, ui) {
            var dropped = ui.draggable;
            var droppedOn = $(this);
            var name = ui.draggable.attr("class").split(" ");
            console.log("Mã quân cờ: " + name[0])
            console.log("Phe " + name[0])
            console.log("Vị trí cũ " + $(dropped).parent().attr("id"));
            switch (name[0]) {
                case 'p':
                case 'P':
                    if (Number(newPoss) == accept[0].x + "" + accept[0].y || Number(newPoss) == accept[1].x + "" + accept[1].y || Number(newPoss) == accept[2].x + "" + accept[2].y || Number(newPoss) == accept[3].x + "" + accept[3].y) {
                        if ($('td').not('td:empty')) {
                            var flag = true;
                            var className = $(droppedOn).find("img").attr("class");
                            if (className != undefined) {
                                var split = className.split(" ");
                                if (split[0] != name[0]) {
                                    console.log("Khác phe cờ");
                                    if (Number(newPoss) == accept[0].x + "" + accept[0].y) {
                                        flag = false;
                                        $(dropped).detach().css({
                                            top: 0,
                                            left: 0
                                        }).appendTo("#" + oldPoss + "");
                                    } else {
                                        $(droppedOn).find('img').remove()
                                        $(dropped).detach().css({
                                            top: 0,
                                            left: 0
                                        }).appendTo(droppedOn);
                                    }
                                } else {
                                    $(droppedOn).droppable("disable");
                                }
                            }
                        }
                        if (newPoss[0] != accept[2].x && newPoss[0] != accept[1].x && newPoss[0] != accept[0].x) {
                            flag = false;
                        }

                        // đoạn dưới check đường chéo từ nước đi 2, vẫn ch dc

                        // if (name[0] == 'p' && accept[2].x != 3 && accept[2].x != accept[0].x || name[0] == 'P' && accept[2].x != 6 && accept[2].x != accept[0].x) {
                        //     flag = false;
                        // }

                        // đoạn dưới check nhảy qua đầu, vẫn chưa được

                        // if (name[0] == 'p' && newPoss[0] > accept[1].x + 1 || name[0] == 'P' && newPoss[0] < accept[1].x - 1) {
                        //     flag = false;
                        // }
                        if (flag) {
                            $(dropped).parent().droppable("enable");
                            $(dropped).detach().css({
                                top: 0,
                                left: 0
                            }).appendTo(droppedOn);
                            console.log("Vị trí mới " + $(dropped).parent().attr("id"))
                            console.log("--------------------------------------------")
                        } else {
                            $(dropped).detach().css({
                                top: 0,
                                left: 0
                            }).appendTo("#" + oldPoss + "");
                        }
                    } else {
                        $(dropped).detach().css({
                            top: 0,
                            left: 0
                        }).appendTo("#" + oldPoss + "");
                    }
                    break;
                default:
                    $(this).css({
                        "border": "none"
                    })
                    $(dropped).detach().css({
                        top: 0,
                        left: 0
                    }).appendTo("#" + oldPoss + "");
                    break;
            }
        }
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