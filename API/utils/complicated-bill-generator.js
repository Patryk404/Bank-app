function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }// Love MDN 
module.exports.generatebill = () =>{
    let bill = '';
    for (var i=0; i<=25; i++)// 25 number bill 
    {
        const number = getRandom(0,9);
        bill += number.toString();
    }
    //console.log(bill);
    return bill;
}