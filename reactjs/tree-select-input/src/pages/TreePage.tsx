import { Link } from 'react-router';
import TreeSelect from '../components/treeSelect/TreeSelect';
import { ArrowLeft } from 'lucide-react';

export default function TreePage() {
  return (
    <>
    <Link to={'/'} style={{display: 'flex', alignItems: 'center', gap: '1rem'}}> <ArrowLeft /> Go Back</Link>
      <h1>Tree Select Input</h1>
      <TreeSelect />
    </>
  );
}
