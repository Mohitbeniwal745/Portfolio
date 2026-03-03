const sharp = require('sharp');
const fs = require('fs');

async function processDarkLogo(input, output) {
    const { data, info } = await sharp(input)
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Convert to grayscale for alpha
        let luma = (r + g + b) / 3;

        // Enhance contrast of alpha to completely kill the #080808 background
        // If luma is ~8, make it 0.
        // luma mapping: 0-15 -> 0, 150-255 -> 255
        let alpha = (luma - 15) * (255 / (255 - 15));
        alpha = Math.max(0, Math.min(255, alpha));

        data[i + 3] = alpha;

        // For dark logo, the visible parts should be white.
        // If we just leave RGB as is, it's fine, but forcing it to pure white where opaque might be better?
        // Let's just keep original RGB, or boost brightness.
        if (alpha > 0) {
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
        } else {
            data[i] = 0;
            data[i + 1] = 0;
            data[i + 2] = 0;
        }
    }

    await sharp(data, {
        raw: {
            width: info.width,
            height: info.height,
            channels: 4
        }
    }).png().toFile(output);
}

async function processWhiteLogo(input, output) {
    const { data, info } = await sharp(input)
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        let luma = (r + g + b) / 3;

        // Background is ~248, Text is dark.
        // So alpha should be 0 when luma is 248, 255 when luma is 0.
        let alpha = 255 - ((luma / 240) * 255);
        alpha = Math.max(0, Math.min(255, alpha));

        data[i + 3] = alpha;

        // For white logo, text should be black
        if (alpha > 0) {
            data[i] = 0;
            data[i + 1] = 0;
            data[i + 2] = 0;
        }
    }

    await sharp(data, {
        raw: {
            width: info.width,
            height: info.height,
            channels: 4
        }
    }).png().toFile(output);
}

async function main() {
    await processDarkLogo('public/darklogo.png', 'public/darklogo.png');
    await processWhiteLogo('public/whitelogo.png', 'public/whitelogo.png');
    console.log('Logos processed!');
}

main().catch(console.error);
