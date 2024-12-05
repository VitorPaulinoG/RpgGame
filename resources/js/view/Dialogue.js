export class Dialogue {
    constructor(npc, texts) {
        this.npc = npc;
        this.texts = texts;
        this.currentTextIndex = 0;
    }

    verificarProximidadePlayer(player, distance = 55) {
        const dx = player.position.x - this.npc.position.x;
        const dy = player.position.y - this.npc.position.y;
        return Math.sqrt(dx * dx + dy * dy) <= distance;
    }

    nextText() {
        if (this.currentTextIndex < this.texts.length - 1) {
            this.currentTextIndex++;
        } else {
            this.currentTextIndex = -1; // Marca como diálogo finalizado
        }
    }

    getCurrentText() {
        const currentText = this.texts[this.currentTextIndex];
    // Verifica se o texto é um objeto e acessa a chave 'messages'
        if (typeof currentText === "object" && currentText.messages) {
            return currentText.messages[0]; // Acessa o primeiro item da mensagem
        }
        return currentText;
    }

    drawDialogue(ctx, canvas) {
        const text = this.getCurrentText();
        if (!text) return;

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
        ctx.fillText(text, x + 20, y + 50);
    }
}