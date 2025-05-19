import { useState, useEffect, useCallback, useRef } from 'react';
import MockService from '../../../services/MockService';
import TreeSelectService from '../../../services/TreeSelectService';
import { TreeSelectInterface } from '../../../interfaces/TreeSelectInterface';

const mockService = new MockService();
const treeSelectService = new TreeSelectService();

export default function useTreeSelect() {
  const [data, setData] = useState<TreeSelectInterface[]>([]);
  const [selectedNodes, setSelectedNodes] = useState<TreeSelectInterface[]>([]);
  const debounceRef = useRef<number | null>(null);

  /*
   * Retorna do backend a árvore. Ao passar o parametro search
   * pesquisa pelo nome de um dos nós da árvore.
   */
  const getTree = useCallback((search: string = '') => {
    mockService
      .getTree(search)
      .then((response) => {
        if (response && response.data) {
          if (search.length >= 1) {
            setData(treeSelectService.expandeChildWhenSearched(response.data));
            return;
          }
          setData(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  /*
   * Espera um tempo depois que o usuário para de digitar.
   * - É bom para a performance pois reduz o número de chamadas à API.
   * - Menos processamento = menos uso de CPU = app mais leve.
   */
  const debouncedGetTree = useCallback(
    (search: string) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        getTree(search);
      }, 500); // delay de 500ms
    },
    [getTree],
  );

  // Seleciona ou deseleciona nodes
  const onSelect = useCallback(
    (checked: boolean, node: TreeSelectInterface) => {
      // Seleciona ou deseleciona visualmente, ou seja, marcando o checkbox
      const updatedTree: TreeSelectInterface[] | void =
        treeSelectService.updateCheckedByRelatives(data, node.value, checked);
      if (updatedTree) {
        setData(updatedTree);
      }

      /*
      * Aqui seleciona ou deseleciona apenas o uuid do node.
      * Assim o estado fica pronto caso os identificadores sejam
      * enviados para um endpoint para pesquisa por exemplo.
      */
      setSelectedNodes((prev) =>
        checked ? [...prev, node] : prev.filter((item) => item !== node),
      );
    },
    [data],
  );

  useEffect(() => {
    getTree(); // Primeira renderização
  }, [getTree]);

  useEffect(() => {
    return () => {
      if (debounceRef.current !== null) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return {
    data,
    selectedNodes,
    debouncedGetTree,
    onSelect,
  };
}
