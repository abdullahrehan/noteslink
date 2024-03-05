export const HomeFiles = [
  {
    id:1,
    name: "React Js",
    visibility: "private",
    type: "folder",
    content: null,
  },
  {
    name: "Node Js",
    visibility: "public",
    type: "folder",
    content: null,
  },
  {
    name: "Express Js",
    visibility: "private",
    type: "folder",
    content: null,
  },
  {
    name: "MongoDb",
    visibility: "public",
    type: "folder",
    content: null,
  },
  {
    name: "Redux",
    visibility: "private",
    type: "file",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus accusamus harum expedita et magnam eius minus itaque quam sit qui adipisci architecto, atque porro quasi. Voluptatem maiores aut corrupti quaerat.",
  },
  {
    name: "Event Loop",
    visibility: "public",
    type: "file",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus accusamus harum expedita et magnam eius minus itaque quam sit qui adipisci architecto, atque porro quasi. Voluptatem maiores aut corrupti quaerat.",
  },
];

const Files = [{
    id:1,
    name: "React Js",
    type: "folder",
    status: "private",
    keywords:[],
    content: null,
    parent:"My Folder",
    path:["My Folder"],
    inteactions:{likedby:[],viewedby:[]},
    strikeStatus:1,
    report:[{reason:"lorem ipsum dolor sit amet, consectetur adipiscing"}],
    createdAt:Date.now(),
    deleteAt:null, // Show that file is not deleted. If this is not null than the file will be move in deletedFiles list .
    modifiedAt:Date.now(),
    owner:"abdullah81",
    sharedWith:[],
    size:null,
  }];

export const UserData={
  userId:2193824,
  name:"Muhammad Abdullah",
  username:"abdullah81",
  email:"abdullahrehan8118@gmail.com",
  type:"admin", // admin or user
  picture:null,
  files:Files,
  tabs:[],
  lockTabs:false,
  savedFiles:[],
  deletedFiles:[],
  complaints:[],
  storage:{used:null,free:null},
  notifications:[],
  theme:null,
  createdDate:null,
}