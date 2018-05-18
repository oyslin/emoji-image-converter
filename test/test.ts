import { emojiConverter } from './../src/converter'
emojiConverter.init({
    emojiFolder: "../images",
    emojiWidth: 40,
    emojiHeight: 40
})
function testUnicodeToSmiley() {
    const unicodeStr = "Hello, this is a 😁 \uD83D\uDE01 string"
    const smileyStr = emojiConverter.unicodeToSmiley(unicodeStr)
    console.log('unicodeToSmiley input = ', unicodeStr)
    console.log('unicodeToSmiley result = ', smileyStr)
}

function testCodeColonToSmiley() {
    const unicodeStr = "Hello, this is a :1f601: string"
    const smileyStr = emojiConverter.codeColonToSmiley(unicodeStr)
    console.log('codeColonToSmiley input = ', unicodeStr)
    console.log('codeColonToSmiley result = ', smileyStr)
}

function testAndroidCodeToSmiley() {
    const unicodeStr = "Hello, this is a [1f601] string"
    const smileyStr = emojiConverter.androidCodeToSmiley(unicodeStr)
    console.log('androidCodeToSmiley input = ', unicodeStr)
    console.log('androidCodeToSmiley result = ', smileyStr)
}

function testCodeColonToUnicode() {
    const unicodeStr = "Hello, this is a :1f601: string"
    const smileyStr = emojiConverter.codeColonToUnicode(unicodeStr)
    console.log('codeColonToUnicode input = ', unicodeStr)
    console.log('codeColonToUnicode result = ', smileyStr)
}

function testSmileyToUnicode() {
    const unicodeStr = "Hello, this is a emoji_1f601.png string"
    const smileyStr = emojiConverter.smileyToUnicode(unicodeStr)
    console.log('codeColonToUnicode input = ', unicodeStr)
    console.log('codeColonToUnicode result = ', smileyStr)
}

function test() {
    testUnicodeToSmiley()
    testCodeColonToSmiley()
    testAndroidCodeToSmiley()
    testCodeColonToUnicode()
    testSmileyToUnicode()
}

test()