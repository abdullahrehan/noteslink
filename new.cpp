// Task 1
#include <iostream>

int main() {

    string input;
    cin>>input;
    if(Cfg(input,0))
    
    cout<<"accepted"
    else
    cout<<"rejected"
    return 0
    std::cout << "Try programiz.pro";

    return 0;
}

bool Cfg(input,int index){
    if(index==input.length){
        return true
    
    
    
}

// Task 2


#include <iostream>
#include <string>
using namespace std;

bool CFG(string Input_string, int Index, int strLength){

    if (Index >= strLength){
        cout << "Accepted"<< endl;
        return true;
    }

    if (Index==0 && Input_string[Index] === 'a'){
        return cfg(Input_string, Index + 1, strLength);
    }else if (Input_string[Index] === 'b'){
        return cfg(Input_string, Index + 1, strLength);
    }
    else {
        return false;
    }


}


int main(){

    string Input_string;
    cout << "enter the string: ";
    getline(cin, Input_string);
    cout << endl;

    int strLength = Input_string.strLength();
    bool result = cfg(Input_string, 0, strLength);


    if (result){
        cout << "String Accepted";
    }else {
        cout << "String Rejected";
    }

    return 0;
}


