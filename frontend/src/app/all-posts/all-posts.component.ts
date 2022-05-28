import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss']
})
export class AllPostsComponent implements OnInit {

  title!: string;
  content!: string;
  attachment!: string;
  
  
  constructor() { }

  ngOnInit(): void {
    this.title = "Test - codé en dur";
    this.content = "Mon premier message ici";
    this.attachment = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Three_Rock_Mountain_Southern_Tor.jpg/2880px-Three_Rock_Mountain_Southern_Tor.jpg"
  }

}
