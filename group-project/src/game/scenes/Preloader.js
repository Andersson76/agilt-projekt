import { Scene } from 'phaser';


export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background')

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff)

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets')

        this.load.image('logo', 'logo.png')
        this.load.atlas('archer', 'archer.png', 'archer_atlas.json' )
        this.load.animation('archer_anim', 'archer_anim.json')
        this.load.image('tiles', 'dungeon.png')
        this.load.tilemapTiledJSON('map', 'map.json')
      
 this.load.image('floorTiles', 'Floor.png') 
 this.load.image('wallTiles', 'Walls.png') 
 this.load.image('doorTiles', 'DoubleDoor.png') 
this.load.spritesheet('chestTiles', 'chest.png', { frameWidth: 16, frameHeight: 16 });
 this.load.atlas('enemies','enemies.png', 'enemies_atlas.json')
 this.load.animation('enemies_atlas.json', 'enemies_anim.json')

 
 }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.
         this.add.image(0,0, 'dungeon')

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}
