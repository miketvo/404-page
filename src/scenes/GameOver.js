import GAMESETTINGS from "../settings.js";
import game from "../game.js";


/***
 * Game Over screen
 */
export default class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOver");
    }

    /** @type {Phaser.GameObjects.Text} **/
    restart;

    /***
     *
     * @param {Object} data
     */
    create(data) {
        let clickSFX = this.sound.add('shoot-sfx');
        this.sound.add('game-over-audio').play();

        WebFont.load({
            custom: {
                families: game.customFonts
            },
            active: () => {
                this.add.text(6.25 * GAMESETTINGS.scaleFactor, 2.5 * GAMESETTINGS.scaleFactor, `Score: ${data.score}`, {
                    fontSize: 15 * GAMESETTINGS.scaleFactor, fontFamily: 'Kenney High Square, Arial, sans-serif', color: '#aeaeae', fontStyle: 'bold'
                });
                this.restart = this.add.text(0, 2.5 * GAMESETTINGS.scaleFactor, 'Restart', {
                    fontSize: 15 * GAMESETTINGS.scaleFactor, fontFamily: 'Kenney High Square, Arial, sans-serif', color: GAMESETTINGS.backgroundColor, backgroundColor: '#aeaeae', fontStyle: 'bold', padding: {
                        left: 2.5 * GAMESETTINGS.scaleFactor,
                        right: 1.25 * GAMESETTINGS.scaleFactor,
                        top: 0,
                        bottom: 1.25 * GAMESETTINGS.scaleFactor
                    }
                }).setInteractive();
                this.restart.setX(this.game.scale.width - 6.25 * GAMESETTINGS.scaleFactor - this.restart.displayWidth);
            }
        });

        this.add.sprite(
            GAMESETTINGS.nativeWidth / 2 * GAMESETTINGS.scaleFactor,
            GAMESETTINGS.nativeHeight / 2 * GAMESETTINGS.scaleFactor,
            'vignette')
            .setScale(GAMESETTINGS.scaleFactor)
            .setAlpha(0.05)
            .setBlendMode(Phaser.BlendModes.ADD)
            .setScrollFactor(0, 0)
            .play('vignette-anim');

        this.input.on('gameobjectdown', () => {
            clickSFX.play();
            this.scene.start('runGame');
        }, this);
    }
}
