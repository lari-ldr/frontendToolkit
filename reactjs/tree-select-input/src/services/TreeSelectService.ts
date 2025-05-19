import { TreeSelectInterface } from '../interfaces/TreeSelectInterface';

export default class TreeSelectService {

  /**
   * Percorre a árvore recursivamente para encontrar o nó pelo value.
   * @param tree Lista de nós da árvore
   * @param nodeIdentifier Identificador do nó a ser encontrado
   * @param parent Pai do nó atual na recursão
   * @returns Retorna tanto o nó encontrado quanto seu pai.
   */
  private findNodeAndParent(
    tree: TreeSelectInterface[],
    nodeIdentifier: string,
    parent: TreeSelectInterface | null = null,
  ): { node: TreeSelectInterface; parent: TreeSelectInterface | null } | null {
    for (const node of tree) {
      if (node.value === nodeIdentifier) {
        return { node, parent };
      }
      if (node.children.length > 0) {
        const result = this.findNodeAndParent(
          node.children,
          nodeIdentifier,
          node,
        );
        if (result) return result;
      }
    }
    return null;
  }

  /**
   * Marca todos os pais até a raiz
   * @param tree Lista de nós da árvore
   * @param nodeIdentifier Identificador do nó
   * @param checked Valor booleano para marcar
   */
  private markParentsChecked(
    tree: TreeSelectInterface[],
    nodeIdentifier: string,
    checked: boolean,
  ): void {
    const result = this.findNodeAndParent(tree, nodeIdentifier);
    if (result && result.parent) {
      result.parent.checked = checked;
      // Recursivamente marca os ancestrais
      this.markParentsChecked(tree, result.parent.value, checked);
    }
  }

  /**
   * Marca todos os filhos recursivamente
   * @param node Nó a partir do qual marcar os filhos
   * @param checked Valor booleano para marcar
   */
  private markChildrenChecked(node: TreeSelectInterface, checked: boolean): void {
    for (const child of node.children) {
      child.checked = checked;
      this.markChildrenChecked(child, checked); // recursão nos filhos
    }
  }

  /**
   * Atualiza o estado checked de um nó e de seus parentes e filhos
   * @param tree Árvore de entrada
   * @param nodeIdentifier Identificador do nó
   * @param checked Valor booleano para aplicar
   * @returns Nova árvore clonada com as alterações aplicadas
   */
  public updateCheckedByRelatives(
    tree: TreeSelectInterface[],
    nodeIdentifier: string,
    checked: boolean,
  ): TreeSelectInterface[] | void {
    const clonedTree: TreeSelectInterface[] = JSON.parse(JSON.stringify(tree)); // faz uma cópia profunda da árvore e aplica as alterações nela.
    const result = this.findNodeAndParent(clonedTree, nodeIdentifier);
    if (!result) return;

    const { node, parent } = result;
    const hasParent = parent !== null;
    const hasChildren = node.children.length > 0;

    if (hasParent) {
      this.markParentsChecked(clonedTree, nodeIdentifier, checked);
    }

    if (hasChildren) {
      this.markChildrenChecked(node, checked);
    }

    // Marca o próprio nó como checked também (opcional)
    node.checked = checked;
    return clonedTree;
  }

  private markExpanded(tree: TreeSelectInterface[]): TreeSelectInterface[] {
    for (const node of tree) {
      node.expanded = true;
      if (node.children && node.children.length > 0) {
        this.markExpanded(node.children);
      }
    }
    return tree;
  }
  
  
  public expandeChildWhenSearched(tree: TreeSelectInterface[]): TreeSelectInterface[]{
    // const clonedTree: TreeSelectInterface[] = this.cloneTree(tree);

    return this.markExpanded(tree);
    // return clonedTree;
  }
}
