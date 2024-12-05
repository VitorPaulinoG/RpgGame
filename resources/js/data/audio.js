const audio =  {
    Map: new Howl({
        src: ['./resources/assets/audio/11 Hyrule Field.mp3'],
        html5: true,
        volume: 0.1
    }),

    GameOver: new Howl({
        src: ['./resources/assets/audio/24. The Adventure of Link - Game Over.mp3'],
        html5: true,
        volume: 0.1
    }),

    Attack1: new Howl({

        src: ['./resources/assets/audio/MC_Link_Sword3.wav'],
        html5: true,
        volume: 0.1
    }),

    Attack2: new Howl({
        src: ['./resources/assets/audio/MC_Link_Sword.wav'],
        html5: true,
        volume: 0.1
    }),

    Reward: new Howl({
        src: ['./resources/assets/audio/MC_Fanfare_Item.wav'],
        html5: true,
        volume: 0.1
    }),

    LinkDamage: new Howl({
        src: ['./resources/assets/audio/MC_Enemy_Hit.wav'],
        html5: true,
        volume: 0.1
    }),

    EnemyDamage: new Howl({
        src: ['./resources/assets/audio/MC_Link_Hurt.wav'],
        html5: true,
        volume: 0.1
    }),

    EnemyKill: new Howl({
        src: ['./resources/assets/audio/MC_Enemy_Kill.wav'],
        html5: true,
        volume: 0.1
    }),
}