import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExpandedButtonMotherProps {
  showTreeNodes: boolean;
  showTree: () => void;
}

export default function ExpandedButtonMother({
  showTreeNodes,
  showTree,
}: ExpandedButtonMotherProps) {
  return (
    <button onClick={showTree} className='expand-tree_button'>
      {!showTreeNodes ? <ChevronDown /> : <ChevronUp />}
    </button>
  );
}
