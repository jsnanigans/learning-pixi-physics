import * as PIXI from 'pixi.js'
import * as p2 from 'p2'

const pix = {
	container: null,
	world: null,
	material: {},
	initBox(container, world, boxMaterial) {
		this.container = container
		this.world = world
		this.material.box = boxMaterial
	},
	createBox(x, y, w, h) {
		var boxShape = new p2.Box({ width: w, height: h })
		var boxBody = new p2.Body({
			mass: 1,
			position: [x, y],
			angularVelocity: 0,
		})

		boxShape.material = this.material.box.boxMaterial
		boxBody.addShape(boxShape)

		this.world.addBody(boxBody)

		var graphics = new PIXI.Graphics()
		graphics.beginFill(0xff0000)
		graphics.drawRect(-boxShape.width/2, -boxShape.height/2, boxShape.width, boxShape.height)
		this.container.addChild(graphics)

		return {
			update() {
				graphics.x = boxBody.position[0]
				graphics.y = boxBody.position[1]
				graphics.rotation = boxBody.angle
			}
		}
	}
}

export default pix
