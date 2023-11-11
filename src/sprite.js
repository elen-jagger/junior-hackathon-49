import Phaser from 'phaser';

//пока не использовать? должно наследоваться от Phaser.Physics.Arcade.Sprite, в конструкторе получать scene
class Sprite extends Phaser.Scene {
  constructor() {
    super('Sprite');
  }

  preload() {
    this.load.spritesheet('cat', 'assets/cat.png', {
      frameWidth: 77,
      frameHeight: 60,
    });
  }

  create() {
    let player = this.physics.add.sprite(50, 50, 'cat');
    player.setCollideWorldBounds(true);
    // TODO this.physics.add.collider(player, platforms);
    this.player = player;

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('cat', { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'cat', frame: 5 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('cat', { start: 6, end: 10 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  update() {
    let cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      this.player.setVelocityX(-250);

      this.player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      this.player.setVelocityX(250);

      this.player.anims.play('right', true);
    } else if (cursors.down.isDown) {
      this.player.setVelocityY(250);
    } else if (cursors.up.isDown) {
      this.player.setVelocityY(-250);
    } else {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);

      this.player.anims.play('turn');
    }

    if (this.player.x >= 750 && this.player.y >= 550) {
      this.scene.start('EndScreen');
    }
  }
}

export default Sprite;
