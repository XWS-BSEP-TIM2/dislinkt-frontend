import { Component, OnInit } from '@angular/core';
import { ConnectionDetails, Skill } from 'src/app/model/connectionDetails';
import { LoginRespons } from 'src/app/model/loginResponse';
import { ConnectionService } from 'src/app/services/connection.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'suggested-connections-page',
  templateUrl: './suggested-connections-page.component.html',
  styleUrls: ['./suggested-connections-page.component.scss']
})
export class SuggestedConnectionsPageComponent implements OnInit {

  loginRespons: LoginRespons = new LoginRespons();
  constructor(private loginService: LoginService, private connectionService: ConnectionService) {
    this.loginRespons = this.loginService.getCurrentUser();
   }

  recommendations!: ConnectionDetails[];

  ngOnInit(): void {
    this.recommendations = []
    
    
    this.connectionService.GetRecommendations().subscribe((data) => {
      console.log(data);
      this.recommendations = data;
    });
    

    
    //this.recommendations.push(new ConnectionDetails("id", "Nikola", "Tesla", "nikolatesla", "Neka super biografija koja je jako zanimljiva ali zapravo i nije toliko zanimljivo jer je ovo vec dosadilo", false, [new Skill("i", "Java", "Skill"), new Skill("i", "C#", "Skill"), new Skill("i", "Python", "Skill")] ))

  }

}
