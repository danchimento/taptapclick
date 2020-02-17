export default class BaseScene extends Phaser.Scene {
    constructor(key) {
        super({ key: key });

        this.textColor = '#EDECE1';
        this.images = [];
    }

    setBackgroundColor(color) {
        this.cameras.main.setBackgroundColor(color);
    }

    addSeparator(size, position) {
        return this.drawRectangle(this.game.config.width / 2, this._posToPix(position), size, 4, 0xEDECE1);
    }

    addText(text, fontSize, position) {
        var txt = this.add.text(this.game.config.width / 2, this._posToPix(position), text, {
            fontFamily: 'Abril', 
            align: 'center',
            fontSize: fontSize, 
            color: this.textColor,
        });
        
        txt.setOrigin(.5);

        return txt;
    }

    addMenuButton(text, fontSize, position, onClick) {
        var btn = this.addText(text, fontSize, position);
        btn.setInteractive();
        btn.on("pointerdown", onClick);

        return btn;
    }

    _posToPix(position) {
        return this.game.config.height / 24 * position;
    }

    clear() {
        for (var item of this.images) {
            item.destroy();
        }

        this.images = [];  
    }

    drawTile(x, y, frame, depth) {

        var angle = 45;
        var offset = 120;
        var p = this.game.config.width / 2;
        // TODO: Fix this
        var q = this.game.config.width / 2;
        
        // TODO: What is 64?
        var x = (x * 64 * this.scale) + offset;
        var y = (y * 64 * this.scale) + offset;

        var radians = angle * Math.PI / 180;

        var newX = ((x - p) * Math.cos(radians) - ((y - q) * Math.sin(radians))) + p;
        var newY = ((x - p)  * Math.sin(radians) + ((y - q) * Math.cos(radians))) + q;

        var tile = this.drawImage(newX, newY, frame, depth != null ? depth : (x + y));

        tile.angle = angle;

        tile.setOrigin(1)

        return tile;
    }

    drawImage(x, y, frame, depth, scale) {
        var image = this.add.image(x, y);
        image.setTexture('map');
        image.setFrame(frame)
        image.setDepth(depth);
        image.setScale(scale ? scale : this.scale);

        this.images.push(image);
        return image;
    }

    drawCircle(x, y, radius, color) {
        var circle = this.add.circle(x, y, radius, color);
        this.images.push(circle);
        return circle;
    }

    drawRectangle(x, y, width, height, color) {
        var rect = this.add.rectangle(x, y, width, height, color);
        this.images.push(rect);
        return rect;
    }

    drawText(x, y, text, color) {
        var txt = this.add.text(this.game.config.width / 2, y, text, { 
            fontFamily: 'Abril', 
            align: 'center',
            fontSize: 52, 
            color: color ? color : '#EDECE1',
            wordWrap: {
                width: this.game.config.width
            }
        });

        txt.setOrigin(.5)

        this.images.push(txt);
        return txt;
    }

    setOnTap(element, event) {
        element.setInteractive();
        element.on('pointerdown', event);
    }
}