class BoxCollider {
    constructor ({offset, sprite}) {
        this.offset = offset;
        this.sprite = sprite;
        this.position = {x: 0, y: 0};
        this.width = 0;
        this.height = 0;
        this.updateCollider();
    }
    
    updateCollider() {
        this.position.x = this.sprite.position.x + (this.sprite.width/2) - this.offset.x,
        this.position.y = this.sprite.position.y + (this.sprite.height/2);
        this.width = this.offset.x * 2;
        this.height = (this.sprite.height/2) - this.offset.y;
    }
}