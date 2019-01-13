var p, q, e, d;
var eps;
let l = 2;
let k = 3;
const plaintext = ' abcdefghijklmnopqrstuvwxyz'
const cyphertext = plaintext.toUpperCase()

function gcd(a, b){
    if ( ! b) {
        return a;
    }

    return gcd(b, a % b);
const mod = (x, n) => (x % n + n) % n

function pow(a, b, mod){
    console.log(a, b, mod);
    if (b === 0) return 1;
    if (b === 1) return a % mod;

    let t = pow(a, b/2, mod) % mod;
    t = (t*t) % mod;

    if (b % 2 === 0) return t;

    return (t * a) % mod;
}


function init(_p, _q)
{
    p = _p;
    q = _q;
    eps = (p-1) * (q-1);
    console.log(eps);
    e = Math.floor(Math.random() * (eps-1) + 1);
    while(gcd(e,eps) !== 1)
    {
        e = Math.floor(Math.random() * (eps-1) + 1);
    }
    console.log(e);
    d = modInv(e, eps);
    console.log(d);


}
init(401, 503);


function chunkToNr(chunk){
    var res = 0;
    for(i=0; i < l; ++i)
    {
        var nr = 0;
        if(i < chunk.length)
        {
            nr = chunk.charCodeAt(i)- "a".charCodeAt(0) + 1;
        }
        res = 27 * res + nr;
    }
    return res;
}

function nrToChunk(nr){
    
}


function split(input){
    var chunks = input.match(/.{1,2}/g);
    var result = [];
    console.log(chunks);
    for(idx in chunks)
    {
        result.push(chunkToNr(chunks[idx]))
    }
    return result
}

console.log(split("algebra"));



function modInv(a, b) {
    // console.log(a.toString() + ' ' + b.toString())
    if (b === 0) {
        return [1, 0, a];
    }

    temp = modInv(b, a % b);
    x = temp[0];
    y = temp[1];
    d = temp[2];
    return [y, x-y*Math.floor(a/b), d];
}

function modInvWrapper(a , b)
{
    alert(modInv(a, b)[0]);
}

function generatePrimes(upperLimit){
    const primes = [];
    const isPrime = [];
    for (i = 0; i < upperLimit; i++){
        isPrime.push(true);
    }

    for (i = 2; i < upperLimit ; i++) {
        if (isPrime[i]){
            primes.push(i);
            for (j = 2 * i; j < upperLimit; j += i){
                isPrime[j] = false;
            }
        }
    }

    return primes;
}

function isPrime(number){
    if (number < 2)
        return false;

    for (i = 2; i < Math.sqrt(number) + 1; i++){
        if (number % i === 0) {
            return false;
        }
    }

    return true;
}

function getText() {
    var textElem = document.getElementById('text')
    return (textElem != null) ?  textElem.value : ''
}

function getKey(name) {
    var keyElem = document.getElementById(name)
    return (keyElem != null) ? parseInt(keyElem.value) : NaN
}

function crypt() {
    var text = getText()
    var primeNumber1 = getKey('primeNumber1')
    var primeNumber2 = getKey('primeNumber2')

    var result = ''

    //insert code here

    document.getElementById('text').value = result
    validateInputs()
}

function decrypt() {
    var text = getText()
    var primeNumber1 = getKey('primeNumber1')
    var primeNumber2 = getKey('primeNumber2')

    var result = ''

    //insert code here

    document.getElementById('text').value = result
    validateInputs()
}

function validateInputs() {
    deactivateButtons()

    text = getText()
    primeNumber1 = getKey('primeNumber1');
    primeNumber2 = getKey('primeNumber2');

    var containsPlainChars = false
    var containsCypherChars = false
    var containsIllegalChars = false
    var containsCommonChars = false

    for (index in text) {
        if (plaintext.includes(text[index]) && cyphertext.includes(text[index])){
            containsCommonChars = true
        }else if (plaintext.includes(text[index])) {
            containsPlainChars = true
        }else if (cyphertext.includes(text[index])) {
            containsCypherChars = true
        }else {
            containsIllegalChars = true
        }
    }

    if (text === '') {
        hideAlert()
    } else if (isNaN(primeNumber1)) {
        setAlert('PrimeNumber1 is not set!')
    } else if (!isPrime(primeNumber1)) {
        setAlert('PrimeNumber1 is not PRIME!')
    } else if (isNaN(primeNumber2)) {
        setAlert('PrimeNumber2 is not set!')
    } else if (!isPrime(primeNumber2)) {
        setAlert('PrimeNumber1 is not PRIME!')
    } else if (containsIllegalChars) {
        setAlert('Text contains illegal characters!')
    } else if (containsPlainChars && containsCypherChars) {
        setAlert('Do not mix plaintext and cyphertext!')
    } else if (containsPlainChars) {
        hideAlert()
        activateCryptButton()
    } else {
        hideAlert()
        activateDecryptButton()
    }
}

function activateCryptButton() {
    document.getElementById('crypt-btn').disabled = false
}

function deactivateCryptButton() {
    document.getElementById('crypt-btn').disabled = true
}

function activateDecryptButton() {
    document.getElementById('decrypt-btn').disabled = false
}

function deactivateDecryptButton() {

    document.getElementById('decrypt-btn').disabled = true
}

function deactivateButtons() {
    deactivateCryptButton()
    deactivateDecryptButton()
}

function setAlert(text) {
    document.getElementById('danger-alert').style.display = 'block'
    document.getElementById('danger-alert').innerHTML = text
}

function hideAlert() {
    document.getElementById('danger-alert').innerHTML = ''
    document.getElementById('danger-alert').style.display = 'none'
}

validateInputs()