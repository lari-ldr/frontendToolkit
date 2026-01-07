import { useCallback, useMemo, useState } from 'react';
import './style.css';
import TreeChild from './TreeChild';
import useTreeSelect from './hooks/useTreeSelect';
import ExpandedButtonMother from './ExpandedButtonMother';

/**
 * TODO: o que falta fazer:
 * 1. Nem sempre o endpoint vai mandar as informações no formato que esperamos. Então antes de qualquer coisa a array de objetos deve ser normalizada
 *  1.1 Estrutura que deve ter é a seguinte:
        {
            value: string/number,
            label: string,
            checked: boolean,
            expanded: boolean, // add esse item por causa do item 3
            children: array (repete objeto)
        }
 * 4. Adicionar animações CSS ao interagir com o tree select
 */

export default function TreeSelect() {
  const [showTreeNodes, setShowTreeNodes] = useState<boolean>(false);
  const { data, selectedNodes, debouncedGetTree, onSelect } = useTreeSelect();

  // Autocomplete para pesquisar por um item especifico
  const onSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      debouncedGetTree(value);
      setShowTreeNodes(true);
    },
    [debouncedGetTree],
  );

  // Mostra ou esconde os nós filhos
  const showTree = () => {
    setShowTreeNodes((prevTreeNode) => !prevTreeNode);
  };

  /*
  * Salva os nodes para pesquisa.
  * Aqui pode passar os valores para uma função de fora.
  */
  const onSave = () => {
    if (!selectedNodes.length) return;
    console.log(selectedNodes);
    // callback externo aqui...
    setShowTreeNodes(false);
  };

  const renderedTree = useMemo(
    () =>
      data.map((node) => (
        <TreeChild key={node.value} node={node} onChange={onSelect} />
      )),
    [data, onSelect],
  );

  return (
    <>
      <div className='tree-select'>
        <div className='tree-select_container'>
          <input
            className='tree-select_input'
            type='text'
            placeholder='Search or select an item'
            onChange={onSearch}
          />
          <ExpandedButtonMother
            showTreeNodes={showTreeNodes}
            showTree={showTree}
          />
        </div>
        {showTreeNodes && (
          <div className='tree-children'>
            {renderedTree}
            <button className='btn-select' onClick={onSave}>
              Selecionar
            </button>
          </div>
        )}
      </div>
    </>
  );
}
