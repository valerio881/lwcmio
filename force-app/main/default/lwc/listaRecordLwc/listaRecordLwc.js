import { LightningElement,track,wire } from 'lwc';
import getStudenti from '@salesforce/apex/Student.getStudentiList';
import insDescription from '@salesforce/apex/Student.insertDescription';

export default class ListaRecordLwc extends LightningElement {
    @track errorGeneral=false;
    @track descriptionOk=false;
    @track disabledInsDescription=true;
    @track errorGeneralMessage;
    @track datiRiepilogo;
    @track description;
    @track studentId;
    @track data;
    @wire(getStudenti)
    getStudents({ error, data }) {
        if (data) {
            this.data = data;
        } else if (error) {
            this.errorGeneral = true;
            this.errorGeneralMessage=error;
        }
    }
    @track columns=[
    { label: 'Nome', fieldName: 'NomeStudente__c', type:"text"},
    { label: 'Cognome', fieldName: 'CognomeStudente__c', type: 'test' },
    { label: 'Password', fieldName: 'Password__c', type: 'text' },
    { label: 'Corso', fieldName: 'Corsi__c', type: 'text' },
    { label: 'Privacy', fieldName: 'Privacy__c', type: 'boolean' },
    {type: 'action',
    typeAttributes: { rowActions:[
        { label: 'Vedi Riepilogo', name: 'viewRiepilogo' }
        ]},
    }]
    handleRowAction(event){
        const actionName = event.detail.action.name;
        if(actionName == 'viewRiepilogo'){
            let riep=event.detail.row;
            this.studentId=riep.Id;
            this.datiRiepilogo="Lo studente "+riep.NomeStudente__c+" "+riep.CognomeStudente__c+" ha studiato il corso di "+riep.Corsi__c+".";
        }  
    }
    handlePassDescription(event){
        this.disabledInsDescription=false;
        this.description=event.detail;
    }
    insertDesc(event){
        let idStudent=this.studentId;
        let desc=this.description;
        insDescription({id: idStudent, description:this.description})
    .then((result) => {
    this.descriptionOk=true;
    })
    .catch((error) => {
        this.errorGeneral=true;
        this.errorGeneralMessage=error;
    });
    }

}