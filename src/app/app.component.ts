import { Component } from '@angular/core';
import {UserDetails} from './UserDetails'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import {UsersService} from './users.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsersService],
})
export class AppComponent {
   massage = null; 
  constructor(private modalService: NgbModal, private http: HttpClient,private usersService: UsersService) {
    this.filtername = "";
   
  }

 filtername:string;

  title = 'Users';
    users : UserDetails[];
 ngOnInit() {
   this.getAllUsers();
  }

  searchfilter:{}
  selecteduser : UserDetails 
  
  addEditUsers(usr,content) {
    if(usr==null)
    {
      this.selecteduser = {} as UserDetails;
      this.selecteduser.UserStatus = 1;
      this.selecteduser.UserRole=1;
    }
    else
    {
      this.selecteduser = usr;
    }
   
    this.modalService.open(content);
  }



filteredusers()
{
  return this.users.filter(u=>u.Name.toUpperCase().includes(this.filtername.toUpperCase()) 
  || u.Email.toUpperCase().includes(this.filtername.toUpperCase()));
}

getAllUsers(): void {
  this.usersService.getAllUsers()
    .subscribe(user => (this.users = user));
    console.log(this.users);
    console.log()
}

getUserById(id:number):void{
  this.usersService.getUserById(id)
    .subscribe(user => (this.users = user));
}

saveUser():void {
    this.usersService.saveUser(this.selecteduser)
      .subscribe(user => {
        this.users.push(user);
        this.massage='User Saved Succefully!!'
      });
      this.getAllUsers();
  }

  deleteUser(id:number):void{
     if (confirm("Are you sure you want to delete this ?")) { 
    this.usersService.deleteUser(id)
      .subscribe(() =>{
          this.massage = 'User Deleted Succefully'; 
      });
      
       this.getAllUsers();
      
     }

    }
//     sortUsers(){
//     this.users = this.users.sort((n1,n2) => {
//     if (n1 < n2) {
//         return 1;
//     }

//     if (n1 > n2) {
//         return -1;
//     }

//     return 0;
// });
//   }

}


