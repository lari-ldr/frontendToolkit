import { Link } from 'react-router';

export default function Home() {
  return (
    <>
      <h1>React Frontend Toolkit</h1>
      <h2>Select one of the examples</h2>
      <Link to={'/tree-select-input'}>Tree Select</Link>
    </>
  );
}
