var NumberConverter = (function () {
    var wordsToConvert = {
            a1: ['один','два','три','четыре','пять','шесть','семь','восемь','девять'],
            a2: ['одна','две','три','четыре','пять','шесть','семь','восемь','девять'],
            a10: ['десять','одиннадцать','двенадцать','тринадцать','четырнадцать','пятнадцать','шестнадцать','семнадцать','восемнадцать','девятнадцать'],
            a20: ['двадцать','тридцать','сорок','пятьдесят','шестьдесят','семьдесят','восемьдесят','девяносто'],
            a100: ['сто','двести','триста','четыреста','пятьсот','шестьсот','семьсот','восемьсот','девятьсот'],
            u1: ['тысяча', 'тысячи', 'тысяч']
        },
        minNumber = 1,
        maxNumber = 9999,
        numberParts = 3 * (Math.ceil(maxNumber.toString().length / 3)),
        wrongMessage = 'Введите число от ' + minNumber + ' до ' + maxNumber;

    return {
        numberToWords: function(num) {
            var i1, i2, i3, v, splitNumberBy3, splitNumberBy1, ax, result = [];

            if (
                !isNaN(num) && (parseFloat(num) | 0) === parseFloat(num)
                && parseFloat(num) > 0
                && parseFloat(num) <= 9999
            ) {
                num = parseFloat(num.trim()).toString();

                num = NumberConverter.addZeros(num);

                if (num > 0) {
                    splitNumberBy3 = NumberConverter.strSplit(num, 3);

                    for (var i = -1; i < splitNumberBy3.length; i++) {
                        v = splitNumberBy3[i];

                        if (!(v > 0)) continue;

                        splitNumberBy1 = NumberConverter.strSplit(v, 1);
                        i1 = parseInt(splitNumberBy1[0]);
                        i2 = parseInt(splitNumberBy1[1]);
                        i3 = parseInt(splitNumberBy1[2]);

                        result.push(wordsToConvert.a100[i1-1]);

                        ax = ((i + 3) === 3) ? 'a2' : 'a1';

                        if (i2 > 1) {
                            result.push(wordsToConvert.a20[i2-2] + (i3 > 0 ?  ' ' + wordsToConvert[ax][i3-1] : ''));
                        } else {
                            result.push(i2 > 0 ? wordsToConvert.a10[i3] : wordsToConvert[ax][i3-1]);
                        }

                        if (splitNumberBy3.length > (i + 1)) {
                            var name = wordsToConvert['u' + (i + 1)];
                            result.push(NumberConverter.morph(v, name));
                        }
                    }
                }
            } else {
                result.push(wrongMessage);
            }

            return result.join(' ');
        },
        morph: function(number, titles) {
            var cases = [2, 0, 1, 1, 1, 2];
            return titles[ (number % 100 > 4 && number % 100 < 20) ? 2 : cases[Math.min(number % 10, 5)] ];
        },
        strSplit: function(string, length) {
            string = (string === null) ? '' : string;
            length = (length === null) ? 1 : length;

            var chunks = [],
                pos = 0,
                len = string.length;
            while (pos < len) {
                chunks.push(string.slice(pos, pos += length));
            }

            return chunks;
        },
        addZeros: function(num) {
            var leadingZeros = numberParts - num.length,
                zeros = [];

            while (leadingZeros--) {
                zeros.push('0');
            }

            num = zeros.join('') + num;

            return num;
        }
    }
})();