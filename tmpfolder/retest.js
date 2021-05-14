
function retest(str1 = "WAHOU,tropfort!!!",str2 = "Truc de ouf",nb1 = 10,callback = function(a,b,c){return a+'et hop coller'+b+c;}) {
let ret = {};
ret.str = callback(str1,str2,nb1);
ret.num = nb1**8/7;
return ret;
}
module.exports = retest;