import { emojiData } from './config'
// import { IEmojiConverter, IEmojiRegExp, IEmojiConverterOption } from './../typing/index'

export interface IEmojiRegExp {
    androidCodeRegExp: RegExp
    codeColonRegExp: RegExp
    unicodeRegExp: RegExp
    smileyRegExp: RegExp
}

export interface IEmojiConverterOption {
    emojiFolder?: string
    emojiWidth?: number
    emojiHeight?: number
}

export interface IEmojiConverter {
    init(options?: IEmojiConverterOption): void
    smileyToUnicode(input: string): string
    unicodeToSmiley(input: string): string
    codeColonToSmiley(input: string): string
    codeColonToUnicode(input: string): string
    androidCodeToSmiley(input: string): string
}

export class EmojiConverter implements IEmojiConverter {
    private unicodeEmojiCodeMap: Map<string, string>
    private androidColonEmojiCodeMap: Map<string, string>
    private smileyMap: Map<string, string>
    private androidCodeEmojiCodeMap: Map<string, string>
    private codeColonEmojiCodeMap: Map<string, string>
    private codeColonUnicodeMap: Map<string, string>
    private regExp: IEmojiRegExp
    private emojiFolder: string = "."
    private emojiWidth = 20
    private emojiHeight = 20

    constructor() {
        this.unicodeEmojiCodeMap = new Map()
        this.androidColonEmojiCodeMap = new Map()
        this.smileyMap = new Map()
        this.androidCodeEmojiCodeMap = new Map()
        this.codeColonEmojiCodeMap = new Map()
        this.codeColonUnicodeMap = new Map()
        this.regExp = this.buildConfigData()
    }

    init(options: IEmojiConverterOption) {
        this.buildConfigData()
        this.emojiFolder = options.emojiFolder || this.emojiFolder
        this.emojiWidth = options.emojiWidth || this.emojiWidth
        this.emojiHeight = options.emojiHeight || this.emojiHeight
    }

    private escapeRegExp(input: string) {
        return input.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
    }

    private buildConfigData() {
        let codeColons: string[] = [],
            unicodes: string[] = [],
            androidColons: string[] = [],
            smileyImages: string[] = []
        for (let key in emojiData) {
            codeColons.push(this.escapeRegExp(`:${key}:`))
            androidColons.push(this.escapeRegExp(`[${key}]`))
            smileyImages.push(this.escapeRegExp(`emoji_${key}.png`))

            const unicodeArray = emojiData[key]
            unicodeArray.forEach(unicode => {
                unicodes.push(this.escapeRegExp(unicode))
                this.unicodeEmojiCodeMap.set(unicode, key)
            })
            this.androidColonEmojiCodeMap.set(`[${key}]`, key)
            this.smileyMap.set(`emoji_${key}.png`, unicodeArray[0])
            this.androidCodeEmojiCodeMap.set(`[${key}]`, key)
            this.codeColonEmojiCodeMap.set(`:${key}:`, key)
            this.codeColonUnicodeMap.set(`:${key}:`, unicodeArray[0])
        }

        const androidCodeRegExp = new RegExp(`(${androidColons.join('|')})`, "g")
        const codeColonRegExp = new RegExp(`(${codeColons.join('|')})`, "g")
        const unicodeRegExp = new RegExp(`(${unicodes.join('|')})`, "g")
        const smileyRegExp = new RegExp(`(${smileyImages.join('|')})`, "g")
        
        return {
            androidCodeRegExp,
            codeColonRegExp,
            unicodeRegExp,
            smileyRegExp
        }
    }

    unicodeToSmiley(input: string): string {
        if (!input) {
            return ""
        }

        return input.replace(this.regExp.unicodeRegExp, m => {
            const emojiCode = this.unicodeEmojiCodeMap.get(m)
            if (emojiCode) {
                return this.createEmojiIcon(emojiCode)
            } else {
                return ""
            }
        })
    }

    codeColonToSmiley(input: string): string {
        if (!input) {
            return ""
        }

        return input.replace(this.regExp.codeColonRegExp, m => {
            const emojiCode = this.codeColonEmojiCodeMap.get(m)
            if (emojiCode) {
                return this.createEmojiIcon(emojiCode)
            } else {
                return ""
            }
        })
    }

    androidCodeToSmiley(input: string): string {
        if (!input) {
            return ""
        }

        return input.replace(this.regExp.androidCodeRegExp, m => {
            var emojiCode = this.androidColonEmojiCodeMap.get(m)
            if (emojiCode) {
                return this.createEmojiIcon(emojiCode)
            } else {
                return ""
            }
        })
    }

    codeColonToUnicode(input: string): string {
        if (!input) {
            return ""
        }

        return input.replace(this.regExp.codeColonRegExp, m => {
            return this.codeColonUnicodeMap.get(m) || ""
        })
    }

    smileyToUnicode(input: string): string {
        if (!input) {
            return ""
        }
        return input.replace(this.regExp.smileyRegExp, m => {
            return this.smileyMap.get(m) || ""
        })
    }

    private createEmojiIcon(emojiCode: string) {
        return `<img alt="" width="${this.emojiWidth}" height="${this.emojiHeight}" src= "${this.emojiFolder}/emoji_${emojiCode}.png" data-alt=":${emojiCode}:" />`
    }
}

export const emojiConverter = new EmojiConverter()