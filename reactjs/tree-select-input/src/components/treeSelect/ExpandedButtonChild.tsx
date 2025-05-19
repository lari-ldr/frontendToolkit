import { ChevronDown, ChevronRight } from 'lucide-react';
import { TreeSelectInterface } from '../../interfaces/TreeSelectInterface';

interface ExpandedButtonChildProps {
  node: TreeSelectInterface;
  showTreeNode: boolean;
  showNode: () => void;
}

export default function ExpandedButtonChild({
  node,
  showTreeNode,
  showNode,
}: ExpandedButtonChildProps) {
  const hasChildren = node.children.length > 0;
  return (
    <button disabled={!hasChildren} onClick={showNode}>
      {hasChildren && (showTreeNode ? <ChevronDown /> : <ChevronRight />)}
    </button>
  );
}
