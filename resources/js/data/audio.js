const audio =  {
    Map: new Howl({
        src: ['./resources/assets/audio/02. The Legend of Zelda - Title.mp3'],
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
    })
}