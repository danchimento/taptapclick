import Renderer from './Renderer';

export default class InventoryRenderer extends Renderer {
    constructor(ui, scale, inventory) {
        super(ui, scale);

        this.inventory = inventory;
        this.onItemSelected = () => { }; 
    }

    render() {

        this.clear();

        var itemsWidth = this.inventory.items.length * 64;
        
        // TODO: Figure out where these come from
        var itemsX = ((500 * this.scale) / 2) - (itemsWidth / 2);
        var itemsY = (500 * this.scale) + (200 * this.scale);

        for (var i = 0; i < this.inventory.items.length; i++) {
            var item = this.inventory.items[i];
            var x = itemsX + (i * 64);
            
            if (this.inventory.selectedItem == item) {
                this.drawCircle(x, itemsY, 32, "red")
            }

            var image = this.drawImage(x, itemsY, item.imageName);
            this.setOnTap(image, () => this.onItemSelected(item));

            this.images.push(image);
        }
    }
}