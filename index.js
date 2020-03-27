const testData = [
    {
        input: [1, 1],
        target: [1, 0]
    },
    {
        input: [1, 0],
        target: [0, 1]
    },
    {
        input: [0, 1],
        target: [0, 1]
    },
    {
        input: [0, 0],
        target: [1, 0]
    }
];


// let brain = new Preceptron(2,2,2)
// let input = [1, 0]
// let target = [1, 0]

// let i = 0
// while (i<100) {
//     brain.train(input,target)
//     i++
// }

let brain = new Preceptron(2, 2, 2)
let _h1 = document.getElementById('test1')
let _h2 = document.getElementById('test2')
let _h3 = document.getElementById('test3')
let _h4 = document.getElementById('test4')
// let cvs = document.getElementById('cvs')
// let ctx = cvs.getContext('2d');
// for (const data of testData) {
//     let i = 0
//     while (i < 1000) {
//         brain.train(data.input, data.target)
//         i++
//     }
//     break;
// }

// let myData1 = brain.feedForword(testData[0].input)
// let myData2 = brain.feedForword(testData[1].input)
// let myData3 = brain.feedForword(testData[2].input)
// let myData4 = brain.feedForword(testData[3].input)

// _h1.innerText = `${testData[0].input} >> ${Preceptron.activationFun(myData1[1])} || ${myData1[1]}`
// _h2.innerText = `${testData[1].input} >> ${Preceptron.activationFun(myData2[1])} || ${myData2[1]}`
// _h3.innerText = `${testData[2].input} >> ${Preceptron.activationFun(myData3[1])} || ${myData3[1]}`
// _h4.innerText = `${testData[3].input} >> ${Preceptron.activationFun(myData4[1])} || ${myData4[1]}`

let i = 0
let count = 0
const draw = () => {
    if (i < 4) {
        brain.train(testData[i].input, testData[i].target)
    }

    let myData1 = brain.feedForword(testData[0].input)
    let myData2 = brain.feedForword(testData[1].input)
    let myData3 = brain.feedForword(testData[2].input)
    let myData4 = brain.feedForword(testData[3].input)

    if (i === 0) _h1.innerText = `${testData[0].input} >> ${Preceptron.activationFun(myData1[1])} || ${myData1[1]}`
    if (i === 1) _h2.innerText = `${testData[1].input} >> ${Preceptron.activationFun(myData2[1])} || ${myData2[1]}`
    if (i === 2) _h3.innerText = `${testData[2].input} >> ${Preceptron.activationFun(myData3[1])} || ${myData3[1]}`
    if (i === 3) _h4.innerText = `${testData[3].input} >> ${Preceptron.activationFun(myData4[1])} || ${myData4[1]}`
    count++

    if (count % 100 === 0 && i < testData.length) {
        i++
    }
    window.requestAnimationFrame(draw)
}

draw()






