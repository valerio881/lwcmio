trigger StudentTrigger on Studenti__c (before insert, before update) {
    StudentTriggerHandler triggerStu= new StudentTriggerHandler();
    if(Trigger.isInsert){
        triggerStu.beforeTriggerInsert(Trigger.new);
    }
    if(Trigger.isUpdate){
        triggerStu.beforeTriggerUpdate(Trigger.new);
    }

}