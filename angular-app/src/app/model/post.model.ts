export class Post {
    ID: any;
    Data: any;
    ObjectCreatedDate: Date = new Date();
    ObjectLastModifiedDate: Date = new Date();
    Caption: string = "";
    PhotoUrl: string ="";
    User : any;
    Likes : number = 0;
    isLiked: boolean = false;
    Comments: any[] =[];
    Location : any;

}
