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
  

  
  /*
  {
    id: 1,
    name: 'Whirlwind',
    adresses: [
      {street: '123 Main',  city: 'Anywhere', state: 'CA',  zip: '94801'},
      {street: '456 Maple', city: 'Somewhere', state: 'VA', zip: '23226'},
    ]
  },
  {
    id: 2,
    name: 'Bombastic',
    addresses: [
      {street: '789 Elm',  city: 'Smallville', state: 'OH',  zip: '04501'},
    ]
  },
  {
    id: 3,
    name: 'Magneta',
    addresses: [ ]
  },
];

export const states = ['CA', 'MD', 'OH', 'VA'];


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/