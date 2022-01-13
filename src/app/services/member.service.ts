import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from '../app-config';
import { Member } from '../models/member';


@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor( private httpClient : HttpClient) { }
  public Tab:Member[]= GLOBAL._DB.members;
  // type de retour promise car on a utilisé thread de type promise (pas observable)
  saveMember (member : Member): Promise<Member> 
  {
    // variable httpClient kenit msatra lezm on l'injecte ds le constructor   
    //this.httpClient.post<Member>('linktorestAPI', member).toPromise();
    //linktoapiREST sera remplace par le nom de serveur= localhost:8080 pour faire la liaison avec la bad=se de donnés
    const memberToSave = {...member,};
    //si le membre a son id(edit) on le génère(ajout) sinon on le récupère
    // les 2 attributs id w createdDate ne9sin fl formulaire lezm nzidouhm lina bch ywali type Member
    memberToSave.id = member.id?? Math.ceil(Math.random() *10000).toString();
    memberToSave.createdDate = member.createdDate?? new Date().toString();
    //on a inséré memberToSave en 1éer position puis on a afficher le tableau tout en filtrant les donnés en affichant les donnes autre qu" l'id de memeberToSave
    this.Tab=[memberToSave, ...this.Tab.filter(item => item.id!==memberToSave.id)];
    // fi west resolve n5ali meme type ili 7atitou fi Promise<?> 3alloul
    return new Promise(resolve => resolve (memberToSave));
  }
  getMemberById (id : string) : Promise<Member> 
  {
    //return this.httpClient.get<Member> ('http://localhost:4200/api/MEMBRE-SERVICE/membre/'+id).toPromise();
    // ??= sinon, ken 9aha yraja3li il item sinon yraja3li null  
    return new Promise(resolve => resolve (this.Tab.filter(item=> item.id === id) [0] ?? null));   
  }
  onRemoveAccount (id : string) : Promise <void>
  {
  //return HttpClient.delete<void> ('linkToAPI').toPromise();
    this.Tab  = this.Tab.filter(item => item.id !== id);
    return new Promise (resolve => resolve());
  }
  getAllMembers() : Promise<Member[]> 
  {
    return this.httpClient.get<Member[]>("http://localhost:4200/api/MEMBRE-SERVICE/membres").toPromise();
    //return new Promise (resolve => resolve(this.Tab));
  }

}
