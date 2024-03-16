const arr1=[2,4,1,5,8,3]
const length=arr1.length;

const arr2=[]

for (let i = 0; i < length; i++) {

    if(i!==(length-i && i!==0)){
        arr2.push(arr1[i]*arr1[length-i]);
        console.log(i);
    }
    

}
console.log(arr2,"hello");