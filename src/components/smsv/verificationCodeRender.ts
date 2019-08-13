type Initparameters = {
  targetCanvas: any
  codeLen: any
  width: number
  height: number
}
export class VerificationCodeRender {
  targetCanvas: any
  codeLen: any
  width: number
  height: number
  constructor(parameters: Initparameters) {
    const { targetCanvas, codeLen, width = 100, height = 30 } = parameters
    this.targetCanvas = targetCanvas
    this.codeLen = codeLen
    this.width = width
    this.height = height
  }
  getRandomNumber = (min, max) => {
    return parseInt(Math.random() * (max - min) + min)
  }
  getRandomColor = (min, max) => {
    let r = this.getRandomNumber(min, max)
    let g = this.getRandomNumber(min, max)
    let b = this.getRandomNumber(min, max)
    return `rgb(${r},${g},${b})`
  }
  getRandomText = () => {
    const { codeLen, getRandomNumber } = this
    let pool = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefhijkmnpqrstuvwxyz234568'
    let drawText = [],
      drawImageText = ''
    for (let i = 0; i < codeLen; i++) {
      let randomText = pool[getRandomNumber(0, pool.length)]
      drawText.push(randomText)
      drawImageText += randomText.toLowerCase()
    }
    return { drawImageText, drawText }
  }
  drawVerificationCode = () => {
    const {
      targetCanvas,
      codeLen,
      getRandomNumber,
      getRandomColor,
      getRandomText,
      width,
      height,
    } = this
    let ctx = targetCanvas.getContext('2d')
    ctx.fillStyle = getRandomColor(180, 230)
    ctx.fillRect(0, 0, width, height)
    const { drawImageText, drawText } = getRandomText()
    for (let i = 0; i < 4; i++) {
      let fs = getRandomNumber(18, 26)
      let deg = getRandomNumber(-30, 30)
      ctx.font = fs + 'px Simhei'
      ctx.textBaseline = 'top'
      ctx.fillStyle = getRandomColor(80, 150)
      ctx.save()
      ctx.translate((100 / codeLen) * i + 15, 15)
      ctx.rotate((deg * Math.PI) / 180)
      ctx.fillText(drawText[i], -10, -10)
      ctx.restore()
    }
    for (let i = 0; i < 5; i++) {
      ctx.beginPath()
      ctx.moveTo(getRandomNumber(0, width), getRandomNumber(0, height))
      ctx.lineTo(getRandomNumber(0, width), getRandomNumber(0, height))
      ctx.strokeStyle = getRandomColor(180, 230)
      ctx.closePath()
      ctx.stroke()
    }
    for (let i = 0; i < 40; i++) {
      ctx.beginPath()
      ctx.arc(
        getRandomNumber(0, width),
        getRandomNumber(0, height),
        1,
        0,
        2 * Math.PI
      )
      ctx.closePath()
      ctx.fillStyle = getRandomColor(150, 200)
      ctx.fill()
    }
    return drawImageText
  }
}
