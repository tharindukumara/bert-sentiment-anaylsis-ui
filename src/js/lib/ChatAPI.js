var positiveFeedback = ["Well well. That is a positive sentiment"
    , "Tadaaa. It is definitely a positive sentiment"
    , "Boooooom!!!. It is a positive sentiment."
    , "Cheer up!!! It is a positive sentiment."
    , "That's a good one. Positive sentiment for sure."
    , "Positive Sentiment for sure"];


var negativeFeedback = ["That is a negative sentiment", "Bad mood?. A negative sentiment."
    , "Hmmmmmm... It is a negative opinion", "Negative negative negative :-("
    , "Why so serious? That is a negative sentiment my firent."
    , "Cool down. A negative sentiment detected"];


var neutralPositiveFeedback = ["Close call. I feel this is a positive sentiment. But I can be wrong."
    , "Hmmmmmm... It is a positve sentiment. Isn't it?"
    , "I am clueless. Seems a positive sentiment to me."
    , "Sorry. This is out of my knowledge. Seems a positive sentiment."]


var neutralNegativeFeedback = ["Close call. I feel this is a negative sentiment."
    , "Very Tight. I am thinking this as a negative sentiment. But I can be wrong."
    , "Hmmmmmm. Bit hard to guess it. Seems a negative sentiment to me."
    , "I am just a stupid bot. It is too tough for me to detect. Seems a negative sentiment to me. Sorry!!"]



export function getPositiveFeedback() {
    return positiveFeedback[Math.floor(Math.random() * positiveFeedback.length)];
}


export function getNegativeFeedback() {
    return negativeFeedback[Math.floor(Math.random() * negativeFeedback.length)];
}


export function getNeutralPositiveFeedback() {
    return neutralPositiveFeedback[Math.floor(Math.random() * neutralPositiveFeedback.length)];
}

export function getNeutralNegativeFeedback() {
    return neutralNegativeFeedback[Math.floor(Math.random() * neutralNegativeFeedback.length)];
}

export function getFeedbackFromScores(positiveValue, negativeValue) {
    if (positiveValue >= negativeValue) {
        if (Math.abs(positiveValue - negativeValue) < 1.5) {
            return getNeutralPositiveFeedback();
        }
        return getPositiveFeedback();
    } 
    
    if (Math.abs(positiveValue - negativeValue) <  1.5) {
        return getNeutralNegativeFeedback();
    }

    return  getNegativeFeedback();
}