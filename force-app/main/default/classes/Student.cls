public  class Student {
    @AuraEnabled
    public static String insertStudent(Studenti__c studenti) {
        upsert studenti;
        return studenti.Id;
    }
    @AuraEnabled(cacheable=true)
    public static List<Studenti__c> getStudentiList() {
        return [
            SELECT Id, NomeStudente__c, CognomeStudente__c, Password__c, Corsi__c, Privacy__c
            FROM Studenti__c
        ];
    }
    @AuraEnabled
    public static void insertDescription(String id, String description) {
        Studenti__c stud=[SELECT Id, Description__c FROM Studenti__c WHERE Id=:id];
        stud.Description__c=description;
        update stud;
    }
}
