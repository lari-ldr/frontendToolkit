import { memo, useCallback, useState, useRef, useMemo, useEffect } from 'react';
import ExpandedButtonChild from './ExpandedButtonChild';
import { TreeSelectInterface } from '../../interfaces/TreeSelectInterface';
import TreeSelectService from '../../services/TreeSelectService';

const treeSelectService = new TreeSelectService();

interface TreeChildProps {
  node: TreeSelectInterface;
  onChange: (checked: boolean, nodeValue: TreeSelectInterface) => void;
}

function TreeChild({ node, onChange }: TreeChildProps) {
  const [showTreeNode, setShowTreeNode] = useState(node.expanded);
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
  setShowTreeNode(node.expanded);
}, [node.expanded]);


  const indeterminate = useMemo(
    () => treeSelectService.getIndeterminate(node),
    [node],
  );

    useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const showNode = useCallback(() => {
    if (node.children.length === 0) return;
    setShowTreeNode((prev) => !prev);
  }, [node.children.length]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked, node);
    },
    [onChange, node],
  );

  const renderChildren = () => {
    return node.children.map((child) => (
      <div key={child.value} className='tree-child-nodes-margin'>
        <MemoizedTreeChild node={child} onChange={onChange} />
      </div>
    ));
  };

  return (
    <>
      <div className='tree-child-select'>
        <ExpandedButtonChild
          node={node}
          showTreeNode={showTreeNode}
          showNode={showNode}
        />
        <label className='tree-label'>
          <input
            ref={checkboxRef}
            type='checkbox'
            className='tree-checkbox'
            checked={node.checked}
            onChange={handleChange}
          />
          {node.label}
        </label>
      </div>
      {showTreeNode && node.children.length > 0 && renderChildren()}
    </>
  );
}

// Evita re-renderizações desnecessárias se props não mudarem
const MemoizedTreeChild = memo(TreeChild);

export default MemoizedTreeChild;
