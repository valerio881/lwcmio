import { LightningElement, track } from 'lwc';
import insert from '@salesforce/apex/Student.insertStudent';
import { NavigationMixin } from 'lightning/navigation';

export default class StudentiLwc extends NavigationMixin(LightningElement) {
insertPage=true;
@track thankPage=false;
@track errorGeneral=false;
@track errorGeneralMessage;
@track errorPassword=false;
@track errorPasswordMessage;
@track disabledInvia=true;
@track studentId="";
@track studenti = {
NomeStudente__c: ""  ,
CognomeStudente__c:"",
Password__c:"",
Corsi__c:"",
Privacy__c:false
}
get options() {
return [
{ label: 'Matematica', value: 'Matematica' },
{ label: 'Italiano', value: 'Italiano' },
{ label: 'Geografia', value: 'Geografia' },
];
}
connectedCallback(){
let insert= this.insertPage;
insert='Ciao';
const GGG='Ciao';
this.insertPage=false;
}
disconnectedCallback(){

}
handleChange(event){
let checkFields=false;
let password="";
let elements = this.template.querySelectorAll("lightning-input");
let count=0;
elements.forEach(elem => {
if(elem.name!="Privacy__c"){
    if(elem.name=="Password__c"){
password=elem.value;
    }
        
if(elem.value==null || elem.value==""){
    count++;
}
}
else{
    if(elem.checked==false){
        count++; 
    }
}
});
let combo = this.template.querySelector("lightning-combobox");
if(combo.value==null || combo.value==""){
count++;
}
if(count==0){
checkFields=true;
        }
        let checkPass=this.checkPasswordCnt(password); 
        if(checkPass==false){
            this.errorPassword=true;
            this.errorPasswordMessage="La password deve avere essere lunga almeno 8 caratteri, deve avere un carattere minuscolo ed uno minuscolo."
        }
        else{
            this.errorPassword=false;
        }
        if(checkFields && checkPass){
            this.disabledInvia=false;
        }
        else{
        this.disabledInvia=true;
        }

}
checkPasswordCnt(password){
let checkPass=false;
let minChar= password.length >=8 ? true : false;
    let upperCase = password.match(/[A-Z]/) ? true : false;
    let lowerCase = password.match(/[a-z]/) ? true : false;
    let number=password.match(/\d/) ? true : false;
if(minChar && upperCase && lowerCase && number)
{ 
checkPass=true;
}
return checkPass;
}
handleClick(event){
console.log(JSON.stringify(this.studenti));
let elements = this.template.querySelectorAll("lightning-input");
elements.forEach(elem => {
if(elem.name=="Privacy__c"){
    this.studenti.Privacy__c=elem.checked; 
}
else{
this.studenti[elem.name]=elem.value;
}
});
let combo = this.template.querySelector("lightning-combobox");
this.studenti.Corsi__c=combo.value;
if(this.studentId){
this.studenti.Id=this.studentId;
}
console.log(JSON.stringify(this.studenti));
insert({studenti: this.studenti })
    .then((result) => {
        this.studentId = result;
        this.insertPage=false;
        this.thankPage=true;  
    })
    .catch((error) => {
        this.errorGeneral=true;
        this.errorGeneralMessage=error;
    });
}
handleReset(event){
if(this.studentId){
    this.studentId=undefined;
    delete this.studenti.Id;
}
let elements = this.template.querySelectorAll("lightning-input");
elements.forEach(elem => {
if(elem.name=="Privacy__c"){
    elem.checked=false; 
}
else{
elem.value="";
}
});
let combo = this.template.querySelector("lightning-combobox");
combo.value="";
this.disabledInvia=true;
}
handleBack(event){
    this.insertPage=true;
    this.thankPage=false
}
goToList(event){
        this[NavigationMixin.Navigate]({
            "type": "standard__component",
            "attributes": {
                //Here customLabelExampleAura is name of lightning aura component
                //This aura component should implement lightning:isUrlAddressable
                "componentName": "c__listaRecords"
            }
        });
}
}