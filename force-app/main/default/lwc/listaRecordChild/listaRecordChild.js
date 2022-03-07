import { LightningElement,api,track } from 'lwc';

export default class ListaRecordChild extends LightningElement {
@api riepilogo;
@track valueCheck="";
handleChange(event){
    let element = this.template.querySelector("lightning-input");
    let abilita=element.checked;
    if(abilita){
    const selectedEvent = new CustomEvent("passdescription", {detail: this.riepilogo});
      this.dispatchEvent(selectedEvent);
    }
}
}