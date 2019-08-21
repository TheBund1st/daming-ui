declare type Initparameters = {
  targetCanvas: any
  codeLen: any
  width: number
  height: number
}
export declare class VerificationCodeRender {
  targetCanvas: any
  codeLen: any
  width: number
  height: number
  constructor(parameters: Initparameters)
  getRandomNumber: (min: any, max: any) => number
  getRandomColor: (min: any, max: any) => string
  getRandomText: () => {
    drawImageText: string
    drawText: any[]
  }
  drawVerificationCode: () => string
}
export {}
