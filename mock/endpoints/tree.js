const { v4: uuidv4 } = require('uuid');

const array = [{
  value: uuidv4(),
  label: 'Animais',
  checked: false,
  expanded: false,
  children: [
      {
          value: uuidv4(),
          label: 'Carnivoro',
          checked: false,
          expanded: false,
          children: [
              {
                  value: uuidv4(),
                  label: 'Lẽao',
                  checked: false,
                  expanded: false,
                  children: [],
              },
              {
                  value: uuidv4(),
                  label: 'Gato',
                  checked: false,
                  expanded: false,
                  children: [],
              }
          ],
      },
      {
          value: uuidv4(),
          label: 'Herbivoro',
          checked: false,
          expanded: false,
          children: [
              {
                  value: uuidv4(),
                  label: 'Arara',
                  checked: false,
                  expanded: false,
                  children: [],
              },
              {
                  value: uuidv4(),
                  label: 'Maritaca',
                  checked: false,
                  expanded: false,
                  children: [],
              }
          ],
      }
  ],
},
{
  value: uuidv4(),
  label: 'Comidas',
  checked: false,
  expanded: false,
  children: [
      {
          value: uuidv4(),
          label: 'Italiana',
          checked: false,
          expanded: false,
          children: [
              {
                  value: uuidv4(),
                  label: 'Macarrão',
                  checked: false,
                  expanded: false,
                  children: [],
              },
              {
                  value: uuidv4(),
                  label: 'Lasanha',
                  checked: false,
                  expanded: false,
                  children: [],
              }
          ],
      }
  ],
}];

// function searchTree(nodes, search) {
//     const results = [];

//     for (const node of nodes) {
//         // Verifica se o label contém o termo de busca
//         const matches = node.label.toLowerCase().includes(search.toLowerCase());
//         // Faz a busca recursiva nos filhos
//         const filteredChildren = searchTree(node.children || [], search);

//         // Se o nó atual combina ou algum filho combina, inclui no resultado
//         if (matches || filteredChildren.length > 0) {
//             results.push({
//                 ...node,
//                 children: filteredChildren,
//             })
//         }
//     }

//     return results;
// }

function searchTree(nodes, search) {
    const results = [];

    for (const node of nodes) {
        const matches = node.label.toLowerCase().includes(search.toLowerCase());

        if (matches) {
            // Se o nó atual der match, mantém todos os filhos originais
            results.push({
                ...node,
                children: node.children || [],
            });
        } else {
            // Se não der match, busca recursivamente nos filhos
            const filteredChildren = searchTree(node.children || [], search);

            if (filteredChildren.length > 0) {
                results.push({
                    ...node,
                    children: filteredChildren,
                });
            }
        }
    }

    return results;
}


function tree(req, res) {

  const { search } = req.query;

  if (search) {
    const filtered = searchTree(array, search);
    res.json(filtered);
    return; 
  }

  res.json(array);
  
}

function prepareTree(app) {
  app.get('/api/v1/tree', tree);
}

module.exports = prepareTree;
