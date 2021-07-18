const xmlString = `
  <list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

const parser = new DOMParser();
const xmlDom = parser.parseFromString(xmlString, "text/xml");
const listNode = xmlDom.querySelector('list');
const studentNode = listNode.getElementsByTagName('student');

let result = {
    list: [],
};

for (let i = 0; i < 2; i++) {
    const nameNode = studentNode[i].querySelector('name');
    const firstNameNode = nameNode.querySelector('first');
    const secondNameNode = nameNode.querySelector('second');
    const ageNode = studentNode[i].querySelector('age');
    const profNode = studentNode[i].querySelector('prof');
    const langAttr = nameNode.getAttribute('lang');

    let name = firstNameNode.textContent + " " + secondNameNode.textContent;

    result.list[i] = {
        name: name,
        age: ageNode.textContent,
        prof: profNode.textContent,
        lang: langAttr,
    };
}

console.log(result);

