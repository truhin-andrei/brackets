module.exports = function check(str, bracketsConfig) {
    let  arr = [],
    open =[],
    close = [];
let countOpen= [0,0,0,0,0],
   countClose= [0,0,0,0,0],
   subArr = [],
   a,
   i=0,
   k,
   count=0;
let lineOpen = false;
let eightOpen = false;

arr= str.split('');

bracketsConfig.forEach(item => {
   open.push(item[0]);
   close.push(item[1]);
});

for (let index=0; index<arr.length; index++) {
    if (((arr[index] === '|') || (arr[index] === '7') ) && !lineOpen){
        lineOpen=true;
        countOpen[open.indexOf(arr[index])]++;
        a=open.indexOf(arr[index]);
        continue;
    }
    
    if ((arr[index] === '8') && !eightOpen){
            eightOpen=true;
            countOpen[open.indexOf(arr[index])]++;
            a=open.indexOf(arr[index]);
            continue;
    }

    if ((open.includes(arr[index])) && ((arr[index] != '|') && (arr[index] != '7') && (arr[index] != '8'))) {
        countOpen[open.indexOf(arr[index])]++;
        a=open.indexOf(arr[index]);
    }

    if (((arr[index] === '|') || (arr[index] === '7') || (arr[index] === '8')) && lineOpen){
        lineOpen=false;
        countClose[close.indexOf(arr[index])]++;
        a=close.indexOf(arr[index]);
    }

    if ((arr[index] === '8') && eightOpen){
        eightOpen=false;
        countClose[close.indexOf(arr[index])]++;
        a=close.indexOf(arr[index]);
    }

    if (close.includes(arr[index]) && ((arr[index] != '|') && (arr[index] != '7') && (arr[index] != '8'))) {
        countClose[close.indexOf(arr[index])]++;
        a=close.indexOf(arr[index]);
    }

    if (countClose[a] > countOpen[a]) return false;

    if (countClose[a] === countOpen[a]) {
        let x = arr.lastIndexOf(open[a], index-1);
        subArr = arr.slice (x+1,  index);
        if (subArr.length !=0){
            k=0;
            count=0;
            while (k<subArr.length){
                if (open.includes(subArr[k])) count++;
                if (close.includes(subArr[k])) count--;
                k++;
            } 
            if (count>0) return false; 
        }
   }
};

while (i<open.length){
    if (countClose[i] != countOpen[i]) return false; 
    i++;
} 
return true;
}
