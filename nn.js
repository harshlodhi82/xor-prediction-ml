"use strict";

function sigmoid(t) {
    return 1/(1+Math.pow(Math.E, -t));
}


class Preceptron {
    learninigRate = 5
    constructor(input_nodes, hidden_nodes, output_nodes) {
        this.input_nodes = input_nodes
        this.hidden_nodes = hidden_nodes
        this.output_nodes = output_nodes
        this.weights_ih = math.zeros(this.input_nodes, this.hidden_nodes)
        this.weights_ho = math.zeros(this.hidden_nodes, this.output_nodes)
        this.weights_ih = this.randomizeFun(this.weights_ih)
        this.weights_ho = this.randomizeFun(this.weights_ho)

        this.bias_h = math.zeros(this.hidden_nodes)
        this.bias_o = math.zeros(this.output_nodes)
        this.bias_h = this.randomizeFun(this.bias_h)
        this.bias_o = this.randomizeFun(this.bias_o)
    }

    feedForword(input) {
        // ANS = W*I+B
        // Sigmoid(ANS) 
        input = math.matrix(input)
        let wi = math.multiply(input, this.weights_ih)
        let wib = math.add(this.bias_h, wi)
        // console.log(wib)
        let sigmoid_wib = this.sigmoidIt(wib)

        let wo = math.multiply(sigmoid_wib, this.weights_ho)
        let wob = math.add(this.bias_o, wo)
        // console.log(wob)
        let sigmoid_wob = this.sigmoidIt(wob)
        // console.log(sigmoid_wob)
        return sigmoid_wob._data
    }

    train(inputs, targets){
        // ANS = W*I+B
        // Sigmoid(ANS) 
        // console.table(this.weights_ho._data)
        // console.table(this.weights_ih._data)
        let input = math.matrix(inputs)
        let wi = math.multiply(input, this.weights_ih)
        let wib = math.add(this.bias_h, wi)
        let sigmoid_wib = this.sigmoidIt(wib)

        let wh = math.multiply(sigmoid_wib, this.weights_ho)
        let whb = math.add(this.bias_o, wh)
        let sigmoid_whb = this.sigmoidIt(whb)

        //---------------------------------------
        // let outputs = this.feedForword(inputs)
        let outputs = sigmoid_whb

        console.log(">>>>>>>");
        console.log(outputs._data);
        
        targets = math.matrix(targets)
        let errors_o = math.subtract(targets, outputs) 
        // console.log(targets, outputs, errors_o);
        
        //tranpose the weights
        let weights_t_ho = math.transpose(this.weights_ho) 
        // let weights_t_ih = math.transpose(this.weights_ih) 
        
        // console.log(weights_t_ho, errors_o);
        
        // let errors_h1 = math.multiply(weights_t_ho, errors_o)
        let errors_h = math.multiply(errors_o, weights_t_ho)
        // console.log("hiddden error", errors_h);
        
        //--------------------------------------------------------



        // DELTA = LEARNING_RATE * ERROR * GRADIENT * TRANSPOSE_INPUT

        let gradient_ho = math.multiply(outputs, math.subtract(1, outputs))
        let error_gradient_ho = math.multiply(errors_o, gradient_ho)
        let eg_transpose_hidden = math.multiply(error_gradient_ho, math.transpose(sigmoid_wib))
        let delta_ho =  math.multiply(this.learninigRate, eg_transpose_hidden)
        this.weights_ho = math.add(delta_ho, this.weights_ho)
        this.bias_o = math.add(error_gradient_ho, this.bias_o)

        let gradient_ih = math.multiply(sigmoid_wib, math.subtract(1, sigmoid_wib))
        let error_gradient_ih = math.multiply(errors_h, gradient_ih)
        let eg_transpose_inputs = math.multiply(error_gradient_ih, math.transpose(input))
        let delta_ih =  math.multiply(this.learninigRate, eg_transpose_inputs)
        this.weights_ih = math.add(delta_ih, this.weights_ih)
        this.bias_h = math.add(error_gradient_ih, this.bias_h)

        // let gradient_wib = math.multiply(sigmoid_wib,  math.subtract(1, sigmoid_wib))
        // let gradient_whb = math.multiply(sigmoid_whb,  math.subtract(1, sigmoid_whb))

        // let wib_error = math.multiply(errors_h, gradient_wib)
        // let whb_error = math.multiply(errors_o, gradient_whb)

        // let delta_m = math.multiply(this.learninigRate, whb_error, math.transpose(whb))
        // let delta_b = math.multiply(this.learninigRate, wib_error, math.transpose(wib))

        // this.weights_ho =  math.multiply(delta_m, this.weights_ho)
        // this.weights_ih =  math.multiply(delta_b, this.weights_ih)

        // console.table(targets._data)
        // console.table(outputs._data)
        // console.table(errors_o._data)
        // console.table(errors_h._data)
        // console.table(wib_error._data)
        // console.table(whb_error._data)
        // console.table(this.weights_ho._data)
        // console.table(this.weights_ih._data)
    }

    randomizeFun(matrix){
        matrix = matrix.map(function (value, index, matrix) {
            return math.random(-1, 1)
        })
        return matrix
    }

    sigmoidIt(matrix){
        matrix = matrix.map(function (value, index, matrix) {
            return sigmoid(value)
        })
        return matrix
    }

    static activationFun(ans){
        console.log("ans >>", ans);
        
        if(ans > 0.5){
            return "True"
        }else{
            return "False"
        }
    }
}