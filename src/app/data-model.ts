export class List {
  id = 0;
  listName = '';
  options: Options[];
}

export class Options {
  key = ''; 
  optionName = ''; 
}

export const lists: List[] = [
  {
    id: 0,
    listName: "Liste 1",
    options: [
        { key: 'OPT1 de liste1', optionName: 'option1 de liste1'},
        { key: 'OPT2 de liste1', optionName: 'option2 de liste1'},
        { key: 'OPT3 de liste1', optionName: 'option3 de liste1'}
    ]
},
{
    id: 1,
    listName: "Liste 2",
    options: [
        { key: 'OPT1 de liste2', optionName: 'option1 de liste2'},
        { key: 'OPT2 de liste2', optionName: 'option2 de liste2'},
        { key: 'OPT3 de liste2', optionName: 'option3 de liste2'}
    ]
},
{
    id: 2,
    listName: "Liste 3",
    options: [
        { key: 'OPT1 de liste3', optionName: 'option1 de liste3'},
        { key: 'OPT2 de liste3', optionName: 'option2 de liste3'},
        { key: 'OPT3 de liste3', optionName: 'option3 de liste3'}
    ]
},
{
    id: 3,
    listName: "Liste 4",
    options: [
        { key: 'OPT1 de liste4', optionName: 'option1 de liste4'},
        { key: 'OPT2 de liste4', optionName: 'option2 de liste4'},
        { key: 'OPT3 de liste4', optionName: 'option3 de liste4'}
    ]
}
]
  
