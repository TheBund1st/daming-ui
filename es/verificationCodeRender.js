var VerificationCodeRender = /** @class */ (function() {
  function VerificationCodeRender(parameters) {
    var _this = this
    this.getRandomNumber = function(min, max) {
      return parseInt(Math.random() * (max - min) + min)
    }
    this.getRandomColor = function(min, max) {
      var r = _this.getRandomNumber(min, max)
      var g = _this.getRandomNumber(min, max)
      var b = _this.getRandomNumber(min, max)
      return 'rgb(' + r + ',' + g + ',' + b + ')'
    }
    this.getRandomText = function() {
      var _a = _this,
        codeLen = _a.codeLen,
        getRandomNumber = _a.getRandomNumber
      var pool = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefhijkmnpqrstuvwxyz234568'
      var drawText = [],
        drawImageText = ''
      for (var i = 0; i < codeLen; i++) {
        var randomText = pool[getRandomNumber(0, pool.length)]
        drawText.push(randomText)
        drawImageText += randomText.toLowerCase()
      }
      return { drawImageText: drawImageText, drawText: drawText }
    }
    this.drawVerificationCode = function() {
      var _a = _this,
        targetCanvas = _a.targetCanvas,
        codeLen = _a.codeLen,
        getRandomNumber = _a.getRandomNumber,
        getRandomColor = _a.getRandomColor,
        getRandomText = _a.getRandomText,
        width = _a.width,
        height = _a.height
      var ctx = targetCanvas.getContext('2d')
      ctx.fillStyle = getRandomColor(180, 230)
      ctx.fillRect(0, 0, width, height)
      var _b = getRandomText(),
        drawImageText = _b.drawImageText,
        drawText = _b.drawText
      for (var i = 0; i < 4; i++) {
        var fs = getRandomNumber(18, 26)
        var deg = getRandomNumber(-30, 30)
        ctx.font = fs + 'px Simhei'
        ctx.textBaseline = 'top'
        ctx.fillStyle = getRandomColor(80, 150)
        ctx.save()
        ctx.translate((100 / codeLen) * i + 15, 15)
        ctx.rotate((deg * Math.PI) / 180)
        ctx.fillText(drawText[i], -10, -10)
        ctx.restore()
      }
      for (var i = 0; i < 5; i++) {
        ctx.beginPath()
        ctx.moveTo(getRandomNumber(0, width), getRandomNumber(0, height))
        ctx.lineTo(getRandomNumber(0, width), getRandomNumber(0, height))
        ctx.strokeStyle = getRandomColor(180, 230)
        ctx.closePath()
        ctx.stroke()
      }
      for (var i = 0; i < 40; i++) {
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
    var targetCanvas = parameters.targetCanvas,
      codeLen = parameters.codeLen,
      _a = parameters.width,
      width = _a === void 0 ? 100 : _a,
      _b = parameters.height,
      height = _b === void 0 ? 30 : _b
    this.targetCanvas = targetCanvas
    this.codeLen = codeLen
    this.width = width
    this.height = height
  }
  return VerificationCodeRender
})()
export { VerificationCodeRender }
