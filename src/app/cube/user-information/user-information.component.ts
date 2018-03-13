import { USER_ROUTES, PUBLIC_LEARNING_OBJECT_ROUTES } from '../../../environments/route';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { LearningObjectService } from '../learning-object.service';
import { AuthService } from '../../core/auth.service';
import { LearningObject, User } from '@cyber4all/clark-entity';
import { Http, Headers, ResponseContentType } from '@angular/http';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss']
})
export class UserInformationComponent implements OnInit, OnChanges {
  // User Information
  @Input('user') user: User;
  @Input('self') self: boolean = false;
  objects: LearningObject[];

  constructor(
    private service: LearningObjectService,
    private auth: AuthService,
    private http: Http
  ) {}


  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getUsersLearningObjects();
  }

  async getUsersLearningObjects(): Promise<void> {
    let route = (this.self) ?
      USER_ROUTES.GET_MY_LEARNING_OBJECTS(this.user.username) :
      PUBLIC_LEARNING_OBJECT_ROUTES.GET_USERS_PUBLIC_LEARNING_OBJECTS(this.user.username);

    return this.http.get(route, {withCredentials: true }).toPromise().then(val => {
      console.log(val);
      this.objects = (this.self) ? <Array<LearningObject>>val.json().map(l => LearningObject.instantiate(l)) : <Array<LearningObject>>val.json().map(l => LearningObject.instantiate(l));
    });
  }
}
