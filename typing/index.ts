export interface IEmojiData {
    [code: string]: string[]
}
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