export class Dialogue {
    constructor(npc, text) {
        this.npc = npc;
        this.text = text;
    }

    verificarProximidadePlayer(player, distance = 50) {
        const dx = player.position.x - this.npc.position.x;
        const dy = player.position.y - this.npc.position.y;
        return Math.sqrt(dx * dx + dy * dy) <= distance;
    }

    drawDialogue(ctx, canvas) {
        if (!this.text) return;

        const dialogueBoxWidth = 500;
        const dialogueBoxHeight = 100;
        const x = canvas.width / 2 - dialogueBoxWidth / 2;
        const y = canvas.height - dialogueBoxHeight - 120;

        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.fillRect(x, y, dialogueBoxWidth, dialogueBoxHeight);

        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, dialogueBoxWidth, dialogueBoxHeight);

        ctx.fillStyle = "white";
        ctx.font = "18px Arial";
        ctx.fillText(this.text, x + 20, y + 50);
    }
}