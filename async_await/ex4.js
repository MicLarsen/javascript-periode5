
stringManipulator = (sentence, ms) => {
    const words = sentence.split(' ');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                asJson: () => {
                    return new Promise((resolve, reject) => {
                        resolve(JSON.stringify({ words }));
                    })
                },
                upperCased: sentence.toUpperCase(),
                msgLength: sentence.length
            });
        }, ms);
    });
};
stringManipulatorAsync = async (str, ms) => {
    let data =  await stringManipulator(str, ms);
    console.log("From first promise: " + data.upperCased);
    console.log("From first promise: " + data.msgLength);

    let res =  await data.asJson();
    console.log("From second promise: " + res)
}
stringManipulatorAsync("JavaScript is cool, even when it sucks", 1000);