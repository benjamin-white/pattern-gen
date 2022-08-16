import PoissonDiskSampling from 'poisson-disk-sampling'

export const scatterPoints = (settings, RNG=fxrand) => {

  const defaults = {
    shape: [500, 500],
    minDistance: 5,
    maxDistance: 200,
    tries: 20
  }

  return (new PoissonDiskSampling({...defaults, ...settings}, RNG)).fill()

}

export const printCanvasToImage = (canvas, filename='sketch') => {

  const img = canvas.toDataURL('image/png')
  const link = document.createElement('a')
  link.href = img
  link.download = `${filename}_${(new Date().getTime())}.png`
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

}

export const displacementFromImage = (imageSrc, width, height) => {

  const handlePromise = (resolve, reject) => {

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const image = new Image()
    canvas.width = width
    canvas.height = height
  
    image.onload = () => {
      ctx.drawImage(image, 0, 0, width, height)
      const imageData = ctx.getImageData(0, 0, width, height)
      const pixels = []
      for (let i = 0; i < imageData.data.length; i += 4) {
        pixels.push(imageData.data[i] / 255)
      }
      resolve(pixels)
    }

    image.onerror = (err) => {
      reject(err)
    }

    image.src = imageSrc

  }

  return new Promise(handlePromise)

}

export const circle = (ctx, cx, cy, radius) => {
  ctx.save()
  ctx.translate(cx, cy)
  ctx.beginPath()
  ctx.arc(0, 0, radius, 0, Math.PI * 2)
  ctx.lineWidth = radius * .5
  ctx.fill()
  ctx.restore()
}
  
export const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export class Vec2 {
  constructor({x, y}) {
    this.x = x
    this.y = y
  }
  getDistance(to) {
    const dx = this.x - to.x
    const dy = this.y - to.y
    return Math.sqrt(dx * dx + dy * dy)
  }
}

export const reMap = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2

export const getRand = () => [Math.random(), 0, .9]