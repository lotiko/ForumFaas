
function letest(str1 = "WAHOU,tropfort!!!",str2 = "Truc de ouf",nb1 = 10,callback = function(a,b){return a+'et hop coller'+b;}) {
let ret = {};
ret.str = callback(str1,str2);
ret.num = nb1**8/7;
return ret;
}
module.exports = letest;