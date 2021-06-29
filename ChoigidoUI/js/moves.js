function get_moves(img, position) {

    console.log("Truyền qua bên move: " + img.name + " --- " + position.x)

    var accept_position = new Array();
    var x = Number.parseInt(position.x);
    var y = Number.parseInt(position.y);
    if (img.name == "k") {
        console.log("bk:" + position.x + position.y)


        //default accept_position
        accept_position.push(
            new Position(x + 1, y + 1),
            new Position(x - 1, y - 1),
            new Position(x - 1, y + 1),
            new Position(x + 1, y - 1),
            new Position(x, y - 1),
            new Position(x, y + 1),
            new Position(x + 1, y),
            new Position(x - 1, y),
        );
        // trigger block (0,9)
        for (let i = 0; i < accept_position.length; i++) {
            var pos = new position("", "");
            pos = accept_position[i];
            if ((accept_position[i].x) > 0 && (accept_position[i].x) < 9 && (accept_position[i].y) > 0 && (accept_position[i].y) < 9) {
                accept_position.splice(i, 1);
            }
            return accept_position;
        }
    }
    if (img.name == "q") {
        console.log("bq:" + position.x + position.y)
    }
    if (img.name == "b") {
        console.log("bb:" + position.x + position.y)
    }
    if (img.name == "n") {
        console.log("bn:" + position.x + position.y)
    }
    if (img.name == "r") {
        console.log("br:" + position.x + position.y)
    }
    if (img.name == "p") {
        //default accept_position
        accept_position.push(
            // luôn luôn add đi thẳng đầu tiên vào mảng để check đối diện bên kia
            new Position(x + 1, y), // x lên 1 hàng
            new Position(x + 2, y), // x lên 2 hàng
        );
        //nếu cột nhỏ hơn 8 mới kiểm tra bên phải
        if (y < 8) {
            accept_position.push(
                new Position(x + 1, y + 1), // Chéo phải
            );
        }
        //nếu cột lớn hơn 1 mới kiểm tra bên trái
        if (y > 1) {
            accept_position.push(
                new Position(x + 1, y - 1), // Chéo trái
            );
        }
        //add tạm thời thêm vị trí số 4 trong mảng
        accept_position.push(
            new Position(0, 0),
        );
        console.log("bp:" + position.x + position.y)
        return accept_position;
    }
    if (img.name == "K") {
        console.log("WK:" + position.x + position.y)
    }
    if (img.name == "Q") {
        console.log("WQ:" + position.x + position.y)
    }
    if (img.name == "B") {
        console.log("WB:" + position.x + position.y)
    }
    if (img.name == "N") {
        console.log("WN:" + position.x + position.y)
    }
    if (img.name == "R") {
        console.log("WR:" + position.x + position.y)
    }
    if (img.name == "P") {
        //default accept_position
        accept_position.push(
            // luôn luôn add đi thẳng đầu tiên vào mảng để check đối diện bên kia
            new Position(x - 1, y), // x lên 1 hàng
            new Position(x - 2, y), // x lên 2 hàng
        );
        //nếu cột nhỏ hơn 8 mới kiểm tra bên phải
        if (y < 8) {
            accept_position.push(
                new Position(x - 1, y + 1), // Chéo phải
            );
        }
        //nếu cột lớn hơn 1 mới kiểm tra bên trái
        if (y > 1) {
            accept_position.push(
                new Position(x - 1, y - 1), // Chéo trái
            );
        }
        //add tạm thời thêm vị trí số 4 trong mảng
        accept_position.push(
            new Position(0, 0),
        );
        console.log("WB:" + position.x + position.y)
        return accept_position;
    }
}