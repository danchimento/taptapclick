export default class Renderer {

    constructor(ui, scale) {
        this.ui = ui;
        this.images = [];
        this.scale = scale;
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
        var image = this.ui.add.image(x, y);
        image.setTexture('map');
        image.setFrame(frame)
        image.setDepth(depth);
        image.setScale(this.scale);

        this.images.push(image);
        return image;
    }

    drawCircle(x, y, radius, color) {
        var circle = this.ui.add.circle(x * this.scale, y * this.scale, radius, color);
        this.images.push(circle);
    }

    drawText(x, y, text) {
        var txt = this.ui.add.text((500 * this.scale) / 2, y, text, { 
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