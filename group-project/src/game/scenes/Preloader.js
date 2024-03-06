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
        this.add.image(512, 384, 'treasuremath')

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
        

        this.load.image('logo', 'LVL.png')
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
        
         this.add.image(0,0, 'dungeon')


        this.scene.start('MainMenu');
    }
}
