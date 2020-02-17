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
        this.add.rectangle(this.game.config.width / 2, this._posToPix(position), size, 4, 0xEDECE1);
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
        var tile = this.drawImage(x * 64 * this.scale, y * 64 * this.scale, frame, depth != null ? depth : (x + y));

        return tile;
    }

    drawImage(x, y, frame, depth) {
        var image = this.add.image(x, y);
        image.setTexture('map');
        image.setFrame(frame)
        image.setDepth(depth);
        image.setScale(this.scale);

        this.images.push(image);
        return image;
    }

    drawCircle(x, y, radius, color) {
        var circle = this.add.circle(x * this.scale, y * this.scale, radius, color);
        this.images.push(circle);
    }

    drawText(x, y, text) {
        var txt = this.add.text((500 * this.scale) / 2, y, text, { 
            fontFamily: 'Abril', 
            align: 'center',
            fontSize: 52, 
            color: '#EDECE1',
            wordWrap: { width: 500 * this.scale },
        });
        txt.setOrigin(.5)

        this.images.push(txt);
    }

    setOnTap(element, event) {
        element.setInteractive();
        element.on('pointerdown', event);
    }
}