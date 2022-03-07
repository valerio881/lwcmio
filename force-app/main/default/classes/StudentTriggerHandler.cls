public with sharing class StudentTriggerHandler {
    public void beforeTriggerInsert(List<Studenti__c> studenti){
        for(Studenti__c stud:studenti){
            stud.Esito__c=true;
        }
    }
    public void beforeTriggerUpdate(List<Studenti__c> studenti){
        for(Studenti__c stud:studenti){
            stud.Aggiornato__c=true;
        }
    }
}
